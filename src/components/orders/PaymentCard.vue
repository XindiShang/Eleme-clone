<template>
  <div class="payment-card">
    <div class="payment-card__container">
      <div class="payment-card__title mb-3">
        <p class="text--large text--bold">{{ title }}</p>
        <p v-if="!isCancelled && !isComplete" class="text--grey text--small">
          蓝骑士专送
        </p>
      </div>

      <hr class="payment-card__divider" />

      <div v-if="!isCancelled && !isComplete" class="payment-card__icons">
        <div
          @click="unpaidFn(i)"
          v-for="(item, i) in unpaidList"
          :key="i"
          :class="{ 'text--blue': i !== 2 }"
          class="payment-card__icon-box"
        >
          <span class="mb-1 payment-card__icon material-icons-outlined">
            {{ item.icon }}</span
          >
          <p class="text--small">{{ item.text }}</p>
        </div>
      </div>

      <div v-else-if="isCancelled" class="payment-card__icons">
        <div
          @click="cancelledFn(i)"
          v-for="(item, i) in cancelledList"
          :key="i"
          class="payment-card__icon-box"
        >
          <span class="mb-1 payment-card__icon material-icons-outlined">
            {{ item.icon }}</span
          >
          <p class="text--small">{{ item.text }}</p>
        </div>
      </div>

      <div v-else class="payment-card__icons">
        <div
          @click="completeFn(i)"
          v-for="(item, i) in completeList"
          :key="i"
          class="payment-card__icon-box"
        >
          <span class="mb-1 payment-card__icon material-icons-outlined">
            {{ item.icon }}</span
          >
          <p class="text--small">{{ item.text }}</p>
        </div>
      </div>
    </div>

    <van-popup v-model:show="show" position="bottom" closeable round>
      <div class="cancel-pop">
        <van-image :src="require('@/assets/cancel_bg.jpg')"></van-image>
        <div class="pop-title text--bold text--large">
          <p>确定取消订单吗</p>
        </div>

        <div @click="onEdit" class="pop-choice">
          <p class="choice--edit">修改订单信息</p>

          <van-tag
            class="cancel-tag"
            size="mini"
            color="#e4f8ff"
            text-color="#67c3ef"
            >推荐</van-tag
          >
        </div>
        <div @click="onConfirmCancel" class="pop-choice">
          <p>狠心取消</p>
        </div>

        <div @click="closePop" class="pop-footer">
          <p>暂不取消</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  props: {
    title: {
      type: String,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["cancel", "edit", "complete", "anotherOrder"],
  data() {
    return {
      unpaidList: [
        {
          icon: "account_balance_wallet",
          text: "去支付",
        },
        {
          icon: "edit",
          text: "改订单信息",
        },
        {
          icon: "delete_forever",
          text: "取消订单",
        },
      ],
      cancelledList: [
        {
          icon: "call",
          text: "电话商家",
        },
        {
          icon: "note_add",
          text: "再来一单",
        },
      ],
      completeList: [
        {
          icon: "support_agent",
          text: "申请售后",
        },
        {
          icon: "star_border",
          text: "去评价",
        },
        {
          icon: "call",
          text: "电话商家",
        },
        {
          icon: "call",
          text: "电话骑士",
        },
        {
          icon: "note_add",
          text: "再来一单",
        },
      ],
      show: false,
    };
  },
  computed: {},
  methods: {
    unpaidFn(idx) {
      if (idx === 2) {
        this.show = true;
        this.onCancel();
      } else if (idx === 1) {
        this.onEdit();
      } else {
        this.onPay();
      }
    },
    cancelledFn(idx) {
      if (idx === 0) {
        Toast("功能未开通~");
      } else {
        this.repeatOrder();
      }
    },
    completeFn(idx) {
      if (idx !== 4) {
        Toast("功能未开通~");
      } else {
        this.repeatOrder();
      }
    },
    openPop() {
      this.show = true;
    },
    closePop() {
      this.show = false;
    },
    onCancel() {
      this.openPop();
    },
    onEdit() {
      this.closePop();
      this.$emit("edit");
    },
    onConfirmCancel() {
      this.closePop();
      this.$emit("cancel");
    },
    onPay() {
      Toast("已支付");
      this.$emit("complete");
    },
    repeatOrder() {
      this.$emit("anotherOrder");
    },
  },
};
</script>

<style scoped>
.payment-card {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 14px 12px;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
  color: #333;
}

.payment-card__divider {
  height: 1px;
  background-color: #efefef;
  border: 0 none;
}

.payment-card__icons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
}

.payment-card__icon-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.payment-card__icon {
  font-size: 1.2rem;
}

.cancel-pop {
  width: 100%;
  text-align: center;
  color: #333;
  background: #f6f6f6;
}

.pop-title {
  padding: 15px 0;
  background: #fff;
}

.pop-choice {
  padding: 10px 0;
  font-size: 0.9rem;
  border-top: 1px solid #efefef;
  background: #fff;
  position: relative;
}

.cancel-tag {
  position: absolute;
  top: 12px;
  right: 28%;
}

.pop-footer {
  padding: 10px 0;
  font-size: 0.9rem;
  background: #fff;
  margin-top: 6px;
}

.text--large {
  font-size: 1.1rem;
}

.text--grey {
  color: #999;
}

.text--small {
  font-size: 0.8rem;
}

.text--bold {
  font-weight: bold;
}

.mb-3 {
  margin-bottom: 14px;
}

.mb-1 {
  margin-bottom: 3px;
}

.text--blue {
  color: #48b3f9;
}
</style>
