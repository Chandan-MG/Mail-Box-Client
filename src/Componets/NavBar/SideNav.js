import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Button } from 'react-bootstrap';
import './SideNav.css'; // Import your custom CSS file for styling

const SideNav = () => {
  const history = useHistory();
  const composeHandler = () => {
    history.replace('/mailbox');
  };

  return (
    <Navbar bg="light" expand="lg" className="flex-column side-nav">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column nav">
          <Button onClick={composeHandler} className="nav-item">Compose</Button>
          <Nav.Link href="inbox" className="nav-item">Inbox</Nav.Link>
          <Nav.Link href="link" className="nav-item">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SideNav;
