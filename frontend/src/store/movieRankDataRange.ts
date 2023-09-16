import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { findMovieRankDataRangeApi } from '@/api/movieOpenApiHistory';

export const useMovieRankDataRangeStore = defineStore('movieRankDataRange', () => {
	const state = reactive({ startDate: '', endDateDaily: '' });

	const findMovieDataRange = async () => {
		const res: any = await findMovieRankDataRangeApi();
		state.startDate = res.data.startDate;
		state.endDateDaily = res.data.endDateDaily;
	};

	return { state, findMovieDataRange };
});
