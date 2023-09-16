import { ref } from 'vue';

export const rankBarChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
			return params[0].name + '<br/>' + (11 - params[0].value) + '등';
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
	series: [
		{
			data: [],
			type: 'bar',
			barWidth: '60%',
			itemStyle: {
				color: 'pink',
			},
		},
	],
	grid: {
		containLabel: true,
	},
});

export const salesBarChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
			return params[0].name + '<br/>' + params[0].value.toFixed(2);
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
		splitNumber: 10,
	},
	series: [
		{
			data: [],
			type: 'bar',
			barWidth: '60%',
			itemStyle: {
				color: 'pink',
			},
		},
	],
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

export const audienceCountBarChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
			return params[0].name + '<br/>' + params[0].value.toFixed(2);
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
		splitNumber: 10,
	},
	series: [
		{
			data: [],
			type: 'bar',
			barWidth: '60%',
			itemStyle: {
				color: 'pink',
			},
		},
	],
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

export const screeningsCountBarChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
			return params[0].name + '<br/>' + params[0].value + '개';
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
		splitNumber: 10,
	},
	series: [
		{
			data: [],
			type: 'bar',
			barWidth: '60%',
			itemStyle: {
				color: 'pink',
			},
		},
	],
	grid: {
		containLabel: true,
	},
});

export const theatersCountBarChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
			return params[0].name + '<br/>' + params[0].value + '번';
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
		splitNumber: 10,
	},
	series: [
		{
			data: [],
			type: 'bar',
			barWidth: '60%',
			itemStyle: {
				color: 'pink',
			},
		},
	],
	grid: {
		containLabel: true,
	},
});
