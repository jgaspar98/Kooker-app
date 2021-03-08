import React,{useEffect, useState} from 'react'
import axios from 'axios';
import SearchedRecipe from './SearchedRecipe';

function RecipeSearch() {
    const APP_ID = process.env.REACT_APP_API_EDAMAN_ID;
    const APP_KEY = process.env.REACT_APP_API_EDAMAN_KEY;
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query,setQuery] = useState('chicken')

    useEffect(() => {
        axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
            .then((response) => {
                setRecipes(response.data.hits);
                console.log(response.data.hits);
                
            }).catch(err => console.log(err));
    }, [query]);

    const handleChange = (event) => {
        setSearch(event.target.value)
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setQuery(search);
        setSearch('');
    }

    return (
        <div>
            <form onSubmit={handleSearch} className='search-form'>
                <input className='search-bar' type='text' value={search} onChange={ handleChange}/>
                <button className='search-button' type='submit'>Search</button>
            </form>
            {recipes.map((recipe,index) => {
                return (
                    <SearchedRecipe key={index} title={recipe.recipe.label} url={recipe.recipe.url} image={recipe.recipe.image}/>
                )
            })}
        </div>
        
    )
}

export default RecipeSearch