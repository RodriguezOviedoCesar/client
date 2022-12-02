import axios from "axios";
const url = process.env.REACT_APP_API;

export const getUserAll = () => {
  const response = axios.get(`${url}/users/user`);
  return response;
};

export const createUser = (userObj) => {
  const response = axios.post(`${url}/users/create`, userObj);
  return response;
};
