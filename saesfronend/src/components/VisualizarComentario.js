import React from 'react'
import { useParams } from 'react-router-dom'
import MyNav from './MyNav'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const VisualizarComentario = () => {

    const [comentarios, setComentarios] = useState([])
    const { cursoId } = useParams()

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const response = await axios.post('http://localhost:8000/comentarios/curso/', { cursoId: cursoId })
                setComentarios(response.data)
            } catch (error) {
                console.error('Error al obtener los comentarios:', error)
            }
        }

        fetchComentarios()
    }, [cursoId])

  return (
    <div>
        <MyNav />
        <h2>Comentarios</h2>
        <ul>
            {comentarios.map(comentario => (
            <li key={comentario.id}>
                <h3>Comentario: {comentario.comentario}</h3>
            </li>
            ))}
        </ul>
    </div>
  )
}
