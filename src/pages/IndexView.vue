<template>
  <div class="index">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <the-bottom-nav :tabs="tabsPassed" />
  </div>
</template>

<script>
import TheBottomNav from "../components/layout/TheBottomNav.vue";

export default {
  components: {
    TheBottomNav,
  },
  data() {
    return {
      tabsPassed: [
        { label: "首页", path: "/home", useImg: true },
        { label: "真香", icon: "egg", path: "/social" },
        { label: "订单", icon: "list_alt", path: "/orders" },
        {
          label: "我的",
          icon: "insert_emoticon",
          path: localStorage.getItem("eleme_login")
            ? "/profile/a-fake-id-333"
            : "/profile",
        },
      ],
    };
  },
};
</script>

<style scoped>
.index {
  width: 100vw;
  height: calc(100% - 60px);
}
</style>
