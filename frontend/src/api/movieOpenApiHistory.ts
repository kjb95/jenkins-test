import { api } from '@/api/api';

export const findMovieRankDataRangeApi = () => {
	try {
		return api.get(`/v1/movie-open-api-history`);
	} catch (error) {
		console.log(error);
	}
};
