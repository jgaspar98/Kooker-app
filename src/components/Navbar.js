import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../api';
import './Navbar.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'

function SuperNavbar({ loggedInUser, setCurrentUser, history}) {
    
    const logoutUser = () => {
        logout().then(() => {
            setCurrentUser(null);
            history.push('/')
        })
    }

    return loggedInUser ? (
        <div>
            <Nav className="justify-content-end" activeKey="/home">
                <Navbar.Brand  href="/">
                    <img
                        src="/kooker_logo.png"
                        width="100"
                        height="100"
                        alt="React Bootstrap logo"
                        />
                </Navbar.Brand>
                <Nav.Item>
                <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href='/user/profile'>My Recipes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href='/recipe/create'>Add Recipe</Nav.Link>
                </Nav.Item>
            </Nav>
            <p className="Wellcome"> Welcome {loggedInUser.username} </p>
        </div>
    ) : (
        <div>
            <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="/login/google">Login With Google</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="/signup">Signup</Nav.Link>
                </Nav.Item>
            </Nav>
        </div> 
    )
}

export default SuperNavbar