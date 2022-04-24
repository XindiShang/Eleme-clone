<template>
  <div v-if="cart" class="product-card">
    <div class="product-card__title mb-2">
      <p>{{ shop.rst.name }}</p>
    </div>

    <div class="product-card__main">
      <div class="main__list">
        <div v-for="(item, i) in cartShown" :key="i" class="list__item mb-1">
          <div class="list__item--info">
            <van-image
              class="list__item--img"
              radius="5"
              fit="cover"
              :src="item.img"
              lazy-load
            ></van-image>
            <div class="list__item--description text--ellipsis">
              <p class="mb-1 text--ellipsis">{{ item.name }}</p>
              <p class="text--grey text--small">x {{ item.count }}</p>
            </div>
          </div>

          <div class="list__item--price">
            <p>
              ￥ <span class="text--large">{{ item.price }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showToggle"
      @click="toggleExpand"
      class="product-card__folder mb-2"
    >
      <p>
        展开（共{{ totalCount }}件）
        <span class="folder--icon material-icons-outlined">
          expand_{{ expandText }}
        </span>
      </p>
    </div>

    <div class="product-card__description mb-2">
      <div class="description__item">
        <p class="description--title">配送费</p>
        <p class="description--text">
          ￥<span class="text--large"> {{ cart.delivery.finalDelivery }}</span>
        </p>
      </div>

      <div v-if="cart.delivery.oldDelivery" class="description__item mt-1">
        <p class="description--title text--small text--red">
          减{{ deliveryReduced }}配送费
        </p>
        <p class="description--text text--small text--delete text--grey">
          ￥{{ cart.delivery.oldDelivery }}
        </p>
      </div>
    </div>

    <div class="product-card__footer">
      <div class="footer--description">
        优惠说明
        <span class="question-icon material-icons-outlined">
          help_outline
        </span>
      </div>
      <div class="footer-container">
        <span v-if="cart.coupon.discountIsApplied" class="mr-1"
          >已优惠<span class="text--red"
            >￥{{ cart.coupon.discountApplied }}</span
          ></span
        >

        <span>小计</span>
        <span
          >￥<span class="text--extra-large">{{
            cart.price.finalPrice
          }}</span></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Object,
    },
    shop: {
      type: Object,
    },
  },
  data() {
    return {
      isExpand: false,
      cartShown: null,
    };
  },
  computed: {
    cartReduced() {
      return this.cart.items.slice(0, 4);
    },
    expandText() {
      return this.isExpand ? "less" : "more";
    },
    totalCount() {
      return this.cart.items.length;
    },
    showToggle() {
      return this.cart.items.length > 5;
    },
    deliveryReduced() {
      if (this.cart.delivery.oldDelivery) {
        return this.formatNum(
          this.cart.delivery.oldDelivery - this.cart.delivery.finalDelivery
        );
      } else {
        return this.cart.delivery.finalDelivery;
      }
    },
  },
  mounted() {
    this.initCart();
  },
  methods: {
    toggleExpand() {
      this.isExpand = !this.isExpand;
      this.isExpand
        ? (this.cartShown = this.cart.items)
        : (this.cartShown = this.cartReduced);
    },
    formatNum(num) {
      return parseFloat(num.toFixed(2));
    },
    initCart() {
      // delete first condition after finishing order view
      if (!this.cart) {
        this.cartShown = null;
      } else {
        this.cart.items.length > 4
          ? (this.cartShown = this.cart.items.slice(0, 4))
          : (this.cartShown = this.cart.items);
      }
    },
  },
};
</script>

<style scoped>
.product-card {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 16px 12px;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
}

.product-card__title {
  font-size: 0.8rem;
  color: #999999;
}

.list__item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.list__item--info {
  width: 80%;
  display: flex;

}

.list__item--img {
  width: 16vw;
  max-width: 80px;
  max-height: 80px;
  margin-right: 6px;
}

.list__item--description {
  display: flex;
  flex-direction: column;
  vertical-align: top;
  font-size: 0.84rem;
  font-weight: bold;
}

.text--ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.text--grey {
  color: #999999;
}

.list__item--price {
  font-size: 0.8rem;
}

.text--large {
  font-size: 1rem;
  font-weight: bold;
}

.product-card__folder {
  text-align: center;
  font-size: 0.8rem;
  color: #999999;
}

.folder--icon {
  font-size: 1.2rem;
  line-height: 0.8;
  vertical-align: middle;
}

.product-card__description {
  position: relative;
}

.description--title {
  display: inline;
  font-size: 0.8rem;
}

.description--text {
  font-size: 0.8rem;
  display: inline;
  right: 0;
  position: absolute;
}

.product-card__footer {
  position: relative;
  line-height: 1.3rem;
  border-top: 1px solid #efefef;
  padding-top: 8px;
}

.footer--description {
  display: inline;
  font-size: 0.8rem;
  color: #999999;
  vertical-align: middle;
  line-height: 1.7rem;
}

.question-icon {
  font-size: 0.8rem;
  vertical-align: top;
  line-height: 2;
}

.footer-container {
  display: inline;
  right: 0;
  position: absolute;
  font-size: 0.86rem;
  vertical-align: middle;
}

.text--red {
  color: #fe4f2e;
}

.text--extra-large {
  font-size: 1.3rem;
  font-weight: bold;
}

.text--small {
  font-size: 0.8rem;
  font-weight: normal;
}

.text--delete {
  text-decoration: line-through;
}

.mr-1 {
  margin-right: 4px;
}

.mb-1 {
  margin-bottom: 4px;
}

.mb-2 {
  margin-bottom: 8px;
}

.mt-1 {
  margin-top: 4px;
}
</style>
