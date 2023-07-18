import axios from 'axios'

const axiosInstance = axios.create()

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = sessionStorage.getItem('accessToken')
      if (accessToken) {
        console.log("SessionStorage에 AccessToken 존재함")
        config.headers.Authorization = accessToken
      } else {
        console.log("SessionStorage에 AccessToken 존재하지않음")
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  
export default axiosInstance