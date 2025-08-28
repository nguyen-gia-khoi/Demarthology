import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from '../views/home';
import Introduce from '../views/introduce';
import Diagnosis from '../views/diagnosis'; 
import Contact from '../views/contact';
import Profile from "../views/profile";
import MedicalHistory from "../views/medical-history";
import MainLayout from "../views/layouts/main-layout";
import CommunityView from '../views/community';
import QuestionDetailView from '../views/question-detail';

const AppRoutes: React.FC = () => {
  return (
    <Router>
            <Routes>
              <Route path={"/"} element={<MainLayout/>}>
                  <Route path="/" element={<HomeView />}/>
                  <Route path="/introduce" element={<Introduce />}/>
                  <Route path="/diagnosis" element={<Diagnosis />}/>
                  <Route path="/profile" element={<Profile />}/>
                  <Route path="/medical-history" element={<MedicalHistory />}/>
                  <Route path="/contact" element={<Contact />}/>
                  <Route path="/community" element={<CommunityView />}/>
                  <Route path="/community/question/:questionId" element={<QuestionDetailView/>}/>
                  <Route path="*" element={<div>Page Not Found</div>} />
              </Route>
            </Routes>
    </Router>
  );
};

export default AppRoutes;
