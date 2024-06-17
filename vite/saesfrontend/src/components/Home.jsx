// src/components/Home.jsx
import React from 'react';
import { useAuth } from '../auth';

function Home() {
  const { user, IsDocente, IsAlumno } = useAuth();

  if (!user) {
    return (
      <div>
        <h1>Bienvenido a la página de inicio!</h1>
        <p>Por favor, inicia sesión para continuar.</p>
      </div>
    );
  } else if (IsDocente()) {
    return (
      <div>
        <h1>Bienvenido Docente {user.nombre}!</h1>
      </div>
    );
  } else if (IsAlumno()) {
    return (
      <div>
        <h1>Bienvenido Alumno {user.nombre}!</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Bienvenido a la página de inicio!</h1>
      </div>
    );
  }
}

export default Home;
