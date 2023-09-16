import { api } from '@/api/api';

export const findMoviesByTitleApi = (title: String, isConsiderSomeoneChatroom: boolean) => {
	try {
		return api.get('/v1/movies/', {
			params: { title, isConsiderSomeoneChatroom },
		});
	} catch (error) {
		console.log(error);
	}
};

export const findMoviesByIdApi = (id: string) => {
	try {
		return api.get(`/v1/movies/`, {
			params: { id },
		});
	} catch (error) {
		console.log(error);
	}
};
