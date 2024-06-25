import React, { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { useAuth } from '../auth';

import ipn from '../assets/ipn.png';
const NavigationMenuDemo = () => {
  const { user, IsAlumno, IsDocente } = useAuth();
  const [components, setComponents] = useState([]);

  useEffect(() => {
    if (user) {
      if (IsAlumno()) {
        setComponents([
          {
            title: "Evaluacion hacia Docente",
            href: "/evaluacion/",
            description: "Evalua a tus docentes.",
          },
          {
            title: "Comentarios hacia Docente",
            href: "/comentario/",
            description: "Realiza comentarios hacia tus docentes.",
          },
        ]);
      } else if (IsDocente()) {
        setComponents([
          {
            title: "Evaluaciones de los Alumnos",
            href: "/evaluacion/",
            description: "Revise las evaluaciones de sus alumnos",
          },
          {
            title: "Comentarios de los Alumnos",
            href: "/comentario/",
            description: "Revise los comentarios de sus alumnos.",
          },
        ]);
      }
    }
  }, [user, IsAlumno, IsDocente]);

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex justify-between items-center">
      <div className="flex items-center">
          <img src={ipn} alt="Logo" className="h-10 ml-4" />
        </div>
        <div className="flex">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Inicio</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[rgb(117,40,68)] to-[rgb(117,40,68)] p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium text-white">
                        IPN SAES
                      </div>
                      <p className="text-sm leading-tight text-white">
                        Sistema de Administración Escolar del Instituto Politécnico Nacional
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/login" title="Iniciar Sesion">
                  Inicia sesión en tu cuenta.
                </ListItem>
                <ListItem href="/logout" title="Cerrar Sesion">
                  Cierra sesión en tu cuenta.
                </ListItem>
                <ListItem href="/" title="Recuperar Contraseña">
                  Recupera tu contraseña.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {user && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>Evaluaciones</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <NavigationMenuLink>
              <a className="block p-3 text-[rgb(117,40,68)] hover:bg-[rgb(117,40,68)] hover:text-white rounded-md transition-colors duration-200" href="/docs">
                Ayuda
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[rgb(117,40,68)] hover:text-white focus:bg-[rgb(117,40,68)] focus:text-white ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-[rgb(117,40,68)]">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default NavigationMenuDemo;
