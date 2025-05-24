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
      {showBanner && <div className="banner">Bienvenido!</div>}
      <SignInPage
        signIn={async (provider, formData) => {
          try {
            await signIn(provider, formData);
          } catch (error) {
            alert("Error al iniciar sesión");
          }
        }}
        providers={[{ id: 'credentials', name: 'Email and password' }]}
        slotProps={{ emailField: { autoFocus: true } }}
      />
    </AppProvider>
  );
}

