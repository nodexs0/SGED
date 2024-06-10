// src/components/LogoutAction.js
import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';

function LogoutAction() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const doLogout = async () => {
      await logout();
    };
    doLogout();
  }, [ logout ]);

  return null;
}

export default LogoutAction;
