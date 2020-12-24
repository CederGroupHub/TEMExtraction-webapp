import TEMLogo from './Shared/img/logo_small.png'
import { Navbar, Nav } from 'react-bootstrap'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from '@reach/router'
import './App.css';


export default function nav(props) {
    return (
      <Navbar>
        <Navbar.Brand><Link to='/'><img src={TEMLogo} alt='' /></Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
              <Nav.Link><Link to='/'>Home</Link></Nav.Link>
              <Nav.Link><Link to='/demo/'>Demo</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }