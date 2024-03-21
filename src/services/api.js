import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.137.206:8080'
})

export default api;