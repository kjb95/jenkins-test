import { createApp } from 'vue';
import App from './App.vue';
import router from '@/plugins';
import vuetify from '@/plugins/vuetify';
import { createPinia } from 'pinia';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import ECharts from 'vue-echarts';

import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts-gl';
const pinia = createPinia();

createApp(App).use(vuetify).use(router).use(pinia).component('VueDatePicker', VueDatePicker).component('v-chart', ECharts).mount('#app');
