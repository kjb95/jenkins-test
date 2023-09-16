<template>
	<v-container v-if="movieTitleSearchResult.length == 0">
		<LoadingSpinner />
	</v-container>
	<SearchBox v-else searchBoxPlaceHolder="영화명 검색" :movie-title-search-result="movieTitleSearchResult" @search="search" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import SearchBox from '@/components/common/SearchBox.vue';
import { findMoviesByTitleApi } from '@/api/movies';
import router from '@/plugins';

const movieTitleSearchResult = ref([]);

onMounted(async () => {
	const res: any = await findMoviesByTitleApi('', false);
	movieTitleSearchResult.value = res.data.movies;
});

const search = (moviesId: String) => router.push(`/movie-details/${moviesId}`);
</script>

<style scoped></style>
