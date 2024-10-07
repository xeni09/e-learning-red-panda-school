import React, { useState } from 'react';
import CustomDropdown from '../../components/adminComponents/CustomDropdown';

const CreateUserForm = ({ onCreateUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [formErrors, setFormErrors] = useState({}); // Errores específicos por campo
  const [error, setError] = useState(''); // Estado para errores generales
  const [success, setSuccess] = useState(''); // Estado para manejar el éxito

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' }
  ];

  // Manejar cambios en los inputs y eliminar errores si se corrigen
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Eliminar el error del campo si se corrige el valor en tiempo real
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '' // Elimina el error de este campo si ha sido corregido
      }));
    }
  };

  // Manejar cambios en el dropdown sin disparar la validación
  const handleRoleChange = (selectedRole) => {
    setFormData((prevData) => ({ ...prevData, role: selectedRole }));
  };

  // Validación del formato de correo electrónico con una expresión regular
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar el formulario al momento de enviarlo
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required.';
    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.password) errors.password = 'Password is required.';
    return errors;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar mensajes previos
    setError('');
    setSuccess('');

    // Validar los campos del formulario
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); // Mostrar errores específicos por campo
      return;
    }

    // Intentar crear el usuario
    try {
      const result = await onCreateUser(formData);
      if (result.error) {
        setError(result.error); // Mostrar error del backend
      } else {
        setSuccess('User created successfully.');
        setFormData({ name: '', email: '', password: '', role: 'user' }); // Limpiar el formulario
        setFormErrors({}); // Limpiar errores
      }
    } catch (err) {
      setError('An error occurred while creating the user.');
    }
  };

  return (
    <div className="my-10">
      <p className="text-3xl font-bold mb-4">Create New User</p>

      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mostrar error general */}
      {success && <p className="text-green-500 mb-4">{success}</p>} {/* Mostrar mensaje de éxito */}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">Name*</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[var(--color-yellow)]"
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">Email*</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[var(--color-yellow)]"
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">Password*</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[var(--color-yellow)]"
          />
          {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
        </div>
        <div>
  <label htmlFor="role" className="block mb-1 font-semibold">Role*</label>
  <CustomDropdown
    options={roleOptions}
    selectedOption={formData.role}
    onOptionSelect={handleRoleChange}
    className="w-full  border-gray-300rounded focus:outline-none focus:border-[var(--color-yellow)]"
  />
  {formErrors.role && <p className="text-red-500 text-sm">{formErrors.role}</p>}
</div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="btn px-4 py-2 rounded  bg-[var(--color-green)]"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
