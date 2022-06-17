import { createApp } from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
import router from './router';
import BootstrapVue from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(BootstrapVue);
app.use(router);
app.mount('#app');
