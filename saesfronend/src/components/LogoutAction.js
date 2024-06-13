import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';

function LogoutAction() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        console.log('Sesión cerrada exitosamente');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };

    handleLogout();
  }, [logout]);

  return null;
}

export default LogoutAction;
