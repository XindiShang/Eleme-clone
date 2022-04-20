<template>
  <van-swipe-cell :before-close="beforeClose" class="address-item">
    <div :class="{ 'margin-none': hasRadio }" class="address-content">
      <div v-if="hasRadio" @click="emitAddressId" class="select-container">
        <input
          class="radio-btn"
          type="radio"
          name="addressId"
          v-model="id"
          :value="id"
        />
      </div>
      <div class="address-main">
        <address-item :address="address" />
      </div>
      <div @click="edit" class="address-edit">
        <span class="edit-icon material-icons-outlined"> edit </span>
      </div>
    </div>

    <template #right>
      <van-button class="delete-btn" square type="danger" text="删除" />
    </template>
  </van-swipe-cell>
</template>

<script>
import AddressItem from "@/components/profile/AddressItem.vue";
import { Dialog } from "vant";

export default {
  components: {
    AddressItem,
  },
  props: ["address", "hasRadio"],
  emits: ['selectAddress', 'editAddress'],
  data() {
    return {
      id: this.address.addressId,
    }
  },
  computed: {
    formatGender() {
      return (gender) => (gender === "female" ? "女士" : "先生");
    },
  },
  methods: {
    beforeClose({ position }) {
      // const that = this;
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          return true;
        case "right":
          return new Promise((resolve) => {
            Dialog.confirm({
              title: "删除地址",
              message: "确定删除该收货地址吗？",
              confirmButtonColor: "#42abfe",
              confirmButtonText: "删除",
            })
              .then((res) => {
                this.$store.dispatch("callDeleteAddress");
                resolve(res);
              })
              .catch((e) => resolve(e));
          });
      }
    },
    edit() {
      // this.$router.push({
      //   name: "userEditAddress",
      //   params: {
      //     userId: this.$route.params.userId,
      //     addressId: this.address.addressId,
      //   },
      // });
      this.$emit('editAddress');
    },
    emitAddressId(){
      this.$emit('selectAddress', this.id)
    }
  },
};
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

.margin-none {
  margin-left: 0;
}

.address-main {
  width: 80%;
}

.address-title {
  width: 80%;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 0.9rem;
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
  font-size: 0.85rem;
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

.select-container {
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.radio-btn {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  position: absolute;
}

.radio-btn:before {
  content: "";
  background: #fff;
  border-radius: 100%;
  border: 1px solid #b4b4b4;
  display: inline-block;
  width: 1.4em;
  height: 1.4em;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  text-align: center;
  transition: all 250ms ease;
}

.radio-btn:checked:before {
  background-color: #47b6fd;
  box-shadow: inset 0 0 0 3px #f4f4f4;
}

.radio-btn:focus:before {
  outline: none;
  border-color: #47b6fd;
}

.radio-btn:disabled:before {
  box-shadow: inset 0 0 0 4px #f4f4f4;
  border-color: #b4b4b4;
  background: #b4b4b4;
}

.radio-btn + .radio-label:empty:before {
  margin-right: 0;
}
</style>
