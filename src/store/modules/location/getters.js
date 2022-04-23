export default {
  doneAddress(state) {
    return state.address;
  },
  donePlace(_state, getters) {
    return getters.doneAddress.match('[^街道]*$')[0]
  },
  doneCity(state) {
    // console.log(state.city);
    return state.city;
  },
  doneLngLat(state) {
    return [state.lng, state.lat]
  },
  doneVisited(state) {
    return state.visitedCities;
  },
  doneAllCities(state) {
    return state.allCities;
  },
}