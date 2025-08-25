import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from '../views/home';
import Introduce from '../views/introduce';
import Diagnosis from '../views/diagnosis'; 
import Contact from '../views/contact';
const AppRoutes: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomeView />}/>
          <Route path="/introduce" element={<Introduce />}/>
          <Route path="/diagnosis" element={<Diagnosis />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
    </Router>
  );
};

export default AppRoutes;
