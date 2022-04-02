import { createApp } from 'vue'
import App from './App.vue'
import { Toast, Button, Tag, Sticky, Image as VanImage, Lazyload, Badge, PullRefresh, List   } from 'vant';
import router from './router'
import store from './store'
import axios from 'axios';

// const print = console.log.bind(console);

const app = createApp(App);

app.use(Toast);
app.use(Button);
app.use(Tag);
app.use(Sticky);
app.use(VanImage);
app.use(Lazyload);
app.use(Badge);
app.use(PullRefresh);
app.use(List);



// axios.interceptors.request.use(config => {
//     Toast.loading({
//         message: '加载中',
//         forbidClick: true,
//     });
//     return config;
// }, err => {
//     return Promise.reject(err)
// })

// axios.interceptors.response.use(res => {
//     Toast.clear();
//     return res;
// }, err => {
//     return Promise.reject(err)
// })

app.config.globalProperties.$axios = axios;

app.use(store);
app.use(router);
app.mount('#app')
