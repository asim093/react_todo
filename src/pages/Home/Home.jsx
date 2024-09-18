import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    function logout() {

        const auth = getAuth();
        signOut(auth).then(() => {
            alert("Logout Successfull")
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <>
            <div className='navbar  px-5'>
                <h1 style={{ fontFamily: "sans-serif" }}>Todo App</h1> <div><button onClick={logout} className='btn btn-danger'>Logout</button>
                </div>
            </div>
            <div>Home</div>
        </>
    );
};

export default Home;
