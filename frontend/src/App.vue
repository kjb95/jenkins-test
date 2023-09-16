<template>
	<v-app>
		<TheHeader />
		<TheNav />
		<TheSection class="mt-7" />
		<TheFooter />
	</v-app>
</template>

<script setup lang="ts">
import TheNav from '@/layouts/nav/TheNav.vue';
import TheHeader from '@/layouts/header/TheHeader.vue';
import TheSection from '@/layouts/section/TheSection.vue';
import TheFooter from '@/layouts/footer/TheFooter.vue';
</script>

<style>
a {
	text-decoration: none;
	color: black;
}
</style>
