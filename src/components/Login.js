import React from 'react';
import { login } from '../api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login({history, setCurrentUser}) {
    const username = React.useRef();
    const password = React.useRef();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        login(username.current.value, password.current.value).then((response) => {
            setCurrentUser(response.data);
            toast.success('Login Successful')
            history.push('/')
        }).catch(() => {
            toast.error('Invalid Login')
        })
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}> 
                <label>Username</label>
                <input type='text' ref={username} />
                
                <label>Password</label>
                <input type='password' ref={password} />
                
                <button type='submit'>Login</button>
            </form>
            <p>
                Don't have an account?
                <Link to='/signup'>Signup</Link>
            </p>
        </>
    )
}

export default Login;