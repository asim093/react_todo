import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../config/firebaseConfig.js";

const Signup = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
const navigate = useNavigate();
    function postdata(e) {
        e.preventDefault();

        const auth = getAuth();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("User created successfully!");
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                alert("Error creating user: " + error.message);
            });
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Create an Account</h2>
                <form className="signup-form" onSubmit={postdata}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" ref={nameRef} placeholder="Choose a username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" ref={emailRef} placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" ref={passwordRef} placeholder="Create a password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" ref={confirmPasswordRef} placeholder="Confirm your password" required />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <div className="footer">
                    <p>Already have an account? <Link to='/'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
