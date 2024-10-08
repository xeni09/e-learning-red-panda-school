import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';
import CourseList from '../../components/adminComponents/CourseList';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: '',
    teacher: '',
    description: '',
    price: '',
  });

  const toggleForm = () => {
    setShowCreateCourseForm(prevState => !prevState);  
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCreateCourse = async (formData) => {
    try {
      if (selectedCourse) {
        const response = await axios.put(`/api/courses/${selectedCourse._id}`, formData);
        setCourses(courses.map(course => 
          course._id === selectedCourse._id ? { ...course, ...formData } : course));
        setSelectedCourse(null);
      } else {
        const response = await axios.post('/api/courses', formData);
        setCourses([...courses, response.data]);
      }
      toggleForm();
    } catch (error) {
      console.error('Error creating or updating course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/api/courses/${courseId}`);
        setCourses(courses.filter(course => course._id !== courseId));
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course._id);
    setEditFormData({
      name: course.name,
      category: course.category,
      teacher: course.teacher,
      description: course.description,
      price: course.price,
    });
  };

  const handleSaveChanges = async (courseId) => {
    try {
      const updatedCourse = { ...editFormData };
      await axios.put(`/api/courses/${courseId}`, updatedCourse);
      setCourses(courses.map(course =>
        course._id === courseId ? { ...course, ...updatedCourse } : course
      ));
      setEditingCourseId(null);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCourseId(null);
  };

  return (
    <>
      <AdminSubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>Manage Courses</h2>
        <CourseList
          courses={courses}
          onDeleteCourse={handleDeleteCourse}
          onEditCourse={handleEditCourse}
          toggleForm={toggleForm}
          showCreateCourseForm={showCreateCourseForm}
          handleCreateCourse={handleCreateCourse}
          selectedCourse={selectedCourse}
          editingCourseId={editingCourseId}
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          handleSaveChanges={handleSaveChanges}
          handleCancelEdit={handleCancelEdit}
          handleInputChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
        />
      </div>
    </>
  );
};

export default ManageCourses;
