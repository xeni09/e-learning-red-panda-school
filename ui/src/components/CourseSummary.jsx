import React from 'react';
import { FaStar, FaUserGraduate, FaClock, FaFileAlt, FaGlobe, FaMobileAlt, FaVolumeUp, FaLevelUpAlt, FaInfinity } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CourseSummary = ({ courseName, price, teacherName, description, posterUrl }) => {
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    const course = { name: courseName, price, teacherName, description, posterUrl };
    navigate('/checkout', { state: { course } });
  };

  if (!courseName || !price || !teacherName) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className="p-6 border rounded shadow bg-[var(--color-white)]">
      <p className="text-2xl font-bold">{courseName}</p>
      <p className="text-lg text-[var(--color-grey)]">{teacherName}</p> 
      {posterUrl && <img src={posterUrl} alt={courseName} />}
      
      <div className="my-4 text-sm text-[var(--color-grey)] space-y-2">
        <div className="flex items-start"><FaStar className="mr-2 mt-1" /> 95% positive ratings</div>
        <div className="flex items-start"><FaUserGraduate className="mr-2 mt-1" /> 1,449 students</div>
        <div className="flex items-start"><FaClock className="mr-2 mt-1" /> 14 lessons (2h 23m)</div>
        <div className="flex items-start"><FaFileAlt className="mr-2 mt-1" /> 44 additional resources (15 files)</div>
        <div className="flex items-start"><FaGlobe className="mr-2 mt-1" /> Online and at your own pace</div>
        <div className="flex items-start"><FaMobileAlt className="mr-2 mt-1" /> Available on the app</div>
        <div className="flex items-start"><FaVolumeUp className="mr-2 mt-1" /> Language: English</div>
        <div className="flex items-start"><FaLevelUpAlt className="mr-2 mt-1" /> Level: Beginner</div>
        <div className="flex items-start"><FaInfinity className="mr-2 mt-1" /> Unlimited access forever</div>
      </div>

      <p className="text-xl text-[var(--color-black)]">Price: {price}</p>
      
      <button className="btn-fullwidth" onClick={handleBuyNowClick}>Buy Now</button>
    </div>
  );
};

export default CourseSummary;