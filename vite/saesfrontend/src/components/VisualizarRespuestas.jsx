import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

const VisualizarRespuestas = () => {
    const [respuestas, setRespuestas] = useState([]);
    const [promediosPorModelo, setPromediosPorModelo] = useState({});
    const [promediosPorPregunta, setPromediosPorPregunta] = useState([]);
    const { cursoId } = useParams();

    useEffect(() => {
        const fetchRespuestas = async () => {
            try {
                const response = await axios.post('http://localhost:8000/respuestas/curso/', { cursoId: cursoId });
                setRespuestas(response.data);

                // Calcular promedios por modelo
                const promediosPorModeloCalculados = {
                    "Modelo centrado en el perfil del maestro": [],
                    "Modelo centrado en los resultados obtenidos": [],
                    "Modelo centrado en el comportamiento del docente en el aula": [],
                    "Modelo de la práctica reflexiva": [],
                    "Modelo centrado en la Identidad Politécnica": []
                };

                response.data.forEach(respuesta => {
                    const { pregunta, respuesta: valorRespuesta } = respuesta;
                    const modeloPregunta = getModeloFromPregunta(pregunta); // Determinar modelo según la pregunta
                    promediosPorModeloCalculados[modeloPregunta].push(parseInt(valorRespuesta));
                });

                // Calcular promedios finales por modelo
                const promediosFinalesModelo = {};
                Object.keys(promediosPorModeloCalculados).forEach(modelo => {
                    const sumatoria = promediosPorModeloCalculados[modelo].reduce((acc, curr) => acc + curr, 0);
                    const cantidad = promediosPorModeloCalculados[modelo].length;
                    const promedio = sumatoria / cantidad;
                    promediosFinalesModelo[modelo] = parseFloat(promedio.toFixed(2));
                });

                setPromediosPorModelo(promediosFinalesModelo);

                // Calcular promedios por pregunta
                const promediosPorPreguntaCalculados = [];
                const preguntas = Array.from(new Set(response.data.map(respuesta => respuesta.pregunta)));
                preguntas.forEach(pregunta => {
                    const respuestasPorPregunta = response.data.filter(respuesta => respuesta.pregunta === pregunta);
                    const sumatoria = respuestasPorPregunta.reduce((acc, curr) => acc + parseInt(curr.respuesta), 0);
                    const cantidad = respuestasPorPregunta.length;
                    const promedio = sumatoria / cantidad;
                    promediosPorPreguntaCalculados.push({ pregunta: `Pregunta ${pregunta}`, promedio: parseFloat(promedio.toFixed(2)) });
                });

                setPromediosPorPregunta(promediosPorPreguntaCalculados);

            } catch (error) {
                console.error('Error al obtener las respuestas:', error);
            }
        };

        fetchRespuestas();
    }, [cursoId]);

    const getModeloFromPregunta = (preguntaId) => {
        // Determinar a qué modelo pertenece la pregunta según su ID
        if (preguntaId >= 1 && preguntaId <= 4) {
            return "Modelo centrado en el perfil del maestro";
        } else if (preguntaId >= 5 && preguntaId <= 8) {
            return "Modelo centrado en los resultados obtenidos";
        } else if (preguntaId >= 9 && preguntaId <= 12) {
            return "Modelo centrado en el comportamiento del docente en el aula";
        } else if (preguntaId >= 13 && preguntaId <= 16) {
            return "Modelo de la práctica reflexiva";
        } else if (preguntaId >= 17 && preguntaId <= 20) {
            return "Modelo centrado en la Identidad Politécnica";
        } else {
            return "Otro modelo"; // Manejar preguntas fuera de los rangos definidos, si es necesario
        }
    };

    const getRespuestasPorModelo = (modelo) => {
        const preguntas = [];
        switch (modelo) {
            case "Modelo centrado en el perfil del maestro":
                for (let i = 1; i <= 4; i++) {
                    preguntas.push({ pregunta: `Pregunta ${i}`, promedio: promediosPorPregunta[i - 1]?.promedio || 0 });
                }
                break;
            case "Modelo centrado en los resultados obtenidos":
                for (let i = 5; i <= 8; i++) {
                    preguntas.push({ pregunta: `Pregunta ${i}`, promedio: promediosPorPregunta[i - 1]?.promedio || 0 });
                }
                break;
            case "Modelo centrado en el comportamiento del docente en el aula":
                for (let i = 9; i <= 12; i++) {
                    preguntas.push({ pregunta: `Pregunta ${i}`, promedio: promediosPorPregunta[i - 1]?.promedio || 0 });
                }
                break;
            case "Modelo de la práctica reflexiva":
                for (let i = 13; i <= 16; i++) {
                    preguntas.push({ pregunta: `Pregunta ${i}`, promedio: promediosPorPregunta[i - 1]?.promedio || 0 });
                }
                break;
            case "Modelo centrado en la Identidad Politécnica":
                for (let i = 17; i <= 20; i++) {
                    preguntas.push({ pregunta: `Pregunta ${i}`, promedio: promediosPorPregunta[i - 1]?.promedio || 0 });
                }
                break;
            default:
                break;
        }
        return preguntas;
    };

    const getDatosPromedioPorModelo = () => {
        return Object.keys(promediosPorModelo).map(modelo => ({
            modelo,
            promedio: promediosPorModelo[modelo]
        }));
    };

    return (
        <div>
            <div className="main-row">
                <div className="main-item">
                    <h3>Promedios por Pregunta</h3>
                    <ResponsiveContainer>
                        <LineChart data={promediosPorPregunta} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="pregunta" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="promedio" stroke="rgb(117, 40, 68)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="main-item">
                    <h3>Promedio por Modelo</h3>
                    <ResponsiveContainer>
                        <BarChart data={getDatosPromedioPorModelo()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="modelo" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="promedio" fill="rgb(117, 40, 68)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="secondary-row">
                {Object.keys(promediosPorModelo).map((modelo, index) => (
                    <div key={index} className="secondary-item">
                        <h3>{modelo}</h3>
                        <ResponsiveContainer>
                            <BarChart
                                data={getRespuestasPorModelo(modelo)}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="pregunta" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="promedio" fill="rgb(117, 40, 68)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ))}
                <div className="button-container">
                    <Link to="/preguntas" className="mt-4">
                        <Button className="bg-[rgb(117,40,68)] text-white hover:bg-[rgb(97,30,48)]">
                            Ver preguntas
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                
            </div>
            <style jsx>{`
                .main-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .main-item {
                    width: 100%;
                    height: 400px;
                }

                .secondary-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 20px;
                }

                .secondary-item {
                    width: 100%;
                    height: 400px;
                }
                
                .button-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px; /* Espacio entre el último gráfico y el botón */
                }

                .custom-button {
                    padding: 10px 20px;
                    font-size: 16px;
                    background-color: rgb(117,40,68);
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    hover: bg-color: rgb(97,30,48);
                }

                @media (max-width: 768px) {
                    .main-row {
                        grid-template-columns: 1fr;
                    }

                    .secondary-row {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default VisualizarRespuestas;
