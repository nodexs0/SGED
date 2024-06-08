import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Suponiendo que tengas un contexto de autenticación
import Home from './components/Home';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';
import PrivateComponent from './components/PrivateComponent';

function App() {
  return (
    <AuthProvider> {/* Proveedor de contexto de autenticación */}
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path='/private' element={<PrivateComponent />} /> {/* Ruta protegida */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
