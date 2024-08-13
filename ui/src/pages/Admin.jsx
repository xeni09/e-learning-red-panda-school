// src/components/Admin.js
import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    fetch('/admin') // Reemplaza '/api/endpoint' con tu endpoint real
      .then(response => response.json())
      .then(data => setApiResponse(data))
      .catch(error => console.error('Error fetching API:', error));
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      {apiResponse ? (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Admin;