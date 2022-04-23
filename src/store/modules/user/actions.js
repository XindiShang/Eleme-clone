export default {
  getUser({ commit }, payload) {
    commit("setUser", {
      userId: payload.userId,
      phone: payload.phone,
    });
  },
  callLogout({ commit }) {
    localStorage.removeItem("eleme_login");
    commit("setUser", {
      userId: null,
      phone: null,
    });
  },
  callDeleteAddress({ commit }, addressId) {
    commit("deleteAddress", addressId);
  },
  getNewAddress({ commit }, payload) {
    commit("addNewAddress", payload);
  },
  getUpdatedAddress({ commit }, payload) {
    commit("updateAddress", payload);
  },
};
