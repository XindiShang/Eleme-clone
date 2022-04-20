<template>
  <div v-if="!cityIsOpen && !searchOn && !isAdd" class="address-view">
    <base-util-header
      bg-color="white"
      left-icon="close"
      @go-back="switchHomePage"
      @right-click="addNewAddress"
      :header-title="headerTitle"
      :right-text="rightText"
    />

    <div class="address-view-body">
      <!-- search bar  -->
      <address-search-bar
        @chooseCity="chooseCity"
        @searchAddress="searchAddress"
      />
      <current-location class="current-location" />
    </div>
  </div>

  <all-cities
    v-else-if="cityIsOpen"
    @set-search="closeCity"
    @set-city="closeCity"
    @cancel-city="closeCity"
    @cancel-locate="closeCity"
  />

  <address-search
    v-else-if="searchOn"
    @search-off="closeSearch"
  />

  <manage-address
    v-else
    @close-add="isAdd = false"
  />
</template>

<script>
import AddressSearchBar from "../../components/address/AddressSearchBar.vue";
import CurrentLocation from "../../components/address/CurrentLocation.vue";
import BaseUtilHeader from "@/components/UI/BaseUtilHeader.vue";
import AllCities from "@/pages/location/AllCities.vue";
import AddressSearch from "@/pages/location/AddressSearch.vue";
import ManageAddress from "@/pages/profile/ManageAddress.vue";

export default {
  components: {
    BaseUtilHeader,
    CurrentLocation,
    AddressSearchBar,
    AllCities,
    AddressSearch,
    ManageAddress,
  },
  data() {
    return {
      cityIsOpen: false,
      searchOn: false,
      isAdd: false,
    };
  },
  computed: {
    city() {
      return this.$store.getters.doneCity || "定位中";
    },
    headerTitle() {
      return "选择收货地址";
    },
    rightText() {
      return "新增地址";
    },
  },
  methods: {
    switchHomePage() {
      this.$router.push("/home");
    },
    chooseCity() {
      this.cityIsOpen = true;
    },
    closeCity() {
      this.cityIsOpen = false;
    },
    searchAddress() {
      this.searchOn = true;
    },
    closeSearch() {
      this.searchOn = false;
    },
    addNewAddress() {
      this.isAdd = true;
    },
  },
};
</script>

<style scoped>
.address-view {
  width: 100%;
  height: 100%;
  padding-top: 8px;
}

.address-view-body {
  padding: 4px 16px;
}

.current-location {
  margin-top: 8px;
}
</style>
