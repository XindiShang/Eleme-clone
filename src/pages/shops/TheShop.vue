<template>
  <section class="shop" ref="shop">
    <div v-if="!isLoading" class="shop-wrapper">
      <!-- header part  -->
      <shop-header
        v-if="!isDetails"
        :early="early"
        :mid="mid"
        :late="late"
        :final="final"
      ></shop-header>
      <van-image
        v-if="!isDetails"
        class="shop-bg-image"
        lazy-load
        fit="cover"
        :src="shopBackground"
      />
      <div v-if="!isDetails" class="lift-area">
        <shop-card
          @show-discount="toggleDiscountShow"
          @show-info="toggleInfoShow"
          :shop="shopInfo"
          class="shop-info"
        />
        <!-- navbar  -->
        <shop-nav class="shop-nav" />
      </div>
      <!-- nav content: 1. menu 2. reviews 3. seller info  -->
      <router-view @share="hideCart" class="shop-body" v-slot="{ Component }">
        <transition name="slide">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>

      <!-- header popups -->
      <div v-if="!isDetails" class="">
        <discount-popup
          :shop="shopInfo"
          :discountIsShown="discountIsShown"
          @close-popup="toggleDiscountShow"
        >
        </discount-popup>

        <shop-info-popup
          :shop="shopInfo"
          :infoIsShown="infoIsShown"
          @close-popup="toggleInfoShow"
        >
        </shop-info-popup>
      </div>

      <!-- shopping cart for menu and reviews section  -->
      <keep-alive>
        <shop-cart v-if="showCart && !shareIsOn"></shop-cart>
      </keep-alive>
    </div>
  </section>
</template>

<script>
import ShopHeader from "../../components/shop/ShopHeader.vue";
import ShopCard from "../../components/shop/ShopCard.vue";
import DiscountPopup from "../../components/shop/DiscountPopup.vue";
import ShopInfoPopup from "../../components/shop/ShopInfoPopup.vue";
import ShopNav from "@/components/shop/ShopNav.vue";
import ShopCart from "@/components/shop/ShopCart.vue";
import { Toast } from "vant";

export default {
  components: {
    ShopHeader,
    ShopCard,
    DiscountPopup,
    ShopInfoPopup,
    ShopNav,
    ShopCart,
  },

  data() {
    return {
      shopInfo: null,
      shopBackground: null,
      isLoading: null,
      early: false,
      mid: false,
      late: false,
      final: false,
      discountIsShown: false,
      infoIsShown: false,
      shareIsOn: false,
    };
  },
  computed: {
    shopId() {
      return this.$store.getters.shop.id;
    },
    showCart() {
      return this.$route.name !== "seller";
    },
    isDetails() {
      return this.$route.name === "foodDetails";
    },
    hasCart() {
      const carts = this.$store.getters.doneCarts;
      if (carts.length === 0) {
        return false;
      } else {
        const cart = carts.find((cart) => cart.id === this.shopInfo.id);
        if (cart) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    const shop = this.$refs.shop;
    const that = this;
    shop.addEventListener("scroll", function () {
      that.early = false;
      that.mid = false;
      that.late = false;
      that.final = false;

      if (shop.scrollTop >= 10 && shop.scrollTop < 30) {
        that.early = true;
      } else if (shop.scrollTop >= 30 && shop.scrollTop <= 50) {
        that.mid = true;
      } else if (shop.scrollTop >= 50 && shop.scrollTop < 80) {
        that.late = true;
      } else if (shop.scrollTop >= 80) {
        that.final = true;
      } else {
        that.early = false;
      }
    });
  },
  methods: {
    async getData() {
      this.isLoading = true;
      const targetId = "E13877065492319327992";
      try {
        const response = await this.$axios(
          `https://eleme-clone-default-rtdb.asia-southeast1.firebasedatabase.app/shops/${targetId}.json`
        );
        const shop = await response.data;
        console.log(shop);
        this.shopInfo = shop;
        this.shopBackground = shop.scheme;
        this.$store.commit("setShop", shop);
      } catch (e) {
        Toast("获取商家信息失败，请重试");
      }

      this.isLoading = false;
    },
    toggleDiscountShow() {
      this.discountIsShown = !this.discountIsShown;
    },
    toggleInfoShow() {
      this.infoIsShown = !this.infoIsShown;
    },
    hideCart(payload) {
      this.shareIsOn = payload;
    },
    onClickTab() {
      console.log(this.activeName);
    },
  },
};
</script>

<style scoped>
.slide-leave-active,
.slide-enter-active {
  transition: 0.5s ease;
}

.slide-enter-from {
  transform: translate(100%, 0);
}

.slide-leave-to {
  transform: translate(-100%, 0);
}

.shop {
  width: 100%;
  height: 100%;
  overflow: scroll;
  box-sizing: border-box;
  background-color: #fafafa;
}

.shop-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.shop-bg-image {
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 14vh;
  max-height: 10rem;
}

.lift-area {
  position: relative;
  bottom: 6%;
}

.shop-body {
  position: relative;
  bottom: 6%;
  /* width: 100%;
  height: 100%; */
  /* display: initial;
  overflow: scroll; */
}

</style>
