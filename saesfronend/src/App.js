// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import LogoutAction from './components/LogoutAction';
import Cursos from './components/Comentarios';
import { Evaluacion } from './components/Evaluacion';
import { FormPreguntas } from './components/FormPreguntas';
import { VisualizarRespuestas } from './components/VisualizarRespuestas';
import { CrearComentario } from './components/CrearComentario';
import { VisualizarComentario } from './components/VisualizarComentario';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogoutAction />} />
          <Route path="/comentarios" element={<Cursos />} />
          <Route path="/evaluaciones" element={<Evaluacion />} />
          <Route path="/evaluaciones/:evaluacionId" element={<FormPreguntas />} />
          <Route path="/evaluaciones/docentes/:cursoId" element={<VisualizarRespuestas />} />
          <Route path='/comentarios/docente/:cursoId' element={<VisualizarComentario />} />
          <Route path='/comentarios/create/:cursoId' element={<CrearComentario />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
