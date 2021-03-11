import React from 'react';
import { getRecipe, updateRecipe } from '../api';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './UserRecipeDetails.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function UserRecipeDetails({match, history}){
    const [recipe, setRecipe] = React.useState({
        id: '',
        name: '',
        directions: '',
        imageUrl: '',
        ingredients: '',
        notes: '',
        preparation_time: '',
        cook_time: ''
    })

    const [loaded, setLoaded] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);

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
    }, [match.params.id])
    
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

    // React.useEffect(() => {
    //     const recipeId = match.params.id;
    //     getRecipe(recipeId).then((response) => {
    //         setRecipe(response.data)
    //         setLoaded(true)
    //     })
    // }, [match.params.id])

    const handleFileChange = (event) =>{
        setImageUrl(event.target.files[0])
    }


    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

        return loaded ? (
            <>
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
                <div className='info'>
                <h1 className='title-recipe'>{nameRef.current.value}</h1>
                <img className='recipe-image' src={recipe.imageUrl} alt='meal'/>
                <p><strong>Directions:</strong> {recipe.directions}</p>
                <strong>Ingredients: </strong>
                <ol className='ingredients'>
                    {recipe.ingredients.map((ingredient, index) => {
                        return (
                                <li key={index}>
                                    {ingredient}
                                </li>
                            )
                        })
                    }
                </ol>
                <p><strong>Notes: </strong> {recipe.notes}</p>
                <p><strong>Preparation Time: </strong> {recipe.preparation_time}</p>
                    <p><strong>Cook Time: </strong>{recipe.cook_time}</p>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Edit Recipe
                    </Button>

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    <Button onClick={() => { history.push(`/recipes/${recipe._id}/edit`) }}>Edit Project</Button>
                </div>
            </>
        ) : 
            <p>Loading</p>
}

export default UserRecipeDetails;
