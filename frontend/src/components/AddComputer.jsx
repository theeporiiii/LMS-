import React, { useState } from 'react';
import axios from 'axios';  // Import axios here

const AddComputer = () => {
  const [computerId, setComputerId] = useState('');
  const [timeSlot1, setTimeSlot1] = useState('');
  const [status, setStatus] = useState('Active');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3008/api/computer/add', {
        computerId,
        timeSlot1,
        status
      });
      console.log(response.data);  // Should return success message from the server
      setSuccessMessage('Computer added successfully!');
    } catch (err) {
      console.error('Error adding computer:', err);
      setSuccessMessage('Failed to add computer');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Computer</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Computer ID:</label>
          <input
            type="text"
            value={computerId}
            onChange={(e) => setComputerId(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Time Slot:</label>
          <select
            value={timeSlot1}
            onChange={(e) => setTimeSlot1(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Select Time Slot</option>
            <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
            <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
          </select>
        </div>
        
        <div style={styles.formGroup}>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            style={styles.select}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>
          Add Computer
        </button>
      </form>
      {successMessage && <p style={styles.success}>{successMessage}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '300px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  },
};

export default AddComputer;
