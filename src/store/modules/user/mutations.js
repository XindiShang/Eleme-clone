export default {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.phone = payload.phone;
  },
  deleteAddress(state, addressId) {
    const targetIdx = state.addresses.findIndex(el => el.addressId === addressId);
    state.addresses.splice(targetIdx, 1);
  }
}