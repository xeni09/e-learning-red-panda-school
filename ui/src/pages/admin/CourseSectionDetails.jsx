import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu'; 
import SectionInfo from '../../components/courseSectionComponents/SectionInfo';
import CourseSectionsList from '../../components/courseSectionComponents/CourseSectionsList'; 

const CourseSectionDetails = () => {
  const { courseId, sectionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]); // Para manejar las secciones
  const [currentSection, setCurrentSection] = useState(null); // Maneja la sección actual

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        const allSections = response.data.sections || [];

        // Encuentra la sección actual basada en el sectionId
        const current = allSections.find(section => section._id === sectionId);
        setCurrentSection(current);

        // Excluye la sección actual de la lista de secciones para mostrar el resto
        const otherSections = allSections.filter(section => section._id !== sectionId);
        setSections(otherSections);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching course or section details:', error);
        setLoading(false);
      }
    };

    fetchSections();
  }, [courseId, sectionId]);

  if (loading) {
    return <p>Loading section details...</p>;
  }

  const handleEditSection = async (updatedSection, index) => {
    try {
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
  
      // Actualizar el estado de las secciones
      const newSections = sections.map((section, i) => 
        i === index ? response.data : section
      );
      setSections(newSections);
  
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };
  const handleDeleteSection = async (index) => {
    try {
      const updatedSections = sections.filter((_, i) => i !== index);
      await axios.put(`/api/courses/${courseId}`, { sections: updatedSections });

      setSections(updatedSections);
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };


  return (
    <>
      <AdminSubMenu />

      <div className="container mx-auto p-4 pt-20">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center w-full pb-10">
      <h2 className="">Section Details <span className='text-lg'>(Editor view)</span></h2>
          
          <Link to={`/admin/manage-courses/${courseId}`} className="text-[var(--color-orange)] hover:underline">
            &larr; Back to Course Details
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* Muestra la información de la sección actual */}
            {currentSection && <SectionInfo courseId={courseId} sectionId={sectionId} />}
          </div>

          <div>
            {/* Lista de las otras secciones */}
            {sections.length > 0 && (
              <CourseSectionsList 
              sections={sections}
              onEditSection={handleEditSection} 
              onDeleteSection={handleDeleteSection} 
            />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseSectionDetails;
