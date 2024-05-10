import { getStorageItem } from '@/shared/utils/localStorage';
import axios from 'axios';

const axiosBaseConfig = (token?: string) => {
  return axios.create({
    baseURL: 'https://teste.grupoimagetech.com.br/api/v1',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    },
  });
};

export const apiConfig = () => {
  const token = getStorageItem('token')
  return axiosBaseConfig(String(token))
};

export default apiConfig()