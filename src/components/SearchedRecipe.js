import React from 'react';
import style from './recipe.module.css'
import { Button } from 'react-bootstrap'
import './SearchedRecipe.css';

function SearchedRecipe({title,url,image, ingredients}) {
    return (
        <div className={style.recipe}>
            <h1 >{title}</h1>
            <Button href={url}>More Info</Button>
            <img className='api-img' src={image} alt="" />
            <ol className='ingredients-api'>
                {ingredients.map((ingredient, index) => {
                        return (
                            <li key={index}> ) {ingredient.text}<br/></li>
                        )
                    })
                }
            </ol>
        </div>
    );
};

export default SearchedRecipe