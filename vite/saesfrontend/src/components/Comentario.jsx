import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';
import ComentarioAlumno from './ComentarioAlumno';
import ComentarioDocente from './ComentarioDocente';

const Comentario = () => {
  const { user, IsAlumno, IsDocente } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
  }

  if(IsDocente()){
    return (
      <div>
        <ComentarioDocente />
      </div>
    )
  } else if(IsAlumno()){
    return (
      <ComentarioAlumno />
    )
  }
}

export default Comentario;