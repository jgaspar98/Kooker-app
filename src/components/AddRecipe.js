import React from 'react';
import { addRecipe, uploadFile } from '../api';
import { toast } from 'react-toastify';

class AddRecipe extends React.Component{
    state = {
        name: '',
        directions: '',
        imageUrl: '',
        ingredients: '',
        notes: '',
        preparation_time: '',
        cook_time:''
    }


    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]:value
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { name, directions, imageUrl, ingredients, notes, preparation_time, cook_time } = this.state;
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);

        uploadFile(uploadData).then((response) => {
            const newRecipe = {
                name: name,
                directions: directions,
                ingredients: ingredients,
                imageUrl:response.data.fileUrl,
                notes: notes,
                preparation_time: preparation_time,
                cook_time: cook_time
            }

            addRecipe(newRecipe).then(() => {
                toast.success('Recipe created!');
                this.props.history.push('/user/profile')
            }).catch(err => console.log(err))
        })
    }

    handleFileChange = (event) => {
        this.setState({
            imageUrl: event.target.files[0]
        });
    }

    render() {
        const { name, directions, ingredients, notes, preparation_time, cook_time } = this.state;
        return (
            <form onSubmit={this.handleFormSubmit} encType='multipart/form-data'>
                <label>name</label>
                <input type='text' name='name' value={name} onChange={this.handleChange} />

                <label>Directions</label>
                <input type='text' name='directions' value={directions} onChange={this.handleChange} />

                <label>Ingredients</label>
                <input type='text' name='ingredients' value={ingredients} onChange={this.handleChange} />

                <label>notes</label>
                <input type='text' name='notes' value={notes} onChange={this.handleChange} />

                <label>Preparation Time</label>
                <input type='text' name='preparation_time' value={preparation_time} onChange={this.handleChange} />

                <label>Cook Time</label>
                <input type='text' name='cook_time' value={cook_time} onChange={this.handleChange} />
                
                <label>Image</label>
                <input type='file' onChange={this.handleFileChange} />
                
                <button type='submit'>Create</button>
            </form>
        )
    }
}

export default AddRecipe;