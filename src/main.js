import { createApp } from "vue";
import App from "./App.vue";
import {
  Toast,
  Button,
  Tag,
  Sticky,
  Image as VanImage,
  Lazyload,
  Badge,
  PullRefresh,
  List,
  Swipe,
  SwipeItem,
  Popup,
  NoticeBar,
  Tab,
  Tabs,
  Overlay,
  ShareSheet,
  Rate,
  ImagePreview,
  ActionSheet,
  Popover,
  SwipeCell,
  AddressList,
  Picker,
  Field,
  CellGroup,
  CountDown,
  Skeleton
} from "vant";
import router from "./router";
import store from "./store";
import axios from "axios";

// axios.defaults.baseURL = 'https://ele-interface.herokuapp.com/';

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
app.use(Swipe);
app.use(SwipeItem);
app.use(Popup);
app.use(NoticeBar);
app.use(Tab);
app.use(Tabs);
app.use(Overlay);
app.use(ShareSheet);
app.use(Rate);
app.use(ImagePreview);
app.use(ActionSheet);
app.use(Popover);
app.use(SwipeCell);
app.use(AddressList);
app.use(Picker);
app.use(Field);
app.use(CellGroup);
app.use(CountDown);
app.use(Skeleton);

axios.interceptors.request.use(
  (config) => {
    // console.log(config)
    if (!config.url.includes("restaurants")) {
      Toast.loading({
        message: "加载中",
        forbidClick: true,
      });
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (res) => {
    Toast.clear();
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

app.config.globalProperties.$axios = axios;
app.config.unwrapInjectedRef = true;

app.use(store);
app.use(router);
app.mount("#app");
