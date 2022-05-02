<template>
  <div class="shop-cart-section">
    <!-- discount bar when no popup -->
    <div v-if="!isEmpty && !show" class="cart-discount-bar">
      <p v-if="!discountIsApplied">
        满{{ discountBar }}减{{ discountApplied }}元，还差{{ discountLeft }}元
        <a class="anchor-pure"
          >去凑单<span class="calc-icon material-icons-outlined">
            chevron_right
          </span></a
        >
      </p>
      <p v-else>已减{{ discountLeft }}元</p>
    </div>
    <!-- *** discount bar *** -->

    <div class="shop-cart">
      <!-- main cart component -->
      <div class="cart-wrapper">
        <div class="left-container" @click="showCartPopup">
          <div
            :class="{ 'icon-container-active': !isEmpty }"
            id="cart-target"
            class="icon-container"
          >
            <span class="cart-icon material-icons-outlined">shopping_cart</span>

            <div v-if="!isEmpty" class="cart-count-container">
              <span class="cart-count-num">{{ totalCount }}</span>
            </div>
          </div>

          <div class="price-container">
            <div class="price-top">
              <p v-if="!isEmpty">
                <span class="price-final">
                  ￥
                  <span class="price-bold">{{ finalPrice }}</span>
                </span>
                <span v-if="discountIsApplied" class="price-old"
                  >￥{{ oldPrice }}</span
                >
              </p>

              <span v-else class="price-none">未选购商品</span>
            </div>
            <p class="delivery">
              另需配送费￥{{ delivery }}
              <span v-if="oldDelivery" class="delivery-old"
                >￥{{ oldDelivery }}</span
              >
            </p>
          </div>
        </div>
        <div class="right-container">
          <a
            @click="checkout"
            :class="{ 'btn-active': !isEmpty && oldPrice >= minFee }"
            class="btn"
          >
            <span>{{ btnText }}</span>
          </a>
        </div>
      </div>
    </div>
    <!-- *** main cart component *** -->

    <!-- cart details popup -->
    <van-overlay class="overlay" :show="show" @click="show = false">
      <div :class="{ popUp: show }" class="pop-wrapper" @click.stop>
        <div class="pop-fixed">
          <div class="cart-discount-bar-pop">
            <p v-if="!discountIsApplied">
              满{{ discountBar }}减{{ discountApplied }}元，还差{{
                discountLeft
              }}元
              <a class="anchor-pure"
                >去凑单<span class="calc-icon material-icons-outlined">
                  chevron_right
                </span></a
              >
            </p>
            <p v-else>已减{{ discountLeft }}元</p>
          </div>
          <div class="pop-title-container">
            <p class="pop-title-left">已选商品</p>

            <div @click="confirmClear" class="clear">
              <span class="clear-icon material-icons-outlined"> delete </span>
              <span>清空</span>
            </div>
          </div>
        </div>

        <div v-if="cart" class="cart-pop-main">
          <div
            @click="switchDetails(item)"
            v-for="(item, i) in cart.items"
            :key="i"
            class="pop-body-container"
          >
            <div class="pop-item-container">
              <div class="pop-left">
                <van-image
                  class="pop-img"
                  radius="4"
                  fit="cover"
                  lazy-load
                  :src="item.img"
                >
                </van-image>
              </div>
              <div class="pop-right">
                <div class="pop-text">
                  <p class="pop-name">{{ item.name }}</p>
                </div>
                <div class="bottom">
                  <p class="pop-price">
                    ￥{{ formatNum(item.price * item.count) }}
                  </p>
                  <add-to-cart
                    :haveInitializer="false"
                    :isFromCart="true"
                    :item="item"
                  ></add-to-cart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- *** cart details popup *** -->

    <!-- clear cart CTA -->
    <van-popup v-model:show="showCTA" closeable round>
      <div class="cta-container">
        <p class="cta-title">确定清空购物车？</p>
        <div class="cta-actions">
          <van-button
            class="cta-cancel"
            @click="showCTA = false"
            size="small"
            round
            plain
            color="#47b6fd"
            >取消
          </van-button>
          <van-button
            class="cta-confirm"
            @click="clearCart"
            size="small"
            round
            color="#47b6fd"
            >确定
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import AddToCart from "@/components/menu/AddToCart.vue";

