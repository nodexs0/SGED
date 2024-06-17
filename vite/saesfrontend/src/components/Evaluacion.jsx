import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';
import EvaluacionAlumno from './EvaluacionAlumno';
import EvaluacionDocente from './EvaluacionDocente';

const Evaluacion = () => {
    
    const { user, IsAlumno, IsDocente } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
    }

    if(IsDocente()){
        return (
            <div>
                <EvaluacionDocente />
            </div>
        )
    } else if(IsAlumno()){
        return (
            <EvaluacionAlumno />
        )
    }
    
}

export default Evaluacion