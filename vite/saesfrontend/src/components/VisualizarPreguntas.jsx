import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Ajusta la ruta según tu proyecto

const VisualizarPreguntas = () => {
    const { evaluacionId } = useParams();
    const [preguntas, setPreguntas] = useState([]);
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


    const handleSubmit = async (event) => {
        event.preventDefault();
        navigate(-1); // Navega a la página anterior (ajusta según tus necesidades)
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

            {paginaActual < totalPaginas && (
                <p className="text-lg font-bold mb-4">{getInstruccionPorPagina(paginaActual)}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                {preguntas.length > 0 && (
                    preguntas
                        .slice(
                            paginaActual * preguntasPorPagina,
                            (paginaActual + 1) * preguntasPorPagina
                        )
                        .map((pregunta, index) => (
                            <div key={pregunta.id} className="space-y-4">
                                <p className="text-lg">{`Pregunta ${paginaActual * preguntasPorPagina + index + 1}: ${pregunta.texto}`}</p>
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
                <Button type="submit" className="mt-4 bg-[rgb(117,40,68)] text-white hover:bg-[rgb(97,30,48)]">
                    Regresar
                </Button>
            </form>
        </div>
    );
};

export default VisualizarPreguntas;
