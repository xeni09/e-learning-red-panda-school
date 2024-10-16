import React, { useState } from 'react';
import VideoModal from '../sharedComponents/VideoModal';
import SectionItem from './SectionItem';
import axios from '../../services/axiosConfig';
import { useParams } from 'react-router-dom';



const CourseSectionsList = ({ sections, onEditSection, onDeleteSection }) => {
  const { courseId } = useParams(); 
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const handleSaveClick = async (updatedSection, index) => {
    console.log("Saving section with thumbnail:", updatedSection.thumbnail); // <-- Verifica el thumbnail
    const formData = new FormData();
  
    formData.append('title', updatedSection.title);
    formData.append('description', updatedSection.description);
    formData.append('videoUrl', updatedSection.videoUrl);
  
    if (updatedSection.thumbnail instanceof File) {
      formData.append('thumbnail', updatedSection.thumbnail);
      console.log("Appending thumbnail to FormData:", updatedSection.thumbnail); // <-- Verifica si el thumbnail se está añadiendo

    }
  
    try {
      // Guardamos la respuesta en una variable
      const response = await axios.put(
        `/api/courses/${courseId}/sections/${updatedSection._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("Response after saving section:", response.data);
  
      // Aquí podrías llamar a una función para actualizar el estado global si es necesario
      onEditSection(response.data, index);  // Asegúrate de pasar la sección actualizada de vuelta al padre
  
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };
  
  
  
  

  const handleWatchVideoClick = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
    setCurrentVideoUrl('');
  };

  return (
    <div>
      <p className="text-3xl font-semibold mb-4">Course Sections</p>

      {sections.map((section, index) => (
        <SectionItem
          key={index}
          section={section}
          onDeleteClick={() => onDeleteSection(index)}
          onSaveClick={(updatedSection) => handleSaveClick(updatedSection, index)}
        />
      ))}

      {showVideoModal && (
        <VideoModal videoUrl={currentVideoUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CourseSectionsList;
