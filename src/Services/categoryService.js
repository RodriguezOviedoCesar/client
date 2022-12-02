import axios from "axios";
const url = process.env.REACT_APP_API;

export const getAllCategory = ()=>{
  const response =  axios.get(`${url}/category/cat`);
  return response;
}

export const getCategoryByID = (id)=>{
  const response = axios.get(`${url}/category/cat/${id}`);
  return response;
}

export const createCategory = (categoryObj)=>{
  const response = axios.post(`${url}/category/cat/create`,categoryObj);
  return response;
}

export const editCategory = (categoryObj, id)=>{
  const response = axios.put(`${url}/category/cat/${id}`, categoryObj);
  return response;
}

export const dellCategory =  (id)=>{
  const response = axios.delete(`${url}/category/cat/${id}`)
  return response;
}