import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../api';

function Signup({setCurrentUser, history}) {
    const username = React.useRef();
    const password = React.useRef();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        signup(username.current.value, password.current.value).then((response) => {
            setCurrentUser(response.data);
            history.push('/');
        })
    }

    return (
        <div>
                <form onSubmit={handleFormSubmit}>
                    <label>Username:</label>
                <input type="text" ref={username}/>
                    <label>Password:</label>
                    <input type="password" ref={password} />
                    <button>Signup</button>
                </form>
                <p>Already have account? 
                    <Link to={"/login"}> Login</Link>
                </p>
          </div>
        
    )
}

export default Signup;