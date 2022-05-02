<template>
  <div class="check-out__wrapper">
    <div v-if="!isAdd" class="checkout">
      <base-util-header
        class="header--fixed"
        bg-color="lightBlue"
        header-title="确认订单"
        @go-back="back"
      />
      <div class="check-out__body">
        <div class="address-card-wrapper">
          <van-notice-bar
            class="notice-bar"
            left-icon="volume-o"
            mode="closeable"
            text="温馨提示：请适量点餐、避免浪费"
          />
          <address-card
            @choose-address="openAddressPop"
            :confirmed-address="address"
            :address-is-empty="addressIsEmpty"
            :estimate="formattedTime"
            :payment="paymentMethod"
          />
        </div>

        <!-- <p @click="submitOrder">hahahha</p> -->

        <!-- // delete vif  -->
        <div v-if="cart" class="general-card-wrapper">
          <product-card :cart="cart" :shop="shopInfo" />
        </div>

        <div class="general-card-wrapper">
          <info-card
            @notes-saved="saveNotes"
            @check-toggled="updateCheck"
            @change-picker="updatePicker"
            :is-invalid="utensilInvalid"
            :picker-result-prop="pickerResult"
            :is-checked-prop="isChecked"
            :saved-notes-prop="savedNotes"
          />
        </div>

        <!-- // delete vif  -->
        <div v-if="cart" class="check-out__submit-field">
          <div class="submit-field__main">
            <div class="submit-field__text">
              <p>
                合计：<span class="text--red"
                  >￥<span class="text--extra-large">{{
                    cart.price.finalPrice
                  }}</span></span
                >
              </p>
              <p
                v-if="cart.coupon.discountIsApplied"
                class="right-align text--red"
              >
                已优惠￥{{ cart.coupon.discountApplied }}
              </p>
            </div>

            <div @click="submitOrder" class="submit-field__action">
              <a class="submit-btn btn-blue">提交订单</a>
            </div>
          </div>
        </div>

        <van-popup
          v-model:show="show"
          round
          position="bottom"
          class="address-pop"
        >
          <div class="list-title">
            <h3 class="title">选择收货地址</h3>
            <span
              @click="closeAddressPop"
              class="close-icon material-icons-outlined"
              >close</span
            >
          </div>

          <address-list
            @edit="editAddress"
            @select="selectAddress"
            :selected-id="selectedId"
          />

          <div class="action-container">
            <a @click="addAddress" class="add-address-btn">新增收货地址</a>
          </div>
        </van-popup>
      </div>
    </div>

    <manage-address
      v-if="isAdd"
      @close-add="closeManage"
      @edit-address="selectAddress"
      :selectedAddress="selectedAddress"
    />
  </div>
</template>

<script>
import BaseUtilHeader from "@/components/UI/BaseUtilHeader.vue";
import AddressCard from "@/components/orders/AddressCard.vue";
import ProductCard from "@/components/orders/ProductCard.vue";
import InfoCard from "@/components/orders/InfoCard.vue";
import AddressList from "@/components/orders/AddressList.vue";
import ManageAddress from "@/pages/profile/ManageAddress.vue";
import { Toast } from "vant";
import { customAlphabet } from "nanoid";

