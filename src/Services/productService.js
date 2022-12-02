import axios from "axios";
const url = process.env.REACT_APP_API;

export const getAllProducts = ()=>{
  const response = axios.get(`${url}/products/pro`);
  return response;
}

export const getProductsByID = (id)=>{
  const response = axios.get(`${url}/products/pro/${id}`);
  return response;
}

export const createProduct = (productsObj)=>{
  const response = axios.post(`${url}/products/pro/create`, productsObj);
  return response;
}

export const updateProduct = (productsObj, id)=>{
  const response = axios.put(`${url}/products/pro/${id}`, productsObj);
  return response;
}

export const deleteProduct = (id)=>{
  const response = axios.delete(`${url}/products/pro/${id}`);
  return response;
}
