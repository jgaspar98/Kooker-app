import './App.css';
import UserProfile from './components/Userprofile';
import { Route } from 'react-router-dom';
import AddRecipe from './components/AddRecipe';
import UserRecipeDetails from './components/UserRecipeDetails';
import EditRecipe from './components/EditRecipe';
import RecipeSearch from './components/RecipeSearch';


function App() {
  return (
    <div className="App">
      <Route exact path={['/', '/user/profile']} render={(props) => { return <UserProfile {...props}  />}} /> 
   
      <Route exact path='/recipe/create' component={AddRecipe} />
      <Route exact path='/recipes/:id'  render={(props) => { return <UserRecipeDetails {...props}  />}} />
      <Route exact path='/recipes/:id/edit' component={EditRecipe} />
      <RecipeSearch/>
    </div>
  );
}

export default App;
