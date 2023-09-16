<template>
	<v-row>
		<v-col cols="2"></v-col>
		<v-col>
			<v-autocomplete v-model="moviesId" :items="movieTitleSearchResult" item-value="moviesId" :placeholder="searchBoxPlaceHolder" no-data-text="검색 결과가 없습니다." auto-select-first prepend-inner-icon="mdi-magnify" rounded variant="solo"></v-autocomplete>
		</v-col>
		<v-col cols="2"></v-col>
	</v-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const moviesId = ref();

watch(moviesId, () => emits('search', moviesId.value));

defineProps({
	searchBoxPlaceHolder: {
		type: String,
	},
	movieTitleSearchResult: {
		type: Array,
	},
});
const emits = defineEmits(['search']);
</script>

<style lang="scss" scoped></style>
