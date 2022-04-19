<template>
  <div class="sidebar-wrapper">
    <ul>
      <li
        @click="emitSelectCategory(i)"
        :class="{ current: i === currentIdx }"
        class="bar-item"
        v-for="(item, i) in menuItems"
        :key="i"
      >
        <div class="text-container">
          <van-image
            v-if="item.icon_url"
            class="menu-icon"
            fit="cover"
            lazy-load
            :src="item.icon_url"
            alt
          />
          <span>{{ item.name }}</span>
        </div>

        <div v-if="!item.icon_url && count(item) !== 0" class="count-container">
          <span class="count-num">{{ count(item) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["currentIdx"],
  emits: ["selectCategory"],

  computed: {
    menuItems() {
      return this.$store.getters.doneSelectedShop.menu;
    },
    shopId() {
      return this.$store.getters.doneSelectedShop.rst.id;
    },
  },
  methods: {
    emitSelectCategory(index) {
      this.$emit("selectCategory", index);
    },
    count(menuItem) {
      const carts = this.$store.getters.doneCarts;
      if (carts.length === 0) {
        return 0;
      } else {
        const cart = carts.find((cart) => cart.id === this.shopId);
        let finalCount = 0;
        if (!cart) {
          return 0;
        } else {
          for (let item of cart.items) {
            for (let foodItem of menuItem.foods) {
              if (item.id === foodItem.item_id) {
                finalCount += item.count;
              }
            }
          }
          return finalCount;
        }
      }
    },
  },
};
</script>

<style scoped>
.current {
  background-color: white;
  font-weight: bold;
  color: #000 !important;
}

.sidebar-wrapper {
  overflow-y: auto;
  height: 100%;
  background-color: #f1f1f1;
  padding-bottom: 7vh;
  width: 20%;
  min-width: 80px;
  max-width: 180px;
  overflow: scroll;
}

.bar-item {
  padding: 22% 0;
  font-size: 1vh;
  color: #666;
  line-height: 1.2;
  width: 100%;
  position: relative;
  max-height: 80px;
}

.text-container {
  width: 100%;
  padding: 0 10px 0 16px;
}

.menu-icon {
  max-width: 100%;
  width: 3.466667vw;
  height: 3.466667vw;
  max-width: 14px;
  max-height: 14px;
  vertical-align: top;
  margin-right: 5px;
}

.count-container {
  background-color: #ff5339;
  border-radius: 50%;
  width: 1.8vh;
  height: 1.8vh;
  max-width: 15px;
  max-height: 15px;
  text-align: center;
  position: absolute;
  right: 8%;
  top: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.count-num {
  font-size: 0.1rem;
  color: white;
  line-height: 0.9;
}

::-webkit-scrollbar {
  width: 0 !important;
}
</style>
