import { createApp } from 'vue';
import App from './App.vue';
import routing from './router';
import { createPinia } from 'pinia'; 
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(routing);
app.mount('#app');
