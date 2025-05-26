import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 
import AdminDashboard from './pags/adminPage';
import UserDashboard from './pags/otherPage';
import LoginPage from './login/loginPage';
import MasInforma from './pags/masInfo';
import ContactVista from './pags/contactos';

function App() {
  
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/other" element={<UserDashboard />} />
        <Route path="/cont" element={<ContactVista />} />
        <Route path="/info" element={<MasInforma />} />
      </Routes>
    </Router>
  );
}

export default App;
