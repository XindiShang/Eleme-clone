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
        <address-card @choose-address="show = true" />
      </div>

      <van-popup
        v-model:show="show"
        round
        position="bottom"
        class="address-pop"
      >
        <div class="list-title">
          <h3 class="title">选择收货地址</h3>
          <span @click="show = false" class="close-icon material-icons-outlined"
            >close</span
          >
        </div>

        <address-list />

        <div class="action-container">
          <a @click="addAddress" class="add-address-btn">新增收货地址</a>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import BaseUtilHeader from "@/components/UI/BaseUtilHeader.vue";
import AddressCard from "@/components/orders/AddressCard.vue";
import AddressList from "@/components/orders/AddressList.vue";


export default {
  components: {
    BaseUtilHeader,
    AddressCard,
    AddressList,
  },
  data() {
    return {
      show: true,
      chosenAddressId: 1,
      list: this.$store.getters.addresses,
    };
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    back() {
      this.$router.back();
    },
    addAddress() {
      this.$router.push({name: 'userNewAddress', params: {userId: 'a-fake-id-333'}, query: {redirect: 'shopCheckout'}})
    }
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

.list-title {
  width: 100%;
  text-align: center;
  padding: 8px;
  position: fixed;
  background-color: #fff;
  border-radius: 16px;
  z-index: 1;
}

.title {
  font-size: 1.1rem;
  font-weight: bold;
}

.close-icon {
  position: absolute;
  right: 8px;
  top: 8px;
  font-size: 1.5rem;
  color: #c6c6c6;
}

.action-container {
  width: 100%;
  text-align: center;
  padding: 8px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  /* z-index: 1; */
}

.add-address-btn {
  text-align: center;
  color: #47b6fd;
  border: 1px solid #47b6fd;
  padding: 4px;
  display: block;
  font-size: 1rem;
  border-radius: 30px;
}
</style>
