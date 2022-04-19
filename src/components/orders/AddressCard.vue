<template>
  <div class="address-card">
    <div class="address-container">
      <address-item :address="selectedAddress" :name-large="true" />
      <div class="expand-container">
        <span class="expand-icon material-icons-outlined"> chevron_right </span>
      </div>
    </div>

    <div class="delivery-time">
      <expand-cell title="立即送出" action="大约22:30送到" />
    </div>

    <div class="payment-method">
      <expand-cell title="支付方式" action="支付宝" />
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
  data() {
    return {
      selectedAddress: this.$store.getters.addresses[0],
    };
  },
};
</script>

<style scoped>
.address-card {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 16px 12px;
}

.address-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.expand-container {
  color: #c6c6c6;
}

.expand-icon {
  font-size: 1.6rem;
}

.delivery-time {
  margin-bottom: 8px;
}
</style>
