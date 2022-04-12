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
    selectedShop: {},
    cart: [],
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
    },
    doneSelectedShop(state) {
      return state.selectedShop;
    },
    doneCart(state) {
      return state.cart;

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
    },
    setSelectedShop(state, payload) {
      state.selectedShop = payload;
    },
    setCartItem(state, payload) {
      if (state.cart.length === 0) {
        state.cart.push(payload);
      } else {
        for (let item of state.cart) {
          if (item.id === payload.id) {
            item.count = payload.count;
            if (payload.count === 0) {
              let idx = state.cart.indexOf(item);
              state.cart.splice(idx, 1);
            }
            return;
          }
        }
        state.cart.push(payload);

      }
    },
    clearCart(state) {
      state.cart = [];
      
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
    },
    getSelectedShop(context, payload) {
      context.commit('setSelectedShop', payload);
    },
    getCartItem(context, payload) {
      context.commit('setCartItem', payload);

    },
    resetCart(context) {
      context.commit('clearCart');
    }

  },
  modules: {
  }
})
