import axios from 'axios'

const axiosInstance = axios.create()

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = sessionStorage.getItem('accessToken')
      if (accessToken) {
        config.headers.Authorization = accessToken
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  
export default axiosInstance