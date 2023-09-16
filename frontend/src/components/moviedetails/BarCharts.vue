<template>
	<v-container v-if="barChartType != ''">
		<v-row justify="center">
			<v-tabs v-model="barChartType" selected-class="text-pink">
				<v-tab class="font-weight-bold text-h5" value="rank">순위</v-tab>
				<v-tab class="font-weight-bold text-h5" value="sales">매출액</v-tab>
				<v-tab class="font-weight-bold text-h5" value="audienceCount">관객수</v-tab>
				<v-tab class="font-weight-bold text-h5" value="screeningsCount">상영한 스크린수</v-tab>
				<v-tab class="font-weight-bold text-h5" value="theatersCount">상영된 횟수</v-tab>
			</v-tabs>
		</v-row>
		<v-row>
			<v-chart v-if="barChartType === 'rank'" class="chart" :option="rankBarChartOption"></v-chart>
			<v-chart v-if="barChartType === 'sales'" class="chart" :option="salesBarChartOption"></v-chart>
			<v-chart v-if="barChartType === 'audienceCount'" class="chart" :option="audienceCountBarChartOption"></v-chart>
			<v-chart v-if="barChartType === 'screeningsCount'" class="chart" :option="screeningsCountBarChartOption"></v-chart>
			<v-chart v-if="barChartType === 'theatersCount'" class="chart" :option="theatersCountBarChartOption"></v-chart>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { findMovieRankBarChartApi } from '@/api/movieRank';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import VChart from 'vue-echarts';
import { GridComponent, TitleComponent, GraphicComponent } from 'echarts/components';
import { audienceCountBarChartOption, rankBarChartOption, salesBarChartOption, screeningsCountBarChartOption, theatersCountBarChartOption } from '@/service/echartsoption/barChartsOption';

use([BarChart, GridComponent, TitleComponent, GraphicComponent]);

const route = useRoute();
const moviesId = computed(() => route.path.split('/')[2]);

const barChartType = ref('rank');

onMounted(async () => {
	const res: any = await findMovieRankBarChartApi(moviesId.value);
	if (res.data.dates == null) {
		barChartType.value = '';
		return;
	}
	const nonZeroDataIndices = res.data.rank[0].datas.map((data: any, index: number) => (data !== 0 ? index : -1)).filter((index: number) => index !== -1);
	const dates = nonZeroDataIndices.map((index: number) => res.data.dates[index]);
	rankBarChartOption.value.xAxis.data = dates;
	salesBarChartOption.value.xAxis.data = dates;
	audienceCountBarChartOption.value.xAxis.data = dates;
	screeningsCountBarChartOption.value.xAxis.data = dates;
	theatersCountBarChartOption.value.xAxis.data = dates;
	rankBarChartOption.value.series[0].data = nonZeroDataIndices.map((index: number) => res.data.rank[0].datas.map((data: any) => (data === 0 ? null : -data + 11))[index]);
	salesBarChartOption.value.series[0].data = nonZeroDataIndices.map((index: number) => res.data.sales[0].datas.map((data: any) => data / 100000000)[index]);
	audienceCountBarChartOption.value.series[0].data = nonZeroDataIndices.map((index: number) => res.data.audienceCount[0].datas.map((data: any) => data / 10000)[index]);
	screeningsCountBarChartOption.value.series[0].data = nonZeroDataIndices.map((index: number) => res.data.screeningsCount[0].datas[index]);
	theatersCountBarChartOption.value.series[0].data = nonZeroDataIndices.map((index: number) => res.data.theatersCount[0].datas[index]);
});
</script>

<style scoped>
.chart {
	height: 70vh;
}
</style>
