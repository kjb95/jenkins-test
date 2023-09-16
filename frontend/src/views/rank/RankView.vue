<template>
	<v-row>
		<v-col />
		<v-col />
		<v-col>
			<VueDatePicker v-if="periodType == 'daily'" v-model="dailyDate" :enable-time-picker="false" :min-date="movieRankDataRange.state.startDate" :max-date="movieRankDataRange.state.endDateDaily"></VueDatePicker>
			<VueDatePicker v-if="periodType == 'weekly'" v-model="weeklyDate" class="vueDatePickerClass" week-picker :min-date="movieRankDataRange.state.startDate" :max-date="movieRankDataRange.state.endDateDaily"></VueDatePicker>
		</v-col>
		<v-col></v-col>
		<v-col>
			<v-tabs v-model="path" selected-class="text-pink">
				<RouterLink :to="dailyRankPath">
					<v-tab class="font-weight-bold text-h5" :value="dailyRankPath">일간</v-tab>
				</RouterLink>
				<RouterLink :to="weeklyRankPath">
					<v-tab class="font-weight-bold text-h5" :value="weeklyRankPath">주간</v-tab>
				</RouterLink>
			</v-tabs>
		</v-col>
	</v-row>
	<v-row v-if="movieRankData.length != 0">
		<v-col lg="2" xl="3"></v-col>
		<v-col v-for="n in 5" :key="n" style="margin-left: -40px">
			<MovieInfoCard
				v-if="movieRankData[n - 1].moviesId"
				:movies-id="movieRankData[n - 1].moviesId"
				:title="movieRankData[n - 1].title"
				:rank-increment="movieRankData[n - 1].rankIncrement"
				:rank="movieRankData[n - 1].rank"
				:poster="movieRankData[n - 1].poster"
				:opening-date="movieRankData[n - 1].openingDate"
				:new-rank="movieRankData[n - 1].newRank"
				:audience-count="movieRankData[n - 1].audienceCount"
			/>
		</v-col>
		<v-col lg="2" xl="3"></v-col>
	</v-row>
	<v-row v-if="movieRankData.length != 0">
		<v-col lg="2" xl="3"></v-col>
		<v-col v-for="n in 5" :key="n" style="margin-left: -40px">
			<MovieInfoCard
				v-if="movieRankData[n + 4].moviesId"
				:movies-id="movieRankData[n + 4].moviesId"
				:title="movieRankData[n + 4].title"
				:rank-increment="movieRankData[n + 4].rankIncrement"
				:rank="movieRankData[n + 4].rank"
				:poster="movieRankData[n + 4].poster"
				:opening-date="movieRankData[n + 4].openingDate"
				:new-rank="movieRankData[n + 4].newRank"
				:audience-count="movieRankData[n + 4].audienceCount"
			/>
		</v-col>
		<v-col lg="2" xl="3"></v-col>
	</v-row>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { findMovieRankApi } from '@/api/movieRank';
import MovieInfoCard from '@/components/rank/MovieInfoCard.vue';
import { getPreviousWeekMonday, getPreviousWeekSunday } from '@/utils/dateUtils';
import { useMovieRankDataRangeStore } from '@/store/movieRankDataRange';
import type { MovieRankData } from '@/interfaces/rank';

const route = useRoute();

const movieRankDataRange = useMovieRankDataRangeStore();

const dailyDate = ref(getPreviousWeekSunday());
const weeklyDate = ref([getPreviousWeekMonday(), getPreviousWeekSunday()]);
const movieRankData = ref<MovieRankData[]>([]);
const path = ref(route.path);

const computeFormattedDate = () => {
	const date = periodType.value === 'daily' ? dailyDate.value : weeklyDate?.value[0];
	return String(date?.getFullYear()).padStart(2, '0') + String(date?.getMonth() + 1).padStart(2, '0') + String(date?.getDate()).padStart(2, '0');
};
const findMovieRank = async () => {
	path.value = route.path;
	const res: any = await findMovieRankApi(formattedDate.value, formattedMovieRankType.value);
	movieRankData.value = res.data.findMovieRankTopTenResponseDtos;
};

const periodType = computed(() => path.value.split('/')[3]);
const pathWithoutPeriodType = computed(() => path.value.split('/').slice(0, 3).join('/'));
const formattedDate = computed(computeFormattedDate);
const formattedMovieRankType = computed(() => path.value.split('/').slice(2, 4).join('_').toUpperCase());
const dailyRankPath = computed(() => pathWithoutPeriodType.value + '/daily');
const weeklyRankPath = computed(() => pathWithoutPeriodType.value + '/weekly');

watchEffect(findMovieRank);

onMounted(async () => {
	await movieRankDataRange.findMovieDataRange();
	dailyDate.value = new Date(movieRankDataRange.state.endDateDaily);
});
</script>

<style scoped></style>
