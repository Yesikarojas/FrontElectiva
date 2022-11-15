import axios from "axios";
export const connectAPI = axios.create({
    baseURL: "https://8103-132-255-20-66.ngrok.io"
})