import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from '../views/home';
import Introduce from '../views/introduce';
import Diagnosis from '../views/diagnosis'; 
import Contact from '../views/contact';
import Profile from "../views/profile";
import MedicalHistory from "../views/medical-history";
import Login from "../views/login";
import Register from "../views/register";
import MainLayout from "../components/layouts/main-layout";
import HospitalView from '../views/hospital';
import UV from '../views/uv';
import CommunityView from '../views/community';
import QuestionDetailView from '../views/question-detail';
import BeforeAfter from '../views/before-after';

const AppRoutes: React.FC = () => {
  return (
    <Router>
            <Routes>
              {/* Auth routes without layout */}
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>

              {/* Main app routes with layout */}
              <Route path={"/"} element={<MainLayout/>}>
                  <Route path="/" element={<HomeView />}/>
                  <Route path="/introduce" element={<Introduce />}/>
                  <Route path="/diagnosis" element={<Diagnosis />}/>
                  <Route path="/profile" element={<Profile />}/>
                  <Route path="/medical-history" element={<MedicalHistory />}/>
                  <Route path="/contact" element={<Contact />}/>
                  <Route path="/hospital" element={<HospitalView />}/>
                  <Route path="/uv" element={<UV />}/>
                  <Route path="/community" element={<CommunityView />}/>
                  <Route path="/community/question/:questionId" element={<QuestionDetailView/>}/>
                  <Route path="/before-after" element={<BeforeAfter />}/>
                  <Route path="*" element={<div>Page Not Found</div>} />
              </Route>
            </Routes>
    </Router>
  );
};

export default AppRoutes;
