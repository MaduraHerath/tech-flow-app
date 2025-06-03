import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

interface NavBarProps {
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLogout }) => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container fluid>
      <Navbar.Brand href="/">MyApp</Navbar.Brand>
      <Button variant="outline-light" onClick={onLogout}>
        Logout
      </Button>
    </Container>
  </Navbar>
);

export default NavBar;
