import axios from "axios"

const developerAxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/developer",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

developerAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

developerAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default developerAxiosInstance

