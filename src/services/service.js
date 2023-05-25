import axios from 'axios';

export const url = 'http://localhost:5050/api';

export const request = {
  login: (value) => {
    return axios.post(`${url}/login`, {...value});
  },
  logout: () => {
    return axios.post(`${url}/logout`);
  },
  signup: (value) => {
    return axios.post(`${url}/signup`, {...value});
  },

  getProducts: () => {
    return axios.get(`${url}/get-all-product`);
  },

  getCarts: (userId) => {
    return axios.get(`${url}/get-cart/${userId}`);
  },
  addCart: (userId, productId, quantity) => {
    return axios.post(`${url}/add-cart`, {userId, productId, quantity});
  },
  deleteCart: (userId, productId) => {
    console.log(userId);
    return axios.delete(`${url}/delete-cart/${productId}?userId=${userId}`);
  }
}
