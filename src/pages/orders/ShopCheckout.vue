<template>
  <div class="checkout">
    <base-util-header
      bg-color="lightBlue"
      header-title="确认订单"
      @go-back="back"
    />
    <div class="check-out-body">
      <div class="notice">
        <van-notice-bar
          class="notice-bar"
          left-icon="volume-o"
          :scrollable="false"
          text="温馨提示：请适量点餐、避免浪费"
        />
      </div>
      <div class="address-card-wrapper">
        <address-card />
      </div>
    </div>
  </div>
</template>

<script>
import BaseUtilHeader from "@/components/UI/BaseUtilHeader.vue";
import AddressCard from "@/components/orders/AddressCard.vue";

export default {
  components: {
    BaseUtilHeader,
    AddressCard,
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.notice {
  width: 100%;
  padding: 8px 12px;
  background-color: #47b6fd;
}
.notice-bar {
  border-radius: 6px;
  height: 30px;
}

.address-card-wrapper {
  width: 100%;
  padding: 8px 12px;
  background: linear-gradient(to bottom, #47b6fd, #86d5f6, #e8f1f69a);
}
</style>
