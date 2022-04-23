export default {
  getAddress(context, payload) {
    context.commit('setAddress', payload);
  },
  getCity(context, payload) {
    context.commit('setCity', payload);
  },
  getAllCities(context, payload) {
    context.commit('setAllCities', payload);
  },
  resetAllCities(context) {
    context.commit('clearAllCities');
  },
  flatAllCities(context) {
    context.commit('flatAllCities');
  },
}