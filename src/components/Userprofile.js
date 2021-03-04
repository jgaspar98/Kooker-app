import React from 'react'
import UserRecipes from './UserRecipes';
import { Link, Route } from 'react-router-dom';
import AddRecipe from './AddRecipe';

class UserProfile extends React.Component {
    state={

    }

    render() {
        return (
            <div>
                <UserRecipes />
                <Link to={'/recipe/create'}> Create Your recipe </Link>
            </div>
        )
    }    
}

export default UserProfile;