import { getStorageItem } from '@/shared/utils/localStorage';
import axios from 'axios';

export const apiConfig = () => {
  const tokenLocalStorage = getStorageItem('token')
  return axios.create({
    baseURL: 'https://teste.grupoimagetech.com.br/api/v1',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${tokenLocalStorage}`
    },
  });
};