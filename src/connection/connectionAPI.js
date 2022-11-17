import axios from "axios";
export const connectAPI = axios.create({
    baseURL: "http://localhost:8080"
})