import './App.css';
import UserProfile from './components/Userprofile';
import { Route, Switch } from 'react-router-dom';
import AddRecipe from './components/AddRecipe';
import UserRecipeDetails from './components/UserRecipeDetails';
import EditRecipe from './components/EditRecipe';
import RecipeSearch from './components/RecipeSearch';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { loggedin } from './api';
import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  const setCurrentUser = (user) => {
    setLoggedInUser(user)
  }

  React.useEffect(() => {
    if (loggedInUser === null) {
      loggedin().then((response) => {
        if (response.data._id) {
          setCurrentUser(response.data)
        }
      })
    }
  }, [loggedInUser])

  return (
    <div className="App">
      <ToastContainer />
      <Navbar loggedInUser={loggedInUser} setCurrentUser={setCurrentUser} />
      <Switch>
      <Route exact path={['/', '/user/profile']} render={(props) => { return <UserProfile {...props}  />}} /> 
      <Route exact path='/recipe/create' component={AddRecipe} />
      <Route exact path='/recipes/:id'  render={(props) => { return <UserRecipeDetails {...props}  />}} />
      <Route exact path='/recipes/:id/edit' component={EditRecipe} />
      <Route exact path='/signup' render={(props) => { return <Signup {...props} setCurrentUser={setCurrentUser} /> }} />
      <Route exact path='/login' render={(props) => { return <Login {...props} setCurrentUser={setCurrentUser} />}} />
        <Route exact path='/login/google' render={
          () => {
            window.location.href= `${process.env.REACT_APP_PROJECTS_API}/api/auth/google`
          }
        }/>
      </Switch>
      <RecipeSearch />

    </div>
  );
}

export default App;
