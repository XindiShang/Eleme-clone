<template>
  <div class="home">
    <section class="address-wrapper">
      <div class="address-bar">
        <div class="address-bar-left" @click="switchAddressPage">
          <p>{{ address }}</p>
          <span class="material-icons-outlined">arrow_drop_down</span>
        </div>
        <div class="address-bar-right">
          <span class="material-icons-outlined">shopping_cart</span>
          <span class="material-icons-outlined">sms</span>
        </div>
      </div>
    </section>

    <section class="search-wrapper">
      <div class="search-bar">
        <div class="search-bar-left">
          <span class="material-icons-outlined">qr_code_scanner</span>
          <div class="divider"></div>
          <p>搜索商家</p>
        </div>
        <div class="search-bar-right">
          <button>搜索</button>
        </div>
      </div>
    </section>

    <div class="container">
      <icons-panel></icons-panel>
      <beans-notification></beans-notification>
      <grid-items></grid-items>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" lazy-render>
        <van-swipe-item v-for="(img, i) in swipeImgs" :key="i">
          <img :src="img" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
// import BaseHeader from '../components/BaseHeader.vue';
import { Swipe, SwipeItem } from 'vant';
import IconsPanel from '../components/IconsPanel.vue';
import GridItems from '../components/GridItems.vue';
import BeansNotification from '../components/BeansNotification.vue';

export default {
  components: {
    // BaseHeader,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    IconsPanel,
    GridItems,
    BeansNotification,

  },
  data() {
    return {
      swipeImgs: [],

    }
  },
  computed: {
    address() {
      if (!this.$store.getters.doneAddress) {
        return '定位中...';
      }
      return this.$store.getters.doneAddress;
    },
    place() {
      if (!this.$store.getters.donePlace) {
        return '定位中...';
      }
      return this.$store.getters.donePlace;
    }
  },
  methods: {
    switchAddressPage() {
      this.$router.push('/address');
    },
    getData() {
      this.$axios("/api/profile/shopping").then(res => {
        this.swipeImgs = res.data.swipeImgs;
        // this.entries = res.data.entries;
      });
      // this.$axios("/api/profile/filter").then(res => {
      //   // console.log(res.data);
      //   this.filterData = res.data;
      // });
      // this.loadData();
    }
  },
  created() {
    this.getData();
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f1f1f1;
  /* background-color: red; */
}

.address-wrapper {
  background-color: white;
  padding: 18px 16px 4px 16px;
  /* height: 9%; */
  width: auto;
}
.search-wrapper {
  background-color: white;
  padding: 0 16px 4px 16px;
  /* height: 9%; */
  width: auto;
}

.container {
  height: 2000px;
}
.address-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.address-bar-left {
  width: 40%;
  font-size: 18px;
}

.address-bar-left p {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: calc(80%);
}

.address-bar-left span {
  font-size: 20px;
}

.address-bar-right {
  width: 18%;
  display: flex;
  justify-content: space-between;
}

.search-bar {
  width: 100%;
  height: 28px;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgb(14, 179, 255);
  border-radius: 20px;
  font-size: 13px;
  padding: 6px 0 0 0;
}

.search-bar-left {
  width: 40%;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 6px;
}

.search-bar-left span {
  color: rgb(14, 179, 255);
  margin: 0 4px;
}
.search-bar-left p {
  height: 70%;
  line-height: 1.2;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 4px;
  width: calc(80%);
  color: #ccc;
}

.divider {
  height: 70%;
  width: 1px;
  background: #ccc;
  margin: 0 4px;
}
.search-bar-right {
  width: 14%;
  position: relative;
  left: 1px;
}
.search-bar-right button {
  width: 100%;
  height: 101%;
  border-radius: 20px;
  border: none;
  padding: 0;
  background-image: linear-gradient(to right, #69bee6, #29a9db, #2b99dd);
  color: white;
  font-weight: 200;
}

.my-swipe {
  height: 100px;
  border-radius: 6px;
  margin: 2px 14px 6px 14px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 100%;
  text-align: center;
  background-color: transparent;
}

.my-swipe img {
  border-radius: 6px;
  width: 100%;
  height: 100px;
}
</style>