import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

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
            <h2>Tus cursos</h2>
            <ul>
                {cursos.map(curso => (
                    <li key={curso.codigo_curso}>
                        <button onClick={() => handleButtonClick(curso.codigo_curso)}>{curso.codigo_curso} - {curso.nombre}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ComentarioDocente