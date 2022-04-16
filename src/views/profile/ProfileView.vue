<template>
  <div class="profile">
    <profile-header />
    <action-card :actionList="assets" :nameBold="true" />
    <action-card :actionList="beans" />
    <action-card :actionList="generalInfo" />

  </div>


</template>

<script>
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ActionCard from "@/components/profile/ActionCard.vue";

export default {
  components: {
    ProfileHeader,
    ActionCard
  },
  data() {
    return {
      assets: [
        {
          icon: 'account_balance_wallet',
          title: '我的资产'
        },
        {
          icon: 'savings',
          name: '红包',
          des: '查看我的红包'
        },
        {
          icon: 'card_giftcard',
          name: '券包',
          des: '查看我的券'
        },
        {
          icon: 'credit_card',
          name: '卡包',
          des: '查看会员卡'
        },

      ],
      beans: [
        {
          icon: 'shopping_basket',
          title: '赚吃货豆'
        },
        {
          icon: 'local_atm',
          name: '现金提款机',
        },
        {
          icon: 'monetization_on',
          name: '天天赚现金',
        },
        {
          icon: 'loyalty',
          name: '每日抢好券',
        },
      ]
      ,
      generalInfo:[
          {
            icon: 'place',
            name: '我的地址',
            routeName: 'userAddress',
          },
          {
            icon: 'support_agent',
            name: '我的客服'
          },
          {
            icon: 'shopping_cart',
            name: '购物车'
          },
          {
            icon: 'favorite_border',
            name: '店铺关注'
          },
          {
            icon: 'business',
            name: '企业订餐'
          },
          {
            icon: 'sports_motorsports',
            name: '邀友跑单'
          },
          {
            icon: 'handshake',
            name: '商务合作'
          },
          {
            icon: 'volunteer_activism',
            name: '公益3小时'
          },
          {
            icon: 'info',
            name: '资质与规则'
          },
          {
            icon: 'receipt',
            name: '发票助手'
          },
          {
            icon: 'star_border',
            name: '评价中心'
          },
        ]
    }
  },

}
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f8f8f8;
}
</style>