<template>
  <div class="menu">
    <shop-recommendation></shop-recommendation>

    
      <section class="main">
        <!-- left side bar  -->
        <menu-side-bar></menu-side-bar>
        <!-- right menu body  -->
        <menu-body></menu-body>
      </section>
  </div>
</template>

<script>

import ShopRecommendation from '@/components/shop/ShopRecommendation.vue';
import MenuSideBar from '@/components/shop/MenuSideBar.vue';
import MenuBody from '@/components/shop/MenuBody.vue';

export default {
  components: {
    ShopRecommendation,
    MenuSideBar,
    MenuBody,
  },
  data() {
    return {

    }
  },
  computed: {
    shopInfo() {
      return this.$store.getters.doneSelectedShop
    }
  }

}
</script>

<style scoped>
.menu {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  overflow: visible;
}

.main {
  box-sizing: border-box;
  overflow: scroll;
  height: calc(100% - 4.7rem);
  background-color: #fff;
  display: flex;
  position: sticky;
  top: 4.5rem;
}
</style>