import axios from "axios";
const url = process.env.REACT_APP_API;

export const getAllBrands = ()=>{
  const response = axios.get(`${url}/brand/bra`);
  return response;
}

export const getAllByIDBrands = (id)=>{
  const response = axios.get(`${url}/brand/bra/${id}`);
  return response;
}

export const createBrands = (brandsObje) => {
  const response = axios.post(`${url}/brand/bra/create`, brandsObje);
  return response;
}

export const updateBrands = (brandsObje, id) => {
  const response = axios.put(`${url}/brand/bra/${id}`, brandsObje);
  return response;
}

export const deleteBrands = (id) => {
  const response = axios.delete(`${url}/brand/bra/${id}`);
  return response;
}