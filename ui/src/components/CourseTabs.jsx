import React, { useState } from 'react';

const CourseTabs = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <div>Overview content...</div>;
      case 'Content':
        return <div>Content details...</div>;
      case 'Instructor':
        return <div>Instructor information...</div>;
      case 'Review':
        return <div>Reviews...</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-start space-x-4 lg:space-x-6 border-b border-gray-300 mb-10">
        {['Overview', 'Content', 'Instructor', 'Review'].map(tab => (
          <button
            key={tab}
            className={`relative px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-lg whitespace-nowrap ${activeTab === tab ? 'font-bold text-[var(--color-orange)]' : ''}`}
            onClick={() => setActiveTab(tab)}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector('.hover-line').style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('.hover-line').style.opacity = '0';
            }}
          >
            {tab}
            <span className={`absolute bottom-0 left-0 right-0 ${activeTab === tab ? 'bg-[var(--color-orange)] h-1' : ''}`}></span>
            <span className="hover-line absolute bottom-0 left-0 right-0 bg-[var(--color-orange)] h-1 opacity-0 transition-opacity duration-300"></span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default CourseTabs;