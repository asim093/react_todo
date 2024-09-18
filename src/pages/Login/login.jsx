import React, { useRef } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const EmailRef = useRef(null);
    const PasswordRef = useRef(null);
    const navigate = useNavigate();

    function login(e){
        e.preventDefault();
        const Email = EmailRef.current.value;
        const password = PasswordRef.current.value;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, Email , password)
          .then((userCredential) => {
            const user = userCredential.user;
            alert('User Login Successfully');
            navigate('/home');
          })
          .catch((error) => {
            alert(error.message)
          });
    }


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back!</h2>
        <form className="login-form" onSubmit={login}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input type="text" id="username" ref={EmailRef} placeholder="Enter your Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={PasswordRef} placeholder="Enter your password" required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="footer">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
