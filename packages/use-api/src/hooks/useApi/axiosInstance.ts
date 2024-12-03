import axios from "axios";

export const axiosInstance = axios.create({
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
