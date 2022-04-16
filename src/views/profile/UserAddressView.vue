<template>
  <div class="user-address">
    <base-blue-header class="header-fixed" @go-back="switchPageBack" @right-click="addNewAddress" header-title="收货地址"
      right-text="新增地址">
    </base-blue-header>

    <div class="address-list">
      <div v-for="(address, i) in addresses" :key="i" class="cell-wrapper">
        <address-item :address="address" />
      </div>
      
    </div>
  </div>

</template>

<script>
import BaseBlueHeader from "@/components/BaseBlueHeader.vue";
import AddressItem from "@/components/profile/AddressItem.vue";
// import { Dialog } from 'vant';

export default {
  components: {
    BaseBlueHeader,
    AddressItem
  },
  computed: {
    addresses() {
      return this.$store.getters.addresses;
    },
    formatGender() {
      return gender => gender === 'female' ? '女士' : '先生'
    },

  },
  methods: {
    switchPageBack() {
      this.$router.back();
    },
    addNewAddress() {

    }
  },
}
</script>

<style scoped>
.user-address {
  height: 100vh;
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
  height: 100%;
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