// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';
import PrivateComponent from './components/PrivateComponent';
import AlumnoHome from './components/AlumnoHome'; // Importación correcta
import DocenteHome from './components/DocenteHome'; // Importación correcta

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/private" element={<PrivateComponent />} />
          <Route path="/student-home" element={<AlumnoHome />} />
          <Route path="/teacher-home" element={<DocenteHome />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
