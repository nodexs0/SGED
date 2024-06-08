import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext'; // Asegúrate de importar el contexto de autenticación

function Home() {
    // Acceder al contexto de autenticación
    const { user } = useContext(AuthContext);
    console.log('Datos del usuario:', user);
    return (
        <div>
            <h1>Home</h1>
            <p>Bienvenido a la página de inicio.</p>
            {user && ( // Verificar si el usuario está autenticado
                <p>Tu matrícula es: {user.matricula}</p> // Mostrar la matrícula si está autenticado
            )}
        </div>
    );
}

export default Home;
