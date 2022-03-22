import { createStore } from 'vuex'

export default createStore({
  state: {
    address: '',
    city: '',
    province: '',
    lat: null,
    lng: null,
  },
  getters: {
    doneAddress(state) {
      return state.address;
    },
    donePlace(_state, getters) {
      return getters.doneAddress.match('[^街道]*$')[0]
    },
    doneCity(state) {
      return state.city;
    },
    doneLngLat(state) {
      return [state.lng, state.lat]
    }
  },
  mutations: {
    setAddress(state, payload) {
      if (payload) {
        state.address = payload.address;
        state.city = payload.city;
        state.province = payload.province;
        state.lat = payload.lat;
        state.lng = payload.lng;
      } else {
        state.address = null;
        state.city = null;
        state.province = null;
        state.lat = null;
        state.lng = null;
      }
    }
  },
  actions: {
    getAddress(context, payload) {
      context.commit('setAddress', payload);
    },
  },
  modules: {
  }
})
