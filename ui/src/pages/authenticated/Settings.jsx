import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import SubMenu from '../../components/layoutComponents/SubMenu';
import EditableField from '../../components/sharedComponents/EditableField';
import PasswordField from '../../components/sharedComponents/PasswordField';
import useSettingsForm from '../../hooks/useSettingsForm';

const Settings = () => {
  const { user, updateUser } = useContext(AuthContext);
 
  const {
    isEditing, setIsEditing, editedName, setEditedName,
    editedEmail, setEditedEmail, editedPassword, setEditedPassword,
    repeatPassword, setRepeatPassword, loading, error, success,
    saveChanges, cancelEdit
  } = useSettingsForm(user, updateUser);

  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>Settings</h2>
        <p className="text-xl pb-2 ">You can edit your Account Information here:</p>
        <div className="bg-white shadow-md rounded-lg p-3 my-6">
        {/* Editable name */}
        <EditableField
          label="Name"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          isEditing={isEditing}
        />

        {/* Editable email */}
        <EditableField
          label="Email"
          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
          isEditing={isEditing}
          type="email"
        />

        {/* Password Field */}
        <PasswordField
          label="Password"
          password={editedPassword}
          onChange={(e) => setEditedPassword(e.target.value)}
          isEditing={isEditing}
          placeholder="Enter new password"  // Placeholder para nueva contraseña
        />

        {/* Repeat Password Field - Only visible in edit mode */}
        {isEditing && (
          <PasswordField
            label="Repeat Password"
            password={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            isEditing={isEditing}
            placeholder="Repeat new password"  // Placeholder para repetir la contraseña
          />
        )}

        {/* Botones */}
        <div className="px-6 mt-8 flex flex-col sm:flex-row justify-start">
          <button 
            type="button" 
            className="btn mr-5"
            onClick={isEditing ? saveChanges : () => setIsEditing(true)}>
            {isEditing ? (loading ? 'Saving...' : 'Save') : 'Edit'}
          </button>

          {isEditing && (
            <button 
              type="button" 
              className="btn-cancel"
              onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </div>
      </div>
    </>
  );
};

export default Settings;
