import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://express-quiz-app.herokuapp.com",
});

// delay cho axios instance,
// axiosInstance.interceptors.request.use(
//     (config) => new Promise((resolve) => setTimeout(() => resolve(config), 2000))
// )

export default axiosInstance;