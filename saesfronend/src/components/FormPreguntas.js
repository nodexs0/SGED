import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MyNav from './MyNav';

export const FormPreguntas = () => {
    const { evaluacionId } = useParams();
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/preguntas/');
                setPreguntas(response.data);
            } catch (error) {
                setError('Error al obtener las preguntas');
                console.error('Error al obtener las preguntas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPreguntas();
    }, []);

    const handleRadioChange = (preguntaId, value) => {
        setRespuestas(prevState => ({
            ...prevState,
            [preguntaId]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const cursoid = evaluacionId.split('-')[1];
            const evaluacionid = evaluacionId.split('-')[0];

            // Preparar datos de respuestas como un objeto JSON
            const respuestasToSend = {};
            for (const [preguntaId, respuesta] of Object.entries(respuestas)) {
                respuestasToSend[preguntaId] = {
                    preguntaid: preguntaId,
                    respuesta: respuesta,
                    curso: cursoid,
                    evaluacionid: evaluacionid
                };
            }

            // Enviar solicitud POST
            const response = await axios.post('http://localhost:8000/responder_preguntas/', respuestasToSend);
            if (response.data.mensaje === 'Ok') {
                alert('Respuestas enviadas correctamente');
            } else {
                alert('Hubo un error al enviar las respuestas');
            }
            
            window.location.href = '/evaluaciones';
            // Aquí podrías manejar la respuesta del servidor como desees

        } catch (error) {
            console.error('Error al enviar las respuestas:', error);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <MyNav />
            <div>
                <h2>Preguntas</h2>
                <form onSubmit={handleSubmit}>
                    {preguntas && preguntas.length > 0 ? (
                        preguntas.map(pregunta => (
                            <div key={pregunta.id}>
                                <p>{pregunta.texto}</p>
                                {[1, 2, 3, 4, 5].map(value => (
                                    <label key={value}>
                                        <input
                                            type="radio"
                                            name={`pregunta_${pregunta.id}`}
                                            value={value}
                                            checked={respuestas[pregunta.id] === value}
                                            onChange={() => handleRadioChange(pregunta.id, value)}
                                        />
                                        {value}
                                    </label>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No hay preguntas disponibles</p>
                    )}
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
};

export default FormPreguntas;
