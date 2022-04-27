<template>
  <section class="panel">
    <recent-search></recent-search>
    <table class="panel-container">
      <tr class="large-row panel-row">
        <td
          @click="switchCategory(img)"
          class="panel-item"
          v-for="(img, i) in imagesTop"
          :key="i"
        >
          <van-image
            class="img--large"
            :src="require(`@/assets/${img}.png`)"
            lazy-load
          />
          <p class="icon-name">{{ img }}</p>
        </td>
      </tr>
      <tr class="normal-row panel-row">
        <td
          @click="switchCategory(img)"
          class="panel-item"
          v-for="(img, i) in imagesMiddle"
          :key="i"
        >
          <van-image
            class="img--small"
            :src="require(`@/assets/${img}.png`)"
            lazy-load
          />
          <p class="icon-name">{{ img }}</p>
        </td>
      </tr>
      <tr class="normal-row panel-row">
        <td
          @click="switchCategory(img)"
          class="panel-item"
          v-for="(img, i) in imagesBottom"
          :key="i"
        >
          <van-image
            class="img--small"
            :src="require(`@/assets/${img}.png`)"
            lazy-load
          />
          <p class="icon-name">{{ img }}</p>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
import RecentSearch from "./RecentSearch.vue";

export default {
  components: {
    RecentSearch,
  },
  data() {
    return {
      imagesTop: ["美食外卖", "商超便利", "水果", "跑腿", "甜品饮品"],
      imagesMiddle: ["下午茶", "汉堡披萨", "推荐有奖", "炸鸡炸串", "买菜"],
      imagesBottom: [
        "鲜花绿植",
        "日韩料理",
        "地方美食",
        "快餐便当",
        "送药上门",
      ],
    };
  },
  methods: {
    switchCategory(name) {
      this.$router.push({
        name: "category",
        query: { category: name },
      });
    },
  },
};
</script>

<style scoped>
.panel {
  margin: 2px 15px;
  box-sizing: border-box;
}

.panel-container {
  margin: 6px 0px 0;
  box-sizing: border-box;
  display: block;
  left: 0;
}

.panel-row {
  width: 100%;
  margin-bottom: 14px;
}

.panel-item {
  padding: 0 6px;
  width: 100%;
  text-align: center;
}

.icon-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-size: 0.75rem;
  margin-top: 2%;
}

.large-row {
  width: auto;
  display: grid;
  gap: 2%;
  grid-template-columns: repeat(5, 1fr);
}

.img--large {
  width: 92%;
  height: 92;
  max-width: 74px;
  max-height: 74px;
  margin: auto;
}

.normal-row {
  width: auto;
  display: grid;
  gap: 2%;
  grid-template-columns: repeat(5, 1fr);
}

.img--small {
  width: 68%;
  height: 68%;
  max-width: 50px;
  max-height: 50px;
  margin: auto;
}
</style>
