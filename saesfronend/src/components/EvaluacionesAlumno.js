import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const EvaluacionesAlumno = () => {
    
    const [evaluaciones, setEvaluaciones] = useState([]);
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
                            <button onClick={() => handleButtonClick(evaluacion.id + "-" + evaluacion.curso)}> 
                                {evaluacion.curso} - {evaluacion.nombre_curso} | Impartido por {evaluacion.docente}
                            </button>
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
