// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    console.log('Inicio de sesión exitoso:', userData);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/logout/');
      logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const logout = () => {
    if (user) {
      setUser(null);
      sessionStorage.removeItem('user');
      console.log('Sesión cerrada');
    } else {
      console.error('No se ha iniciado sesión');
    }
    window.location.href = '/';
  };

  const IsDocente = () => {
    return user.tipo === 'docente';
  };

  const IsAlumno = () => {
    return user.tipo === 'alumno';
  };

  useEffect(() => {
    if (!user) {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout: handleLogout, IsDocente, IsAlumno }}>
      {children}
    </AuthContext.Provider>
  );
};
