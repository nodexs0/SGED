import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import Home from './Home';

const SheetLogin = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para manejar el error

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar el error antes de intentar iniciar sesión
    try {
      await login(username, password);
      navigate('/');
    } catch (error) {
      setError(error.message); // Actualizar el estado de error
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <Home />
      <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Inicio de Sesión</SheetTitle>
          <SheetDescription>
            Introduce tus credenciales a continuación para iniciar sesión.
          </SheetDescription>
        </SheetHeader>
        {error && <div style={{ color: 'rgb(117, 40, 68)', fontWeight: 'bold' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Usuario
              </Label>
              <Input
                id="username"
                className="col-span-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <button type="submit">Iniciar Sesión</button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
    </div>
  );
};

export default SheetLogin;
