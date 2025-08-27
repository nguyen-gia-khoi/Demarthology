import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from '../views/home';
import Introduce from '../views/introduce';
import Diagnosis from '../views/diagnosis'; 
import Contact from '../views/contact';
import ArticlesView from '../views/articles';

const AppRoutes: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomeView />}/>
          <Route path="/introduce" element={<Introduce />}/>
          <Route path="/diagnosis" element={<Diagnosis />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/articles" element={<ArticlesView />}/>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
    </Router>
  );
};

export default AppRoutes;
