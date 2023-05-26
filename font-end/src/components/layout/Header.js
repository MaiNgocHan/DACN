import React from "react";
import { Container, Nav, Navbar, Dropdown, NavItem, NavLink } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import logo from '../assets/image/logo.png';
import classes from './Header.module.css';
import { logout } from "../../api/userApi";

const Header = (props) => {
  const token = localStorage.getItem('access-token');
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      await logout(token);
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Navbar className={classes.navbar} expand="lg" fixed="top">
      {props?.type === 'admin' ? 
        <Container>
          <Navbar.Brand href="/home"><img src={logo} width='100' alt="logo"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/admin/news" className={classes.button}>Quản lý bài viết</Nav.Link>
              <Nav.Link href="/admin/users" className={classes.button}>Quản lý tài khoản</Nav.Link>
            </Nav>
            <Nav>
              <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink} className="text-white">{userInfo.username}</Dropdown.Toggle>
                <Dropdown.Menu variant="light" key="down-centered">
                  <Dropdown.Item href="#action/3.1">Thông tin tài khoản</Dropdown.Item>
                  {userInfo.isAdmin && <Dropdown.Item href="/admin/news">Quản lý</Dropdown.Item>}
                  <Dropdown.Item onClick={logOutHandler}>Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container> :
        <Container>
          <Navbar.Brand href="/home"><img src={logo} width='100' alt="logo"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home" className={classes.button}>Tin Tức</Nav.Link>
              <Nav.Link href="/quiz" className={classes.button}>Trắc nghiệm</Nav.Link>
              <Nav.Link href="/room" className={classes.button}>Phòng họp</Nav.Link>
            </Nav>
            <Nav>
              <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink} className="text-black">{userInfo.username}</Dropdown.Toggle>
                <Dropdown.Menu variant="light" key="down-centered" >
                  <Dropdown.Item href="#action/3.1" >Thông tin tài khoản</Dropdown.Item>
                  {userInfo.type === "admin" && <Dropdown.Item href="/admin/news" >Quản lý bài viết</Dropdown.Item>}
                  <Dropdown.Item onClick={logOutHandler} >Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      }
    </Navbar>
  )
};

export default Header;