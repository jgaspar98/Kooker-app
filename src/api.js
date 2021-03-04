import axios from 'axios';
const baseURL = `${process.env.REACT_APP_PROJECTS_API}/api`;

export const getAllRecipes = () => {
    return axios.get(`${baseURL}/recipes`);
};

export const getRecipe = (id) => {
    return axios.get(`${baseURL}/recipes/${id}`);
};

export const addRecipe = (recipe) => {
    return axios.post(`${baseURL}/recipes`, recipe);
}

export const deleteRecipe = (id) => {
    return axios.delete(`${baseURL}/recipes/${id}`);
}

export const updateRecipe = (updateProject) => {
    return axios.put(`${baseURL}/recipes/${ updateProject.id }`, updateProject);
}

export const uploadFile = (uploadData) => {
    return axios.post(`${baseURL}/upload`, uploadData);
}
// Authentication Routes
export const signup = (username, password) => {
    return axios.post(`${baseURL}/signup`, { username, password });
}

export const login = (username, password) => {
    return axios.post(`${baseURL}/login`, { username, password }, { withCredentials: true });
}

export const logout = () => {
    return axios.post(`${baseURL}/logout`, null, { withCredentials: true });
}

export const loggedin = () => {
    return axios.get(`${baseURL}/loggedin`, { withCredentials: true });
}