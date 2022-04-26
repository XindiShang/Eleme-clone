export default {
  setOrders(state, payload) {
    state.orders.push(payload);
  },
  updateOrder(state, payload) {
    let order = state.orders.find(order => order.id === payload.id)
    for (let key in payload) {
      if (key in order) {
        order[key] = payload[key]
      }
    }
  }
}