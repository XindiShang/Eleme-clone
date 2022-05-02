<template>
  <div class="shop-category">
    <base-util-header
      class="header--fixed"
      bg-color="lightBlue"
      :header-title="headerTitle"
      @go-back="back"
    />

    <filter-bar
      class="bar--fixed"
      @get-condition="setCondition"
      :fixedOn="fixedOn"
      @searchFixed="showFilters"
    />

    <div class="shop-list__wrapper">
      <shop-list :condition="conditionPassed" />
    </div>
  </div>
</template>

<script>
import BaseUtilHeader from "@/components/UI/BaseUtilHeader.vue";
import FilterBar from "../components/home/FilterBar.vue";
import ShopList from "../components/home/ShopList.vue";

export default {
  components: {
    BaseUtilHeader,
    FilterBar,
    ShopList,
  },
  data() {
    return {
      isShown: false,
      fixedOn: false,
      scrollTop: 0,
      initFinished: false,
      conditionPassed: null,
    };
  },
  computed: {
    headerTitle() {
      return this.$route.query.category;
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    getData() {
      console.log("hahah");
      this.$store.dispatch("loadFilters");
    },
    showFilters(payload) {
      this.isShown = payload;
    },
    resetInit(payload) {
      this.initFinished = payload;
    },
    setCondition(payload) {
      this.conditionPassed = payload;
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    // let homeContainer = this.$refs.home;
    // homeContainer.addEventListener("scroll", () => {
    //   // console.log(homeContainer.scrollTop)
    //   if (homeContainer.scrollTop >= 480) {
    //     this.fixedOn = true;
    //   } else {
    //     this.fixedOn = false;
    //     this.isShown = false;
    //   }
    // });
  },
};
</script>

<style scoped>
.shop-category {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}

.header--fixed {
  position: fixed;
  top: 0;
  z-index: 3;
}

.bar--fixed {
  position: fixed;
  top: 44px;
  z-index: 3;
  width: 100%;
  background-color: #fff;
}

.shop-list__wrapper {
  position: relative;
  top: 80px;
}
/* .sort-applied {
  width: auto;
  padding: 4px 16px 4px 16px;
  position: fixed;
  top: -1px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
} */
</style>
