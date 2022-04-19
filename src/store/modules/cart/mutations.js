export default {
  setCartItem(state, payload) {
    // all shop's cart are empty
    if (state.carts.length === 0) {
      const newCart = {
        id: payload.shopId,
        items: [],
      };
      newCart.items.push(payload.cartItem);
      state.carts.push(newCart);
    }
    // find one shop's cart 
    let cart = state.carts.find((cart) => cart.id === payload.shopId);
    // found
    if (cart) {
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
    } else {
      // cart not found
      const newCart = {
        id: payload.shopId,
        items: [],
      };
      newCart.items.push(payload.cartItem);
      state.carts.push(newCart);
    }
  },
  clearCart(state, shopId) {
    const cartIdx = state.carts.findIndex((cart) => cart.id === shopId);
    state.carts.splice(cartIdx, 1);
  },
};
