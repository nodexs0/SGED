import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'; // Ajusta la ruta según tu proyecto

const VisualizarComentarios = () => {
    const [comentarios, setComentarios] = useState([]);
    const { cursoId } = useParams();

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const response = await axios.post('http://localhost:8000/comentarios/curso/', { cursoId: cursoId });
                setComentarios(response.data);
            } catch (error) {
                console.error('Error al obtener los comentarios:', error);
            }
        };

        fetchComentarios();
    }, [cursoId]);

    return (
        <div className="container">
            <h2 className="my-4">Comentarios del curso {cursoId}</h2>
            <div className="row">
                {comentarios.map(comentario => (
                    <div key={comentario.id} className="col-md-6 mb-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>{`Comentario ${comentario.id}`}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{comentario.comentario}</CardDescription>
                                {/* Si deseas agregar más detalles del comentario, puedes hacerlo aquí */}
                            </CardContent>
                            {/* Puedes agregar un footer opcional si lo necesitas */}
                            {/* <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter> */}
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VisualizarComentarios;
