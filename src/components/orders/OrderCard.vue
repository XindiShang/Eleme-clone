<template>
  <div v-if="order" @click="switchOrderDetails" class="order-card mb-2">
    <div class="card-title mb-2">
      <div class="title-main mb-1">
        <div class="title-main--left">
          <van-image
            class="title-img mr-2"
            radius="5"
            :src="order.shop.img"
            lazy-load
          ></van-image>
          <h1 class="text--lg text--bold text-ellipsis">
            {{ order.shop.name }}
          </h1>
          <span class="text--grey expand-icon material-icons-outlined">
            chevron_right
          </span>
        </div>
        <div class="title-main--right">
          <p class="text--grey text--md">{{ OrderStatus }}</p>
        </div>
      </div>
      <div v-if="hasDiscount" class="title-sub">
        <van-tag
          v-for="(discount, idx) in discountsShown"
          :key="idx"
          class="discount mr-2"
          plain
          color="#f1525b"
          >{{ discount }}</van-tag
        >
      </div>
    </div>

    <div class="card-main mb-2">
      <div class="items-scroll">
        <van-image
          v-for="(item, idx) in this.order.products.items"
          :key="idx"
          class="item-img mr-2"
          radius="5"
          :src="item.img"
          lazy-load
        ></van-image>
      </div>
      <div class="price-container text--sm">
        <p class="mb-1">
          ￥<span class="text--lg">{{ orderPrice }}</span>
        </p>
        <p class="text--grey">共{{ orderNum }}件</p>
      </div>
    </div>

    <div class="card-footer">
      <div class="btn-container">
        <van-button
          @click.stop="repeatOrder"
          class="repeat-btn"
          size="small"
          plain
          color="#47b6fd"
          round
          >再来一单</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
    },
  },
  computed: {
    OrderStatus() {
      let status;
      if (this.order.status === "complete") {
        status = "已送达";
      } else {
        status = "已取消";
      }
      return status;
    },
    hasDiscount() {
      return this.order.shop.activities;
    },
    discountsShown() {
      let discounts = this.order.shop.activities[0].tips;
      discounts = discounts.split("，");
      return discounts;
    },
    orderPrice() {
      return this.order.products.price.finalPrice;
    },
    orderNum() {
      return this.order.products.items.length;
    },
  },
  methods: {
    repeatOrder() {
      this.$store.dispatch("getCart", this.order.products);
      this.$router.push({ name: "shop", params: { shopId: this.order.shop.id } });
    },
    switchOrderDetails() {
      this.$router.push({
        name: "order",
        params: {
          orderId: this.order.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.order-card {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 16px 12px;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
}

.title-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-img {
  max-width: 24px;
  height: 24px;
}

.title-main--left {
  display: flex;
  align-items: center;
  width: 70%;
}

.title-main--right {
  width: 20%;
  text-align: end;
}

.expand-icon {
  font-size: 1.4rem;
}

.discount {
  padding: 1px 4px;
  border-radius: 4px;
}

/* card main  */
.card-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.items-scroll {
  width: 80%;
  overflow-x: scroll;
  display: flex;
}

.item-img {
  flex: none;
  max-width: 80px;
  height: 80px;
}

.price-container {
  width: 18%;
  margin: auto;
  text-align: end;
}

/* footer  */
.card-footer {
  width: 100%;
}

.btn-container {
  width: 100%;
  overflow: hidden;
}

.repeat-btn {
  padding: 0 12px;
  float: right;
}

.mr-2 {
  margin-right: 2%;
}

.mb-1 {
  margin-bottom: 6px;
}

.mb-2 {
  margin-bottom: 10px;
}

.text--lg {
  font-size: 1rem;
}

.text--md {
  font-size: 0.86rem;
}

.text--sm {
  font-size: 0.78rem;
}
.text--bold {
  font-weight: bold;
}

.text--grey {
  color: #999;
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
