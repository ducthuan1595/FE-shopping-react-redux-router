import axios from "axios";
import { axiosJWT } from "./axios";
import { getCookie } from "../store/userSlice";

export const url = "http://localhost:5050/api";

export const request = {
  login: (value) => {
    return axios.post(
      `${url}/login`,
      { ...value },
      {
        withCredentials: true,
        credentials: "include",
      }
    );
  },
  logout: () => {
    return axios.post(`${url}/logout`,{},{
        withCredentials: true,
        credentials: "include",
      }
    );
  },
  signup: (value) => {
    return axios.post(`${url}/signup`, { ...value });
  },
  refreshToken: () => {
    return axios.get(`${url}/refresh-token`, {
      withCredentials: true,
      // credentials: "include",
    });
  },

  getProducts: () => {
    return axios.get(`${url}/get-all-product`);
  },

  getCarts: (userId, config) => {
    return axiosJWT.get(`${url}/get-cart/${userId}`, config);
  },
  addCart: (userId, productId, quantity) => {
    return axiosJWT.post(`${url}/add-cart`, { userId, productId, quantity }, {
      headers: {
        'Authorization': `Bearer ${getCookie()}`
      }
    });
  },
  deleteCart: (userId, productId) => {
    return axiosJWT.delete(`${url}/delete-cart/${productId}?userId=${userId}`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${getCookie()}`
      }
    });
  },
  getDetailProduct: (productId) => {
    return axios.get(`${url}/get-edit-product/${productId}`);
  },

  postOrder: (value) => {
    return axiosJWT.post(`${url}/post-order`, { ...value }, {
      headers: {
        'Authorization': `Bearer ${getCookie()}`
      }
    });
  },
  getOrderWithUser: (userId, page) => {
    return axiosJWT.get(`${url}/get-order/${userId}?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${getCookie()}`
      }
    });
  },
  getDetailOrderByUser: (userId, orderId) => {
    return axiosJWT.get(
      `${url}/get-detail-order-by-user/${orderId}?userId=${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${getCookie()}`
        }
      }
    );
  },
};
