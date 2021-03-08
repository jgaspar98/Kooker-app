import React from 'react';
import { getRecipe, updateRecipe } from '../api';

class EditRecipe extends React.Component{
    state = {
        id: '',
        name: '',
        directions: '',
        imageUrl: '',
        ingredients: '',
        notes: '',
        preparation_time: '',
        cook_time:''
    }
    
    componentDidMount() {
        const recipeId = this.props.match.params.id;
        getRecipe(recipeId).then((response) => {
            this.setState({
                id: response.data._id,
                name: response.data.name,
                directions: response.data.directions,
                imageUrl: response.data.imageUrl,
                ingredients: response.data.ingredients,
                notes: response.data.notes,
                cook_time: response.data.cook_time,
                preparation_time: response.data.preparation_time,
                loadedFromDb: true
            })
        })
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]:value
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { id } = this.state;
        updateRecipe(this.state).then(() => {
            this.props.history.push(`/recipes/${id}`)
        }).catch(err => console.log(err))
    }

    handleFileChange = (event) => {
        this.setState({
            imageUrl: event.target.files[0]
        });
    }

    render() {
        const { name, directions, ingredients, notes, preparation_time, cook_time } = this.state;
        return (
            <form onSubmit={this.handleFormSubmit}>
                <label>Name</label>
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
                
                <button type='submit'>Update</button>
            </form>
        )
    }
}

export default EditRecipe