export default {
  components: {
    AddToCart,
  },
  data() {
    return {
      show: false,
      showCTA: false,
      discounts: [
        {
          bar: 69,
          discount: 10,
        },
        {
          bar: 89,
          discount: 25,
        },
      ],
      discountIsApplied: false,
      discountBar: 0,
      discountApplied: 0,
      timesPassed: 0,
    };
  },
  computed: {
    minFee() {
      return this.shopInfo.float_minimum_order_amount;
    },
    discountLeft() {
      return this.calculateDiscount();
    },
    shopInfo() {
      return this.$store.getters.shop;
    },
    shopId() {
      return this.$store.getters.shop.id;
    },
    cart() {
      const carts = this.$store.getters.doneCarts;
      if (carts.length === 0) {
        return null;
      } else {
        const cart = carts.find((cart) => cart.id === this.shopId);
        return cart;
      }
    },
    totalCount() {
      let final = 0;
      let cart = this.cart;
      if (cart) {
        for (let item of cart.items) {
          final += item.count;
        }
      } else {
        final = 0;
      }
      return final;
    },
    isEmpty() {
      if (!this.cart) {
        return true;
      } else {
        return this.cart.items.length === 0 ? true : false;
      }
    },
    oldPrice() {
      if (this.isEmpty) {
        return 0;
      }
      let price = 0;
      for (let item of this.cart.items) {
        price += item.count * item.price;
      }
      return this.formatNum(price);
    },
    finalPrice() {
      if (this.isEmpty) return 0;
      if (this.discountIsApplied) {
        return this.formatNum(this.oldPrice - this.discountApplied);
      } else {
        return this.oldPrice;
      }
    },
    btnText() {
      if (this.isEmpty) {
        return `￥${this.minFee}起送`;
      } else if (this.oldPrice < this.minFee) {
        return `差￥${this.formatNum(this.minFee - this.oldPrice)}起送`;
      } else {
        return "去结算";
      }
    },
    delivery() {
      return this.$store.getters.shop.delivery_fee_discount;
    },
    oldDelivery() {
      return this.$store.getters.shop.float_delivery_fee;
    },
    // discountsShown() {
    //     let discounts = this.shop.rst.activities[0].tips;
    //     discounts = discounts.split('，')
    //     return discounts;
    // },
  },
  methods: {
    formatNum(num) {
      return parseFloat(num.toFixed(2));
    },
    calculateDiscount() {
      this.setBar();
      if (this.oldPrice !== 0 && this.oldPrice < this.discountBar) {
        if (this.timesPassed > 0) {
          this.discountIsApplied = true;
          return this.discounts[this.timesPassed - 1].discount;
        }
        this.discountIsApplied = false;
        return this.formatNum(this.discountBar - this.oldPrice);
      } else if (this.oldPrice === 0) {
        this.discountIsApplied = false;
        return 0;
      } else {
        this.discountIsApplied = true;
        return this.discountApplied;
      }
    },
    setBar() {
      this.timesPassed = 0;
      const lastIdx = this.discounts.length - 1;
      if (this.oldPrice > this.discounts[lastIdx].bar) {
        this.discountBar = this.discounts[lastIdx].bar;
        this.discountApplied = this.discounts[lastIdx].discount;
      } else {
        for (let el of this.discounts) {
          if (this.oldPrice > el.bar) {
            this.timesPassed++;
          }
          if (this.oldPrice <= el.bar) {
            this.discountBar = el.bar;
            this.discountApplied = el.discount;
            return;
          }
        }
      }
    },
    showCartPopup() {
      if (!this.isEmpty) {
        this.show = !this.show;
      } else {
        this.show = false;
      }
    },
    confirmClear() {
      this.showCTA = true;
    },
    clearCart() {
      this.$store.dispatch("resetCart", this.shopId);
      this.showCTA = false;
    },
    switchDetails(item) {
      this.show = false;
      this.$router.push({ name: "foodDetails", params: { foodId: item.id } });
    },
    beforeCheckout() {
      const cartInfo = {
        shopId: this.shopId,
        price: {
          oldPrice: this.oldPrice,
          finalPrice: this.finalPrice,
        },
        delivery: {
          oldDelivery: this.oldDelivery,
          finalDelivery: this.delivery,
        },
        coupon: {
          discountIsApplied: this.discountIsApplied,
          discountBar: this.discountBar,
          discountApplied: this.discountApplied,
          discountLeft: this.discountLeft,
          discounts: this.discounts,
        },
      };
      this.$store.dispatch("getCart", cartInfo);
    },
    checkout() {
      this.beforeCheckout();
      this.$router.push({
        name: "shopCheckout",
        params: {
          shopId: this.$route.params.shopId,
        },
      });
    },
  },
  watch: {
    cart: {
      handler() {
        if (this.isEmpty) {
          this.$store.dispatch("resetCart", this.shopId);
          this.show = false;
        }
        console.log("cart is now:");
        console.log(this.cart);
      },
      deep: true,
    },
  },
  mounted() {
    // console.log(this.shopInfo)
    // this.shopInfo
  },
};
</script>

<style scoped>
.cart-discount-bar {
  position: fixed;
  left: 0;
  bottom: 7vh;
  width: 100%;
  background-color: #fcf5db;
  height: 3.2vh;
  text-align: center;
  z-index: 5;
  font-size: 1.6vh;
}

