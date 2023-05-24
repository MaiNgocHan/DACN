import React, { useRef, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import classes from "./Login.module.css"
import { login } from "../../../api/userApi";

const Login = () =>{
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
          const res = await login(emailInputRef.current.value, passwordInputRef.current.value);
          if(res.data){
            localStorage.setItem('access-token', res.data.accessToken);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/home');
          }
        } catch (error) {
          setError(error.response.data);
        }
       
    }

    return (
      <div className={classes.container}>
        <div className={classes.background_image}></div>
        <section className={classes.auth}>
          <h1 className={classes.title}>Login</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor='email'>Email</label>
              <input 
                type='email' 
                id='email' 
                required 
                ref={emailInputRef} 
              />
            </div>
            <div className={classes.control}>
              <label htmlFor='password'>Mật khẩu</label>
              <input 
                type='password' 
                id='password' 
                required 
                ref={passwordInputRef} 
              />
            </div>
            <p className={classes.error}>{error ? `Lỗi: ${error}` : ''}</p>
            <div className={classes.actions}>
              <Link
                className={classes.button_regis}
                to="/register"
              >
                Đăng ký
              </Link>
              <button
                type='submit'
                className={classes.button}
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </section>
      </div>
    );
}
export default Login;