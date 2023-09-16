<template>
	<v-row>
		<v-col cols="3"></v-col>
		<v-col cols="2" align="center">
			<v-img v-if="movieData.poster == ''" :src="noImg" cover />
			<v-img v-else :src="movieData.poster" cover />
			<v-btn class="mt-5 font-weight-bold" color="pink" @click="() => router.push(`/chat/${moviesId}`)">채팅방 입장하기</v-btn>
		</v-col>
		<v-col class="ml-10">
			<br />
			<div class="font-weight-bold text-h4" v-text="movieData.title"></div>
			<br />
			<div v-if="movieData.openingDate != null" class="mt-2"><span class="font-weight-bold">개봉일: </span><span v-text="movieData.openingDate"></span></div>
			<div v-if="movieData.genre != ''" class="mt-2"><span class="font-weight-bold">장르: </span><span v-text="movieData.genre"></span></div>
			<div v-if="movieData.nation != ''" class="mt-2"><span class="font-weight-bold">제작국가: </span><span v-text="movieData.nation"></span></div>
			<div v-if="movieData.company != ''" class="mt-2"><span class="font-weight-bold">제작사: </span><span v-text="movieData.company"></span></div>
			<div v-if="movieData.runtime != ''" class="mt-2"><span class="font-weight-bold">상영시간: </span><span v-text="movieData.runtime"></span>분</div>
			<div v-if="movieData.ratingGrade != ''" class="mt-2"><span class="font-weight-bold">관람등급: </span><span v-text="movieData.ratingGrade"></span></div>
		</v-col>
		<v-col cols="3"></v-col>
	</v-row>
	<BarCharts class="mt-5" />
</template>

<script setup lang="ts">
import { findMoviesByIdApi } from '@/api/movies';
import { useRoute } from 'vue-router';
import { computed, onMounted, reactive } from 'vue';
import noImg from '@/assets/no_img.jpeg';
import BarCharts from '@/components/moviedetails/BarCharts.vue';
import router from '@/plugins';

const route = useRoute();
const moviesId = computed(() => route.path.split('/')[2]);
const movieData = reactive({
	title: '',
	openingDate: '',
	poster: '',
	genre: '',
	nation: '',
	company: '',
	runtime: '',
	ratingGrade: '',
});

onMounted(async () => {
	const res: any = await findMoviesByIdApi(moviesId.value);
	const data = res.data.movies[0];
	movieData.title = data.title;
	movieData.openingDate = data.openingDate;
	movieData.poster = data.poster;
	movieData.genre = data.genre;
	movieData.nation = data.nation;
	movieData.company = data.company;
	movieData.runtime = data.runtime;
	movieData.ratingGrade = data.ratingGrade;
});
</script>

<style scoped></style>
