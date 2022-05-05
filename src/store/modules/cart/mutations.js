export default {
  setCartItem(state, payload) {
    // find one shop's cart
    let cart = state.carts.find((cart) => cart.id === payload.shopId);
    // found
    const foundIdx = cart.items.findIndex(
      (item) => item.id === payload.cartItem.id
    );
    // if item exists
    if (foundIdx !== -1) {
      if (payload.cartItem.count === 0) {
        cart.items.splice(foundIdx, 1);
      } else {
        cart.items[foundIdx].count = payload.cartItem.count;
      }
    } else {
      // if item does NOT exist
      cart.items.push(payload.cartItem);
    }
  },
  setCart(state, cartInfo) {
    const cart = state.carts.find((cart) => cart.id === cartInfo.shopId);
    if (cart) {
      cart.price = cartInfo.price;
      cart.delivery = cartInfo.delivery;
      cart.coupon = cartInfo.coupon;
    } else {
      state.carts.push({
        id: cartInfo.shopId || cartInfo.id,
        price: cartInfo.price,
        delivery: cartInfo.delivery,
        coupon: cartInfo.coupon,
        items: [],
      });
    }
  },
  clearCart(state, shopId) {
    const cartIdx = state.carts.findIndex((cart) => cart.id === shopId);
    state.carts.splice(cartIdx, 1);
  },
};
