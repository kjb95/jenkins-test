import { createRouter, createWebHistory } from 'vue-router';

import type { Router, RouteRecordRaw } from 'vue-router';

import ChatView from '../views/chat/ChatView.vue';
import RankView from '@/views/rank/RankView.vue';
import TheStatisticsHeader from '@/layouts/header/TheStatisticsHeader.vue';
import TheRankHeader from '@/layouts/header/TheRankHeader.vue';
import TheBasicHeader from '@/layouts/header/TheBasicHeader.vue';
import MovieDetailsSearchView from '@/views/moviedetails/MovieDetailsSearchView.vue';
import MovieDetailsView from '@/views/moviedetails/MovieDetailsView.vue';
import StatisticsView from '@/views/statistics/StatisticsView.vue';
import ChatRoomView from '@/views/chat/ChatRoomView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		redirect: '/rank/total/daily',
	},
	{
		path: '/rank/total/daily',
		name: 'totalDailyRank',
		components: { default: RankView, header: TheRankHeader },
		props: { header: { periodType: 'daily' } },
	},
	{
		path: '/rank/korean/daily',
		name: 'koreanDailyRank',
		components: { default: RankView, header: TheRankHeader },
		props: { header: { periodType: 'daily' } },
	},
	{
		path: '/rank/foreign/daily',
		name: 'foreignDailyRank',
		components: { default: RankView, header: TheRankHeader },
		props: { header: { periodType: 'daily' } },
	},
	{
		path: '/rank/total/weekly',
		name: 'totalWeeklyRank',
		components: { default: RankView, header: TheRankHeader },
		props: { header: { periodType: 'weekly' } },
	},
	{
		path: '/rank/korean/weekly',
		name: 'koreanWeeklyRank',
		components: { default: RankView, header: TheRankHeader },
		props: { header: { periodType: 'weekly' } },
	},
	{
		path: '/rank/foreign/weekly',
		name: 'foreignWeeklyRank',
		components: { default: RankView, header: TheRankHeader },
		props: { header: { periodType: 'weekly' } },
	},
	{
		path: '/statistics/line-chart',
		name: 'lineChart',
		components: { default: StatisticsView, header: TheStatisticsHeader },
	},
	{
		path: '/statistics/pie-chart',
		name: 'pieChart',
		components: { default: StatisticsView, header: TheStatisticsHeader },
	},

	{ path: '/chat', name: 'chat', components: { default: ChatView, header: TheBasicHeader } },
	{ path: '/chat/:id', name: 'chatRoom', components: { default: ChatRoomView, header: TheBasicHeader } },
	{
		path: '/movie-details',
		name: 'movieDetailsSearch',
		components: { default: MovieDetailsSearchView, header: TheBasicHeader },
	},
	{
		path: '/movie-details/:id',
		name: 'movieDetails',
		components: { default: MovieDetailsView, header: TheBasicHeader },
	},
];

// vue-router의 기본 모드는 hash mode
// hash mode: URL이 변경될 때 전체 리소스 로딩없이 SPA page 이동만 발생
// history mode: page 재로딩 발생
const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
