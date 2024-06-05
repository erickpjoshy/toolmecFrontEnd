import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://toolmecback.erickpjoshy.cloud/',
  timeout: 4000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default customAxios;
