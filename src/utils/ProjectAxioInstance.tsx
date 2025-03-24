import axios from "axios"

const projectAxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/project",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

projectAxiosInstance.interceptors.request.use(
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

projectAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default projectAxiosInstance

