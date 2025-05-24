import React from 'react';
import Login from './Login'; 

export default function LoginPage({ handleLogin }) { 
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Inicio de sesión</h1>
      <p>*Email admin: al@gmail.com</p>
      <p>*Email otro: mon@gmail.com</p>
      <p style={{ marginBottom: -100 }}>*Contraseña: 1234</p>
      <Login handleLogin={handleLogin} /> 
    </div>
  );
}