import { createStore } from 'vuex'

export default createStore({
  state: {
    address: '',
    city: '',
    province: '',
    lat: null,
    lng: null,
    visitedCities: [],
    allCities: [],
    // home page
    recommendTags: ['凉皮米线', '一点点', '麦当劳', '蛋糕', '奶茶', '包子',],
    filterData: null,
    allShops: [],
  },
  getters: {
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
    doneTags(state) {
      return state.recommendTags;
    },
    doneFilterData(state) {
      return state.filterData;
    },
    doneAllShops(state) {
      return state.allShops;
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
    setFilterData(state, payload) {
      state.filterData = payload;
    },
    setSingleShop(state, payload) {
      state.allShops.push(payload);

    },
    initializeShops(state, payload) {
      state.allShops = payload;
    },
    resetAllShops(state) {
      state.allShops = [];
    }
  },
  actions: {
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
    getFilterData(context, payload) {
      context.commit('setFilterData', payload)
    },
    getSingleShop(context, payload) {
      context.commit('setSingleShop', payload);
    },
    initialize(context, payload) {
      context.commit('initializeShops', payload)
     },
    clearAllShops(context) {
      context.commit('resetAllShops');
    }

  },
  modules: {
  }
})
