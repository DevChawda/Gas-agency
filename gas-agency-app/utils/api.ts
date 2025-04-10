import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.12:5000/api', // replace <YOUR-IP-ADDRESS> with your local IP
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: attach token automatically if you store JWT in AsyncStorage
// You can uncomment and use it if you're storing tokens
// import AsyncStorage from '@react-native-async-storage/async-storage';
// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
