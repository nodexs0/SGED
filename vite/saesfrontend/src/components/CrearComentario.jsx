import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CrearComentario = () => {
    const { cursoId } = useParams();
    const [comentario, setComentario] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/comentario/create/', { comentario, cursoId });
            if (response.data.mensaje === 'Ok') {
                alert('Comentario enviado correctamente');
                setComentario(''); // Clear the textarea after successful submission
            } else {
                alert('Hubo un error al enviar el comentario');
            }
        } catch (error) {
            alert('Hubo un error al enviar el comentario');
        }
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="comentario">Comentario</label>
                    <textarea 
                        className="form-control" 
                        id="comentario" 
                        rows="3" 
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
};

export default CrearComentario;