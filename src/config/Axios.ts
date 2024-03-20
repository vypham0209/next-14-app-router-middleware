//THIRD PARTY MODULES
import axios from 'axios'

export const Axios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  // baseURL: `${process.env.STRAPI_API_URL}`,
})
