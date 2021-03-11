import React from 'react';
import { toast } from 'react-toastify';
import { getRecipe, updateRecipe } from '../api';
import './EditRecipe.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';


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
        <div>
        <Nav className="justify-content-center" activeKey="/home">
                <Navbar.Brand  href="/">
                    <img
                        src="/kooker_logo.png"
                        width="100"
                        height="100"
                        alt="React Bootstrap logo"
                        />
                </Navbar.Brand>
                <Nav.Item>
                <Nav.Link href='/user/profile'>My Recipes</Nav.Link>
                </Nav.Item>
            </Nav>
        <div className='edit-form'>
             <form onSubmit={handleFormSubmit}>
                <label className='label-edit'><strong>Name</strong></label>
                <input type='text' ref={nameRef} />
                <br/>

                <label className='label-edit'><strong>Directions</strong></label>
                <input type='text' ref={directionsRef} />
                <br/>

                <label className='label-edit'><strong>Ingredients</strong> <br/> (separate by ' , ')</label>
                <input type='text' ref={ingredientsRef} />
                <br/>

                <label className='label-edit'><strong>Notes</strong></label>
                <input type='text' ref={notesRef} />
                <br/>

                <label className='label-edit'><strong>Preparation Time</strong></label>
                <input type='text' ref={preparation_timeRef} />
                <br/>

                <label className='label-edit'><strong>Cook Time</strong></label>
                <input type='text' ref={cook_timeRef} />
                <br/>
                
                <label className='label-edit'><strong>Image</strong></label>
                <input type='file' onChange={handleFileChange} />
                <br/>
                
                <Button type='submit'>Update</Button>
            </form>
            </div>
        </div>
    )

}

export default EditRecipe