import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust the base URL accordingly
});

apiService.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['auth-token'] = `Bearer ${token}`;
  }
  return config;
});

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page upon receiving a 401 response
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('username')
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiService;
