import axios from "axios";

export default {
  async loadShops({ commit }, condition) {
    const response = await fetch(
      `https://eleme-clone-default-rtdb.asia-southeast1.firebasedatabase.app/shops.json`
    );
    console.log(condition);
    const result = await response.json();
    // console.log(result);
    if (!response.ok) {
      const err = new Error(result.message || "Failed to fetch!");
      throw err;
    }
    let allShops = [];
    for (const shopId in result) {
      const shop = result[shopId];
      allShops.push(shop);
    }

    if (
      condition === "distance" ||
      condition === "float_minimum_order_amount" ||
      condition === "order_lead_time" ||
      condition === "float_delivery_fee"
    ) {
      allShops.sort((a, b) => a[condition] - b[condition]);
    } else if (condition === "rating" || condition === "recent_order_num") {
      allShops.sort((a, b) => b[condition] - a[condition]);
    } else if (condition === "is_premium") {
      allShops = allShops.filter((shop) => shop[condition] === true);
    }

    commit("setShops", allShops);
    // context.commit("setFetchTime");
  },
  async loadFilters({ commit }) {
    try {
      const response = await axios(
        `https://eleme-clone-default-rtdb.asia-southeast1.firebasedatabase.app/filters.json`
      );
      const filters = await response.data;
      commit("setFilters", filters);
    } catch (e) {
      console.log(e.message);
    }
  },
  async addBanners({ commit }) {
    try {
      const response = await axios(
        `https://eleme-clone-default-rtdb.asia-southeast1.firebasedatabase.app/banners.json`
      );
      const banners = await response.data;
      commit("setBanners", banners);
    } catch (e) {
      console.log(e.message);
    }
  },
  // async getShop({ commit }, shopId) {
  //   try {
  //     const response = await axios(
  //       `https://eleme-clone-default-rtdb.asia-southeast1.firebasedatabase.app/shops/${shopId}.json`
  //     );
  //     const shop = await response.data;
  //     commit("setShop", shop);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // },
  // getShop({ commit }, payload) {
  //   try {
  //     const response = await axios(
  //       `https://eleme-clone-default-rtdb.asia-southeast1.firebasedatabase.app/shops/${shopId}.json`
  //     );
  //     const shop = await response.data;
  //     commit("setShop", shop);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // },
};
