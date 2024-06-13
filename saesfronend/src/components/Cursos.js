import { useContext } from 'react';
import MyNav from './MyNav';
import './MyNav.css';
import { AuthContext } from '../AuthContext';
import { CursosAlumno } from './CursosAlumno';
import { CursosDocente } from './CursosDocente';

function Cursos() {

    const { user } = useContext(AuthContext);

    if (user.tipo === 'docente') {
        return (
            <div>
                <MyNav />
                <CursosDocente />
            </div>
        );
    } else if (user.tipo === 'alumno') {
        return (
            <div>
                <MyNav />
                <CursosAlumno />
            </div>
        );
    } else {
        window.location.href = '/login';
    }
}

export default Cursos;
