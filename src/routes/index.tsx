import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from '../views/home';
import Introduce from '../views/introduce';
import Diagnosis from '../views/diagnosis'; 
import Contact from '../views/contact';
import Profile from "../views/profile";
import MedicalHistory from "../views/medical-history";



const AppRoutes: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomeView />}/>
          <Route path="/introduce" element={<Introduce />}/>
          <Route path="/diagnosis" element={<Diagnosis />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/medical-history" element={<MedicalHistory />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
    </Router>
  );
};

export default AppRoutes;
