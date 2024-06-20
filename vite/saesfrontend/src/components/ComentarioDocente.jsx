import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  
const ComentarioDocente = () => {

    const [cursos, setCursos] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

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

    const handleButtonClick = (evaluacionId) => {
        navigate(`/comentarios/docente/${evaluacionId}`);
    };

    return (
        <div>
            <h2>Tus curso</h2>
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
                            Revisar comentarios
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

export default ComentarioDocente