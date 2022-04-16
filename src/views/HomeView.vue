<template>
  <div class="home" ref="home">
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

    <section ref="searchWrapper" class="search-wrapper" :class="{ 'sort-applied': isShown }">
      <div class="search-bar">
        <div @click="switchSearchPage" class="search-bar-left">
          <span class="material-icons-outlined">qr_code_scanner</span>
          <div class="divider"></div>
          <p class="search-text">搜索商家</p>
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

    <!-- shop filter nav -->
    <van-sticky :offset-top="50">
      <filter-bar @lift="scrollToShops" @get-condition="setCondition" :fixedOn="fixedOn" @searchFixed="showFilters">
      </filter-bar>
    </van-sticky>

    <shop-list :condition="conditionPassed"></shop-list>
  </div>
</template>

<script>
// import BaseHeader from '../components/BaseHeader.vue';
import { Swipe, SwipeItem } from 'vant';
import IconsPanel from '../components/home/IconsPanel.vue';
import GridItems from '../components/home/GridItems.vue';
import BeansNotification from '../components/home/BeansNotification.vue';
import FilterBar from '../components/home/FilterBar.vue';
import ShopList from '../components/home/ShopList.vue';

export default {
  components: {
    // BaseHeader,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    IconsPanel,
    GridItems,
    BeansNotification,
    FilterBar,
    ShopList,

  },
  data() {
    return {
      swipeImgs: [],
      isShown: false,
      fixedOn: false,
      scrollTop: 0,
      page: 1,
      size: 5,
      initFinished: false,
      conditionPassed: null,

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
    },


  },
  methods: {
    switchAddressPage() {
      this.$router.push('/address');
    },
    switchSearchPage() {
      this.$router.push('/search')
    },
    async getData() {
      const bannerRes = await this.$axios("/api/profile/shopping");
      const bannerData = await bannerRes.data;
      this.swipeImgs = bannerData.swipeImgs;

      const filterRes = await this.$axios("/api/profile/filter");
      const filterData = filterRes.data;
      this.$store.dispatch('getFilterData', filterData);

      // this.$axios("/api/profile/shopping").then(res => {
      //   this.swipeImgs = res.data.swipeImgs;
      // });
      // this.$axios("/api/profile/filter").then(res => {
      //   this.$store.dispatch('getFilterData', res.data);
      // });
    },
    showFilters(payload) {
      this.isShown = payload;
    },
    resetInit(payload) {
      this.initFinished = payload;
    },
    setCondition(payload) {
      this.conditionPassed = payload;

    },
    scrollToShops() {
      let homeContainer = this.$refs.home;
      // console.log(homeContainer.scrollHeight)
      homeContainer.scrollTo({
        top: 500,
        behavior: 'smooth'
      });

    }

  },
  created() {
    this.getData();
  },
  mounted() {
    let homeContainer = this.$refs.home;

    homeContainer.addEventListener('scroll', () => {
      // console.log(homeContainer.scrollTop)
      if (homeContainer.scrollTop >= 480) {
        this.fixedOn = true;
      } else {
        this.fixedOn = false;
        this.isShown = false;
      }
    })

  },


}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #fafafa;
  /* background-color: red; */
}

.address-wrapper {
  background-color: white;
  padding: 18px 16px 0 16px;
  /* height: 9%; */
  width: 100%;
}

.search-wrapper {
  background-color: white;
  padding: 4px 16px 4px 16px;
  width: 100%;
  height: 46px;
  position: sticky;
  top: -1px;
  margin-top: 0;
  z-index: 10;
}

.container {
  /* width: auto; */
}

.address-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.address-bar-left {
  width: 40%;
  font-size: 18px;
  cursor: pointer;

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
  border: 1px solid #53c1fc;
  border-radius: 20px;
  font-size: 13px;
  /* padding: 6px 0 0 0; */
  margin: 8px 0;
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
  color: #53c1fc;
  margin: 0 4px;
}

.search-text {
  height: 50%;
  line-height: 13px;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 4px;
  width: calc(80%);
  color: #ccc;
  vertical-align: text-bottom;
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
  background-image: linear-gradient(to right, #54c5ff, #4bbbfa, #46aef7);
  color: white;
  font-weight: 200;
}

.my-swipe {
  border-radius: 6px;
  margin: 2px 14px 6px 14px;
  box-sizing: border-box;
  max-height: 200px;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: transparent;
  max-height: 200px;
}

.my-swipe img {
  border-radius: 6px;
  width: 100%;
  max-height: 200px;
}

.sort-applied {
  width: auto;
  padding: 4px 16px 4px 16px;
  position: fixed;
  top: -1px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}
</style>