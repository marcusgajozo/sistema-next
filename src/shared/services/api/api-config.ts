import axios from 'axios';

export const apiConfig = () => {
  return axios.create({
    baseURL: 'https://teste.grupoimagetech.com.br/api/v1',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: localStorage.getItem('next_token') || ''
    },
  });
};