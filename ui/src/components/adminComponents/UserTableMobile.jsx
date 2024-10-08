const UserTableMobile = ({
  users,
  editingUserId,
  editFormData,
  handleInputChange,
  setEditingUserId,
  handleDeleteUser,
  handleSaveChanges,
  handleCancelEdit,
  handleEditClick
}) => {
  return (
    <div className="sm:grid md:hidden grid-cols-1 gap-6">
      {users.map(user => (
        <div key={user._id} className="bg-[var(--color-white)] border border-gray-200 p-4 rounded-lg shadow-md space-y-2 mb-5">
          <p><strong className="mr-2">ID:   </strong> {user.customId}</p>
          <p>
            <strong className="mr-2">Name:</strong>
            {editingUserId === user._id ? (
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
            ) : (
              user.name
            )}
          </p>
          <p>
            <strong className="mr-2">Email:</strong>
            {editingUserId === user._id ? (
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
            ) : (
              user.email
            )}
          </p>
          <p>
            <strong className="mr-2">Role:</strong>
            {editingUserId === user._id ? (
              <select
                name="role"
                value={editFormData.role}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              >
                <option value="user">User</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            ) : (
              user.role
            )}
          </p>
          <p>
            <strong className="mr-2">Password:</strong>
            {editingUserId === user._id ? (
              <input
                type="password"
                name="password"
                value={editFormData.password}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
            ) : (
              '••••••••'
            )}
          </p>
          <div className="flex justify-between mt-4">
            {editingUserId !== user._id ? (
              <>
                <button className="btn" onClick={() => handleEditClick(user)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
              </>
            ) : (
              <>
                <button className="btn-save" onClick={() => handleSaveChanges(user._id)}>
                  Save
                </button>
                <button className="btn-cancel" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTableMobile;
