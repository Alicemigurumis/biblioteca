import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Pages
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import Books from './pages/Books';
import MediaDetails from './pages/MediaDetails';
import AddReview from './pages/AddReview';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <motion.main 
        className="flex-1 overflow-x-hidden overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Header />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TvShows />} />
            <Route path="/books" element={<Books />} />
            <Route path="/:mediaType/:id" element={<MediaDetails />} />
            <Route path="/add-review/:mediaType/:id" element={<AddReview />} />
          </Routes>
        </div>
      </motion.main>
    </div>
  );
};

export default App;