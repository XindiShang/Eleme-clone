export default {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.phone = payload.phone;
  },
  deleteAddress(state, addressId) {
    const targetIdx = state.addresses.findIndex(el => el.addressId === addressId);
    state.addresses.splice(targetIdx, 1);
  },
  addNewAddress(state, payload) {
    state.addresses.push(payload);
  },
  updateAddress(state, payload) {
    let idx = state.addresses.findIndex(el => el.addressId === payload.addressId);
    state.addresses.splice(idx, 1, payload)
  },
}