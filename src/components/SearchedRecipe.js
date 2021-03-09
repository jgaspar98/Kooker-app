import React from 'react';
import style from './recipe.module.css'
import { Button } from 'react-bootstrap'

function SearchedRecipe({title,url,image, ingredients}) {
    return (
        <div className={style.recipe}>
            <h1 >{title}</h1>
            <Button href={url}>More Info</Button>
            <img src={image} alt="" />
            <ol>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ol>
        </div>
    );
};



export default SearchedRecipe