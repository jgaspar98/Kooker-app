import React from 'react';

function SearchedRecipe({title,url,image}) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{url}</p>
            <img src={image} alt="" />
        </div>
    );
};



export default SearchedRecipe