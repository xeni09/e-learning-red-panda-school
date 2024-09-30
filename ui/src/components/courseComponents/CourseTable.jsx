import React from 'react';
import CourseRow from './CourseRow';

const CourseTable = ({
  courses,
  onDeleteCourse,
  onEditCourse,
  editingCourseId,
  editFormData,
  setEditFormData,
  handleSaveChanges,
  handleCancelEdit,
  handleInputChange,
  handleCategoryChange
}) => {
  return (
    <table className="table-auto w-full mb-6">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Category</th>
          <th className="px-4 py-2">Teacher</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Image</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <CourseRow
            key={course._id}
            course={course}
            editingCourseId={editingCourseId}
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            handleInputChange={handleInputChange}
            handleCategoryChange={handleCategoryChange}
            handleSaveChanges={handleSaveChanges}
            handleCancelEdit={handleCancelEdit}
            onEditCourse={onEditCourse}
            onDeleteCourse={onDeleteCourse} 
          />
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;
