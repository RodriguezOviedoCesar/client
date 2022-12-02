
import axios from "axios";
import { useNavigate } from "react-router";
const url = process.env.REACT_APP_API;
const jwString = 'jwtproyecto';

export const UsersLogin = async (userObj) => {
  const response = await axios.post(`${url}/users/login`,userObj);
  const { user, token} = response.data;
  //const  {_id, ...userStored} = user; anula el id
  localStorage.setItem(jwString, JSON.stringify({user /*userStored para utilizar con lo de arriba*/, token}));
  return response;
}



export const isAuthenticated = () =>{
 
  if(typeof window == 'undefined'){
    return false;
  }
  if(!localStorage.getItem(jwString)) return false;
  const {user} = JSON.parse(localStorage.getItem(jwString));
  if(user){
    return user
  }
  return false;
}

export const logOut = () => {
  localStorage.removeItem(jwString);
  window.location.assign('/login');
}


export const Diferenciador = (obju) => {
  if(obju !== 'VENDEDOR'){
    window.location.assign('/inicio')
  }else{
    window.location.assign('/vendedor')
  }
}