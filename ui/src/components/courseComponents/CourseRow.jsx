import React from 'react';
import CustomDropdown from '../../components/adminComponents/CustomDropdown'; 
import { categories } from '../sharedComponents/constants';
import { Link } from 'react-router-dom';

const CourseRow = ({
  course,
  editingCourseId,
  editFormData,
  setEditFormData,
  handleInputChange,
  handleCategoryChange,
  handleSaveChanges,
  handleCancelEdit,
  onEditCourse,
  onDeleteCourse
}) => {
  return (
    <tr key={course._id}>
      <td className="border px-4 py-2 text-center">
        <Link to={`/admin/manage-courses/${course._id}`} className="text-[var(--color-orange)]">
          {course.customId}
        </Link>
      </td>

      <td className="border px-4 py-2 text-center">
        {editingCourseId === course._id ? (
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleInputChange}
            className="input text-center w-full p-2 border border-gray-300 "
          />
        ) : (
          <Link to={`/admin/manage-courses/${course._id}`} className="text-[var(--color-orange)]">
            {course.name}
          </Link>
        )}
      </td>

      <td className="border px-4 py-2 text-center">
        {editingCourseId === course._id ? (
          <CustomDropdown
            options={categories.map(cat => ({ value: cat, label: cat }))}
            selectedOption={editFormData.category}
            onOptionSelect={handleCategoryChange}  
            className="min-w-[170px] w-full max-w-full px-2 py-2"
          />
        ) : (
          course.category
        )}
      </td>

      <td className="border px-4 py-2 text-center">
        {editingCourseId === course._id ? (
          <input
            type="text"
            name="teacher"
            value={editFormData.teacher}
            onChange={handleInputChange}
            className="input text-center w-full p-2 border border-gray-300 "
          />
        ) : (
          course.teacher
        )}
      </td>

      <td className="border px-4 py-2 text-center">
        {editingCourseId === course._id ? (
          <div className="relative">
            <input
              type="text"
              name="price"
              value={editFormData.price}
              onChange={handleInputChange}
              className="input text-center w-full p-2 pr-8 border border-gray-300 " 
            />
            <span className="absolute inset-y-0 right-0 pr-3 pb-2 flex items-center text-gray-500">€</span> 
          </div>
        ) : (
          `${course.price} €`
        )}
      </td>

      <td className="border px-4 py-2 text-center">
        <Link to={`/admin/manage-courses/${course._id}/students`} className="text-[var(--color-orange)]">
          {course.students ? course.students.length : 0} 
        </Link>
      </td>

      <td className="border px-0 py-0 text-center">
        <img
          src={`http://localhost:3000${course.imageSrc}`}
          alt={course.name}
          className="w-auto h-auto object-cover mx-auto"
        />
      </td>

      <td className="border px-2 py-0 text-center">
        {editingCourseId === course._id ? (
          <div className="flex flex-col lg:flex-row justify-center space-x-1">
            <button
              onClick={() => handleSaveChanges(course._id)}
              className="btn-save"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="btn-cancel bg-gray-400"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-center ">
            <Link to={`/admin/manage-courses/${course._id}`}>
              <button className="btn m-1">
                Edit
              </button>
            </Link>

            <button
              className="btn m-1"
              onClick={() => onEditCourse(course)}
            >
              Quick Edit
            </button>
            <button
              className="btn-delete m-1"
              onClick={() => onDeleteCourse(course._id)}
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default CourseRow;
