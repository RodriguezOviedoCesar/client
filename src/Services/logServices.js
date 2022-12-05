import axios from "axios";
const url = process.env.REACT_APP_API;

export const getProductLog = (id) => {
  const responseProduct = axios.get(`${url}/prolog/log/log/${id}`);
  return responseProduct;
}