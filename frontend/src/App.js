import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import ReportItem from './components/ReportItem';
import SearchItems from './components/SearchItems';
import Header from './components/Header';
import './components/ComponentStyles.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<AdminPanel />} />
          <Route path="/report" element={<ReportItem />} />
          <Route path="/search" element={<SearchItems />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
