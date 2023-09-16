import { api } from '@/api/api';

export const findMovieRankApi = (date: String, movieRankType: String) => {
	try {
		return api.get(`/v1/movie-rank/top-ten`, {
			params: { date, movieRankType },
		});
	} catch (error) {
		console.log(error);
	}
};

export const findMovieRankBarChartApi = (movieId: String) => {
	try {
		return api.get(`/v1/movie-rank/line-chart/` + movieId);
	} catch (error) {
		console.log(error);
	}
};

export const findMovieRankLineChartApi = (startDate: String, endDate: String) => {
	try {
		return api.get(`/v1/movie-rank/line-chart`, {
			params: { startDate, endDate },
		});
	} catch (error) {
		console.log(error);
	}
};

export const findMovieRankPieChartApi = (startDate: String, endDate: String) => {
	try {
		return api.get(`/v1/movie-rank/pie-chart`, {
			params: { startDate, endDate },
		});
	} catch (error) {
		console.log(error);
	}
};
