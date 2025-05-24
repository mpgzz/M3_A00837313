import React from 'react';
import '../App.css'; 
import ResponsiveAppBar from '../comps/menuButton';


function MasInforma() {
  return (
    <div>
      <ResponsiveAppBar /> 
      <div style={{ textAlign: 'center', marginTop: '100px', marginBottom: '20px' }}>
        <h1>Información</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ maxWidth: '700px' }}>
          <h2>Planeación de sistemas de software</h2>
          <p><strong>Reto:</strong></p>
          <p>Optimización de la Cadena de Suministro para PYMEs Locales:</p>

          <p>Muchas pequeñas y medianas empresas (PYMEs) enfrentan problemas con la eficiencia de su cadena de suministro, lo que genera pérdida de ventas, aumento en costos y menor satisfacción del cliente. Con las herramientas de SAP, los estudiantes podrán ayudar a estas empresas a mejorar la visibilidad y gestión de su inventario, optimizar su cadena de suministro y reducir tiempos de respuesta. Se trabajará en la creación de una página web integrada con base de datos y un dashboard de análisis predictivo. Este reto permitirá que los estudiantes tengan experiencia práctica en:</p>

          <p>-Conexión de Bases de Datos a la Nube: Trabajar con una base de datos real en SAP HANA, alojada en la nube y conectada a una API para visualización en tiempo real.</p>

          <p>-Integración de BTP y Funcionalidades de IA: Implementar SAP BTP y herramientas de inteligencia artificial como Business AI para predicciones de demanda o generación de contenido.</p>

          <p>-Visualización de Datos en SAP Analytics Cloud: Construir dashboard.</p>
          <p><strong>Empresa:</strong> SAP</p>
          <p>
            <strong>Equipo:</strong> BTP
          </p>
        </div>
      </div>
    </div>
  );
}

export default MasInforma;