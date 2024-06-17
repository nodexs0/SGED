import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ComentarioAlumno = () => {
    const [cursos, setCursos] = useState([]);
    const { user } = useAuth();
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Curso</TableHead>
              <TableHead>Nombre del Curso</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cursos && cursos.length > 0 ? (
              cursos.map((curso) => (
                <TableRow key={curso.codigo_curso}>
                  <TableCell>{curso.codigo_curso}</TableCell>
                  <TableCell>{curso.nombre}</TableCell>
                  <TableCell>
                    <button
                      className="btn"
                      onClick={() => handleButtonClick(curso.codigo_curso)}
                    >
                      Realizar comentario
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4">No hay evaluaciones disponibles</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
    );
}

export default ComentarioAlumno;