export default {
  components: {
    BaseUtilHeader,
    AddressCard,
    AddressList,
    ManageAddress,
    ProductCard,
    InfoCard,
  },
  data() {
    return {
      show: false,
      isAdd: false,
      selectedAddress: null,
      confirmedAddress: null,
      estimatedDeliveryTime: null,
      pickerResult: {
        val: "",
        idx: null,
      },
      isChecked: false,
      utensilInvalid: false,
      savedNotes: "",
      paymentMethod: "weChat",
    };
  },
  computed: {
    addresses() {
      return this.$store.getters.addresses;
    },
    address() {
      return this.confirmedAddress;
    },
    selectedId() {
      return this.confirmedAddress ? this.confirmedAddress.addressId : null;
    },
    addressIsEmpty() {
      return this.$store.getters.addresses.length === 0;
    },
    shopInfo() {
      return this.$store.getters.shop;
    },
    formattedTime() {
      this.getDeliveryTime();
      return (
        this.estimatedDeliveryTime.getHours() +
        ":" +
        String(this.estimatedDeliveryTime.getMinutes()).padStart(2, "0")
      );
    },
    cart() {
      let cart = this.$store.getters.doneCarts.find(
        (cart) => cart.id === this.shopInfo.id
      );
      return cart;
    },
    duration() {
      return this.shopInfo ? this.shopInfo.order_lead_time : 44;
    },
  },
  mounted() {
    this.getAddress();
  },
  watch: {
    addresses: {
      handler() {
        if (this.addressIsEmpty) {
          this.confirmedAddress = null;
        }
      },
      deep: true,
    },
  },
  methods: {
    getAddress() {
      this.confirmedAddress = this.addressIsEmpty
        ? null
        : this.$store.getters.addresses[0];
    },
    openAddressPop() {
      this.show = true;
    },
    closeAddressPop() {
      this.show = false;
    },
    openManage() {
      this.isAdd = true;
    },
    closeManage() {
      this.isAdd = false;
    },
    back() {
      this.$router.back();
    },
    addAddress() {
      this.selectedAddress = null;
      this.openManage();
    },
    editAddress(addr) {
      this.selectedAddress = addr;
      this.openManage();
    },
    selectAddress(addr) {
      this.confirmedAddress = addr;
      this.closeAddressPop();
    },
    getDeliveryTime() {
      let estimate = new Date(new Date().getTime() + this.duration * 60000);
      this.estimatedDeliveryTime = estimate;
    },
    saveNotes(notes) {
      this.savedNotes = notes;
    },
    updateCheck(val) {
      this.isChecked = val;
    },
    updatePicker(val) {
      this.utensilInvalid = val;
    },
    validateOrder() {
      if (!this.confirmedAddress) {
        Toast("请添加收货地址");
        return false;
      }
      if (!this.pickerResult.val) {
        this.utensilInvalid = true;
        return false;
      }
      return true;
    },
    submitOrder() {
      const isValidated = this.validateOrder();
      if (isValidated) {
        let timeStamp = new Date();
        const idGenerator = customAlphabet("1234567890", 19);
        const orderNanoId = idGenerator();
        const order = {
          id: orderNanoId,
          time: timeStamp,
          status: "unpaid",
          payment: {
            paymentMethod: this.paymentMethod,
          },
          delivery: {
            mode: this.shopInfo.delivery_mode.text,
            estimatedDeliveredTime: new Date(
              timeStamp.getTime() + this.duration * 60000
            ),
            isDefault: true,
          },
          shop: {
            id: this.shopInfo.id,
            name: this.shopInfo.name,
          },
          user: {
            id: this.$store.getters.userId,
          },
          address: this.confirmedAddress,
          products: this.cart,
          info: {
            utensils: {
              num: this.pickerResult.val,
              forceDefault: this.pickerResult.idx !== 0 && this.isChecked,
              forceNone: this.pickerResult.idx === 0 && this.isChecked,
            },
            invoice: null,
            notes: this.savedNotes,
          },
        };

        this.$store.dispatch("addToOrders", order);
        this.$router.push({
          name: "order",
          params: { orderId: order.id },
        });
      }
    },
  },
};
</script>

<style scoped>
.checkout {
  background-color: #f6f6f6;
  height: 100vh;
}

.header--fixed {
  position: fixed;
  top: 0;
  z-index: 3;
}

.check-out__body {
  position: relative;
  top: 44px;
  padding-bottom: 7vh;
  overflow: auto;
  height: 100%;
  background-color: #f6f6f6;
}

.notice-bar {
  border-radius: 6px;
  height: 30px;
  margin-bottom: 8px;
}

.address-card-wrapper {
  width: 100%;
  padding: 8px 12px;
  background: linear-gradient(
    to bottom,
    #47b6fd,
    #86d5f6,
    #86d4f685,
    #f6f6f600
  );
}

.list-title {
  width: 100%;
  text-align: center;
  padding: 8px;
  position: fixed;
  background-color: #fff;
  border-radius: 16px;
  z-index: 1;
}

.title {
  font-size: 1.1rem;
  font-weight: bold;
}

.close-icon {
  position: absolute;
  right: 8px;
  top: 8px;
  font-size: 1.5rem;
  color: #c6c6c6;
}

.action-container {
  width: 100%;
  text-align: center;
  padding: 8px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  /* z-index: 1; */
}

.add-address-btn {
  text-align: center;
  color: #47b6fd;
  border: 1px solid #47b6fd;
  padding: 4px;
  display: block;
  font-size: 1rem;
  border-radius: 30px;
}

.general-card-wrapper {
  width: 100%;
  padding: 0 12px 8px;
}

.check-out__submit-field {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  height: 7vh;
  padding: 6px;
}

.submit-field__main {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}

.submit-field__text {
  display: inline-block;
  margin-right: 6px;
  /* height: 100%; */
  font-size: 0.8rem;
}

.right-align {
  float: right;
}

.submit-field__action {
  display: inline;
  position: relative;
}

.text--red {
  color: #fe4f2e;
}

.text--extra-large {
  font-size: 1.3rem;
  font-weight: bold;
}

.submit-btn {
  text-align: center;
  background-color: #47b6fd;
  color: #fff;
  padding: 10px 16px;
  font-size: 1rem;
  border-radius: 30px;
}
</style>
