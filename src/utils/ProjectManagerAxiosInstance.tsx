import axios from "axios"

const projectmanagerAxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/projectmanager",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

projectmanagerAxiosInstance.interceptors.request.use(
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

projectmanagerAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default projectmanagerAxiosInstance

