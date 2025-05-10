import React, { useState, useEffect } from 'react';
import { getAllItems, adminUpdateItemStatus } from '../api';
import './ComponentStyles.css';

const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await getAllItems();
      setItems(response);
      setIsError(false);
    } catch (error) {
      setMessage('Error fetching items');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const updateStatus = async (id, status) => {
    setLoading(true);
    try {
      await adminUpdateItemStatus(id, status);
      setMessage('Status updated successfully');
      setIsError(false);
      fetchItems();
    } catch (error) {
      setMessage('Error updating status');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="component-title">Admin Panel - Moderate Items</h2>
      {message && (
        <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
          {message}
        </div>
      )}
      <div className="section-wrapper">
        {loading ? (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Reference ID</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Reported By</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.referenceId}</td>
                  <td>{item.type}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>{item.reportedBy}</td>
                  <td>{item.status}</td>
                  <td>
                    <select
                      className="form-select"
                      value={item.status}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                    >
                      <option value="reported">Reported</option>
                      <option value="matched">Matched</option>
                      <option value="returned">Returned</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
