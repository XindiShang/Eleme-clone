<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多啦"
      @load="onLoad"
    >
      <div class="shop-list">
        <shop-list-item
          v-for="(item, i) in shops"
          :key="i"
          :shop="item"
        ></shop-list-item>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import ShopListItem from "./ShopListItem.vue";
import { Toast } from "vant";

export default {
  components: {
    ShopListItem,
  },
  props: ["condition"],
  data() {
    return {
      page: 0,
      size: 5,
      loading: false,
      finished: false,
      refreshing: false,
      shops: [],
    };
  },
  computed: {
    //   shops() {
    //     return this.$store.getters.allShops;
    //   },
  },
  methods: {
    onLoad() {
      this.loadData();
    },
    async loadData() {

      // 版本2.0
      if (this.refreshing) {
        this.$store.commit("clearShops");
        this.refreshing = false;
        this.page = 0;
      }
      this.page += 5;
      try {
        await this.$store.dispatch("loadShops", this.condition);
        const shops = this.$store.getters.allShops;
        console.log(shops)
        const part = shops.slice(this.page - 5, this.page);
        if (part.length > 0) {
          part.forEach((shop) => this.shops.push(shop));
          this.loading = false;
        } else {
          this.finished = true;
        }
      } catch {
        Toast("获取数据失败，请重试");
      }


      // try {
      //   const res = await this.$axios.post(
      //     `/api/profile/restaurants/${this.page}/${this.size}`,
      //     { condition: this.condition }
      //   );
      //   // console.log(`current condition is ${this.condition}`);
      //   if (res.data.length > 0) {
      //     res.data.forEach((item) => {
      //       this.$store.dispatch("getSingleShop", item);
      //     });
      //     this.loading = false;
      //   } else {
      //     this.finished = true;
      //   }
      // } catch {
      //   Toast("获取数据失败，请重试");
      // }
    },
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.shops = [];
      this.onLoad();
    },
  },
  watch: {
    condition() {
      // console.log("condition has changed!");
      console.log(this.condition)
      this.$store.commit("clearShops");
      this.page = 0;
      this.onRefresh();
    },
  },
  mounted() {
    this.$store.commit("clearShops");
    // this.loadData();
  },
};
</script>

<style scoped>
.shop-list {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 10px;
}
</style>
