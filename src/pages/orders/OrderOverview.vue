<template>
  <div class="order-overview__wrapper">
    <div class="order-overview">
      <base-util-header
        class="header--fixed"
        bg-color="lightBlue"
        :header-title="headerTitle"
        @go-back="back"
      />
      <div class="order-overview__body">
        <div class="order-countdown">
          <p v-if="!isCancelled" class="countdown--text">
            待支付，剩余
            <van-count-down
              class="timer"
              :time="time"
              format="mm:ss"
              @finish="timerFinish"
            />
          </p>
          <p v-else class="countdown--text">订单已取消</p>
        </div>

        <div class="payment-notice">
          <span class="notice-icon material-icons-outlined"> volume_up </span>
          <span>15分钟内未支付，订单将自动取消</span>
        </div>

        <div class="general-card-wrapper">
          <payment-card
            :title="paymentTitle"
            @cancel="cancelOrder"
            @edit="editOrder"
            :is-cancelled="isCancelled"
          />
        </div>
        <!-- // delete vif  -->
        <div v-if="cart" class="general-card-wrapper">
          <product-card
            :cart="cart"
            :shop="shopInfo"
            :showInfo="true"
            :orderInfo="orderInfo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseUtilHeader from "@/components/UI/BaseUtilHeader.vue";
import ProductCard from "@/components/orders/ProductCard.vue";
import PaymentCard from "@/components/orders/PaymentCard.vue";
import throttle from "lodash.throttle";

export default {
  name: 'orderOverview',
  components: {
    BaseUtilHeader,
    ProductCard,
    PaymentCard,
  },
  data() {
    return {
      time: 15 * 60 * 1000,
      showTitle: false,
      isCancelled: false,
    };
  },
  computed: {
    cart() {
      // this.$route.params.shopId
      let cart = this.$store.getters.doneCarts.find(
        (cart) => cart.id === this.shopInfo.id
      );
      return cart;
    },
    shopInfo() {
      return this.$store.getters.shop;
    },
    headerTitle() {
      let title;
      if (this.isCancelled) {
        title = "订单已取消";
      } else {
        title = "待支付";
      }
      return this.showTitle ? title : "";
    },
    paymentTitle() {
      if (this.isCancelled) {
        return "你取消了订单";
      } else {
        return "请尽快支付";
      }
    },
    order() {
      const orders = this.$store.getters.doneOrders;
      const order = orders.find(
        (order) => order.id === this.$route.params.orderId
      );
      console.log(order)
      return order;
    },
    orderInfo() {
      const addr = this.order.address;
      const gender = addr.gender === "male" ? "(先生)" : "(女士)";
      const estimate = this.order.delivery.estimatedDeliveredTime;
      // const deliveryTime = this.order.delivery.isDefault? '尽快送达' : estimate;
      const time = this.formatTime(estimate);
      const orderTime = this.formatTime(this.order.time);

      const orderInfo = [
        {
          title: "收货信息",
          info: `${addr.address} ${addr.addressSpecific}`,
          infoExtra: `${addr.recipientName}${gender} ${addr.phone}`,
          hasNewLine: true,
        },
        {
          title: "备注",
          info: this.order.info.notes,
        },
        {
          title: "订单号码",
          info: this.order.id,
        },
        {
          title: "送达时间",
          info: time,
        },
        {
          title: "配送方式",
          info: this.order.delivery.mode,
        },
        {
          title: "支付方式",
          info: "在线支付",
        },
        {
          title: "下单时间",
          info: orderTime,
        },
      ];
      return orderInfo;
    },
  },
  mounted() {
    const that = this;
    window.addEventListener("scroll", function () {
      that.throttleShow(window.scrollY);
    });
  },
  methods: {
    back() {
      if (this.isCancelled) {
        this.$store.dispatch("resetCart", this.shopInfo.id);
        this.$router.replace({
          name: "shop",
          params: { shopId: this.shopInfo.id },
        });
      } else {
        this.$router.back();
      }
    },
    timerFinish() {
      this.isCancelled = true;
    },
    formatTime(dateObj) {
      const time = `${dateObj.getFullYear()}-${String(
        dateObj.getMonth() + 1
      ).padStart(2, "0")}-${dateObj.getDate()} ${dateObj.getHours()}:${String(
        dateObj.getMinutes()
      ).padStart(2, "0")}`;
      return time;
    },
    throttleShow: throttle(function (y) {
      if (y > 34) {
        this.showTitle = true;
      } else {
        this.showTitle = false;
      }
    }, 300),
    cancelOrder() {
      this.isCancelled = true;
      const updatedOrder = {
        id: this.order.id,
        status: "cancelled",
      };
      this.$store.dispatch("getUpdatedOrder", updatedOrder);
    },
    editOrder() {
      console.log(this.order);
      this.$router.push({
        name: "orderEdit",
        params: { orderId: this.order.id },
      });
    },
  },
};
</script>

<style scoped>
.order-overview {
  background-color: #f6f6f6;
  height: 100vh;
}

.header--fixed {
  position: fixed;
  top: 0;
  z-index: 3;
}

.order-overview__body {
  position: relative;
  top: 44px;
  overflow: auto;
  height: 100%;
  background-color: #f6f6f6;
}

.general-card-wrapper {
  width: 100%;
  padding: 0 12px 8px;
}

.order-countdown {
  background: #47b6fd;
  color: #fff;
  padding: 8px 12px;
  font-size: 1.36rem;
  position: relative;
}

.order-countdown::before,
.order-countdown::after {
  content: "";
  background: #47b6fd;
  width: 10px;
  height: 10px;
  position: absolute;
}

.order-countdown::before {
  left: 0;
  bottom: -10px;
}
.order-countdown::after {
  right: 0;
  bottom: -10px;
}

.countdown--text::before,
.countdown--text::after {
  content: "";
  background: #f6f6f6;
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 10px;
  z-index: 1;
}

.countdown--text::before {
  left: 0;
  bottom: -20px;
}
.countdown--text::after {
  right: 0;
  bottom: -20px;
}

.timer {
  display: inline;
  font-size: 1.36rem;
  color: #fff;
}

.payment-notice {
  padding: 6px 16px;
  font-size: 0.8rem;
  color: #333;
  display: flex;
  align-items: center;
}

.notice-icon {
  font-size: 1.2rem;
  line-height: 1.2;
}
</style>
