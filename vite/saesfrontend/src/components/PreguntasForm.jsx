import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // Ajusta la ruta según tu proyecto
import { Button } from '@/components/ui/button'; // Ajusta la ruta según tu proyecto
import { Label } from "@/components/ui/label"; // Ajusta la ruta según tu proyecto
import { Progress } from "@/components/ui/progress";

const PreguntasForm = () => {
    const { evaluacionId } = useParams();
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [progress, setProgress] = useState(0);
    const [paginaActual, setPaginaActual] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/preguntas/');
                setPreguntas(response.data);
            } catch (error) {
                console.error('Error al obtener las preguntas:', error);
            }
        };

        fetchPreguntas();
    }, []);

    useEffect(() => {
        const totalPreguntas = preguntas.length;
        const totalRespuestas = Object.keys(respuestas).length;
        const nuevoProgreso = totalPreguntas > 0 ? (totalRespuestas / totalPreguntas) * 100 : 0;
        setProgress(nuevoProgreso);
    }, [respuestas, preguntas]);

    const handleRadioChange = (preguntaId, value) => {
        setRespuestas(prevState => ({
            ...prevState,
            [preguntaId]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificar si todas las preguntas están respondidas
        const todasRespondidas = preguntas.every(pregunta => respuestas.hasOwnProperty(pregunta.id));

        if (!todasRespondidas) {
            alert('Por favor, responde todas las preguntas antes de enviar.');
            return;
        }

        try {
            const cursoid = evaluacionId.split('-')[1];
            const evaluacionid = evaluacionId.split('-')[0];

            const respuestasToSend = Object.entries(respuestas).map(([preguntaId, respuesta]) => ({
                preguntaid: preguntaId,
                respuesta: respuesta,
                curso: cursoid,
                evaluacionid: evaluacionid
            }));

            const response = await axios.post('http://localhost:8000/responder_preguntas/', respuestasToSend);
            if (response.data.mensaje === 'Ok') {
                alert('Respuestas enviadas correctamente');
            } else {
                alert('Hubo un error al enviar las respuestas');
            }
            navigate('/');
        } catch (error) {
            console.error('Error al enviar las respuestas:', error);
        }
    };

    const preguntasPorPagina = 4;
    const totalPaginas = Math.ceil(preguntas.length / preguntasPorPagina);

    const handlePaginaSiguiente = () => {
        if (paginaActual < totalPaginas - 1) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const handlePaginaAnterior = () => {
        if (paginaActual > 0) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const getPasoText = () => {
        return `Paso ${paginaActual + 1} / ${totalPaginas}`;
    };

    const getInstruccionPorPagina = (pagina) => {
        switch (pagina) {
            case 0:
                return "Modelo centrado en el perfil del maestro";
            case 1:
                return "Modelo centrado en los resultados obtenidos";
            case 2:
                return "Modelo centrado en el comportamiento del docente en el aula";
            case 3:
                return "Modelo de la práctica reflexiva";
            case 4:
                return "Modelo centrado en la Identidad Politécnica";
            default:
                return "";
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8">
            <p className="text-sm mb-4">{getPasoText()}</p>
            <Progress 
                value={progress} 
                className="mb-4 w-full h-2 rounded-full bg-gray-200"
                style={{ '--progress-color': 'rgb(117,40,68)' }} 
            />
            <h2 className="text-2xl font-bold mb-2">¿Cómo calificarías a tu profesor?</h2>
            <p className="text-lg mb-2">Evalúe a sus profesores utilizando una escala del 1 al 5, donde 1 es deficiente y 5 es excelente</p>
            {paginaActual < totalPaginas && (
                <p className="mb-4">{getInstruccionPorPagina(paginaActual)}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                {preguntas.length > 0 && (
                    preguntas.slice(
                        paginaActual * preguntasPorPagina,
                        (paginaActual + 1) * preguntasPorPagina
                    ).map(pregunta => (
                        <div key={pregunta.id} className="space-y-4">
                            <p className="text-lg font-semibold">{pregunta.texto}</p>
                            <RadioGroup
                                onValueChange={(value) => handleRadioChange(pregunta.id, value)}
                                defaultValue={respuestas[pregunta.id]}
                                className="flex space-x-4"
                            >
                                {[1, 2, 3, 4, 5].map(value => (
                                    <div key={value} className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value={value.toString()}
                                            id={`${pregunta.id}_${value}`}
                                            className="text-[rgb(117,40,68)] border-[rgb(117,40,68)] focus:ring-[rgb(117,40,68)]"
                                        />
                                        <Label htmlFor={`${pregunta.id}_${value}`} className="font-normal text-[rgb(117,40,68)]">{value}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    ))
                )}
                {preguntas.length === 0 && (
                    <p className="text-[rgb(117,40,68)]">No hay preguntas disponibles</p>
                )}
                <div className="flex justify-between mt-4">
                    <Button 
                        type="button" 
                        onClick={handlePaginaAnterior} 
                        className="bg-[rgb(117,40,68)] text-white hover:bg-[rgb(97,30,48)]"
                        disabled={paginaActual === 0}
                    >
                        Anterior
                    </Button>
                    <Button 
                        type="button" 
                        onClick={handlePaginaSiguiente} 
                        className="bg-[rgb(117,40,68)] text-white hover:bg-[rgb(97,30,48)]"
                        disabled={paginaActual === totalPaginas - 1}
                    >
                        Siguiente
                    </Button>
                </div>
                {paginaActual === totalPaginas - 1 && (
                    <Button type="submit" className="mt-4 bg-[rgb(117,40,68)] text-white hover:bg-[rgb(97,30,48)]">
                        Enviar
                    </Button>
                )}
            </form>
        </div>
    );
};

export default PreguntasForm;
