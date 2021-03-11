import React,{useEffect, useState, useRef} from 'react'
import axios from 'axios';
import SearchedRecipe from './SearchedRecipe';
import './RecipeSearch.css';
import {Button} from 'react-bootstrap'

function RecipeSearch() {
    const APP_ID = process.env.REACT_APP_API_EDAMAN_ID;
    const APP_KEY = process.env.REACT_APP_API_EDAMAN_KEY;
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken')
    const isMountedRef = useRef(null);
    useEffect(() => {
        isMountedRef.current = true;
        axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
            .then((response) => {
                if (isMountedRef.current) {
                    setRecipes(response.data.hits);
                }
            }).catch(err => console.log(err));
        
            return () => isMountedRef.current = false;
    }, [query, APP_ID, APP_KEY]);


    const handleChange = (event) => {
        setSearch(event.target.value)

    };

    const handleSearch = (event) => {
        event.preventDefault();
        setQuery(search);
       
    }

    return (
        <div className='search_page'>
            <form onSubmit={handleSearch} className='search-form'>
                <input className='search-bar' type='text' value={search} onChange={ handleChange}/>
                <Button variant="warning" className='search-button' type='submit'>Search</Button>
            </form>
            <div className='recipes'>
                {recipes.map((recipe,index) => {
                    return (
                        <SearchedRecipe key={index} title={recipe.recipe.label} url={recipe.recipe.url} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
                    )
                })}
            </div>
        </div>
    )
}

export default RecipeSearch