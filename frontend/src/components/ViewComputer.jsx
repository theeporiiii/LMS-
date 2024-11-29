import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewComputer = () => {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [computerToEdit, setComputerToEdit] = useState(null);
  const [updatedData, setUpdatedData] = useState({ computerId: '', timeSlot: '', status: '' });

  useEffect(() => {
    const fetchComputers = async () => {
      try {
        const response = await axios.get('http://localhost:3008/api/computer');
        setComputers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch computers');
        setLoading(false);
      }
    };

    fetchComputers();
  }, []);

  const handleEditClick = (computer) => {
    setEditMode(true);
    setComputerToEdit(computer);
    setUpdatedData({
      computerId: computer.computerId,
      timeSlot: computer.timeSlots[0] || '',
      status: computer.status,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!computerToEdit?._id) {
      setError('Invalid computer ID');
      return;
    }

    try {
        const updatedComputer = {
          ...computerToEdit,
          computerId: updatedData.computerId,
          timeSlots: [updatedData.timeSlot],
          status: updatedData.status,
        };
      
        const response = await axios.put(`http://localhost:3008/api/computer/${computerToEdit._id}`, updatedComputer);
        
        // Update the local state with the updated computer data
        setComputers((prevComputers) =>
          prevComputers.map((computer) =>
            computer._id === computerToEdit._id ? updatedComputer : computer
          )
        );
      
        // Reset form and edit mode
        setEditMode(false);
        setComputerToEdit(null);
        setUpdatedData({ computerId: '', timeSlot: '', status: '' }); // Reset the form
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update computer');
      }
  };

  if (loading) {
    return <p style={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>View Computers</h2>

      {editMode && (
        <div style={styles.editForm}>
          <h3>Edit Computer</h3>
          <form onSubmit={handleSaveChanges} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Computer ID:</label>
              <input
                type="text"
                name="computerId"
                value={updatedData.computerId}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Time Slot:</label>
              <select
                name="timeSlot"
                value={updatedData.timeSlot}
                onChange={handleInputChange}
                required
                style={styles.select}
              >
                <option value="">Select a Time Slot</option>
                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                {/* Add more time slots as needed */}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label>Status:</label>
              <select
                name="status"
                value={updatedData.status}
                onChange={handleInputChange}
                required
                style={styles.select}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button type="submit" style={styles.button}>Save Changes</button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              style={styles .cancelButton}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {!editMode && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Computer ID</th>
              <th style={styles.th}>Time Slot</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Edit</th>
            </tr>
          </thead>
          <tbody>
            {computers.map((computer) => (
              <tr key={computer._id}>
                <td style={styles.td}>{computer.computerId}</td>
                <td style={styles.td}>{computer.timeSlots.join(', ')}</td>
                <td style={styles.td}>{computer.status}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleEditClick(computer)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  loading: {
    fontSize: '18px',
    color: '#007bff',
  },
  error: {
    fontSize: '18px',
    color: 'red',
  },
  table: {
    width: '80%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  },
  th: {
    padding: '12px 15px',
    border: '2px solid #333',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333',
  },
  td: {
    padding: '12px 15px',
    border: '2px solid #333',
    textAlign: 'left',
    color: '#333',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#ffa500',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editForm: {
    width: '80%',
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
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
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ViewComputer;