// Navbar.js
import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import suitmedia from "../assets/image/logo-suitmedia.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../style/navbar.css"; // Custom styling

const AppNavbar = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset;
    setScrollDirection(currentScrollTop > lastScrollTop ? "down" : "up");
    setLastScrollTop(currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <Navbar expand="lg" fixed="top" className={`custom-navbar ${scrollDirection === "down" ? "hidden" : ""}`}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">
            <img src={suitmedia} width="100" className="d-inline-block align-top" alt="React Bootstrap logo" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/work">
              <Nav.Link as={Link}>Work</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link as={Link}>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/services">
              <Nav.Link as={Link}>Services</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ideas">
              <Nav.Link as={Link}>Ideas</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/careers">
              <Nav.Link as={Link}>Careers</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link as={Link}>Contact</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
