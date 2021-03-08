import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../api';

function Navbar({ loggedInUser, setCurrentUser }) {
    
    const logoutUser = () => {
        logout().then(() => {
            setCurrentUser(null);
        })
    }

    return loggedInUser ? (
        <>
             <p> Welcome {loggedInUser.username} </p>
            <ul>
                <li>
                    <NavLink to='/'>
                        <button onClick={logoutUser}>Logout</button>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeStyle={{ color: 'red'}} exact to={'/user/profile'}>
                        My Recipes
                    </NavLink>
                </li>
                <li>
                    <NavLink activeStyle={{ color: 'red'}} exact to={'/recipe/create'}>
                        Add Recipe
                    </NavLink>
                </li>
            </ul>
        </>
    ) : (
        <>
        <ul>
            <li>
                <NavLink activeStyle={{ color: 'red'}} exact to={'/login'}>
                    Login
                </NavLink>
                </li>
                <li>
                <NavLink activeStyle={{ color: 'red'}} exact to={'/login/google'}>
                    Login With Google
                </NavLink>
            </li>
            <li>
                <NavLink activeStyle={{ color: 'red'}} exact to={'/signup'}>
                    Signup
                </NavLink>
            </li>
        </ul>
        </> 
    )
}

export default Navbar