import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Obtener el estado de autenticación del sessionStorage o establecerlo en null si no existe
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData)); // Guardar el usuario en sessionStorage
    console.log('Inicio de sesión exitoso:', userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user'); // Eliminar el usuario del sessionStorage al cerrar sesión
    console.log('Cierre de sesión exitoso');
  };

  // Limpiar el sessionStorage al cargar la aplicación si el usuario ya no está autenticado
  useEffect(() => {
    if (!user) {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
