import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import MyNav from './MyNav';

export const VisualizarRespuestas = () => {

    const [respuestas, setRespuestas] = useState([])
    const { cursoId } = useParams()

    useEffect(() => {
        const fetchRespuestas = async () => {
            try {
                const response = await axios.post('http://localhost:8000/respuestas/curso/', { cursoId: cursoId })
                setRespuestas(response.data)
            } catch (error) {
                console.error('Error al obtener las respuestas:', error)
            }
        }

        fetchRespuestas()
    }, [cursoId])
  return (
    <div>
      <MyNav />
      <h2>Respuestas</h2>
      <ul>
        {respuestas.map(respuesta => (
          <li key={respuesta.id}>
            <h3>Pregunta: {respuesta.pregunta}</h3>
            <p>Respuesta: {respuesta.respuesta}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
