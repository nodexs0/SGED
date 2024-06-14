import React , { useContext } from 'react';
import { Nav } from 'rsuite';
import { AuthContext } from '../AuthContext';

// const MyNav = () => (

//   cont { user, IsDocente, IsAlumno } = useContext(AuthContext);
// );

  
const MyNav = () => {

  const { user } = useContext(AuthContext);

  const navItems = [
    { label: 'Home', href: '/'}
  ];
  
  if (user) {
    navItems.push(
      { label: 'Evaluaciones', href: '/evaluaciones'}
    );
    navItems.push(
      { label: 'Comentarios', href: '/comentarios'}
    );
    navItems.push(
      { label: 'Logout', href: '/logout'}
    );
  } else {
    navItems.push(
      { label: 'Login', href: '/login'}
    );
  }
  return (
    <Nav justified defaultActiveKey="Home">
      {navItems.map((item, index) => (
          <Nav.Item key={index} href={item.href}>
            {item.label}
          </Nav.Item>
        ))}
    </Nav>
  )
}

export default MyNav;

