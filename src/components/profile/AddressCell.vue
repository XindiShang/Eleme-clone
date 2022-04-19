<template>
  <van-swipe-cell :before-close="beforeClose" class="address-item">
    <div class="address-content">
      <div class="address-main">
        <address-item :address="address" />
      </div>
      <div @click="editAddress" class="address-edit">
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
import AddressItem from '@/components/profile/AddressItem.vue';
import { Dialog } from 'vant';

export default {
  components: {
    AddressItem,
  },
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
    editAddress() {
      this.$router.push({ name: 'userEditAddress', params: { userId: this.$route.params.userId, addressId: this.address.addressId } });
    }
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

.address-main {
  width: 90%;
}

.address-title {
  width: 80%;
  display: flex;
  align-items: center;
  font-size: .9rem;
  font-weight: bold;
  line-height: .9rem;
  margin-bottom: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.address-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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