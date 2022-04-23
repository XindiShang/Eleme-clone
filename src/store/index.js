import { createStore } from 'vuex'
// import authModule from './modules/auth/index.js';
import userModule from './modules/user/index.js';
import cartModule from './modules/cart/index.js';
import locationModule from './modules/location/index.js';

export default createStore({
  modules: {
    // auth: authModule,
    user: userModule,
    cart: cartModule,
    location: locationModule,
},
  state: {
    // home page
    recommendTags: ['凉皮米线', '一点点', '麦当劳', '蛋糕', '奶茶', '包子',],
    filterData: null,
    allShops: [],
    selectedShop: {},
  },
  getters: {
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


  },
  mutations: {
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
    
  },
  actions: {
    
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
  },

})
