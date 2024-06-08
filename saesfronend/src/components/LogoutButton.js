import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext'; // Importa el contexto de autenticación

const LogoutButton = () => {
  // Accede a la función logout del contexto de autenticación
  const { logout } = useContext(AuthContext);

  // Maneja la acción de cierre de sesión
  const handleLogout = () => {
    logout();
    // Opcionalmente, redirige al usuario a la página de inicio u otra página después del cierre de sesión
    window.location.href = '/'; // Redirige a la página de inicio
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
