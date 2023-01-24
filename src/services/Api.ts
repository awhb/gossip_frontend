import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: 'http://127.0.0.1:3000',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });
};