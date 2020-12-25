import TEMLogo from './Shared/img/logo_small.png'
import { Navbar, Nav } from 'react-bootstrap'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from '@reach/router'
import './App.css';
import { Text } from 'rebass';


export default function nav(props) {
    return (
      <Navbar>
        <Navbar.Brand><Link to='/'><img src={TEMLogo} alt='' /></Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
              <Nav.Link><Link to='/'><Text color='black' fontWeight='bold' fontSize={[2, 3, 4]}>Home</Text></Link></Nav.Link>
              <Nav.Link><Link to='/demo/'><Text color='black' fontWeight='bold' fontSize={[2, 3, 4]}>Demo</Text></Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }