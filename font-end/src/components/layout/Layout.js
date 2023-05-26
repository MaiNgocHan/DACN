import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import classes from "./Layout.module.css";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Layout = ({ props, children }) => {
  const navigate = useNavigate();
  const handlerBack = () =>{
    navigate(-1);
  };

  return (
    <div>
      <Header type={props?.type}/>

      <div className={classes.container1}>
        <Container className={classes.container}>
          {(props?.type === 'detail') && <Button className="my-3" variant="success" onClick={handlerBack}> Quay lại</Button>}
          <div>{children}</div>
        </Container>
      </div>
      
      {!(props?.footer === false) && !(props?.type === 'admin') && <Footer />}
    </div>
  );
};

export default Layout;