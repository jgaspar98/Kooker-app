import React from 'react';
import { toast } from 'react-toastify';
import { getRecipe, updateRecipe } from '../api';

function EditRecipe ({match, history}){
    const nameRef = React.useRef();
    const directionsRef = React.useRef();
    const ingredientsRef = React.useRef();
    const notesRef = React.useRef();
    const preparation_timeRef = React.useRef();
    const cook_timeRef = React.useRef();
    const [imageUrl, setImageUrl] = React.useState();
    
    React.useEffect(() =>{
        const recipeId = match.params.id;
        getRecipe(recipeId).then((response) => {
         //   idRef.current.value = response.data._id;
            nameRef.current.value = response.data.name;
            directionsRef.current.value = response.data.directions;
            setImageUrl(response.data.imageUrl);
            ingredientsRef.current.value = response.data.ingredients;
            notesRef.current.value = response.data.notes;
            cook_timeRef.current.value = response.data.cook_time;
            preparation_timeRef.current.value = response.data.preparation_time    
        })
    },[match.params.id])


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const recipeId = match.params.id;
        const newRecipe = {
            id: recipeId,
            imageUrl: imageUrl,
            name: nameRef.current.value,
            directions: directionsRef.current.value,
            ingredients: ingredientsRef.current.value,
            notes: notesRef.current.value,
            preparation_time: preparation_timeRef.current.value,
            cook_time: cook_timeRef.current.value
        }
        updateRecipe(newRecipe).then(() => {
            toast.success('Recipe updated!')
            history.push(`/recipes/${recipeId}`)
        }).catch(err => console.log(err))
    }

    const handleFileChange = (event) =>{
        setImageUrl(event.target.files[0])
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <label>Name</label>
            <input type='text' ref={nameRef} />

            <label>Directions</label>
            <input type='text' ref={directionsRef} />

            <label>Ingredients</label>
            <input type='text' ref={ingredientsRef} />

            <label>notes</label>
            <input type='text' ref={notesRef} />

            <label>Preparation Time</label>
            <input type='text' ref={preparation_timeRef} />

            <label>Cook Time</label>
            <input type='text' ref={cook_timeRef} />
            
            <label>Image</label>
            <input type='file' onChange={handleFileChange} />
            
            <button type='submit'>Update</button>
        </form>
    )

}

export default EditRecipe