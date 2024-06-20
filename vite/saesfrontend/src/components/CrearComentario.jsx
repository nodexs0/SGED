import * as React from "react";
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

function CrearComentarioCard() {
  const { cursoId } = useParams();
  const [comentario, setComentario] = useState('');
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/comentario/create/', { comentario, cursoId });
      if (response.data.mensaje === 'Ok') {
        alert('Comentario enviado correctamente');
        setComentario(''); // Clear the textarea after successful submission
        navigate(-1); // Navigate back to the previous page
      } else {
        alert('Hubo un error al enviar el comentario');
      }
    } catch (error) {
      alert('Hubo un error al enviar el comentario');
    }
  };

  const cancelSubmit = () => {
    navigate(-1); // Navigate back to the previous page
  }
  return (
    <div className="flex items-center justify-center h-full ">
      <Card className="w-[350px] bg-white shadow-lg rounded-lg">
        <CardHeader className="bg-rgb-117-40-68">
          <CardTitle>Crear Comentario</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1.5">
              <Textarea
                id="comentario"
                placeholder="Escribe tu comentario aquí"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                className="border border-rgb-117-40-68 rounded-lg p-2" // Bordes y fondo del textarea con color base
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between bg-gray-50 p-4 rounded-b-lg"> {/* Fondo gris claro, padding y bordes inferiores redondeados */}
          <Button variant="outline" className="text-rgb-117-40-68" onClick={cancelSubmit}>Cancelar</Button> {/* Texto del botón con color base */}
          <div className="w-4"></div> {/* Espacio separador entre botones */}
          <Button onClick={handleSubmit} className="mt-4 bg-[rgb(117,40,68)] text-white hover:bg-[rgb(97,30,48)]">Enviar</Button> {/* Fondo del botón con color base y efecto hover */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default CrearComentarioCard;
