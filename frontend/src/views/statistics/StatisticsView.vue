<template>
	<v-container>
		<v-row>
			<v-col />
			<v-col cols="3">
				<VueDatePicker v-model="datePeriod" :enable-time-picker="false" :min-date="movieRankDataRange.state.startDate" :max-date="movieRankDataRange.state.endDateDaily" week-picker></VueDatePicker>
			</v-col>
			<v-col />
		</v-row>
		<LineCharts v-if="path == '/statistics/line-chart'" :datePeriod="datePeriod" />
		<PieCharts v-if="path == '/statistics/pie-chart'" :datePeriod="datePeriod" />
	</v-container>
</template>

<script setup lang="ts">
import { useMovieRankDataRangeStore } from '@/store/movieRankDataRange';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import PieCharts from '@/components/statistics/PieCharts.vue';
import LineCharts from '@/components/statistics/LineCharts.vue';
import { getPreviousWeekMonday, getPreviousWeekSunday } from '@/utils/dateUtils';

const movieRankDataRange = useMovieRankDataRangeStore();
const route = useRoute();

const path = ref(route.path);
const datePeriod = ref([getPreviousWeekMonday(), getPreviousWeekSunday()]);

movieRankDataRange.findMovieDataRange();

watchEffect(() => {
	path.value = route.path;
});
</script>
<style scoped></style>
