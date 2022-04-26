import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    state() {
        return {
          orders: [],
          order: {
            id: null,
            time: null,
            payment: {
              paymentMethod: null,
              isPaid: null
            },
            delivery: {
              mode: null,
              estimatedDeliveredTime: null,
              isDefault: null,
            },
            shop: {
              id: null,
              name: null,
            },
            user: {
              id: null,
            },
            products: {
              price: null,
              priceHasDiscount: null,
              finalPrice: null,
              list: []
            },
            info: {
              utensils: {
                forceDefault: null,
                forceNone: null,
                num: null
              },
              invoice: null,
              notes: null
            }
          }
    }},
    mutations,
    actions,
    getters,
}