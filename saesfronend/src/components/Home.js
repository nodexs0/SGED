import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import DocenteHome from './DocenteHome';
import AlumnoHome from './AlumnoHome';
import MyNav from './MyNav'; // Importa el componente Nav
import './MyNav.css';

function Home() {
    const { user, IsDocente, IsAlumno } = useContext(AuthContext);

    if (user) {
        if (IsDocente()) {
            return (
                <div>
                    <MyNav />
                    <DocenteHome />
                </div>
            
            );
        } else if (IsAlumno()) {
            return (
                <div>
                    <MyNav />
                    <AlumnoHome />
                </div>
            );
        }
    }

    return (
        <div>
            <MyNav />
            <h1>Home</h1>
            {user && <p>Bienvenido, {user.matricula}, {user.tipo}</p>}
        </div>
    );
}

export default Home;
