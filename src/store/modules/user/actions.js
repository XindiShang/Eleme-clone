export default {
  getUser(context, payload) {
    context.commit('setUser', {
      userId: payload.userId,
      phone: payload.phone,
    })
  },
  callLogout(context) {
    localStorage.removeItem('eleme_login');
    context.commit('setUser', {
      userId: null,
      phone: null,
    })
  },
  callDeleteAddress(context, addressId) {
    context.commit('deleteAddress', addressId);
  },
  getNewAddress(context, payload) {
    context.commit('addNewAddress', payload);
  },
  getUpdatedAddress(context, payload) {
    context.commit('updateAddress', payload);
  },
}