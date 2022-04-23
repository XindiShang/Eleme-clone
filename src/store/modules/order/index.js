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
              amount: null
            },
            delivery: {
              mode: null,
              estimatedDeliveredTime: null
            },
            shop: {
              id: null,
              name: null,
              deliveryFee: null,
              deliveryHasDiscount: null,
              finalDeliveryFee: null,
            },
            user: {
              id: null,
              name: null,
              address: null,
              gender: null,
              tag: null
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
              note: {
                current: null,
                previous: [],
                default: ['对骑手', '对商家','不要辣','少辣','多辣','饮料去冰','多给点番茄酱',]
              }
            }
          }
    }},
    mutations,
    actions,
    getters,
}