import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    state() {
        return {
          shops: [],
          filters: [],
          banners: [],
          shop: {},
    }},
    mutations,
    actions,
    getters,
}