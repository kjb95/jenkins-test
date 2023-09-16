<template>
	<v-container>
		<v-row justify="center" class="mt-3">
			<v-tabs v-model="lineChartType" selected-class="text-pink">
				<v-tab class="font-weight-bold text-h5" value="rank">순위</v-tab>
				<v-tab class="font-weight-bold text-h5" value="sales">매출액</v-tab>
				<v-tab class="font-weight-bold text-h5" value="audienceCount">관객수</v-tab>
				<v-tab class="font-weight-bold text-h5" value="screeningsCount">상영한 스크린수</v-tab>
				<v-tab class="font-weight-bold text-h5" value="theatersCount">상영된 횟수</v-tab>
			</v-tabs>
		</v-row>
		<v-row>
			<v-chart v-if="lineChartType === 'rank'" class="chart" :option="rankLineChartOption" @click="handleLineChartClick"></v-chart>
			<v-chart v-if="lineChartType === 'sales'" class="chart" :option="salesLineChartOption" @click="handleLineChartClick"></v-chart>
			<v-chart v-if="lineChartType === 'audienceCount'" class="chart" :option="audienceCountLineChartOption" @click="handleLineChartClick"></v-chart>
			<v-chart v-if="lineChartType === 'screeningsCount'" class="chart" :option="screeningsCountLineChartOption" @click="handleLineChartClick"></v-chart>
			<v-chart v-if="lineChartType === 'theatersCount'" class="chart" :option="theatersCountLineChartOption" @click="handleLineChartClick"></v-chart>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts';
import router from '@/plugins';
import { ref, watchEffect } from 'vue';
import { formatDate, getPreviousWeekMonday, getPreviousWeekSunday } from '@/utils/dateUtils';
import { findMovieRankLineChartApi } from '@/api/movieRank';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GraphicComponent, GridComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { audienceCountLineChartOption, rankLineChartOption, salesLineChartOption, screeningsCountLineChartOption, theatersCountLineChartOption } from '@/service/echartsoption/lineChartsOption';
import { shortenText } from '@/utils/stringUtils';

use([LineChart, GridComponent, TitleComponent, GraphicComponent, LegendComponent]);

const props = defineProps({
	datePeriod: { type: Array, default: () => [getPreviousWeekMonday(), getPreviousWeekSunday()] },
});

const lineChartType = ref('rank');
const handleLineChartClick = (params: any) => {
	router.push(`/movie-details/${params.seriesId}`);
};

watchEffect(async () => {
	const res: any = await findMovieRankLineChartApi(formatDate(props.datePeriod?.[0] as Date), formatDate(props.datePeriod?.[1] as Date));
	const dates = res.data.dates;
	const titles = res.data.rank.map((rank: any) => rank.movieTitle);

	rankLineChartOption.value = { ...rankLineChartOption.value };
	rankLineChartOption.value.legend.data = titles;
	rankLineChartOption.value.xAxis.data = dates;
	rankLineChartOption.value.series = res.data.rank.map((data: any) => ({
		name: data.movieTitle,
		type: 'line',
		lineStyle: { width: 10 },
		data: data.datas.map((data: any) => (data === 0 ? null : -data + 11)),
		id: data.moviesId,
		endLabel: {
			show: true,
			formatter: (params: any) => shortenText(params.seriesName, 15),
		},
		emphasis: { focus: 'series' },
	}));

	salesLineChartOption.value = { ...salesLineChartOption.value };
	salesLineChartOption.value.legend.data = titles;
	salesLineChartOption.value.xAxis.data = dates;
	salesLineChartOption.value.series = res.data.sales.map((data: any) => ({
		name: data.movieTitle,
		type: 'line',
		lineStyle: { width: 5 },
		data: data.datas.map((data: any) => (data === 0 ? null : data / 100000000)),
		id: data.moviesId,
		endLabel: {
			show: true,
			formatter: (params: any) => shortenText(params.seriesName, 15),
		},
		emphasis: { focus: 'series' },
	}));

	audienceCountLineChartOption.value = { ...audienceCountLineChartOption.value };
	audienceCountLineChartOption.value.legend.data = titles;
	audienceCountLineChartOption.value.xAxis.data = dates;
	audienceCountLineChartOption.value.series = res.data.audienceCount.map((data: any) => ({
		name: data.movieTitle,
		type: 'line',
		lineStyle: { width: 5 },
		data: data.datas.map((data: any) => (data === 0 ? null : data / 10000)),
		id: data.moviesId,
		endLabel: {
			show: true,
			formatter: (params: any) => shortenText(params.seriesName, 15),
		},
		emphasis: { focus: 'series' },
	}));

	screeningsCountLineChartOption.value = { ...screeningsCountLineChartOption.value };
	screeningsCountLineChartOption.value.legend.data = titles;
	screeningsCountLineChartOption.value.xAxis.data = dates;
	screeningsCountLineChartOption.value.series = res.data.screeningsCount.map((data: any) => ({
		name: data.movieTitle,
		type: 'line',
		lineStyle: { width: 5 },
		data: data.datas.map((data: any) => (data === 0 ? null : data)),
		id: data.moviesId,
		endLabel: {
			show: true,
			formatter: (params: any) => shortenText(params.seriesName, 15),
		},
		emphasis: { focus: 'series' },
	}));

	theatersCountLineChartOption.value = { ...theatersCountLineChartOption.value };
	theatersCountLineChartOption.value.legend.data = titles;
	theatersCountLineChartOption.value.xAxis.data = dates;
	theatersCountLineChartOption.value.series = res.data.theatersCount.map((data: any) => ({
		name: data.movieTitle,
		type: 'line',
		lineStyle: { width: 5 },
		data: data.datas.map((data: any) => (data === 0 ? null : data)),
		id: data.moviesId,
		endLabel: {
			show: true,
			formatter: (params: any) => shortenText(params.seriesName, 15),
		},
		emphasis: { focus: 'series' },
	}));
});
</script>
<style scoped>
.chart {
	height: 70vh;
}
</style>
