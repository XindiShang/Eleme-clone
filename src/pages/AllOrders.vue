<template>
  <div class="order-view">
    <base-util-header
      class="header--fixed"
      :show-left="false"
      header-title="全部订单"
      bg-color="blue"
    />
    <div class="order-card-container">
      <van-list
        v-if="hasOrders"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <order-card v-for="(order, i) in list" :key="i" :order="order" />
      </van-list>
      <div v-else class="order-none">
        <p class="text--grey">还没有订单哦</p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseUtilHeader from "@/components/UI/BaseUtilHeader.vue";
import OrderCard from "@/components/orders/OrderCard.vue";
export default {
  components: {
    BaseUtilHeader,
    OrderCard,
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 0,
    };
  },
  computed: {
    orders() {
      let orders = this.$store.getters.doneOrders;
      return orders;
    },
    hasOrders() {
      return this.orders.length > 0;
    },
  },
  methods: {
    onLoad() {
      this.page += 4;

      let part = this.orders.slice(this.page - 4, this.page);
      if (part.length > 0) {
        part.forEach((order) => this.list.unshift(order));
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style scoped>
.order-view {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}

.order-card-container {
  padding: 12px;
  position: relative;
  top: 44px;
  overflow: auto;
  height: calc(100% - 60px);
  background-color: #f6f6f6;
}

.header--fixed {
  position: fixed;
  top: 0;
  z-index: 3;
}

.text--grey {
  color: #999;
}

.order-none {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}
</style>
