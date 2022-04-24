<template>
  <div class="address-card">
    <div @click="emitAddressChoose" class="address-container">
      <address-item
        :is-empty="addressIsEmpty"
        title="请选择收货地址"
        :address="address"
        :name-large="true"
      />
      <div class="expand-container">
        <span class="expand-icon material-icons-outlined"> chevron_right </span>
      </div>
    </div>

    <div class="delivery-time">
      <expand-cell title="立即送出" :action="timeAction" />
    </div>

    <div class="payment-method">
      <expand-cell title="支付方式" :action="paymentAction" />
    </div>
  </div>
</template>

<script>
import AddressItem from "@/components/profile/AddressItem.vue";
import ExpandCell from "@/components/orders/ExpandCell.vue";

export default {
  components: {
    AddressItem,
    ExpandCell,
  },
  props: ["confirmedAddress", "addressIsEmpty", "estimate", "payment"],
  emits: ["chooseAddress"],
  computed: {
    address() {
      return this.confirmedAddress;
    },
    timeAction() {
      return `大约${this.estimate}送到`;
    },
    paymentAction() {
      if (this.payment === "weChat") {
        return "微信支付";
      } else {
        return "支付宝";
      }
    },
  },
  methods: {
    emitAddressChoose() {
      this.$emit("chooseAddress");
    },
  },
};
</script>

<style scoped>
.address-card {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 16px 12px;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
}

.address-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.address-item {
  width: 90%;
}

.expand-container {
  color: #c6c6c6;
}

.expand-icon {
  font-size: 1.4rem;
  margin-right: -6px;
}

.delivery-time {
  margin-bottom: 8px;
}
</style>
