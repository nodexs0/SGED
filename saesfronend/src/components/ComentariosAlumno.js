import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export const CursosAlumno = () => {
  const [cursos, setCursos] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.post('http://localhost:8000/cursos/alumno/', { userId: user.id });
        setCursos(response.data);
      } catch (error) {
        console.error('Error al obtener los cursos del alumno:', error);
      }
    };

    fetchCursos();
  }, [user.id]);

  const handleButtonClick = (cursoId) => {
    navigate(`/comentarios/create/${cursoId}`);
  };

  return (
    <div>
      <h2>Tus cursos</h2>
      <ul>
        {cursos.map(curso => (
          <li key={curso.codigo_curso}>
            <button onClick={() => handleButtonClick(curso.codigo_curso)}> {curso.codigo_curso} - {curso.nombre}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
