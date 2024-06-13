import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const EvaluacionesAlumno = () => {
    const [docentes, setDocentes] = useState({});
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [cursos, setCursos] = useState({});
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchCurso = async (cursoId) => {
            try {
                const response = await axios.get(`http://localhost:8000/cursos/${cursoId}/`);
                const cursoData = response.data;
                setCursos(prevState => ({
                    ...prevState,
                    [cursoId]: cursoData
                }));
            } catch (error) {
                console.error('Error al obtener el curso:', error);
            }
        };

        evaluaciones.forEach(evaluacion => {
            if (!cursos[evaluacion.curso]) {
                fetchCurso(evaluacion.curso);
            }
        });
    }, [evaluaciones, cursos]);

    useEffect(() => {
        const fetchDocente = async (docenteId) => {
            try {
                const response = await axios.get(`http://localhost:8000/docente/${docenteId}/`);
                const docenteData = response.data;
                setDocentes(prevState => ({
                    ...prevState,
                    [docenteId]: docenteData
                }));
            } catch (error) {
                console.error('Error al obtener el docente:', error);
            }
        };

        const docentesFaltantes = Object.values(cursos).filter(curso => !docentes[curso.docente]);
        docentesFaltantes.forEach(curso => {
            fetchDocente(curso.docente);
        });
    }, [docentes, cursos]);

    const handleButtonClick = (evaluacionId) => {
        navigate(`/evaluaciones/${evaluacionId}`);
    };

    return (
        <div>
            <h2>Tus evaluaciones</h2>
            <ul>
                {evaluaciones && evaluaciones.length > 0 ? (
                    evaluaciones.map(evaluacion => (
                        <li key={evaluacion.id}>
                            {cursos[evaluacion.curso] ? (
                                <>
                                    <p>
                                        {cursos[evaluacion.curso].codigo_curso} - {cursos[evaluacion.curso].nombre} - Docente: {docentes[cursos[evaluacion.curso].docente] ? docentes[cursos[evaluacion.curso].docente].matricula : 'Cargando docente...'}
                                    </p>
                                    <button onClick={() => handleButtonClick(evaluacion.id)}>
                                        Ver Evaluación
                                    </button>
                                </>
                            ) : (
                                <p>Cargando información del curso...</p>
                            )}
                        </li>
                    ))
                ) : (
                    <li>No hay evaluaciones disponibles</li>
                )}
            </ul>
        </div>
    );
}

export default EvaluacionesAlumno;
