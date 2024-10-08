import React from 'react';
import UserTableDesktop from './UserTableDesktop';
import UserTableMobile from './UserTableMobile';

const UserTable = ({
  users,
  editingUserId,
  editFormData,
  setEditFormData,
  setEditingUserId,
  handleDeleteUser,
  handleSaveChanges,
  handleCancelEdit,
  handleSort,
  sortField,
  sortOrder,
  handleEditClick
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <UserTableDesktop
        users={users}
        editingUserId={editingUserId}
        editFormData={editFormData}
        handleInputChange={handleInputChange}
        setEditingUserId={setEditingUserId}
        handleDeleteUser={handleDeleteUser}
        handleSaveChanges={handleSaveChanges}
        handleCancelEdit={handleCancelEdit}
        handleSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        handleEditClick={handleEditClick}
      />
      <UserTableMobile
        users={users}
        editingUserId={editingUserId}
        editFormData={editFormData}
        handleInputChange={handleInputChange}
        setEditingUserId={setEditingUserId}
        handleDeleteUser={handleDeleteUser}
        handleSaveChanges={handleSaveChanges}
        handleCancelEdit={handleCancelEdit}
        handleEditClick={handleEditClick}
      />
    </>
  );
};

export default UserTable;
