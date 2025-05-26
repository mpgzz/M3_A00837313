import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import AdminDashboard from './pags/adminPage';
import UserDashboard from './pags/otherPage';
import LoginPage from './login/loginPage';
import MasInforma from './pags/masInfo';
import ContactVista from './pags/contactos';

function App() {
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, userInfo } = data.userData;
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        const redirect = (path) => {
          window.location.href = `<span class="math-inline">\{window\.location\.origin\}/M3\_A00837313</span>{path}`;
        };

        if (userInfo.rol === 'admin') {
          redirect('/admin');
        } else if (userInfo.rol === 'other') {
          redirect('/other');
        } else {
          alert("Rol desconocido. Asegure que sea admin u other");
          redirect('/');
        }
      } else {
        const errorMessage = data.message || 'Error desconocido';
        alert('Error de login: ' + errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error", error);
      throw new Error("Error al conectar con servidor o credenciales inválidas.");
    }
  };

  return (
    <Router basename="/M3_A00837313">
      <Routes>
        <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/other" element={<UserDashboard />} />
        <Route path="/cont" element={<ContactVista />} />
        <Route path="/info" element={<MasInforma />} />
      </Routes>
    </Router>
  );
}

export default App;
