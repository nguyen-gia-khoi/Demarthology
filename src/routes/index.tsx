import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserController from '../controllers/user';
import UserView from '../views/user';

const AppRoutes: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UserController />} />
          <Route path="/users/view" element={<UserView users={[]} />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
    </Router>
  );
};

export default AppRoutes;
