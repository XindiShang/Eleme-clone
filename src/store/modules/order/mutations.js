export default {
  setOrders(state, payload) {
    state.orders.push(payload);
  },
  setOrder(state, payload) {
    state.order = payload;
  }
}