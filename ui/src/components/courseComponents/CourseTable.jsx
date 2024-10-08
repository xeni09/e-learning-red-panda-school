import React from 'react';
import CourseTableDesktop from './CourseTableDesktop';
import CourseTableMobile from './CourseTableMobile';

const CourseTable = ({
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

  return (
    <>
      <CourseTableDesktop
        courses={courses}
        onDeleteCourse={onDeleteCourse}
        onEditCourse={onEditCourse}
        editingCourseId={editingCourseId}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        handleSaveChanges={handleSaveChanges}
        handleCancelEdit={handleCancelEdit}
        handleInputChange={handleInputChange}
      />
      <CourseTableMobile
        courses={courses}
        onDeleteCourse={onDeleteCourse}
        onEditCourse={onEditCourse}
        editingCourseId={editingCourseId}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        handleSaveChanges={handleSaveChanges}
        handleCancelEdit={handleCancelEdit}
        handleInputChange={handleInputChange}
      />
    </>
  );
};

export default CourseTable;