.cart-discount-bar-pop {
  width: 100%;
  background-color: #fcf5db;
  height: 3.2vh;
  text-align: center;
  font-size: 1.6vh;
}

.cart-discount-bar p,
.cart-discount-bar-pop p {
  margin: auto;
  display: inline;
  line-height: 3.2vh;
}

.calc-icon {
  font-size: 1.6vh;
  transform: translateY(10%);
}

.shop-cart {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.94);
  height: 7vh;
  z-index: 5;
}

.cart-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 2px 12px;
  height: 100%;
  width: 100%;
  /* position: fixed;
  left: 0;
  bottom: 0; */
}

.left-container {
  display: flex;
  width: 60%;
  align-items: center;
}

.icon-container {
  background-color: #cccccc;
  height: 5vh;
  width: 5vh;
  border-radius: 50%;
  text-align: center;
  margin-right: 1vh;
  position: relative;
}

.icon-container-active {
  background-color: #47b6fd;
  cursor: pointer;
}

.cart-icon {
  line-height: 5vh;
  color: #fff;
}

.price-container {
  height: 5vh;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.price-top {
  line-height: 0.9;
  font-size: 2vh;
  margin-bottom: 2px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.price-none {
  color: #9f9f9f;
  font-size: 1.6vh;
  font-weight: bold;
  line-height: 1.4;
}

.price-old {
  text-decoration: line-through;
  margin-left: 4px;
  color: #9f9f9f;
  font-size: 1.6vh;
}

.price-bold {
  font-size: 2.2vh;
  font-weight: bold;
}

.delivery {
  font-size: 1.4vh;
  color: #9f9f9f;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.delivery-old {
  text-decoration: line-through;
}

.right-container {
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: flex-end;
}

.btn {
  width: 100%;
  max-width: 180px;
  text-align: center;
  line-height: 5vh;
  border-radius: 200px;
  background-color: grey;
  font-size: 1.8vh;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 2vw;
  pointer-events: none;
  color: #fff;
}

.btn:link,
.btn:visited {
  text-decoration: none;
  color: #fff;
}

.btn-active {
  background-color: #47b6fd;
  pointer-events: all;
}

.cart-count-num {
  font-size: 0.76rem;
  color: white;
  line-height: 0.9;
  margin: auto;
}

.cart-count-container {
  background-color: #ff5339;
  border-radius: 50%;
  width: 2vh;
  height: 2vh;
  text-align: center;
  position: absolute;
  right: -0.6vh;
  top: -0.2vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.anchor-pure {
  color: #fe4a32;
}

.anchor-pure:link,
.anchor-pure:visited {
  text-decoration: none;
}

/* helpers  */
.mr-2 {
  margin-right: 2%;
}

.mb-2 {
  margin-bottom: 2%;
}

/* *** */

/* cart popup  */

.overlay {
  height: calc(100% - 7vh);
  z-index: 6;
}

.pop-wrapper {
  position: fixed;
  box-sizing: border-box;
  bottom: 6.9vh;
  width: 100%;
  background-color: #fff;
  z-index: 1;
  /* max-height: 70vh; */
}

.cart-pop-main {
  height: 100%;
  max-height: 350px;
  overflow: scroll;
}

.popUp {
  animation: popUp 0.3s ease-in-out;
}

@keyframes popUp {
  0% {
    opacity: 0;
    transform: translateY(50%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.pop-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.2vh;
  padding: 2px 12px;
  font-size: 1.6vh;
}

.clear {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5vh;
  color: #666;
  line-height: 2vh;
  cursor: pointer;
}

.clear-icon {
  font-size: 2vh;
}

.pop-body-container {
  height: 10vh;
  max-height: 100px;
  margin-bottom: 8px;
}

.pop-item-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 2px 12px;
  width: 100%;
  height: 100%;
}

.pop-left {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  margin-right: 6px;
}

.pop-right {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.pop-img {
  width: 18vw;
  max-width: 100px;
  max-height: 100px;
}

.pop-text {
  width: 70%;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.pop-name {
  font-size: 1.6vh;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* margin-bottom: 10px; */
}

.pop-price {
  font-size: 2.2vh;
  font-weight: bold;
  color: #47b6fd;
  width: 100%;
}

/* *** */

/* cta  */
.cta-container {
  text-align: center;
  width: 80vw;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cta-title {
  font-size: 2vh;
  font-weight: bold;
  margin: 6% 0;
}

.cta-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-bottom: 1.4vh;
}

.cta-cancel,
.cta-confirm {
  padding: 10px 20px;
  font-size: 1.8vh;
  width: 45%;
}

/* *** cta ***  */
</style>
