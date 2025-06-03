import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SideBar: React.FC = () => (
  <div className="bg-light vh-100 p-3" style={{ width: '200px' }}>
    <Nav defaultActiveKey="/" className="flex-column">
      <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
      <Nav.Link as={Link} to="/analytics">Analytics</Nav.Link>
      {/* <Nav.Link as={Link} to="/settings">Settings</Nav.Link> */}
    </Nav>
  </div>
);

export default SideBar;
