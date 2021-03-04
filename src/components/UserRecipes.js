import React from 'react';
import { getAllRecipes } from '../api';
import { Link } from 'react-router-dom';

class UserRecipes extends React.Component{
    state = {
        userRecipes : []
    }

    componentDidMount() {
        getAllRecipes().then((response) => {
            this.setState({
                userRecipes: response.data
            })
        })
    }

    render() {
        const { userRecipes } = this.state;
        return (
            <>
                <h1>User created recipes</h1>
                <ul>
                    {userRecipes.map((recipe) => {
                        return (
                            <li key={recipe._id}>
                                <Link to={`/recipes/${recipe._id}`}>{recipe.name} <img src={recipe.imageUrl}/></Link>
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default UserRecipes;
