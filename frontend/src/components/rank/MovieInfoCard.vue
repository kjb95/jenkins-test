<template>
	<v-container class="mt-3">
		<RouterLink :to="movieDetailsPath">
			<v-row justify="center" style="margin-top: -50px">
				<v-col cols="4" />
				<v-col class="text-center">
					<div v-text="rank" class="text-h4 font-weight-bold"></div>
				</v-col>
				<v-col cols="4" class="mt-2">
					<div v-if="newRank" class="font-weight-bold text-red">NEW</div>
					<div v-else-if="rankIncrement > 0" v-text="`▲${rankIncrement}`" class="text-red"></div>
					<div v-else-if="rankIncrement < 0" v-text="`▼${-rankIncrement}`" class="text-blue"></div>
				</v-col>
			</v-row>
			<v-row style="margin-top: -20px">
				<v-col>
					<v-img v-if="poster == ''" :src="noImg" height="280px" width="170px" cover />
					<v-img v-else :src="poster" height="280px" width="170px" cover />
				</v-col>
			</v-row>
			<v-row style="margin-top: -10px">
				<div v-text="parsedTitle" class="ml-3 font-weight-bold"></div>
			</v-row>
			<v-row class="font-weight-bold" style="margin-top: -20px">
				<v-col cols="7">
					<div v-text="openingDate" class="text-grey text-caption"></div>
				</v-col>
				<v-col>
					<div v-text="parsedAudienceCount" class="text-grey text-caption"></div>
				</v-col>
			</v-row>
		</RouterLink>
	</v-container>
</template>

<script setup lang="ts">
import { shortenText } from '@/utils/stringUtils';
import { computed } from 'vue';
import noImg from '@/assets/no_img.jpeg';

const props = defineProps({
	moviesId: { Type: Number, required: true, default: 0 },
	audienceCount: { Type: Number, required: true, default: 1 },
	newRank: { Type: Boolean, required: true, default: false },
	openingDate: { Type: String, required: true, default: '' },
	poster: { Type: String, required: true, default: '' },
	rank: { Type: Number, required: true, default: 0 },
	rankIncrement: { Type: Number, required: true, default: 0 },
	title: { Type: String, required: true, default: '' },
});

const parsedTitle = computed(() => shortenText(props.title as String, 13));
const parsedAudienceCount = computed(() => props.audienceCount + '명');
const movieDetailsPath = computed(() => `/movie-details/${props.moviesId}`);
</script>
<style scoped></style>
