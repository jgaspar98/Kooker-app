import React from 'react';
import { addRecipe, uploadFile } from '../api';
import { toast } from 'react-toastify';


function AddRecipe({ loggedInUser, history }) {
    const nameRef = React.useRef();
    const directionsRef = React.useRef();
    const ingredientsRef = React.useRef();
    const notesRef = React.useRef();
    const preparation_timeRef = React.useRef();
    const cook_timeRef = React.useRef();
    const [imageUrl, setImageUrl] = React.useState();

    const handleFileChange = (event) =>{
        setImageUrl(event.target.files[0])
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);

        uploadFile(uploadData).then((response) => {
            
            const newRecipe = {
                
                name: nameRef.current.value,
                directions: directionsRef.current.value,
                ingredients: ingredientsRef.current.value,
                imageUrl:response.data.fileUrl,
                notes: notesRef.current.value,
                preparation_time: preparation_timeRef.current.value,
                cook_time: cook_timeRef.current.value
            }

            addRecipe(newRecipe).then(() => {
                toast.success('Recipe created!');
                history.push('/user/profile')
            }).catch(err => console.log(err))
        })
    }

    return (
        <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
            <label>name</label>
            <input type='text' ref={nameRef} />
            <br/>

            <label>Directions</label>
            <input type='text' ref={directionsRef}  />
            <br />
            
            <label>Ingredients</label>
            <input type='text' ref={ingredientsRef}  />
            <br />
            
            <label>notes</label>
            <input type='text' ref={notesRef}  />
            <br />
            
            <label>Preparation Time</label>
            <input type='text' ref={preparation_timeRef}  />
            <br />
            
            <label>Cook Time</label>
            <input type='text' ref={cook_timeRef} />
            <br />
            
            <label>Image</label>
            <input type='file' onChange={handleFileChange} />
            <br />
            
            <button type='submit'>Create</button>
        </form>
    )
}

export default AddRecipe;