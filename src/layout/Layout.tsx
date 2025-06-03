import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens)
    navigate('/login');
  };

  return (
    <>
      <NavBar onLogout={handleLogout} />
      <Container fluid>
        <Row>
          <Col xs="auto" className="p-0">
            <SideBar />
          </Col>
          <Col className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
