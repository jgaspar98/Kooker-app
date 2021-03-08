import React from 'react';
import { Link } from 'react-router-dom';
import { deleteRecipe, getRecipe } from '../api';

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

    const handleDeleteRecipe = (id) => {
        deleteRecipe(id).then(() => {
            history.push('/');
        });
    }

        return loaded ? (
            <>
                <h1>{recipe.name}</h1>
                <img src={recipe.imageUrl} alt='meal'/>
                <p>Directions: {recipe.directions}</p>
                <strong>Ingredients: </strong>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => {
                            return (
                                <li key={index}>
                                    {ingredient}
                                </li>
                            )
                        })
                    }
                </ul>
                <p>Notes: {recipe.notes}</p>
                <p>Preparation Time: {recipe.preparation_time}</p>
                <p>Cook Time: {recipe.cook_time}</p>
                <button onClick={() =>{history.push(`/recipes/${recipe._id}/edit`)}}>Edit Project</button>
                <Link to='/user/profile'>Back</Link>
            </>
        ) : 
            <p>Loading</p>
}

export default UserRecipeDetails;
