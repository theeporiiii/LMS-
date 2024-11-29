// src/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/add'); // Navigate to Add Computer page
  };

  const handleViewClick = () => {
    navigate('/view'); // Navigate to View Computers page
  };

  return (
    <div style={styles.container}>
      <h1>Computer Lab Management</h1>
      <div style={styles.buttonContainer}>
        <button onClick={handleAddClick} style={styles.button}>
          Add Computer
        </button>
        <button onClick={handleViewClick} style={styles.button}>
          View Computers
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Home;