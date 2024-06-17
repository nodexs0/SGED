import React, { useState, useEffect } from 'react'
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

const EvaluacionDocente = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await axios.post('http://localhost:8000/cursos/docente/', { docente_id: user.id });
                setCursos(response.data);
            } catch (error) {
                console.error('Error al obtener los cursos del docente:', error);
            }
        };

        fetchCursos();
    }, [user.id]);

    const handleButtonClick = (cursoId) => {
        navigate(`/evaluacion/docentes/${cursoId}`);
    };

    return (
        <div>
            <h2>Tus Evaluaciones</h2>
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
                    <TableRow key={curso.id}>
                        <TableCell>{curso.codigo_curso}</TableCell>
                        <TableCell>{curso.nombre}</TableCell>
                        <TableCell>
                        <button
                            className="btn"
                            onClick={() => handleButtonClick(curso.codigo_curso)}
                        >
                            Revisar evaluación
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

export default EvaluacionDocente