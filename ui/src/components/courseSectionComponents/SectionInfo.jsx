import React, { useState, useEffect } from 'react';
import axios from '../../services/axiosConfig';
import SectionImageUploadAndCrop from './SectionImageUploadAndCrop';
import VideoModal from '../sharedComponents/VideoModal'; // Asegúrate de importar el modal

const SectionInfo = ({ courseId, sectionId }) => {
  const [sectionData, setSectionData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingImage, setIsChangingImage] = useState(false);
  const [temporaryImage, setTemporaryImage] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false); // Estado para el modal
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');  // URL del video actual

  useEffect(() => {
    const fetchSectionDetails = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/sections/${sectionId}`);
        setSectionData(response.data);
      } catch (error) {
        console.error("Error fetching section details:", error);
      }
    };
    fetchSectionDetails();
  }, [courseId, sectionId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("title", sectionData.title);
      formData.append("description", sectionData.description);
      formData.append("videoUrl", sectionData.videoUrl);

      if (temporaryImage) {
        formData.append("sectionImage", temporaryImage, 'croppedImage.jpeg');
      }

      const response = await axios.put(`/api/courses/${courseId}/sections/${sectionId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSectionData(response.data);
      setIsEditing(false);
      setIsChangingImage(false);
    } catch (error) {
      console.error('Error saving section details:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsChangingImage(false);
  };

  // Abre el modal y establece la URL del video
  const handleOpenVideoModal = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  // Cierra el modal
  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setCurrentVideoUrl('');
  };

  if (!sectionData) {
    return <p>Loading section details...</p>;
  }

  return (
    <div className="bg-white rounded-md">
      <div className="mb-0 p-4">
        <img
          src={
            temporaryImage 
              ? URL.createObjectURL(temporaryImage)
              : `http://localhost:3000${sectionData.imageSrc}`
          }
          alt={sectionData.title}
          className="w-full h-auto object-cover rounded-md"
        />
      </div>

      {isEditing && (
        <div className="p-4">
          {!isChangingImage && (
            <SectionImageUploadAndCrop
              errors={{}} 
              setTemporaryImage={(file) => {
                setTemporaryImage(file); 
              }} 
            />
          )}
        </div>
      )}

      <div className="flex flex-col space-y-6 bg-white shadow-md rounded-lg p-6 mb-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Section Title</label>
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={sectionData.title}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          ) : (
            <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{sectionData.title}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          {isEditing ? (
            <textarea
              name="description"
              value={sectionData.description}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring whitespace-pre-wrap"
            />
          ) : (
            <p className="border px-4 py-2 w-full rounded-md bg-gray-100" style={{ whiteSpace: 'pre-line' }}>
              {sectionData.description}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Video</label>
          {sectionData.videoUrl ? (
            <button
              onClick={() => handleOpenVideoModal(sectionData.videoUrl)} // Abrir el modal con el video
              className="text-[var(--color-orange)] hover:underline"
            >
              Watch Video
            </button>
          ) : (
            <p className="text-gray-500">No video available</p>
          )}
        </div>

        <div className="justify-start">
          {isEditing ? (
            <>
              <button onClick={handleSaveChanges} className="btn-save">Save Changes</button>
              <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn transition duration-300">Edit Section</button>
          )}
        </div>
      </div>

      {/* Modal para mostrar el video */}
      {showVideoModal && (
        <VideoModal videoUrl={currentVideoUrl} onClose={handleCloseVideoModal} />
      )}
    </div>
  );
};

export default SectionInfo;
