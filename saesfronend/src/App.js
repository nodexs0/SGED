// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import LogoutAction from './components/LogoutAction';
import Cursos from './components/Cursos';
import { Evaluacion } from './components/Evaluacion';
import { FormPreguntas } from './components/FormPreguntas';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogoutAction />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/evaluaciones" element={<Evaluacion />} />
          <Route path="/evaluaciones/:evaluacionId" element={<FormPreguntas />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
