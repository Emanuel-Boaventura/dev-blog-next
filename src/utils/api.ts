import axios from 'axios'
import { parseCookies } from 'nookies'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

api.interceptors.request.use(
  config => {
    const cookies = parseCookies()

    const token = cookies['dev-blog-userToken']

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  async error => await Promise.reject(error),
)
