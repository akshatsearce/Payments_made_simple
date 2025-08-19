import React from 'react';
import './loading.css'; // Make sure to create this CSS file

const Loading = () => {
  return (
    <div className="loading-container w-screen">
      <div className="loading-spinner">
        💰
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loading;
