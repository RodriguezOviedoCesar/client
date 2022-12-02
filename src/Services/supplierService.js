import axios from "axios";
const url = process.env.REACT_APP_API;

export const getSupplierAll = () => {
  const response = axios.get(`${url}/supplier/supl`);
  return response;
}

export const getSupplierById = (id) => {
  const response = axios.get(`${url}/supplier/supl/${id}`);
  return response;
}

export const CreateSuppliers = (suppliersObj) => {
  const response = axios.post(`${url}/supplier/create`,suppliersObj);
  return response;
}

export const  editSuppliers = (suppliersObj,id) => {
  const response = axios.put(`${url}/supplier/supl/${id}`, suppliersObj)
  return response;
}


export const delSupplier = (id) => {
  const response = axios.delete(`${url}/supplier/supl/${id}`)
  return response;
}
