<template>
  <van-swipe-cell :before-close="beforeClose" class="address-item">
    <div class="address-content">
      <div class="address-main">
        <div class="address-title">
          <van-tag class="mr-1" color="#e5f7fd" text-color="#5cc8f7">{{ address.tag }}</van-tag>
          <span class="mr-1">{{ address.address }}</span>
          <span>{{ address.addressSpecific }}</span>
        </div>
        <div class="address-description">
          <span>{{ address.recipientName }}</span>
          <span class="gender mr-1">({{ formatGender(address.gender) }})</span>
          <span class="phone">{{ address.phone }}</span>
        </div>
      </div>
      <div class="address-edit">
        <span class="edit-icon material-icons-outlined">
          edit
        </span>
      </div>
    </div>


    <template #right>
      <van-button class="delete-btn" square type="danger" text="删除" />
    </template>
  </van-swipe-cell>

</template>

<script>
import { Dialog } from 'vant';

export default {
  props: ['address'],
  computed: {
    formatGender() {
      return gender => gender === 'female' ? '女士' : '先生'
    },

  },
  methods: {
    beforeClose({ position }) {
      // const that = this;
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          return true;
        case 'right':
          return new Promise((resolve) => {
            Dialog.confirm({
              title: '删除地址',
                message: '确定删除该收货地址吗？',
                confirmButtonColor: '#42abfe',
                confirmButtonText: '删除',
            }).then(res => {
              this.$store.dispatch('callDeleteAddress')
              resolve(res)
            }).catch(e =>
              resolve(e)
            );
          });

      }
    },


  },

}
</script>

<style scoped>
.address-item {
  width: 100%;
}

.address-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  padding: 12px 12px 12px 0;
  border-bottom: 1px solid #f1f1f1;
}

.address-main {}

.address-title {
  display: flex;
  align-items: center;
  font-size: .9rem;
  font-weight: bold;
  line-height: .9rem;
  margin-bottom: 6px;
}

.address-description {
  font-size: .85rem;
  color: #999999;
}

.address-edit {
  color: #999999;
}

.edit-icon {
  font-size: 1.4rem;
}

.delete-btn {
  height: 100%;
}

.mr-1 {
  margin-right: 4px;
}
</style>