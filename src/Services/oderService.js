  import axios from "axios";
const url = process.env.REACT_APP_API;

export const getAllOrder = () => {
  const response = axios.get(`${url}/order/ord`)
  return response;
}

export const getByIDOrder = (id) => {
  const response = axios.get(`${url}/order/ord/${id}`);
  return response;
}

export const createOrder = (orderObj) => {
  const response = axios.post(`${url}/order/ord/create`, orderObj);
  return response;
}

export const updateOrder = (orderObj,id) => {
  const response = axios.put(`${url}/order/ord/${id}`, orderObj);
  return response;
}

export const deleteOrder = (id) => {
  const response = axios.delete(`${url}/order/ord/${id}`);
  return response;
}

export const getOrderByCodigo = (codigo) => {
  const response = axios.get(`${url}/order/ord/ord/${codigo}`);
  return response;
}