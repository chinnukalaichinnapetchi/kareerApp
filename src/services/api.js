import axios from 'axios';

const API_BASE = 'http://testlink4.pillersofttechnologies.com/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  timeout: 10000,
});

const api = {
  setAuthToken: token => {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  clearAuthToken: () => {
    delete client.defaults.headers.common['Authorization'];
  },
  register: async payload => {
    try {
      const { data } = await client.post('/register', payload);
      console.log(data,'data')
      return data;
    } catch (err) {
      throw err.response?.data || { success: false, message: err.message };
    }
  },
  login: async payload => {
    try {
      const { data } = await client.post('/login', payload);
      return data;
    } catch (err) {
      throw err.response?.data || { success: false, message: err.message };
    }
  },
  getUser: async () => {
    try {
      const { data } = await client.get('/user');
      return data;
    } catch (err) {
      throw err.response?.data || { success: false, message: err.message };
    }
  },
};

export default api;
