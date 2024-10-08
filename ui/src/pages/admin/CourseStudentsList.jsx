import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';
import CustomDropdown from '../../components/adminComponents/CustomDropdown';


const CourseStudentsList = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [allUsers, setAllUsers] = useState([]); // Para almacenar todos los usuarios
  const [selectedUser, setSelectedUser] = useState(''); // Usuario seleccionado en el dropdown
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await axios.get(`/api/courses/${courseId}`);
        setCourseName(courseResponse.data.name);

        const studentsResponse = await axios.get(`/api/courses/${courseId}/students`);
        setStudents(studentsResponse.data);

        // Obtener la lista de todos los usuarios (excepto los ya registrados en el curso)
        const allUsersResponse = await axios.get('/api/users'); // Asume que tienes un endpoint para obtener todos los usuarios
        const filteredUsers = allUsersResponse.data.filter(user => 
          !studentsResponse.data.some(student => student._id === user._id)
        );
        setAllUsers(filteredUsers); // Almacena los usuarios no registrados en el curso
      } catch (error) {
        console.error("Error fetching course details and students:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  // Función para añadir un usuario al curso
// Función para añadir un usuario al curso
const handleAddUserToCourse = async () => {
  if (!selectedUser) return;
  try {
    await axios.post(`/api/courses/${courseId}/assign-user`, { userId: selectedUser });
    
    // Actualizar la lista de estudiantes con los datos más recientes
    const updatedStudents = await axios.get(`/api/courses/${courseId}/students`);
    setStudents(updatedStudents.data);

    // Filtrar al usuario añadido de la lista de todos los usuarios
    const updatedUsers = allUsers.filter(user => user._id !== selectedUser);
    setAllUsers(updatedUsers); // Actualizar la lista de usuarios en el dropdown
    
    setSelectedUser(''); // Limpiar el usuario seleccionado
  } catch (error) {
    console.error("Error adding user to course:", error);
  }
};


  // Función para eliminar al usuario del curso
  const handleRemoveStudent = async (studentId) => {
    const confirmed = window.confirm("Are you sure you want to remove this student from the course?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/courses/${courseId}/students/${studentId}`);
      // Filtrar el estudiante eliminado de la lista local de estudiantes
      setStudents(students.filter(student => student._id !== studentId));
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  // Preparar las opciones para el CustomDropdown
  const userOptions = allUsers.map(user => ({
    value: user._id,
    label: `${user.name} (${user.email})`
  }));

  return (
    <>
      <AdminSubMenu />
      <div className="container mx-auto p-6 pt-10">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(-1)} className="btn">
            Go Back to Manage Courses
          </button>
        </div>

        {/* Dropdown para añadir usuarios */}
        <div className="mb-8 bg-white p-8 shadow-md rounded-lg">
          <h3 className="text-3xl font-bold text-gray-800">Add User to Course</h3>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-start sm:items-end">
            <div className="w-full sm:w-3/4">
              <CustomDropdown
                options={userOptions} // Pasar las opciones de usuarios
                selectedOption={selectedUser}
                onOptionSelect={setSelectedUser} // Manejar la selección
                className="w-full"
              />
            </div>



            <div>
              <button
                onClick={handleAddUserToCourse}
                className="btn-save m-0"
              >
                Add to Course
              </button>
            </div>
          </div>
        </div>

        {students.length > 0 ? (
  <div className="bg-white p-10 rounded-lg">

    {/* Título del curso y enlace */}
    <div>
      <p className="sm:text-3xl text-xl pb-5">Students Registered for the Course:</p>
      <Link to={`/admin/manage-courses/${courseId}`}>
        <h2 className="font-bold text-[var(--color-orange)] cursor-pointer">
          "{courseName}"
        </h2>
        <p className="pl-4 text-sm text-[var(--color-orange)] ">*Click here to go back</p>
      </Link>
    </div>

    {/* Tabla - VISIBLE SOLO EN ESCRITORIO/DESKTOP */}
    <div className="md:block xs:hidden "> 
      <table className="table-auto w-full mb-2 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="border text-center">{student.name}</td>
              <td className="border text-center">{student.email}</td>
              <td className="border text-center">
                <button
                  onClick={() => handleRemoveStudent(student._id)}
                  className="btn-delete text-white bg-red-500 hover:bg-red-700 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Cards - VISIBLE SOLO EN MÓVIL/MOBILE */}
    <div className=" sm:grid md:hidden grid-cols-1 gap-4 my-6">
      {students.map((student) => (
        <div key={student._id} className="bg-gray-100 p-4 rounded-lg shadow-md my-6">
          <p className="text-md text-left"><strong>Name:</strong> {student.name}</p>
          <p className="text-md text-left" ><strong>Email:</strong> {student.email}</p>
          <button
            onClick={() => handleRemoveStudent(student._id)}
            className="btn-delete text-white bg-red-500 hover:bg-red-700 px-4 py-2 mt-4 rounded "
          >
            Remove
          </button>
        </div>
      ))}
    </div>

  </div>
) : (
          <div className="bg-white p-10">

            <div className="flex justify-between items-center mb-6">
            <p className="text-3xl font-normal pb-4">Students Registered for the Course:</p>
            <Link to={`/admin/manage-courses/${courseId}`}>
              <h2 className="flex justify-start text-3xl font-bold text-[var(--color-orange)] cursor-pointer">
                "{courseName}"
                <span className="pl-4 text-xs pt-6">Click here to go back to this Course Info</span>
              </h2>
            </Link>
      </div>

            <p className="pt-10 text-xl">
              Sorry, but no students have registered for this course yet..
            </p>
          </div>
        )}



      </div>
    </>
  );
};

export default CourseStudentsList;
