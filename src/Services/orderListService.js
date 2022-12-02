import axios from "axios";
const url = process.env.REACT_APP_API;

export const getAllOrderList = ()=>{
  const response = axios.get(`${url}/list/ord/lis`);
  return response;
}

export const getAllOrderListByID = (id)=>{
  const response = axios.get(`${url}/list/ord/lis/${id}`);
  return response;
}

export const getAllOrderListByOrder = (id) => {
  const response = axios.get(`${url}/list/ord/lis/lis/${id}`);
  return response;
}

export const createOrderList = (orderlistObj) => {
  const response = axios.post(`${url}/list/ord/lis/create`, orderlistObj)
  return response;
}

export const updateOrderList = (orderlistObj, id) => {
  const response = axios.put(`${url}/list/ord/lis/${id}`, orderlistObj)
  return response;
}

export const deleteOrderList = (id) => {
  const response = axios.delete(`${url}/list/ord/lis/${id}`)
  return response;
}
