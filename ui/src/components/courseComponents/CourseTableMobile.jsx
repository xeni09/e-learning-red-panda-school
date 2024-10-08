import React from 'react';
import { Link } from 'react-router-dom';

const CourseTableMobile = ({
  courses,
  onDeleteCourse,
  onEditCourse,
  editingCourseId,
  editFormData,
  setEditFormData,
  handleSaveChanges,
  handleCancelEdit,
  handleInputChange
}) => {

  const handleCategoryChange = (selectedCategory) => {
    setEditFormData({ ...editFormData, category: selectedCategory });
  };

  return (
    <div className="sm:grid lg:hidden xs:grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course) => (
        <div key={course._id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-md space-y-2 mb-5">
          <div>
            <img
              src={`http://localhost:3000${course.imageSrc}`}
              alt={course.name}
              className="w-full object-cover rounded-lg pb-5"
            />
          </div>
          <p><strong className="mr-2">ID:</strong> {course.customId}</p>
          <p><strong className="mr-2">Name:</strong>
            {editingCourseId === course._id ? (
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
            ) : (
              <Link to={`/admin/manage-courses/${course._id}`} className="text-[var(--color-orange)]">
                {course.name}
              </Link>
            )}
          </p>
          <p><strong className="mr-2">Category:</strong> 
            {editingCourseId === course._id ? (
              <select
                name="category"
                value={editFormData.category}
                onChange={handleCategoryChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              >
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
              </select>
            ) : (
              course.category
            )}
          </p>
          <p><strong className="mr-2">Teacher:</strong> 
            {editingCourseId === course._id ? (
              <input
                type="text"
                name="teacher"
                value={editFormData.teacher}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              />
            ) : (
              course.teacher
            )}
          </p>
          <p><strong className="mr-2">Price:</strong> 
            {editingCourseId === course._id ? (
              <div className="relative">
                <input
                  type="text"
                  name="price"
                  value={editFormData.price}
                  onChange={handleInputChange}
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">€</span>
              </div>
            ) : (
              `${course.price} €`
            )}
          </p>
          <p><strong className="mr-2">Users Registered:</strong>
            <Link to={`/admin/manage-courses/${course._id}/students`} className="text-[var(--color-orange)]">
              {course.students ? course.students.length : 0}
            </Link>
          </p>

          <div className="flex justify-between items-center mt-4">
            {editingCourseId !== course._id ? (
              <>
                <button className="btn" onClick={() => onEditCourse(course)}>
                  Quick Edit
                </button>
                <Link to={`/admin/manage-courses/${course._id}`}>
                  <button className="btn m-1">
                    Edit
                  </button>
                </Link>
                <button className="btn-delete mx-3" onClick={() => onDeleteCourse(course._id)}>
                  Delete
                </button>
              </>
            ) : (
              <>
                <button className="btn-save" onClick={() => handleSaveChanges(course._id)}>
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

export default CourseTableMobile;
