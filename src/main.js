import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store/index';

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBabge from './components/ui/BaseBabge.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-babge', BaseBabge);

app.mount('#app');
