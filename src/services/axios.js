import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { request } from './service';
import Cookies from 'universal-cookie';

const axiosJWT = axios.create();
const cookies = new Cookies();
const user = cookies.get('currUser');

const refreshToken = async() => {
  try{
    const res = await request.refreshToken();
    return res.data;
  }catch(err) {
    console.log(err);
  }
}

export const axiosPrivate = axiosJWT.interceptors.request.use(
  async(config) => {
    let date = new Date();
    const decodeToken = jwt_decode(user?.token);
    if(decodeToken.exp < date.getTime()/1000) {
      const data = await refreshToken();
      const refreshUser = {
        ...user,
        token: data.token,
      };
      cookies.set('currUser', refreshUser);
      config.headers['authorization'] = `Bearer ${data.token}`
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  }
)

