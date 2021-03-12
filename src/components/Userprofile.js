import React from 'react'
import UserRecipes from './UserRecipes';
import Button from 'react-bootstrap/Button';
import { addRecipe, uploadFile } from '../api';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal'

function UserProfile({ loggedInUser, history }) {
    const nameRef = React.useRef();
    const directionsRef = React.useRef();
    const ingredientsRef = React.useRef();
    const notesRef = React.useRef();
    const preparation_timeRef = React.useRef();
    const cook_timeRef = React.useRef();

    const [modalShow, setModalShow] = React.useState(false);
    let imageUrl = ''; // To add a new image has to be this way to be compatible with the Modal
                        // If used setState, the page refresh and resets the form
  
    const handleFileChange = (event) => {
        imageUrl = event.target.files[0];
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
              window.location.reload();
              toast.success('Recipe created!');
            }).catch(err => console.log(err))
        })
    }

    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Create Your Recipe
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
                <label className='labels'><strong>Name</strong></label>
                <input type='text' ref={nameRef} />
                <br/>

                <label className='labels'><strong>Directions</strong></label>
                <input type='text' ref={directionsRef}  />
                <br />
                
                <label className='labels'><strong>Ingredients</strong></label>
                <input type='text' ref={ingredientsRef}  />
                <br />
                
                <label className='labels'><strong>Notes</strong></label>
                <input type='text' ref={notesRef}  />
                <br />
                
                <label className='labels'><strong>Preparation Time</strong></label>
                <input type='text' ref={preparation_timeRef}  />
                <br />
                
                <label className='labels'><strong>Cook Time</strong></label>
                <input type='text' ref={cook_timeRef} />
                <br />
                
                <label className='labels'><strong>Image</strong></label>
                <input type='file' onChange={handleFileChange} />
                <br />
                <Modal.Footer>
                    <Button type='submit'>Create</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </form>
            </Modal.Body>
          </Modal>
        );
      }

    return (
        <div>
            <UserRecipes props={loggedInUser} />
            <div className='create-recipe'>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Create Recipe
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            </div>
            
        </div>
    )
} 

export default UserProfile;