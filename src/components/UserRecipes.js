import React from 'react';
import { deleteRecipe, getAllRecipes, getAllRecipesForUser } from '../api';
import { toast } from 'react-toastify';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './UserRecipes.css';

function UserRecipes({loggedInUser}) {
    const [userRecipes, setUserRecipes] = React.useState([]);

    React.useEffect(() => {
        getAllRecipesForUser().then((response) => {
            setUserRecipes(response.data) 
        })
    },[])
        
    const handleDeleteRecipe = (id) => {
        deleteRecipe(id).then(() => {
            toast.error('Recipe Deleted!')
            getAllRecipesForUser().then((response) => {
                setUserRecipes(response.data) 
            })
        })
    }

    return (
        <>
             <Nav className="justify-content-center" activeKey="/home">
                <Navbar.Brand  href="/">
                    <img
                        src="/kooker_logo.png"
                        width="100"
                        height="100"
                        alt="React Bootstrap logo"
                        />
                </Navbar.Brand>
                <Nav.Item>
                <Nav.Link href='/recipe/create'>Create Recipe</Nav.Link>
                </Nav.Item>
            </Nav>
            <h1 className='title'>User created recipes</h1>
            <div className='recipe' >
            <ul className='recipes'>
                {userRecipes.map((recipe) => {
                    return (
                        <li key={recipe._id}>
                            <Card>
                                <Card.Img variant="top" src={recipe.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{recipe.name}</Card.Title>
                                    <Button variant="primary" href={`/recipes/${recipe._id}`}>Details</Button>
                                    <Button onClick={() => { handleDeleteRecipe(recipe._id) }}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </li>
                    )
                })}
                </ul>
            </div>
        </>
    )
}

export default UserRecipes;
