import axios from 'axios'
export const DEV_URL = `http://localhost:5001/firepi-react/us-central1/api`
export const PROD_URL = 'https://us-central1-firepi-react.cloudfunctions.net/api'
const isDev = process.env.NODE_ENV === 'development'

export default axios.create({
    baseURL: isDev ? DEV_URL : PROD_URL
})