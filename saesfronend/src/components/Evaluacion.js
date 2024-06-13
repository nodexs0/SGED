import { useContext } from 'react';
import MyNav from './MyNav';
import './MyNav.css';
import { AuthContext } from '../AuthContext';
import EvaluacionesAlumno from './EvaluacionesAlumno';

export const Evaluacion = () => {
    const { user } = useContext(AuthContext);

    if (user.tipo === 'docente') {
        return (
        <div>
            <MyNav />
            <h2>Esta es la vista de la evaluación para docentes</h2>
        </div>
        );
    } else if (user.tipo === 'alumno') {
        return (
        <div>
            <MyNav />
            <EvaluacionesAlumno />
            </div>
        );
    }
}
