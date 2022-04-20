<template>
  <div class="address-list">
    <div class="available-container">
      <div v-for="(item, i) in addresses" :key="i" class="available-item">
        <address-cell
          @select-address="selectAddress"
          @edit-address="editAddress"
          class="address-cell"
          :has-radio="true"
          :address="item"
        ></address-cell>
      </div>

     
    </div>
    <!-- TODO: show unavailable addresses based on distance -->
    <!-- <div class="unavailable-container"></div> -->
  </div>
</template>

<script>
import AddressCell from "@/components/profile/AddressCell.vue";
export default {
  components: {
    AddressCell,
  },
  data() {
    return {
      addresses: this.$store.getters.addresses,
    };
  },
  computed: {},
  methods: {
    selectAddress(payload) {
      console.log(payload);
    },
  },
};
</script>

<style scoped>
.address-list {
  width: 100%;
  padding: 12px 0;
  z-index: 0;
  position: relative;
  top: 30px;
  margin-bottom: 30px;

}

.available-container {
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.available-item {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.address-cell {
  width: 100%;
}
</style>
