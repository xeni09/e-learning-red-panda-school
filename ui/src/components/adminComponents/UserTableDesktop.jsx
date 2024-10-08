const UserTableDesktop = ({
  users,
  editingUserId,
  editFormData,
  handleInputChange,
  setEditingUserId,
  handleDeleteUser,
  handleSaveChanges,
  handleCancelEdit,
  handleSort,
  sortField,
  sortOrder,
  handleEditClick
}) => {
  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return '↑↓';
    }
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <table className="table-auto xs:hidden w-full mb-6 md:table">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>
            Name {renderSortIcon('name')}
          </th>
          <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('email')}>
            Email {renderSortIcon('email')}
          </th>
          <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('role')}>
            Role {renderSortIcon('role')}
          </th>
          <th className="px-4 py-2">Password</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td className="border px-4 py-2">{user.customId}</td>
            <td className="border px-4 py-2">
              {editingUserId === user._id ? (
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  placeholder={user.name}
                  className="input mb-2 w-full p-2 border rounded border-gray-300"
                />
              ) : (
                user.name
              )}
            </td>
            <td className="border px-4 py-2">
              {editingUserId === user._id ? (
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  placeholder={user.email}
                  className="input mb-2 w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                user.email
              )}
            </td>
            <td className="border px-4 py-2">
              {editingUserId === user._id ? (
                <select
                  name="role"
                  value={editFormData.role}
                  onChange={handleInputChange}
                  className="input mb-2 w-full p-2 border border-gray-300 rounded"
                >
                  <option value="user">User</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              ) : (
                user.role
              )}
            </td>
            <td className="border px-4 py-2">
              {editingUserId === user._id ? (
                <input
                  type="password"
                  name="password"
                  value={editFormData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className="input mb-2 w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                '••••••••'
              )}
            </td>
            <td className="border px-4 py-0">
              {editingUserId === user._id ? (
                <div className="flex space-x-2">
                  <button onClick={() => handleSaveChanges(user._id)} className="btn-save">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="btn-cancel">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex lg:flex-row flex-col">
                  <button onClick={() => handleEditClick(user)} className="btn">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteUser(user._id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTableDesktop;
