export default {
  setAddress(state, payload) {
    if (payload) {
      state.address = payload.address;
      state.city = payload.city;
      state.province = payload.province;
      state.lat = payload.lat;
      state.lng = payload.lng;

      if (state.visitedCities.length === 0) {
        state.visitedCities.push(payload.city);
      } else {
        if (!state.visitedCities.includes(payload.city)) {
          state.visitedCities.push(payload.city);
        }
      }
    } else {
      state.address = null;
      state.city = null;
      state.province = null;
      state.lat = null;
      state.lng = null;
    }
  },
  setCity(state, payload) {
    if (payload) {
      state.city = payload;
      if (state.visitedCities.length === 0) {
        state.visitedCities.push(payload);
      } else {
        if (!state.visitedCities.includes(payload)) {
          state.visitedCities.push(payload);
        }
      }
    }

  },
  setAllCities(state, payload) {
    if (!state.allCities.includes(payload)) {
      state.allCities.push(payload);

    }
  },
  clearAllCities(state) {
    state.allCities = [];
  },
  flatAllCities(state) {
    state.allCities = [].concat(...state.allCities);
  },
}