import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
export class Header extends Component {
  render() {
    return (
      <Navbar 
      bg="light" 
      variant="info"
      style={{backgroundColor:"red" , padding:"2rem"}}>
        <Container>
          <Navbar.Brand href="#home">401_exam</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/favorite">Favorite</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
