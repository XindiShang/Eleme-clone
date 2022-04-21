<template>
  <div class="address-list">
    <div class="available-container">
      <div v-for="(item, i) in addresses" :key="i" class="available-item">
        <address-cell
          @select-address="selectAddress(item)"
          @edit-address="editAddress(item)"
          class="address-cell"
          :has-radio="true"
          :address="item"
          :selected-id="selectedId"
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
  props: ['selectedId'],
  emits: ['edit', 'select'],
  data() {
    return {
      // addresses: this.$store.getters.addresses,
    };
  },
  computed: {
    addresses() {
      return this.$store.getters.addresses;
    },
  },
  methods: {
    selectAddress(address) {
      this.$emit('select', address)
    },
    editAddress(address){
      this.$emit('edit', address);
    }
  },
};
</script>

<style scoped>
.address-list {
  height: 80vh;
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
