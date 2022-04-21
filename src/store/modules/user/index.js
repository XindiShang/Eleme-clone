import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    state() {
        return {
          // userId: null,
          // phone: null,
          userId: 'a-fake-id-333',
          phone: '18666668888',
          addresses: [
            {
              addressId: '1',
              recipientName: '干饭',
              gender: 'male',
              phone: '18666668888',
              address: '琥珀中村200幢',
              addressSpecific: '101室',
              tag: '家'
            },
            {
              addressId: '2',
              recipientName: '吃货',
              gender: 'female',
              phone: '13899998888',
              address: '蔚蓝商务港F座',
              addressSpecific: '36楼3609',
              tag: '公司'
            },
          ]
    }},
    mutations,
    actions,
    getters,
}