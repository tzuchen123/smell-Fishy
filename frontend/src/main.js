import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import { io } from 'socket.io-client';

// 連接到 Socket.IO 伺服器
const socket = io('http://localhost:3000');
const app = createApp(App);
app.config.globalProperties.$socket = socket;

app.use(router);
app.mount('#app');
