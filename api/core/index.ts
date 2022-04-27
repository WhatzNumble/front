import axios, { HeadersDefaults } from 'axios';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://localhost:8080',
});

axiosInstance.defaults.headers = {
  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
} as CommonHeaderProperties;

axiosInstance.defaults.timeout = 3000;

axiosInstance.interceptors.request.use(
  (config) => {
    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const refreshToken = () => {
  //request refresh with Header Authorization: Bearer {expired access token}
  console.log('refresh');
};

axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log(error);
    //토큰 만료시 
    if (error.response.status == 403) {
      refreshToken();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
