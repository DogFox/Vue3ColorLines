import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import './styles/tailwind.css';

createApp(App).use(store).mount('#app');
