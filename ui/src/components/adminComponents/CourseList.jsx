import React from 'react';

import CreateCourseForm from '../courseComponents/CreateCourseForm';
import CourseTable from '../courseComponents/CourseTable'; 

const CourseList = ({
  courses,
  onDeleteCourse,
  onEditCourse,
  toggleForm,
  showCreateCourseForm,
  handleCreateCourse,
  selectedCourse,
  handleCancel,
  editingCourseId,
  setEditingCourseId,
  editFormData,
  setEditFormData,
  handleSaveChanges,
  handleCancelEdit,
  handleInputChange,
  handleCategoryChange
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-10 my-10">
      <div className="flex flex-col md:flex-row justify-between items-start ">
      <p className="text-4xl font-normal pb-6">Courses List</p>

        <button className="btn-orange mt-4 md:mt-0" onClick={toggleForm}>
          {showCreateCourseForm ? 'Hide Create New Course' : 'Create New Course'}
        </button>
      </div>

      {/* Mostrar el formulario de creación de cursos si está activo */}
      {showCreateCourseForm && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-6 shadow-md">
          <CreateCourseForm
            onSubmit={handleCreateCourse}
            courseToEdit={selectedCourse}
            onCancel={handleCancel}
          />
        </div>
      )}

      <CourseTable
        courses={courses}
        onDeleteCourse={onDeleteCourse}
        onEditCourse={onEditCourse}
        editingCourseId={editingCourseId}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        handleSaveChanges={handleSaveChanges}
        handleCancelEdit={handleCancelEdit}
        handleInputChange={handleInputChange}
        handleCategoryChange={handleCategoryChange}
      />
    </div>
  );
};

export default CourseList;
