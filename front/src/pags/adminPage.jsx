import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from '../comps/menuButton';
import {Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Dialog,DialogTitle,DialogContent,DialogActions,TextField,CircularProgress,Box,Typography,
} from '@mui/material';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  
  const [formData, setFormData] = useState({
    usuId: '',
    primerNombre: '',
    primerApellido: '',
    segundoApellido: '',
    correo: '',
    contrasena: '',
    rol: '',
  });

  
  const [deleteData, setDeleteData] = useState({
    usuId: '',
    primerNombre: '',
    primerApellido: '',
    correo: '',
  });

  
  const [currentUser, setCurrentUser] = useState(null);

  const API_URL = 'http://localhost:5001/api/admin'; 


  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
     
      const response = await fetch(`${API_URL}/`);
      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error obteniendo usuarios:", err);
      setError("Error obteniendo usuarios:");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchUsers();
  }, []);

  
  const handleOpenCreateDialog = () => {
    setFormData({ 
      usuId: '', primerNombre: '', primerApellido: '', segundoApellido: '',
      correo: '', contrasena: '', rol: '',
    });
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleOpenUpdateDialog = (user) => {
    setCurrentUser(user);
    setFormData({
      usuId: user.usuId || '',
      primerNombre: user.primerNombre || '',
      primerApellido: user.primerApellido || '',
      segundoApellido: user.segundoApellido || '',
      correo: user.correo || '',
      contrasena: '',
      rol: user.rol || '',
    });
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setCurrentUser(null);
  };

  const handleOpenDeleteDialog = (user) => {
    setDeleteData({
      usuId: user.usuId || '',
      primerNombre: '',
      primerApellido:  '',
      correo: '',
    });
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteData({ usuId: '', primerNombre: '', primerApellido: '', correo: '' });
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteFormChange = (e) => {
    setDeleteData({ ...deleteData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async () => {
    try {
     
      const response = await fetch(`${API_URL}/`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error de HTTP ${response.status}`);
      }
      alert('Usuario creado');
      fetchUsers(); 
      handleCloseCreateDialog();
    } catch (err) {
      console.error("Error creando usuario:", err);
      alert(`Error creando usuario: ${err.message}`);
    }
  };

  const handleUpdateUser = async () => {
    try {
     
      const dataToUpdate = Object.fromEntries(
        Object.entries(formData).filter(([, value]) => value !== '')
      );

      const response = await fetch(`${API_URL}/${currentUser.usuId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToUpdate),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error de HTTP: ${response.status}`);
      }
      alert('Usuario actualizado');
      fetchUsers(); 
      handleCloseUpdateDialog();
    } catch (err) {
      console.error("Error actualizando usuario:", err);
      alert(`Error actualizando usuario: ${err.message}`);
    }
  };

  const handleDeleteUser = async () => {
    try {
     
      const response = await fetch(`${API_URL}/${deleteData.usuId}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deleteData), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error de HTTP: ${response.status}`);
      }
      alert('Usuario eliminado');
      fetchUsers(); 
      handleCloseDeleteDialog();
    } catch (err) {
      console.error("Error eliminando usuario:", err);
      alert(`Error actualizando usuario: ${err.message}`);
    }
  };


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
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <div>
      <ResponsiveAppBar />
      <div style={{ padding: 20, marginTop: 80 }}>
        <div style={{textAlign: 'center'}}>
        <h1>Administrador</h1>
        </div>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          Lista de Usuarios
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Primer Apellido</TableCell>
                <TableCell>Segundo Apellido</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell align="center">Modificar/Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.usuId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{user.usuId}</TableCell>
                  <TableCell>{user.primerNombre}</TableCell>
                  <TableCell>{user.primerApellido}</TableCell>
                  <TableCell>{user.segundoApellido}</TableCell>
                  <TableCell>{user.correo}</TableCell>
                  <TableCell>{user.rol}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenUpdateDialog(user)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleOpenDeleteDialog(user)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

  
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={handleOpenCreateDialog}>
            Crear Usuario
          </Button>
        </Box>

       
        <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
          <DialogTitle>Crear Usuario</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="usuId"
              label="ID de Usuario"
              type="text"
              fullWidth
              variant="standard"
              value={formData.usuId}
              onChange={handleFormChange}
              required
            />
            <TextField
              margin="dense"
              name="primerNombre"
              label="Primer Nombre"
              type="text"
              fullWidth
              variant="standard"
              value={formData.primerNombre}
              onChange={handleFormChange}
              required
            />
            <TextField
              margin="dense"
              name="primerApellido"
              label="Primer Apellido"
              type="text"
              fullWidth
              variant="standard"
              value={formData.primerApellido}
              onChange={handleFormChange}
              required
            />
            <TextField
              margin="dense"
              name="segundoApellido"
              label="Segundo Apellido"
              type="text"
              fullWidth
              variant="standard"
              value={formData.segundoApellido}
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              name="correo"
              label="Correo"
              type="email"
              fullWidth
              variant="standard"
              value={formData.correo}
              onChange={handleFormChange}
              required
            />
            <TextField
              margin="dense"
              name="contrasena"
              label="Contraseña"
              type="password"
              fullWidth
              variant="standard"
              value={formData.contrasena}
              onChange={handleFormChange}
              required
            />
            <TextField
              margin="dense"
              name="rol"
              label="Rol (admin/other)"
              type="text"
              fullWidth
              variant="standard"
              value={formData.rol}
              onChange={handleFormChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreateDialog}>Cancelar</Button>
            <Button onClick={handleCreateUser} variant="contained">Crear</Button>
          </DialogActions>
        </Dialog>

     
        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
          <DialogTitle>Actualizar Usuario: {currentUser?.usuId}</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Ingrese los campos que desea cambiar.
            </Typography>
            <TextField
              margin="dense"
              name="primerNombre"
              label="Primer Nombre"
              type="text"
              fullWidth
              variant="standard"
              value={formData.primerNombre}
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              name="primerApellido"
              label="Primer Apellido"
              type="text"
              fullWidth
              variant="standard"
              value={formData.primerApellido}
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              name="segundoApellido"
              label="Segundo Apellido"
              type="text"
              fullWidth
              variant="standard"
              value={formData.segundoApellido}
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              name="correo"
              label="Correo"
              type="email"
              fullWidth
              variant="standard"
              value={formData.correo}
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              name="contrasena"
              label="Nueva Contraseña"
              type="password"
              fullWidth
              variant="standard"
              value={formData.contrasena}
              onChange={handleFormChange}
              helperText="Dejar en blanco si no desea cambiar la contraseña"
            />
            <TextField
              margin="dense"
              name="rol"
              label="Rol (admin/usuario)"
              type="text"
              fullWidth
              variant="standard"
              value={formData.rol}
              onChange={handleFormChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateDialog}>Cancelar</Button>
            <Button onClick={handleUpdateUser} variant="contained">Actualizar</Button>
          </DialogActions>
        </Dialog>

      
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que desea eliminar a este usuario?
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Para confirmar, ingrese los siguientes datos.
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              name="usuId"
              label="ID de Usuario"
              type="text"
              fullWidth
              variant="standard"
              value={deleteData.usuId}
              onChange={handleDeleteFormChange}
              required
              disabled 
            />
            <TextField
              margin="dense"
              name="primerNombre"
              label="Primer Nombre"
              type="text"
              fullWidth
              variant="standard"
              value={deleteData.primerNombre}
              onChange={handleDeleteFormChange}
              required
            />
            <TextField
              margin="dense"
              name="primerApellido"
              label="Primer Apellido"
              type="text"
              fullWidth
              variant="standard"
              value={deleteData.primerApellido}
              onChange={handleDeleteFormChange}
              required
            />
            <TextField
              margin="dense"
              name="correo"
              label="Correo"
              type="email"
              fullWidth
              variant="standard"
              value={deleteData.correo}
              onChange={handleDeleteFormChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
            <Button onClick={handleDeleteUser} variant="contained" color="error">Eliminar</Button>
          </DialogActions>
        </Dialog>

      </div>
    </div>
  );
};

export default AdminDashboard;
