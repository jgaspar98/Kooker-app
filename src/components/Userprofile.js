import React from 'react'
import UserRecipes from './UserRecipes';
import { Link } from 'react-router-dom';

function UserProfile(params) {
    return (
        <div>
            <UserRecipes/>
            <Link to={'/recipe/create'}> Create Your recipe </Link>
        </div>
    )
} 

export default UserProfile;