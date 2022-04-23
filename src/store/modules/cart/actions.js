export default {
  getCartItem({ commit }, payload) {
    commit("setCartItem", payload);
  },
  resetCart({ commit }, shopId) {
    commit("clearCart", shopId);
  },
  getCart({ commit }, cartInfo) {
    commit('setCart', cartInfo)
  }
};
