<template>
  <div class="index">
    <router-view></router-view>
    <tab-bar :tabs="tabsPassed"></tab-bar>
  </div>
</template>

<script>
import TabBar from '../components/TabBar.vue';

export default {
  components: {
    TabBar
  },
  data() {
    return {
      tabsPassed: [
        {label: '首页', path: '/home', useImg: true},
        {label: '真香', icon: 'egg', path: '/social'},
        {label: '订单', icon: 'list_alt', path: '/order'},
        {label: '我的', icon: 'insert_emoticon', path: '/profile'},
      ]
    }
  },
}
</script>

<style scoped>
.index {
  width: 100vw;
  height: calc(100% - 60px);
}
</style>