import React from 'react';
import { getRecipe } from '../api';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './UserRecipeDetails.css';
import Button from 'react-bootstrap/Button'

function UserRecipeDetails({match, history}){
    const [recipe, setRecipe] = React.useState({
        id: '',
        name: '',
        directions: '',
        imageUrl: '',
        ingredients: '',
        notes: '',
        preparation_time: '',
        cook_time: ''
    })
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        const recipeId = match.params.id;
        getRecipe(recipeId).then((response) => {
            setRecipe(response.data)
            setLoaded(true)
        })
    }, [match.params.id])
    

        return loaded ? (
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
                <Nav.Link href='/user/profile'>My Recipes</Nav.Link>
                </Nav.Item>
                </Nav>
                <div className='info'>
                <h1 className='title-recipe'>{recipe.name}</h1>
                <img className='recipe-image' src={recipe.imageUrl} alt='meal'/>
                <p><strong>Directions:</strong> {recipe.directions}</p>
                <strong>Ingredients: </strong>
                <ol className='ingredients'>
                    {recipe.ingredients.map((ingredient, index) => {
                        return (
                                <li key={index}>
                                    {ingredient}
                                </li>
                            )
                        })
                    }
                </ol>
                <p><strong>Notes: </strong> {recipe.notes}</p>
                <p><strong>Preparation Time: </strong> {recipe.preparation_time}</p>
                <p><strong>Cook Time: </strong>{recipe.cook_time}</p>
                    <Button onClick={() => { history.push(`/recipes/${recipe._id}/edit`) }}>Edit Recipe</Button>
                </div>
            </>
        ) : 
            <p>Loading</p>
}

export default UserRecipeDetails;
