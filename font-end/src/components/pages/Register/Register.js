import React, { useRef, useState } from "react"
import { Link } from 'react-router-dom';
import classes from "./Register.module.css"
import { signUp } from "../../../api/userApi";

const Register = () =>{
    const emailInputRef = useRef();
    const nameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const submitHandler = async (event) => {
        event.preventDefault();
        if(passwordInputRef.current.value !== confirmPasswordInputRef.current.value){
          setError('Mật khẩu xác thực không khớp!');
        } else {
          try {
            await signUp(emailInputRef.current.value, passwordInputRef.current.value, nameInputRef.current.value);
            emailInputRef.current.value = '';
            nameInputRef.current.value = '';
            passwordInputRef.current.value = '';
            confirmPasswordInputRef.current.value = '';
            setError('');
            setIsSuccess(true);
          } catch (error) {
            setError(error.response.data);
          }
        }
    }

    return (
      <div className={classes.container}>
        <div className={classes.background_image}></div>
        <section className={classes.auth}>
          <h1 className={classes.title}>Register</h1>
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
              <label htmlFor='email'>Họ và tên</label>
              <input 
                type='name' 
                id='name' 
                required 
                ref={nameInputRef} 
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
            <div className={classes.control}>
              <label htmlFor='confirmPassword'>Xác nhận mật khẩu</label>
              <input 
                type='password' 
                id='confirmPassword' 
                required 
                ref={confirmPasswordInputRef} 
              />
            </div>
            {error && <p className={classes.error}> Lỗi: {error}</p>}
            {isSuccess && <p className="text-success"> Đăng ký thành công </p>}
            <div className={classes.actions}>
              <button
                type='submit'
                className={classes.button}
              >
                Xác nhận đăng ký
              </button>
              <Link
                className={classes.button_login}
                to="/"
              >
                Quay về
              </Link>
            </div>
          </form>
        </section>
      </div>
    );
}
export default Register;