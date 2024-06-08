import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/?format=json');
                console.log('Datos obtenidos:', response.data); // Para depuración
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setError(error);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error al cargar los datos: {error.message}</div>;
    }

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {data.length === 0 ? (
                    <p>No hay datos disponibles.</p>
                ) : (
                    data.map(user => (
                        <li key={user.matricula}>
                            Matrícula: {user.matricula}, Activo: {user.is_active ? 'Sí' : 'No'}, Staff: {user.is_staff ? 'Sí' : 'No'}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default MyComponent;
