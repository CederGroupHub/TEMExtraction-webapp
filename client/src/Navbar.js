import { Navbar, Nav } from 'react-bootstrap'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from '@reach/router'
import './App.css';
import { Text } from 'rebass';

export function Logo(size) {
  if (size === 'small') {
    return (
      <React.Fragment>
        <Text style={{display: 'inline'}} color='white' fontSize={[2, 3, 4]}>Au</Text>
        <Text style={{display: 'inline'}} color='#26b7b7' fontSize={[2, 3, 4]}>TEM</Text>
        <Text style={{display: 'inline'}} color='white' fontSize={[2, 3, 4]}>ate</Text>
      </React.Fragment>
    )
  }
  else if (size === 'large') {
    return (
      <React.Fragment>
        <Text style={{display: 'inline'}} color='white' fontWeight='bold' fontSize={[3, 4, 5]}>Au</Text>
        <Text style={{display: 'inline'}} color='#26b7b7' fontWeight='bold' fontSize={[3, 4, 5]}>TEM</Text>
        <Text style={{display: 'inline'}} color='white' fontWeight='bold' fontSize={[3, 4, 5]}>ate</Text>
      </React.Fragment>
    )
  }

}


export default function nav(props) {
    return (
      <Navbar variant='dark' bg='dark'>
        {/* <Navbar.Brand><Link to='/'><img src={TEMLogo} alt='' /></Link></Navbar.Brand> */}
        <Navbar.Brand><Link to='/'>{Logo('large')}</Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
              <Nav.Link><Link to='/'><Text color='white' fontSize={[1, 2, 3]}>Home</Text></Link></Nav.Link>
              <Nav.Link><Link to='/demo/'><Text color='white' fontSize={[1, 2, 3]}>Demo</Text></Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }