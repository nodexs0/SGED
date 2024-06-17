import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const EvaluacionAlumno = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/evaluaciones/alumno/${user.id}/`);
        setEvaluaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las evaluaciones del alumno:', error);
      }
    };

    fetchEvaluaciones();
  }, [user.id]);

  const handleButtonClick = (evaluacionId) => {
    navigate(`/evaluacion/${evaluacionId}`);
  };

  return (
    <div>
      <h2>Tus evaluaciones disponibles</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Curso</TableHead>
            <TableHead>Nombre del Curso</TableHead>
            <TableHead>Docente</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {evaluaciones && evaluaciones.length > 0 ? (
            evaluaciones.map((evaluacion) => (
              <TableRow key={evaluacion.id}>
                <TableCell>{evaluacion.curso}</TableCell>
                <TableCell>{evaluacion.nombre_curso}</TableCell>
                <TableCell>{evaluacion.docente}</TableCell>
                <TableCell>
                  <button
                    className="btn"
                    onClick={() => handleButtonClick(`${evaluacion.id}-${evaluacion.curso}`)}
                  >
                    Realizar evaluación
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
};

export default EvaluacionAlumno;
