import axios from 'axios';
import { axiosPrivate } from './axios';

export const url = 'http://localhost:5050/api';

export const request = {
  login: (value) => {
    return axios.post(`${url}/login`, {...value});
  },
  logout: () => {
    return axios.post(`${url}/logout`, {
      withCredentials: true
    });
  },
  signup: (value) => {
    return axios.post(`${url}/signup`, {...value});
  },
  refreshToken: () => {
    return axios.get(`${url}/refresh-token`, {
      withCredentials: true
    });
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
    return axios.delete(`${url}/delete-cart/${productId}?userId=${userId}`);
  },

  postOrder: (value) => {
    return axios.post(`${url}/post-order`, {...value});
  },
  getOrder: (userId, page) => {
    return axios.get(`${url}/get-order/${userId}?page=${page}`);
  },
  getDetailOrderByUser: (userId, orderId) => {
    return axios.get(`${url}/get-detail-order-by-user/${orderId}?userId=${userId}`);
  },
}
