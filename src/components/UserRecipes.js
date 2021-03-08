import React from 'react';
import { deleteRecipe, getAllRecipes } from '../api';
import { Link } from 'react-router-dom';

function UserRecipes() {
    const [userRecipes, setUserRecipes] = React.useState([]);

    React.useEffect(() => {
        getAllRecipes().then((response) => {
            setUserRecipes(response.data) 
        })
    },[])
        
    const handleDeleteRecipe = (id) => {
        deleteRecipe(id).then(() => {
            getAllRecipes().then((response) => {
                setUserRecipes(response.data)
            })
        })
    }

    return (
        <>
            <h1>User created recipes</h1>
            <ul>
                {userRecipes.map((recipe) => {
                    return (
                        <li key={recipe._id}>
                            <Link to={`/recipes/${recipe._id}`}>{recipe.name} <img src={recipe.imageUrl} alt='meal' /></Link>
                            <button onClick={()=>{handleDeleteRecipe(recipe._id)}}>Delete</button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default UserRecipes;
