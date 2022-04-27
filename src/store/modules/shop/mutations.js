export default {
  setShops(state, payload) {
    state.shops = payload;
  },
  registerShop(state, payload) {
    state.shops.push(payload);
  },
  clearShops(state) {
    state.shops = [];
  },
  setFilters(state, payload) {
    state.filters = payload;
  },
  setBanners(state, payload) {
    state.banners = payload;
  },
  setShop(state, payload) {
    state.shop = payload;
  }
};
