import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const [user, setUser] = useState(getInitialUser());
    const navigate = useNavigate();

    function getInitialUser() {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    }

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                matricula: username,
                password: password
            });

            if (response.status !== 200) {
                throw new Error('Inicio de sesión fallido');
            }

            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            window.location.reload();
            navigate('/');
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/logout/');
            localStorage.removeItem('user');
            setUser(null);
            window.location.reload();
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            navigate('/');
        }
    };

    const IsDocente = () => {
        return user && user.tipo === 'docente';
    };

    const IsAlumno = () => {
        return user && user.tipo === 'alumno';
    };

    return { login, logout, user, IsDocente, IsAlumno };
}
