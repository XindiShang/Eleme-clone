<template>
  <div v-if="item" class="item-details">
    <header class="details-header">
      <div @click="switchPageBack" class="icon-circle">
        <span class="header-icon material-icons-outlined">
          arrow_back_ios
        </span>
      </div>

      <div @click="openShare" class="icon-circle">
        <span class="header-icon material-icons-outlined">
          share
        </span>
      </div>
    </header>

    <section class="details-body">
      <van-image class="details-img" fit="cover" :src="item.image_path" lazy-load></van-image>

      <div class="card">
        <div class="mb-2">
          <h3 class="card-title mb-1">{{ item.name }}</h3>
          <p class="card-subtitle">
            <span class="mr-1">月售{{ item.month_sales }}份</span>
            <span>好评率{{ item.satisfy_rate }}%</span>
          </p>
        </div>


        <div class="food-item-action">
          <span class="price">￥<strong class="price-bold">{{ item.activity.fixed_price }}</strong>
          </span>
          <div class="action-container">
            <add-to-cart class="action-component" :haveInitializer="true" :isFromCart="false" :item="item">
            </add-to-cart>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="des-title mb-1">
          <p>商品详情</p>
        </div>
        <div class="des-subtitle">
          <p>{{ item.description }}</p>
        </div>
      </div>

      <div class="card">
        <div class="des-title mb-1">
          <p>商品评价</p>
        </div>

        <div class="filters-container mb-1">
          <a @click="setFilter(i)" :class="{ 'review-filter-active': currentFilter === i }"
            v-for="(filter, i) in reviewFilters" :key="i" class="review-filter">{{ filter.name }} <span
              v-if="i === 0">{{ randNum }}</span> </a>
        </div>
      </div>

      <div class="review-skim">
        <span @click="toggleSkim" v-if="isSkimmed" class="checked mr-1 material-icons">
          check_circle
        </span>
        <span @click="toggleSkim" v-else class="uncheck mr-1 material-icons-outlined">
          radio_button_unchecked
        </span>
        <p class="skim-text">只看有内容的评价</p>
      </div>
    </section>
    <van-share-sheet class="share-panel" v-model:show="showShare" duration="0.15" close-on-popstate title="分享到" :options="options" @select="onSelect" />
  </div>
</template>

<script>
import AddToCart from '@/components/menu/AddToCart.vue';
import { Toast } from 'vant';


export default {
  components: { AddToCart },
  props: ['foodItem'],
  emits: ['share'],
  data() {
    return {
      reviewFilters: [
        {
          name: '全部',
        },
        {
          name: '有图/视频'
        },
        {
          name: '最新'
        }],
      currentFilter: 0,
      isSkimmed: true,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
    }
  },
  computed: {
    item() {
      const menu = this.$store.getters.doneSelectedShop.menu;
      if (this.$route.params.foodItem) {
        return JSON.parse(this.$route.params.foodItem)
      } else {
        for (let menuItem of menu) {
          for (let foodItem of menuItem.foods) {
            if (foodItem.item_id === this.$route.params.foodId) {
              return foodItem;
            }
          }
        }
        return null
      }

      // return JSON.parse(this.$route.params.foodItem)
    },
    randNum() {
      return Math.floor(Math.random() * 1000 + 1);
    }

  },
  methods: {
    setFilter(filterId) {
      this.currentFilter = filterId;

    },
    toggleSkim() {
      this.isSkimmed = !this.isSkimmed;
    },
    switchPageBack() {
      this.$router.back();
    },
    openShare() {
      this.showShare = true;
    },
    onSelect(option) {
      Toast(option.name);
    },

  },
  watch: {
    showShare(val) {
      this.$emit('share', val)
    }
  }

}
</script>

<style scoped>
.item-details {
  background-color: #f6f6f6;
  height: 93vh !important;
  width: 100%;
  position: absolute !important;
  top: 0;
  left: 0;
  z-index: 5;
}

.details-header {
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
}

.icon-circle {
  width: 3vh;
  height: 3vh;
  background-color: #878787d1;
  border-radius: 50%;
  text-align: center;
  z-index: 6;

}

.header-icon {
  font-size: 2vh;
  line-height: 3vh;
  color: #fff;
}

.details-body {
  position: absolute;
  top: 0;
  left: 0;
}

.details-img {
  width: 100vw;
  height: 40vh;
  z-index: 1;
}

.card {
  margin: 8px 12px;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2vh;
}

.card-title {
  font-size: 2vh;
  font-weight: bold;
}

.card-subtitle {
  color: #999;
  font-size: 1vh;
  line-height: 1;
  min-height: 1em;
}

.food-item-action {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
}

.price {
  font-size: 0.7rem;
  line-height: 4.266667vw;
  color: #fe4a32;
  padding-bottom: 0.933333vw;
  vertical-align: text-bottom;
}

.price-bold {
  font-size: 3vh;
}

.action-container {
  width: 36%;
  height: 100%;
}

.des-title {
  font-size: 1.6vh;
  font-weight: bold;
}

.des-subtitle {
  font-size: 1.5vh;
}

.filters-container {
  width: 100%;
  margin-top: 1vh;
}

.review-filter {
  width: 30%;
  background-color: #f6f6f6;
  padding: 1vh 1.3vh;
  margin-right: 2vw;
  border-radius: 4px;
  font-size: 1vh;

}

.review-filter:link,
.review-filter:visited {
  text-decoration: none;
  color: #000;
}

.review-skim {
  display: flex;
  align-items: center;
  font-size: 2vh;
  padding: 8px 24px;
}

.review-filter-active {
  background-color: #e6f7ff;
  color: #00b6fd;
}

.uncheck {
  color: #999;
  font-size: 2.6vh;

}

.checked {
  color: #00b6fd;
  font-size: 2.6vh;

}

.skim-text {
  font-size: 1vh;
  line-height: 2.6vh;
}

.mr-1 {
  margin-right: 2%;
}

.mb-1 {
  margin-bottom: 1vh;
}

.mb-2 {
  margin-bottom: 2vh;
}
</style>