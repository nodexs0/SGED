// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MyNavigationMenu from './components/NavigationMenu';
import SheetLogin from './components/SheetLogin';
import LogoutAction from './components/LogoutAction';
import Evaluacion from './components/Evaluacion';
import PreguntasForm from './components/PreguntasForm';
import VisualizarRespuestas from './components/VisualizarRespuestas';
import Comentario from './components/Comentario';
import CrearComentario from './components/CrearComentario';
import VisualizarComentarios from './components/VisualizarComentarios';
import VisualizarPreguntas from './components/VisualizarPreguntas';

function App() {
  return (
    <Router>
      <MyNavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SheetLogin />} />
        <Route path="/logout" element={<LogoutAction />} />
        <Route path="/evaluacion" element={<Evaluacion />} />
        <Route path="/evaluacion/:evaluacionId" element={<PreguntasForm />} />
        <Route path='/evaluacion/docentes/:cursoId' element={<VisualizarRespuestas />} />
        <Route path="/comentario" element={<Comentario />} />
        <Route path='/comentarios/create/:cursoId' element={<CrearComentario />} />
        <Route path='/comentarios/docente/:cursoId' element={<VisualizarComentarios />} />
        <Route path='/preguntas' element={<VisualizarPreguntas />} />
      </Routes>
    </Router>
  );
}

export default App;
