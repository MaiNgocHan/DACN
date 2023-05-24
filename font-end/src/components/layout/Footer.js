import React from "react";
import { Container, Navbar } from "react-bootstrap";

import classes from './Footer.module.css';
import logo from '../assets/image/logo.png';
const Footer = () => {
  return (
    <div className={classes.footer + ' mt-4'}>
      <Container className="d-flex align-items-center">
      <Navbar.Brand href="/home"><img src={logo} width='100' alt="logo"/></Navbar.Brand>

        <p className="ms-auto">Mọi thông tin liên hệ: admin@gmail.com</p>
      </Container>
    </div>
  );
};

export default Footer;