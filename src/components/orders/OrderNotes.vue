<template>
  <div class="order-note">
    <base-util-header
      class="header--fixed"
      bg-color="blue"
      header-title="订单备注"
      right-text="完成"
      @go-back="back"
      @right-click="complete"
    />

    <div class="order-note__body">
      <div class="order-note__input-container">
        <van-cell-group inset>
          <van-field
            v-model="notes"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            :placeholder="placeholder"
            show-word-limit
          />
        </van-cell-group>
      </div>
      <div class="order-note__quick-notes">
        <div class="quick-notes__title">
          <p>快捷输入</p>
        </div>
        <!-- TODO: add user notes to user model  -->
        <div class="quick-notes--user"></div>
        <div class="quick-notes--default">
          <van-tag
            @click="addToNote"
            v-for="(tag, i) in defaultTags"
            :key="i"
            class="text--small custom-tag"
            text-color="#333"
            color="#b4b4b4"
            size="large"
            plain
          >
            {{ tag }}
          </van-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseUtilHeader from "@/components/UI/BaseUtilHeader.vue";
import { Toast } from "vant";

export default {
  components: {
    BaseUtilHeader,
  },
  props: ['note'],
  emits: ["closeNote", "completeNote"],
  data() {
    return {
      notes: this.note,
      defaultTags: [
        "对骑手",
        "对商家",
        "要热的",
        "要冰的",
        "常温",
        "不要糖",
        "不要珍珠",
        "多要珍珠",
        "奶盖分装",
      ],
    };
  },
  computed: {
    placeholder() {
      return "请输入口味，偏好等要求，不支持额外代购其他商品";
    },
    isLimit() {
      return this.notes.length >= 50 ? true : false;
    },
  },

  watch: {
    notes() {
      if (this.isLimit) {
        Toast("上限50字哦");
      }
    },
  },
  methods: {
    back() {
      this.$emit("closeNote");
    },
    complete() {
      this.$emit("completeNote", this.notes);
    },
    addToNote(e) {
      this.notes += e.target.innerText;
    },
  },
};
</script>

<style scoped>
.order-note {
  background-color: #fff;
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 4;
}

.header--fixed {
  position: fixed;
  top: 0;
  z-index: 5;
}

.order-note__body {
  position: relative;
  overflow: hidden;
  height: 100%;
  top: 44px;
}

.order-note__input-container {
  margin-top: 12px;
}

.order-note__quick-notes {
  margin: 12px 16px;
}
.quick-notes__title {
  color: #999;
  font-size: 0.86rem;
  margin-bottom: 8px;
}

.text--small {
  font-size: 0.7rem;
}

.custom-tag {
  margin: 6px 6px 6px 0;
}
</style>
