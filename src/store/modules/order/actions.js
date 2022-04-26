export default {
  addToOrders({commit}, payload) {
    commit('setOrders', payload);
  },
  getUpdatedOrder({ commit }, payload) {
    commit('updateOrder', payload);
  }
}