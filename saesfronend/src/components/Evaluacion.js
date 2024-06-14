import { useContext } from 'react';
import MyNav from './MyNav';
import './MyNav.css';
import { AuthContext } from '../AuthContext';
import EvaluacionesAlumno from './EvaluacionesAlumno';
import { EvaluacionesDocente } from './EvaluacionesDocente';

export const Evaluacion = () => {
    const { user } = useContext(AuthContext);

    if (user.tipo === 'docente') {
        return (
        <div>
            <MyNav />
            <EvaluacionesDocente />
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
