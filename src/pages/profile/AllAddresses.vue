<template>
  <div v-if="!isAdd" class="user-address">
    <base-util-header
      class="header-fixed"
      @go-back="switchPageBack"
      @right-click="addNewAddress"
      header-title="收货地址"
      right-text="新增地址"
      bgColor="blue"
    />

    <div class="address-list">
      <div v-for="(address, i) in addresses" :key="i" class="cell-wrapper">
        <address-cell  @edit-address="editAddress(address)" :address="address" />
      </div>
    </div>
  </div>

  <manage-address v-else @close-add="isAdd = false" :selectedAddress="selectedAddress" />
</template>

<script>
import BaseUtilHeader from "@/components/UI/BaseUtilHeader.vue";
import AddressCell from "@/components/profile/AddressCell.vue";
import ManageAddress from "@/pages/profile/ManageAddress.vue";

export default {
  components: {
    BaseUtilHeader,
    AddressCell,
    ManageAddress,
    
  },
  data() {
    return {
      isAdd: false,
      selectedAddress: null
    };
  },
  computed: {
    addresses() {
      return this.$store.getters.addresses;
    },
    formatGender() {
      return (gender) => (gender === "female" ? "女士" : "先生");
    },
  },
  methods: {
    switchPageBack() {
      this.$router.back()
    },
    addNewAddress() {
      this.selectedAddress = null;
      this.isAdd = true;
    },
    editAddress(addr){
      this.isAdd = true;
      this.selectedAddress = addr;
    }
  },
  mounted() {
    // console.log(this.$route);
  },
};
</script>

<style scoped>
.user-address {
  height: 100%;
  width: 100%;
  background-color: #f8f8f8;
}

.header-fixed {
  position: fixed;
  top: 0;
  z-index: 1;
}

.address-list {
  position: absolute;
  top: 44px;
  width: 100%;
  height: calc(100% - 44px);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: auto;
}

.cell-wrapper {
  width: 100%;
}
</style>
