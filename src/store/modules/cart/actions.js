export default {
  getCartItem(context, payload) {
    context.commit("setCartItem", payload);
  },
  resetCart(context, shopId) {
    context.commit("clearCart", shopId);
  },
};
