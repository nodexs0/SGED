import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';

const LogoutAction = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

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
  }, [logout, navigate]);

  return null;
}

export default LogoutAction