<template>
	<v-container v-if="movieTitleSearchResult.length == 0">
		<LoadingSpinner />
	</v-container>
	<SearchBox v-else searchBoxPlaceHolder="채팅방 검색" :movie-title-search-result="movieTitleSearchResult" @search="search" />
</template>

<script setup lang="ts">
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { onMounted, ref } from 'vue';
import SearchBox from '@/components/common/SearchBox.vue';
import { useUsersStore } from '@/store/users';
import router from '@/plugins';
import { findMoviesByTitleApi } from '@/api/movies';

const user = useUsersStore();
const search = (moviesId: String) => router.push(`/chat/${moviesId}`);
const movieTitleSearchResult = ref([]);

onMounted(async () => {
	if (!user.isLogin) {
		router.push('/');
	}
	const res: any = await findMoviesByTitleApi('', false);
	movieTitleSearchResult.value = res.data.movies;
});
</script>

<style scoped></style>
