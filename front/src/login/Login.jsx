// Login.jsx
import React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

export default function Login({ handleLogin }) {
  const theme = useTheme();
  const [showBanner, setShowBanner] = React.useState(false);

  const signIn = async (provider, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await handleLogin(email, password);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 2000);
    } catch (err) {
      alert("Credenciales inválidas o error del servidor.");
    }
  };

  return (
    <AppProvider theme={theme}>
      {showBanner && <div className="banner">¡Bienvenido!</div>}
      <SignInPage
        signIn={async (provider, formData) => {
          try {
            await signIn(provider, formData);
          } catch (error) {
            alert("Error al iniciar sesión");
          }
        }}
        providers={[{ id: 'credentials', name: 'Email and Password' }]}
        slotProps={{ emailField: { autoFocus: true } }}
      />
    </AppProvider>
  );
}

// import * as React from 'react';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { SignInPage } from '@toolpad/core/SignInPage';
// import { useTheme } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './autent.jsx'; 

// export default function CredentialsSignInPage() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [showBanner, setShowBanner] = React.useState(false);
//   const { login } = useAuth(); 

//   const corrUsuario = () => {
//     login(); 
//     navigate('/');
//   };

//   const signIn = async (provider, formData) => {
//     const correo = formData.get('email');
//     const contra = formData.get('password');
  
//     console.log('Inicio de sesión con credenciales:', correo, contra);
  
//     try {
//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           Email: correo,
//           PasswordHash: contra,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Credenciales inválidas');
//       }
  
//       const data = await response.json();
//       console.log('Respuesta del servidor:', data);
//       localStorage.setItem('token', data.token);  
  
//       setShowBanner(true);
//       setTimeout(() => setShowBanner(false), 3000);
  
//       corrUsuario();
      
//     } catch (error) {
//       console.error('Error en login:', error);
//       alert('Error al iniciar sesión. Credenciales incorrectas.');
//     }
//   };
  

//   return (
//     <AppProvider theme={theme}>
//       {showBanner && <div className="banner">¡Bienvenido!</div>}
//       <SignInPage
//         signIn={async (provider, formData) => {
//           try {
//             await signIn(provider, formData);
//           } catch (error) {
//             alert(error);
//           }
//         }}
//         providers={[{ id: 'credentials', name: 'Email and Password' }]}
//         slotProps={{ emailField: { autoFocus: false } }}
//       />
//     </AppProvider>
//   );
// }
