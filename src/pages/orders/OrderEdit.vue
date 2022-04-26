<template>
  <div class="order-edit__wrapper">
    <div v-if="!isAdd" class="order-edit">
      <base-util-header
        class="header--fixed"
        bg-color="blue"
        header-title="修改订单信息"
        @go-back="back"
      />
      <div class="order-edit__body">
        <div v-if="selectedAddress" class="order-edit-card">
          <expand-cell
            @click="openManage"
            title="修改收货地址"
            :action="shownAddress"
            :is-expandable="true"
            action-color="black"
          />
        </div>

        <van-button
          @click="confirm"
          class="order-edit__button"
          color="#48b3f9"
          block
          round
          size="normal"
          :disabled="!isUpdated"
          >确认修改</van-button
        >
      </div>
    </div>

    <manage-address
      v-else
      @close-add="closeManage"
      :change-order="true"
      @editAddress="edit"
      :selectedAddress="selectedAddress"
    />
  </div>
</template>

<script>
import BaseUtilHeader from "@/components/UI/BaseUtilHeader.vue";
import ExpandCell from "@/components/orders/ExpandCell.vue";
import ManageAddress from "@/pages/profile/ManageAddress.vue";

export default {
  components: {
    BaseUtilHeader,
    ExpandCell,
    ManageAddress,
  },
  data() {
    return {
      isAdd: false,
      selectedAddress: null,
      isUpdated: false,
      updatedOrder: null,
    };
  },
  computed: {
    order() {
      const orders = this.$store.getters.doneOrders;
      const order = orders.find(
        (order) => order.id === this.$route.params.orderId
      );
      return order;
    },
    shownAddress() {
      return (
        this.selectedAddress.address +
        " " +
        this.selectedAddress.addressSpecific
      );
    },
  },

  methods: {
    back() {
      this.$router.back();
    },
    openManage() {
      this.isAdd = true;
    },
    closeManage() {
      this.isAdd = false;
    },
    getAddress() {
      this.selectedAddress = this.order.address;
    },
    edit(payload) {
      this.selectedAddress = payload.address;
      this.updatedOrder = payload;
      console.log(payload)
      this.isUpdated = true;
    },
    confirm() {
      console.log(this.updatedOrder)

      this.$store.dispatch("getUpdatedOrder", this.updatedOrder);
      this.isUpdated = false;
      this.$router.push({name: 'order', params: {orderId: this.$route.params.orderId}})
    },
  },
  mounted() {
    this.getAddress();
    this.isUpdated = false;
  },
};
</script>

<style scoped>
.order-edit {
  background-color: #f6f6f6;
  height: 100vh;
}

.header--fixed {
  position: fixed;
  top: 0;
  z-index: 3;
}

.order-edit__body {
  position: relative;
  top: 44px;
  overflow: auto;
  height: 100%;
  background-color: #f6f6f6;
}

.order-edit-card {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 14px 12px;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
  color: #333;
}

.order-edit__button {
  height: 35px;
  font-size: 0.86rem;
  margin-top: 20px;
}
</style>
