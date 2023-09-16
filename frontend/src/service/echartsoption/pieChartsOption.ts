import { ref } from 'vue';

export const salesPieChartOption = ref({
	tooltip: {
		trigger: 'item',
		formatter: function (params: any) {
			return `<span style='color: ${params.color}' class='font-weight-bold'>${params.name} <br/>${(params.value / 100000000).toFixed(2)}억원 (${params.percent}%)</span>`;
		},
	},
	label: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	series: [
		{
			type: 'pie',
			data: [],
			emphasis: {
				itemStyle: {
					shadowBlur: 100,
				},
			},
		},
	],
});

export const audienceCountPieChartOption = ref({
	tooltip: {
		trigger: 'item',
		formatter: function (params: any) {
			return `<span style='color: ${params.color}' class='font-weight-bold'>${params.name} <br/>${params.value / 10000}만명 (${params.percent}%)</span>`;
		},
	},
	label: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	series: [
		{
			type: 'pie',
			data: [],
			emphasis: {
				itemStyle: {
					shadowBlur: 100,
				},
			},
		},
	],
});

export const screeningsCountPieChartOption = ref({
	tooltip: {
		trigger: 'item',
		formatter: function (params: any) {
			return `<span style='color: ${params.color}' class='font-weight-bold'>${params.name} <br/>${params.value}개 (${params.percent}%)</span>`;
		},
	},
	label: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	series: [
		{
			type: 'pie',
			data: [],
			emphasis: {
				itemStyle: {
					shadowBlur: 100,
				},
			},
		},
	],
});

export const theatersCountPieChartOption = ref({
	tooltip: {
		trigger: 'item',
		formatter: function (params: any) {
			return `<span style='color: ${params.color}' class='font-weight-bold'>${params.name} <br/>${params.value}번 (${params.percent}%)</span>`;
		},
	},
	label: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	series: [
		{
			type: 'pie',
			data: [],
			emphasis: {
				itemStyle: {
					shadowBlur: 100,
				},
			},
		},
	],
});
