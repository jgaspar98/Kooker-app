import React from 'react';
import { Link } from 'react-router-dom';
import { deleteRecipe, getRecipe } from '../api';

class UserRecipeDetails extends React.Component{
    state = {
        id: '',
        name: '',
        directions: '',
        imageUrl: '',
        ingredients: '',
        notes: '',
        preparation_time: '',
        cook_time: '',
        loadedFromDb: false
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id;
        getRecipe(recipeId).then((response) => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                directions: response.data.directions,
                imageUrl: response.data.imageUrl,
                ingredients: response.data.ingredients,
                notes: response.data.preparation_time,
                cook_time: response.data.cook_time,
                loadedFromDb: true
            })
        })
    }

    handleDeleteProject = (id) => {
        deleteRecipe(id).then(() => {
            this.props.history.push('/user/profile');
        });
    }

    render() {
        const { loadedFromDb, id ,name, directions, imageUrl, ingredients, notes, preparation_time, cook_time } = this.state;
        return loadedFromDb ? (
            <>
                <h1>{name}</h1>
                <img src={imageUrl}/>
                <p>Directions: {directions}</p>
                <strong>Ingredients: </strong>
                <ul>
                    {ingredients.map((ingredient) => {
                            return (
                                <li key={ingredient.id}>
                                    {ingredient}
                                </li>
                            )
                        })
                    }
                </ul>
                <p>Notes: {notes}</p>
                <p>Preparation Time: {preparation_time}</p>
                <p>Cook Time: {cook_time}</p>
                <Link to='/user/profile'>Back</Link>
            </>
        ) : 
            <p>Loading</p>
    }
}

export default UserRecipeDetails;
