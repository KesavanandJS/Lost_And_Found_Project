import React, { useState } from 'react';
import { searchItems } from '../api';
import './ComponentStyles.css';

const SearchItems = () => {
  const [type, setType] = useState('lost');
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await searchItems(type, category);
      setItems(response);
      if (response.length === 0) {
        setMessage('No items found.');
        setIsError(false);
      } else {
        setMessage('');
        setIsError(false);
      }
    } catch (error) {
      setMessage('Error searching items');
      setItems([]);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="component-title">Search Lost and Found Items</h2>
      <div className="section-wrapper">
        <form onSubmit={handleSearch}>
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
              placeholder="Optional"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Searching...
              </>
            ) : (
              'Search'
            )}
          </button>
        </form>
        {message && (
          <div className={`alert mt-3 ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
            {message}
          </div>
        )}
        <ul className="list-group mt-3">
          {items.map((item) => (
            <li key={item._id} className="list-group-item">
              <strong>Ref ID:</strong> {item.referenceId} | <strong>Category:</strong> {item.category} | <strong>Description:</strong> {item.description} | <strong>Status:</strong> {item.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchItems;
