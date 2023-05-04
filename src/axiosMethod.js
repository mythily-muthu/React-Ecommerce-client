import axios from "axios";

const BASE_URL = "https://mythu-ecommerce-app.onrender.com/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
