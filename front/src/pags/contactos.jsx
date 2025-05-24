import React from 'react';
import '../App.css';

import ResponsiveAppBar from '../comps/menuButton';


function ContactVista() {
  return (
    <div>
      <ResponsiveAppBar /> 
    <div style={{ textAlign: 'center', marginTop: '100px', marginBottom: '20px' }}>
        <h1>Contacto</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{
          width: '150px',
          height: '150px',
          backgroundColor: 'black',
          marginRight: '20px'
        }}></div>

        <div style={{ maxWidth: '700px' }}>
          <h2>Nombre: Michelle González</h2>
          <p><strong>Número:</strong> +810000000</p>
          <p><strong>Correo:</strong> mgz@hotmail.com</p>
          <p><strong>Matrícula:</strong> A000000</p>
          <p>
            <strong>Descripción:</strong>Estudiante.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactVista;