import React from 'react'
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';


export const EvaluacionesDocente = () => {

    const [cursos, setCursos] = useState([]);
    const { user } = useContext(AuthContext);
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

    const handleButtonClick = (cursoId) => {
        navigate(`/evaluaciones/docentes/${cursoId}`);
    };

    return (
        <div>
            <h2>Tus Evaluaciones</h2>
            <ul>
                {cursos.map(curso => (
                    <div>
                        <li key={curso.codigo_curso}>
                            <button onClick={() => handleButtonClick(curso.codigo_curso)}> 
                                {curso.codigo_curso} - {curso.nombre}
                            </button>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}
