import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from '../views/home';

const AppRoutes: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomeView />}/>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
    </Router>
  );
};

export default AppRoutes;
