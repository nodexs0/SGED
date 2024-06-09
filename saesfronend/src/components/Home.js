// src/components/Home.js
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import DocenteHome from './DocenteHome';
import AlumnoHome from './AlumnoHome';

function Home() {
    const { user, IsDocente, IsAlumno } = useContext(AuthContext);

    if (user) {
        if (IsDocente()) {
            return (
                <div>
                    <DocenteHome />
                </div>
            
            );
        } else if (IsAlumno()) {
            return (
                <div>
                    <AlumnoHome />
                </div>
            );
        }
    }

    return (
        <div>
            <h1>Home</h1>
            {user && <p>Bienvenido, {user.matricula}, {user.tipo}</p>}
            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;
