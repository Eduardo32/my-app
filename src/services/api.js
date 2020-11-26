import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-api.vercel.app/'
    //baseURL: 'http://localhost:3333'
})

export default api;