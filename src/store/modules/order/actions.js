export default {
  addToOrders({commit}, payload) {
    commit('setOrders', payload);
  },
  getOrder({ commit }, payload) {
    commit('setOrder', payload);
  }
}