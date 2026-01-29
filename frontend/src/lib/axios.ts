import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
});

let getToken: (() => Promise<string | null>) | null = null;

export const setTokenFetcher = (fetcher: () => Promise<string | null>) => {
	getToken = fetcher;
};

axiosInstance.interceptors.request.use(async (config) => {
	if (getToken && config.url?.startsWith("/admin")) {
		const token = await getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}
	return config;
});

