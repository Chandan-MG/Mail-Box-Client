import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Button } from 'react-bootstrap';
import './SideNav.css'; // Import your custom CSS file for styling
import {useSelector} from 'react-redux';

const SideNav = () => {

  const inboxCount = useSelector(state => state.inbox.inboxCount);
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
          <Nav.Link href="inbox" className="nav-item">Inbox <span className="inbox-count">{inboxCount}</span></Nav.Link>
          <Nav.Link href="sentbox" className="nav-item">Sent</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SideNav;
