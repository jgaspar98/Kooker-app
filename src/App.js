import './App.css';
import UserProfile from './components/Userprofile';
import { Route, Switch } from 'react-router-dom';
import AddRecipe from './components/AddRecipe';
import UserRecipeDetails from './components/UserRecipeDetails';
import EditRecipe from './components/EditRecipe';
import RecipeSearch from './components/RecipeSearch';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuperNavbar from './components/Navbar';
import { loggedin } from './api';
import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


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

  return loggedInUser ? (
    <div className="App">
      <ToastContainer />
      {/* <SuperNavbar loggedInUser={loggedInUser} setCurrentUser={setCurrentUser} /> */}
      <Route exact path='/' render={(props) => { return <SuperNavbar loggedInUser={loggedInUser} setCurrentUser={setCurrentUser} {...props} /> }} />
      <Switch>
        <Route exact path='/' component={RecipeSearch} />
        <Route exact path='/user/profile' render={(props) => { return <UserProfile {...props} /> }} />
        <Route exact path='/recipe/create' render={(props) => { return <AddRecipe {...props} loggedInUser={loggedInUser} /> }} />
        <Route exact path='/recipes/:id' render={(props) => { return <UserRecipeDetails {...props} /> }} />
        <Route exact path='/recipes/:id/edit' component={EditRecipe} />
      </Switch>
  
    </div>
  ) : (
      <div className="App">
          <SuperNavbar loggedInUser={loggedInUser} setCurrentUser={setCurrentUser} />
      <div className='logo'>
        <Route exact path='/' component={HomePage} />
      </div>
      <div className='search' >
        <Route exact path='/' component={RecipeSearch} />
        </div>
      <Switch>
      <Route exact path='/signup' render={(props) => { return <Signup {...props} setCurrentUser={setCurrentUser} /> }} />
      <Route exact path='/login' render={(props) => { return <Login {...props} setCurrentUser={setCurrentUser} /> }} />
      <Route exact path='/login/google' render={
        () => {
          window.location.href = `${process.env.REACT_APP_PROJECTS_API}/api/auth/google`
        }
      } />
      </Switch>
      </div>
     
  );
}

export default App;
