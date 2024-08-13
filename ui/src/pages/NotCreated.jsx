import React from 'react';

const NotCreated = () => {
  return (
    <div className='container'>
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-dark-900">
        Pages not yet created or not necessary for the project
      </h2>
      <div className="mt-10 space-y-6 text-center">
        <p className="text-sm text-[var(--color-grey)]">
          This page is a placeholder for links that are not yet created.
        </p>
      </div>
    </div>
  );
};

export default NotCreated;