import axios, { type InternalAxiosRequestConfig } from 'axios';

import { AUTHORIZATION_HEADER_NAME, BEARER } from '@/constants/api';
import { useUsersStore } from '@/store/users';
import { BACKEND_BASE_URL } from '@/constants/path';

axios.defaults.baseURL = BACKEND_BASE_URL;
axios.defaults.withCredentials = true;
export const api = axios.create();
const addToken = (config: InternalAxiosRequestConfig<any>) => {
	const user = useUsersStore();
	config.headers[AUTHORIZATION_HEADER_NAME] = BEARER + user.state.accessToken;
	return config;
};

api.interceptors.request.use(addToken);

api.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status !== 401) {
			return Promise.reject(error);
		}
		const user = useUsersStore();
		user.clear();
		user.loadUser();
	},
);
