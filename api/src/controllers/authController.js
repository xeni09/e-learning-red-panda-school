const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      // Si el usuario ya existe, simplemente devuelve un mensaje de éxito sin intentar crear un nuevo usuario
      return res.status(200).json({ msg: "User already exists", user });
    }

    // Obtener el último customId y sumarle 1 para asignarlo al nuevo usuario
    const lastUser = await User.findOne().sort({ customId: -1 });
    const newCustomId = lastUser ? lastUser.customId + 1 : 1;

    // Hashear la contraseña en el controlador
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Crear nuevo usuario con la contraseña hasheada
    user = new User({
      name,
      email,
      password: hashedPassword, // Contraseña hasheada aquí
      role: role || "user",
      customId: newCustomId,
    });

    // Guardar el usuario en la base de datos
    await user.save();

    // Devolver el usuario recién creado
    res.status(201).json({ msg: "User registered successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Controlador para iniciar sesión
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate("courses");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Configurar el token en una cookie segura
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, // Expira en 1 hora
    });

    console.log("Token set in cookie: ", token); // Add this log to verify token creation

    // Devolver los datos del usuario, incluyendo los cursos
    res.json({
      user: {
        _id: user._id,
        customId: user.customId,
        name: user.name,
        email: user.email,
        role: user.role,
        courses: user.courses,
      },
    });
  } catch (err) {
    console.error("Error during login process:", err.message);
    res.status(500).send("Server error");
  }
};

// Controlador para verificar el token JWT
const verifyToken = async (req, res) => {
  try {
    // Obtener el token de las cookies o de los encabezados de autorización
    const token = req.cookies.token;

    if (!token) {
      return res.status(200).json({ user: null });
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario en la base de datos y popular los cursos
    const user = await User.findById(decoded._id).populate({
      path: "courses",
      model: "Course",
      select: "_id name description teacher imageSrc",
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Devolver la información del usuario
    return res.json({ user });
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Controlador para cerrar sesión
const logout = (req, res) => {
  res.clearCookie("token");
  req.session.destroy(() => {
    res.json({ msg: "Logged out successfully" });
  });
};

module.exports = {
  registerUser,
  login,
  verifyToken,
  logout,
};
