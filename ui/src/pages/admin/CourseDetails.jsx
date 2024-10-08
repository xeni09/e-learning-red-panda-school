import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import CourseInfo from '../../components/courseComponents/CourseInfo'; 
import CourseSectionsList from '../../components/courseSectionComponents/CourseSectionsList'; 
import AddSectionForm from '../../components/courseSectionComponents/AddSectionForm'; 
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu'; 

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({ title: '', description: '', videoUrl: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [showAddSectionForm, setShowAddSectionForm] = useState(false); // Estado para controlar la visibilidad del formulario

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        console.log("Fetching course details...");
        const response = await axios.get(`/api/courses/${courseId}`);
        console.log("Fetched course data:", response.data);
        setCourseData(response.data);
        setSections(response.data.sections || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setIsLoading(false);
      }
    };
  
    fetchCourseDetails();
  }, [courseId]);

  const handleAddSection = async (formData) => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/sections`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Actualiza el estado con la nueva sección
      setSections([...sections, response.data]);
  
      // Limpiar el formulario
      setNewSection({ title: '', description: '', videoUrl: '' });
      setShowAddSectionForm(false);
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };
  
  

  const handleEditSection = async (updatedSection, index) => {
    try {
      console.log("Editing section:", updatedSection);
      const updatedSections = [...sections];
      updatedSections[index] = updatedSection;
  
      const formData = new FormData();
      formData.append("title", updatedSection.title);
      formData.append("description", updatedSection.description);
      formData.append("videoUrl", updatedSection.videoUrl);
  
      if (updatedSection.sectionImage instanceof File) {
        formData.append("sectionImage", updatedSection.sectionImage);
      }
  
      const response = await axios.put(
        `/api/courses/${courseId}/sections/${updatedSection._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("Updated section response:", response.data);
  
      const updatedSectionFromServer = response.data;
      const newSections = sections.map((section, i) =>
        i === index ? updatedSectionFromServer : section
      );
  
      console.log("New sections state before setting:", newSections);
      setSections(newSections); // Actualizar el estado con la nueva sección
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };
  
  

  const handleDeleteSection = async (index) => {
    try {
      const updatedSections = sections.filter((_, i) => i !== index);
      const updatedCourse = { ...courseData, sections: updatedSections };

      await axios.put(`/api/courses/${courseId}`, updatedCourse);

      setSections(updatedSections);
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  if (isLoading) {
    return <p>Loading course details...</p>;
  }

  return (
    <>
      <AdminSubMenu /> 

      <div className="container mx-auto p-4 pt-20">
        
        
        
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center w-full pb-10">

          <h2 className="">Course Details <span className='text-lg'>(Editor view)</span></h2>
          
          <Link to="/admin/manage-courses" className="text-[var(--color-orange)] hover:underline">
            &larr; Back to Courses List
          </Link>
        </div>



      <div className='mb-10'>
      <p className="text-lg">To add a video to a section, you can use the following videos as a reference (copyright free):</p>


        <a href="https://www.youtube.com/watch?v=RK1RRVR9A2g&t=9s" className="text-[var(--color-orange)] hover:underline">https://www.youtube.com/watch?v=RK1RRVR9A2g&t=9s</a>
        <br />
        <a href="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" className="text-[var(--color-orange)] hover:underline">https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4</a>

      </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CourseInfo courseId={courseId} />
          </div>

          <div>
            <CourseSectionsList 
              sections={sections}
              onEditSection={handleEditSection} 
              onDeleteSection={handleDeleteSection} 
            />

            <button
              onClick={() => setShowAddSectionForm(!showAddSectionForm)}
              className="btn-orange"
            >
              {showAddSectionForm ? 'Hide Section Form' : 'Add New Section'}
            </button>

            {showAddSectionForm && (
  <AddSectionForm 
    handleAddSection={handleAddSection}
  />
)}

          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
