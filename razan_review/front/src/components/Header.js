import React, { Component } from 'react'
import {
    Navbar,
    Container,
    Nav
} from 'react-bootstrap'
export class Header extends Component {
    render() {
        return (
            <Navbar 
            bg="light" 
            variant="info" 
            style={{padding:"2rem" , fontSize:"1.5rem"}} >

            <Container>

            <Navbar.Brand style={{fontSize:"1.5rem"}} href="#home">401-ENTRANCE EXAM</Navbar.Brand>
            
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/favorite">Favorite Recipes</Nav.Link>
            </Nav>

            </Container>
          </Navbar>
        )
    }
}

export default Header
