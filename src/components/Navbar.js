import React ,{useState} from 'react';
import { logout } from '../api';
import './Navbar.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { signup, login } from '../api';

function SuperNavbar({ loggedInUser, setCurrentUser, history}) {
    const [show, setShow] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleCloseSignup = () => setShowSignup(false);
    const handleShowSignup = () => setShowSignup(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const username = React.useRef();
    const password = React.useRef();

    const logoutUser = () => {
        logout().then(() => {
            setCurrentUser(null);
            history.push('/')
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        login(username.current.value, password.current.value).then((response) => {
            setCurrentUser(response.data);
            toast.success('Login Successful')
        }).catch(() => {
            toast.error('Invalid Login')
        })
    }

    const signupFormSubmit = (event) => {
        event.preventDefault();
        signup(username.current.value, password.current.value).then(() => {
            login(username.current.value, password.current.value).then((response) => {
                setCurrentUser(response.data);
                toast.success('Signup Successful')
            })
        }).catch(() => {
            toast.error('Invalid Signup')
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
                <Modal show={showSignup} onHide={handleCloseSignup}>
                    <Modal.Header closeButton>
                    <Modal.Title>Signin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={signupFormSubmit}>
                            <label>Username:</label>
                            <input type="text" ref={username} />
                            <br/>
                            <label>Password:</label>
                            <input type="password" ref={password} />
                            <Modal.Footer>
                            <Button type='submit'>Signup</Button>
                             <Button variant="secondary" onClick={handleCloseSignup}>
                             Close
                            </Button>
                        </Modal.Footer>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleFormSubmit}>
                                <label>Username</label>
                                <input type='text' ref={username} />
                                <br/>
                                <label>Password</label>
                                <input type='password' ref={password} />
                        <Modal.Footer>
                            <Button type='submit'>Login</Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                            </form>
                        </Modal.Body>
                </Modal>

            <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                <Nav.Link onClick={handleShow}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="/login/google">Login With Google</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link onClick={handleShowSignup}>Signup</Nav.Link>
                </Nav.Item>
            </Nav>
        </div> 
    )
}

export default SuperNavbar