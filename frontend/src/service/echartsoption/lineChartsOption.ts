import { ref } from 'vue';

export const rankLineChartOption = ref({
	legend: {
		data: [],
		top: 'bottom',
		itemWidth: 5,
		itemHeight: 10,
	},
	tooltip: {
		formatter: function (params: any) {
			return params.seriesName + '<br/>' + (11 - params.value) + '등';
		},
		textStyle: {
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	xAxis: {
		type: 'category',
		data: [],
		axisLabel: {
			fontSize: 10,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			formatter: function (value: number) {
				if (value === 0) {
					return '';
				}
				return 11 - value + '등';
			},
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
		interval: 1,
		max: 10,
	},
	series: [],
});

export const salesLineChartOption = ref({
	legend: {
		data: [],
		top: 'bottom',
		itemWidth: 10,
		itemHeight: 10,
	},
	tooltip: {
		formatter: function (params: any) {
			return params.seriesName + '<br/>' + params.value.toFixed(2);
		},
		textStyle: {
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	xAxis: {
		type: 'category',
		data: [],
		axisLabel: {
			fontSize: 10,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			formatter: function (value: number) {
				if (value === 0) {
					return '';
				}
				return value;
			},
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	series: [],
	grid: {
		containLabel: true,
	},
	graphic: [
		{
			type: 'text',
			left: '10%',
			top: 20,
			style: {
				text: '단위: 억원',
				fontWeight: 'bold',
				color: 'grey',
			},
		},
	],
});

export const audienceCountLineChartOption = ref({
	legend: {
		data: [],
		top: 'bottom',
		itemWidth: 10,
		itemHeight: 10,
	},
	tooltip: {
		formatter: function (params: any) {
			return params.seriesName + '<br/>' + params.value.toFixed(2);
		},
		textStyle: {
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	xAxis: {
		type: 'category',
		data: [],
		axisLabel: {
			fontSize: 10,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			formatter: function (value: any) {
				if (value === 0) {
					return '';
				}
				return value;
			},
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	series: [],
	grid: {
		containLabel: true,
	},
	graphic: [
		{
			type: 'text',
			left: '10%',
			top: 20,
			style: {
				text: '단위: 만명',
				fontWeight: 'bold',
				color: 'grey',
			},
		},
	],
});

export const screeningsCountLineChartOption = ref({
	legend: {
		data: [],
		top: 'bottom',
		itemWidth: 10,
		itemHeight: 10,
	},
	tooltip: {
		formatter: function (params: any) {
			return params.seriesName + '<br/>' + params.value + '개';
		},
		textStyle: {
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	xAxis: {
		type: 'category',
		data: [],
		axisLabel: {
			fontSize: 10,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			formatter: function (value: number) {
				if (value === 0) {
					return '';
				}
				return value + '개';
			},
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	series: [],
	grid: {
		containLabel: true,
	},
});

export const theatersCountLineChartOption = ref({
	legend: {
		data: [],
		top: 'bottom',
		itemWidth: 10,
		itemHeight: 10,
	},
	tooltip: {
		formatter: function (params: any) {
			return params.seriesName + '<br/>' + params.value + '번';
		},
		textStyle: {
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	xAxis: {
		type: 'category',
		data: [],
		axisLabel: {
			fontSize: 10,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			formatter: function (value: number) {
				if (value === 0) {
					return '';
				}
				return value + '번';
			},
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	series: [],
	grid: {
		containLabel: true,
	},
});
