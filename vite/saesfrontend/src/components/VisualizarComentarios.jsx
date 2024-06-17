import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const VisualizarComentarios = () => {
    
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

export default VisualizarComentarios