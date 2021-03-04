import logo from './logo.svg';
import './App.css';
import UserProfile from './components/Userprofile';
import { Route } from 'react-router-dom';
import AddRecipe from './components/AddRecipe';
import UserRecipeDetails from './components/UserRecipeDetails';

function App() {
  return (
    <div className="App">
      <Route exact path={['/','/user/profile']} component={UserProfile} />
      <Route exact path='/recipe/create' component={AddRecipe} />
      <Route exact path='/recipes/:id' component={UserRecipeDetails}/>
    </div>
  );
}

export default App;
