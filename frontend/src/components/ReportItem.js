import React, { useState } from 'react';
import { reportLostItem, reportFoundItem } from '../api';
import './ComponentStyles.css';

const ReportItem = () => {
  const [type, setType] = useState('lost');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const item = { category, description, location, reportedBy };
    try {
      const response = type === 'lost' ? await reportLostItem(item) : await reportFoundItem(item);
      setMessage(`Item reported successfully with Reference ID: ${response.referenceId}`);
      setIsError(false);
      setCategory('');
      setDescription('');
      setLocation('');
      setReportedBy('');
    } catch (error) {
      setMessage('Error reporting item');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="component-title">Report Lost or Found Item</h2>
      <div className="section-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Type:</label>
            <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Category:</label>
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Location:</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Reported By:</label>
            <input
              type="text"
              className="form-control"
              value={reportedBy}
              onChange={(e) => setReportedBy(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Reporting...
              </>
            ) : (
              'Report'
            )}
          </button>
        </form>
        {message && (
          <div className={`alert mt-3 ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportItem;
