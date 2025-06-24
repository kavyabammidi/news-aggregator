import React from 'react';
import '../data/App.css'; // Assuming spinner CSS is already there

const Loader = () => (
  <div className="loader-container">
    <div className="spinner" />
    <p style={{ marginTop: '1rem' }}>Loading articles...</p>
  </div>
);

export default Loader;
