// src/components/LogoutButton.js
import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';

function LogoutButton() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const doLogout = async () => {
      await logout();
      window.location.href = '/';
    };
    doLogout();
  }, [ logout ]);

  return null;
}

export default LogoutButton;
