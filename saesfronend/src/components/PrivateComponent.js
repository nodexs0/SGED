import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Importa el contexto de autenticación

const PrivateComponent = () => {
  const { user } = useContext(AuthContext); // Accede al estado de autenticación desde el contexto

  // Verifica si el usuario está autenticado
  // Si no está autenticado, redirige a la página de inicio de sesión
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, muestra el contenido del componente privado
  return (
    <div>
      <h2>Este es un componente privado</h2>
      {/* Agrega aquí el contenido del componente privado */}
    </div>
  );
};

export default PrivateComponent;
