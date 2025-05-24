import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../comps/menuButton';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('No se encontró el token');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5001/api/user/data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error:', errorData);
          throw new Error(errorData.message || `Error al obtener datos del usuario: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data[0]); 
      } catch (err) {
        console.error('Error', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginLeft: 2 }}>Cargando...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>
        <Typography variant="h6">Error: {error}</Typography>
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'orange' }}>
        <Typography variant="h6">No se pudieron cargar los datos del usuario.</Typography>
      </Box>
    );
  }

  return (
    <div>
      <ResponsiveAppBar />
      <Box sx={{ padding: 3, marginTop: '80px' }}>
           <div style={{ textAlign: 'center'}}>
        <Typography variant="h4" component="h1" gutterBottom><strong>Usuario</strong></Typography>
      </div>
        

        <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
          <Typography variant="h5" gutterBottom>Información Personal</Typography>
          <Typography variant="body1"><strong>Nombre Completo:</strong> {userData.primerNombre} {userData.primerApellido} {userData.segundoApellido}</Typography>
          <Typography variant="body1"><strong>Correo:</strong> {userData.correo}</Typography>

    
          {userData.carreraNombre && (
            <>
              <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Información Académica</Typography>
              <Typography variant="body1"><strong>Carrera:</strong> {userData.carreraNombre} ({userData.carreraNomen})</Typography>
              <Typography variant="body1"><strong>Fecha de Graduación:</strong> {new Date(userData.fechaGrad).toLocaleDateString()}</Typography>
              <Typography variant="body1"><strong>Director:</strong> {userData.directorNombre}</Typography>
              <Typography variant="body1"><strong>Promedio Calificaciones:</strong> {userData.caliPromedio}</Typography>
              <Typography variant="body1"><strong>Nivel de Inglés:</strong> {userData.nivelIngles}</Typography>
            </>
          )}
          {!userData.carreraNombre && ( 
             <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
               No se encontraron más datos
             </Typography>
           )}
        </Paper>
      </Box>
    </div>
  );
};

export default UserDashboard;