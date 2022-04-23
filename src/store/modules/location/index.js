import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state() {
    return {
      address: "",
      city: "",
      province: "",
      lat: null,
      lng: null,
      visitedCities: [],
      allCities: [],
    };
  },
  mutations,
  actions,
  getters,
};
