import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://habit-flow-api-server.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
