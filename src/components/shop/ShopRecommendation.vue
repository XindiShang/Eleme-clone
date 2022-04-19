<template>
  <div
    class="recommend"
    v-for="(recommendation, i) in recommendations"
    :key="i"
  >
    <p class="recommend-title">{{ recommendation.name }}</p>

    <div class="recommend-body">
      <ul>
        <li
          @click="switchDetails(item)"
          v-for="(item, idx) in recommendation.items"
          :key="idx"
        >
          <van-image
            class="recommend-img"
            fit="cover"
            radius="6px"
            lazy-load
            :src="item.image_path"
            alt
          />
          <div class="recommend-description">
            <div class>
              <p class="des-title">{{ item.name }}</p>
            </div>
            <div class>
              <div class="des-subtitle">
                <span class="mr-1">月售{{ item.month_sales }}</span>
                <span>好评率{{ item.satisfy_rate }}</span>
              </div>
            </div>
          </div>
          <div class="recommend-action">
            <div class="price">
              <span class="mr-1">
                ￥
                <span class="price-bold">{{ item.activity.fixed_price }}</span>
              </span>
              <span class="price-old"
                >￥{{ item.activity.fixed_price * 2 }}</span
              >
            </div>
            <div class="add">
              <span
                class="add-icon material-icons-outlined"
                @click.stop="increase(item)"
                >add_circle</span
              >
              <div v-show="count(item) > 0" class="count-container">
                <span class="count-num">{{ count(item) }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemCount: 0
    }
  },
  computed: {
    recommendations() {
      return this.$store.getters.doneSelectedShop.recommend;
    },
    shopId() {
      return this.$store.getters.doneSelectedShop.rst.id;
    },
    count(){
      return foodItem => this.getCount(foodItem)
    }
  },
  methods: {
    getCount(foodItem) {
      const carts = this.$store.getters.doneCarts;
      if (carts.length === 0) {
        return 0;
      } else {
        const cart = this.$store.getters.doneCarts.find(
          (cart) => cart.id === this.shopId
        );
        if (!cart) {
          return 0;
        } else {
          let foundItem = cart.items.find(item=>item.id === foodItem.item_id);
          if (foundItem) {
            return foundItem.count;
          } else {
            return 0;
          }
        }
      }
    },
    increase(foodItem) {
      let count = this.getCount(foodItem)
      count++

      const cartItem = {
        id: foodItem.item_id,
        name: foodItem.name,
        count,
        price: foodItem.activity.fixed_price,
        img: foodItem.image_path,
      };
      const payload = {
        shopId: this.shopId,
        cartItem
      }
      console.log(payload)

      this.$store.dispatch("getCartItem", payload);
    },
    switchDetails(item) {
      this.$router.push({
        name: "foodDetails",
        params: { foodId: item.item_id, foodItem: JSON.stringify(item) },
      });
    },
  },
};
</script>

<style scoped>
.recommend {
  padding: 0 12px;
  width: 100%;
}

.recommend-title {
  font-size: 1.5vh;
  font-weight: bold;
  margin-bottom: 4px;
}

.recommend-body {
  overflow-x: scroll;
  display: flex;
  width: 100%;
}

.recommend-body ul {
  display: flex;
}

.recommend-body ul li {
  flex: none;
  width: 28vw;
  max-width: 250px;
  margin-right: 2%;
}

.recommend-img {
  display: block;
  width: 28vw;
  height: 28vw;
  max-width: 250px;
  max-height: 250px;
  border-radius: 4px;
}

.recommend-description .des-title {
  color: #333;
  font-size: 1.55vh;
  margin: 3% 0 2%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.des-subtitle {
  color: #999;
  font-size: 1vh;
  margin-bottom: 2%;
  min-height: 1em;
  display: flex;
  justify-content: flex-start;
}

.recommend-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price {
  font-size: 1vh;
  color: #fe4a32;
  width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.price-bold {
  font-size: 2vh;
  font-weight: bold;
}

.price-old {
  color: #999;
  text-decoration-line: line-through;
}

.add-icon {
  color: #00b6fd;
  font-size: 3vh;
  cursor: pointer;
}

.add {
  height: 100%;
  position: relative;
}

.count-container {
  background-color: #ff5339;
  border-radius: 50%;
  width: 0.9rem;
  height: 0.9rem;
  text-align: center;
  border: 1px solid white;
  position: absolute;
  right: -20%;
  top: -20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.count-num {
  font-size: 0.1rem;
  color: white;
}

::-webkit-scrollbar {
  width: 0 !important;
}

.mr-1 {
  margin-right: 4%;
}
</style>
