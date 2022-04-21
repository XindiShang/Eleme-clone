<template>
  <div v-if="!isAdd" class="checkout">
    <base-util-header
      bg-color="lightBlue"
      header-title="确认订单"
      @go-back="back"
    />
    <div class="check-out-body">
      <div class="address-card-wrapper">
        <van-notice-bar
          class="notice-bar"
          left-icon="volume-o"
          mode="closeable"
          text="温馨提示：请适量点餐、避免浪费"
        />
        <address-card
          @choose-address="openAddressPop"
          :confirmed-address="confirmedAddress"
          :address-is-empty="addressIsEmpty"
        />
      </div>

      <van-popup
        v-model:show="show"
        round
        position="bottom"
        class="address-pop"
      >
        <div class="list-title">
          <h3 class="title">选择收货地址</h3>
          <span
            @click="closeAddressPop"
            class="close-icon material-icons-outlined"
            >close</span
          >
        </div>

        <address-list
          @edit="editAddress"
          @select="selectAddress"
          :selected-id="selectedId"
        />

        <div class="action-container">
          <a @click="addAddress" class="add-address-btn">新增收货地址</a>
        </div>
      </van-popup>
    </div>
  </div>

  <manage-address
    v-else
    @close-add="closeManage"
    :selectedAddress="selectedAddress"
  />
</template>

<script>
import BaseUtilHeader from "@/components/UI/BaseUtilHeader.vue";
import AddressCard from "@/components/orders/AddressCard.vue";
import AddressList from "@/components/orders/AddressList.vue";
import ManageAddress from "@/pages/profile/ManageAddress.vue";

export default {
  components: {
    BaseUtilHeader,
    AddressCard,
    AddressList,
    ManageAddress,
  },
  data() {
    return {
      show: false,
      isAdd: false,
      selectedAddress: null,
      confirmedAddress: null,
    };
  },
  computed: {
    addresses() {
      return this.$store.getters.addresses;
    },
    selectedId() {
      return this.confirmedAddress ? this.confirmedAddress.addressId : null;
    },
    addressIsEmpty() {
      return this.$store.getters.addresses.length === 0;
    },
  },
  mounted() {
    this.getAddress();
  },
  methods: {
    getAddress() {
      this.confirmedAddress = this.addressIsEmpty
        ? null
        : this.$store.getters.addresses[0];
    },
    openAddressPop() {
      this.show = true;
    },
    closeAddressPop() {
      this.show = false;
    },
    openManage() {
      this.isAdd = true;
    },
    closeManage() {
      this.isAdd = false;
    },
    back() {
      this.$router.back();
    },
    addAddress() {
      this.selectedAddress = null;
      this.openManage();
    },
    editAddress(addr) {
      this.selectedAddress = addr;
      this.openManage();
    },
    selectAddress(addr) {
      this.confirmedAddress = addr;
      this.closeAddressPop();
    },
  },
};
</script>

<style scoped>

.notice-bar {
  border-radius: 6px;
  height: 30px;
  margin-bottom: 8px;
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
