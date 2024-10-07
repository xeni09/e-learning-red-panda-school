import React, { useState, useEffect } from 'react';
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';
import CustomDropdown from '../../components/adminComponents/CustomDropdown';
import SearchBar from '../../components/adminComponents/SearchBar';
import UserTable from '../../components/adminComponents/UserTable';
import { useAuth } from '../../context/AuthProvider';  


import CreateUserForm from '../../components/adminComponents/CreateUserForm';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', role: 'user', password: '' });
  const { user, updateUserState } = useAuth(); 

  const [error, setError] = useState(null);
  const [filterRole, setFilterRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);

  const roleOptions = [
    { value: '', label: 'All' },
    { value: 'user', label: 'User' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users.');
      }
    };
  
    fetchUsers();
  }, []); 
  

  const handleCreateUser = async (newUserData) => {
    try {
      const response = await axios.post("/api/users", newUserData);
      setUsers([...users, response.data]);  // Add new user to the list
      return { success: true }; // Enviar éxito a CreateUserForm
    } catch (error) {
      console.error('Error creating user:', error);
      return { error: 'Failed to create user. Please try again.' };  // Retornar error para CreateUserForm
    }
  };


  const handleEditClick = (user) => {
 
    setEditingUserId(user._id);
    setEditFormData({ 
      name: user.name || '',  
      email: user.email || '', 
      role: user.role || '',  // Check if this value is coming correctly
      password: ''  // Password field will be left empty as it won't be fetched from the database
    });
  
  };
  

  const handleSaveChanges = async (userId) => {
    try {
      const updatedData = { ...editFormData };
      
      // Si la contraseña no ha sido modificada, no la enviamos
      if (!editFormData.password) {
        delete updatedData.password;
      }

      // Realizar la petición al backend para actualizar el usuario
      await axios.put(`/api/users/user/${userId}`, updatedData);

      // Actualizar la lista de usuarios en el estado local
      setUsers(users.map(user => user._id === userId ? { ...user, ...updatedData } : user));

      // Si el usuario autenticado es el que se editó, actualizamos el estado global
      if (user && user._id === userId) {
        updateUserState(updatedData);  // Actualiza el contexto con los nuevos datos
      }

      // Limpiar el formulario y el estado de edición
      setEditingUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user.');
    }
  };
  
  
  
  

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditFormData({ name: '', email: '', role: 'user', password: '' }); // Include password
  };
  

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;  // Si no se confirma, no eliminar

    try {
      await axios.delete(`/api/users/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user.');
    }
  };

  const toggleForm = (form) => {
    if (form === 'create') {
      setShowCreateUserForm(prevState => !prevState);  // Correctly toggles the state
    }
  };

  const filteredUsers = users.filter(user => filterRole ? user.role === filterRole : true);
  const searchedUsers = filteredUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminSubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>Manage Users</h2>

        <div className="bg-white shadow-md rounded-lg p-10 my-10">
       
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center w-full pb-4">


        <p className="text-4xl font-normal">User List</p>

        <div className="flex flex-row justify-end space-x-4">


              <button
                className="btn-orange"
                onClick={() => toggleForm('create')}
              >
                {showCreateUserForm ? 'Hide Create New User' : 'Create New User'}
              </button>

              </div>
              
          </div>

          
          {error && <p className="text-red-500">{error}</p>} {/* Handle global errors */}

        

          {showCreateUserForm && (
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-6 shadow-md">
              <CreateUserForm onCreateUser={handleCreateUser} />
            </div>
          )}
          <div className="flex items-center pb-4 space-x-4 md:space-x-4">
              <label htmlFor="filterRole" className="mr-2 text-sm whitespace-nowrap">Filter by Role:</label>
              <CustomDropdown
                options={roleOptions}
                selectedOption={filterRole}
                onOptionSelect={setFilterRole}
                className="w-40 md:w-48"
              />
            </div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <UserTable
            users={searchedUsers}
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            setEditingUserId={setEditingUserId}
            handleDeleteUser={handleDeleteUser}
            handleSaveChanges={handleSaveChanges}
            handleEditClick={handleEditClick}
            editingUserId={editingUserId}
            handleCancelEdit={handleCancelEdit}
          />
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
