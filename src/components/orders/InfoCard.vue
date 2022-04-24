<template>
  <div class="info-card">
    <expand-cell
      @click="openNote"
      class="mb-1"
      title="备注"
      :action="notesShown"
      :action-color="noteActionColor"
    />
    <expand-cell
      @click="openPicker"
      class="mb-1"
      title="餐具份数"
      :action="utensilAction"
      :action-color="utensilActionColor"
    />
    <expand-cell
      title="发票"
      action="该店不支持线上开票，请电话联系商户"
      action-color="grey"
      :is-expandable="false"
    />

    <!-- utensils picker  -->
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        ref="picker"
        :columns="columns"
        @cancel="openPicker"
        @confirm="onConfirm"
        @change="onChange"
      >
        <template #toolbar>
          <div class="picker-title__container">
            <div class="picker-tile__main">
              <p class="picker-title">选择餐具份数</p>
              <p class="picker-subtitle">
                应监管条例要求，商家不得主动提供一次性餐具
              </p>
            </div>

            <div @click="closePicker" class="picker-title__action">
              <span class="picker-icon material-icons-outlined"> close </span>
            </div>
          </div>
        </template>
        <template #columns-bottom>
          <div class="picker-bottom__container">
            <div class="picker-bottom__note">
              <div @click="toggleCheck" class="utensil-skim">
                <span v-if="isChecked" class="checked mr-1 material-icons">
                  check_circle
                </span>
                <span v-else class="uncheck mr-1 material-icons-outlined">
                  radio_button_unchecked
                </span>
                <p class="skim-text mr-1">{{ utensilOption }}</p>
                <span v-if="showUtensilNote" class="skim-text--small text--red">
                  {{ utensilNote }}</span
                >
              </div>
            </div>
            <div @click="fireConfirm" class="picker-bottom__action">
              <a class="picker-bottom__btn">确定</a>
            </div>
          </div>
        </template>
      </van-picker>
    </van-popup>

    <order-notes
      v-if="showNote"
      @close-note="closeNote"
      @complete-note="saveNote"
      :note="savedNotes"
    />
  </div>
</template>

<script>
import ExpandCell from "./ExpandCell.vue";
import OrderNotes from "./OrderNotes.vue";
export default {
  components: {
    ExpandCell,
    OrderNotes,
  },
  emits: ["noteOpen"],
  data() {
    return {
      showPicker: false,
      pickerResult: {
        val: "",
        idx: null,
      },
      columns: [
        "无需餐具",
        "需要餐具，商家依据参量提供",
        "1份",
        "2份",
        "3份",
        "4份",
        "5份",
        "6份",
        "7份",
        "8份",
        "9份",
        "10份",
        "10份以上",
      ],
      isChecked: false,
      showNote: false,
      savedNotes: "",
    };
  },
  computed: {
    utensilOption() {
      if (this.pickerResult.idx === 0 || !this.pickerResult.idx) {
        return "以后都无需餐具";
      } else {
        return "以后都需要餐具，商家依据餐量提供";
      }
    },
    showUtensilNote() {
      if (
        (this.pickerResult.idx === 0 || !this.pickerResult.idx) &&
        this.isChecked
      ) {
        return true;
      } else {
        return false;
      }
    },
    utensilNote() {
      return "商家以后不再提供餐具";
    },
    utensilAction() {
      return this.pickerResult.val ? this.pickerResult.val : "必选";
    },
    utensilActionColor(){
      return this.pickerResult.val ? "black" : "grey";
    },
    notesShown() {
      return this.savedNotes ? this.savedNotes : "请填写口味偏好";
    },
    noteActionColor() {
      return this.savedNotes ? "black" : "grey";
    },
  },
  methods: {
    onConfirm(value, idx) {
      this.pickerResult.val = value;
      this.pickerResult.idx = idx;
      this.closePicker();
    },
    fireConfirm() {
      const picker = this.$refs.picker;
      picker.confirm();
    },
    toggleCheck() {
      this.isChecked = !this.isChecked;
    },
    openPicker() {
      this.showPicker = true;
    },
    closePicker() {
      this.showPicker = false;
    },
    onChange(_value, idx) {
      this.pickerResult.idx = idx;
    },
    openNote() {
      this.showNote = true;
      this.$emit("noteOpen");
    },
    closeNote() {
      this.showNote = false;
    },
    saveNote(notes) {
      this.savedNotes = notes;
      this.closeNote();
    },
  },
};
</script>

<style scoped>
.info-card {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 16px 12px;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
}

/* picker title  */
.picker-title__container {
  position: relative;
  text-align: center;
  width: 100%;
  margin: 12px;
}

.picker-title {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 4px;
}

.picker-subtitle {
  font-size: 0.76rem;
  color: #999;
}

.picker-title__action {
  position: absolute;
  right: 0;
  top: 0;
}

.picker-icon {
  font-size: 1.6rem;
  color: #999;
}

/* picker bottom  */
.picker-bottom__container {
  margin: 12px;
  background-color: #fcf5db;
  border-radius: 6px 6px 30px 30px;
}

.picker-bottom__btn {
  display: block;
  text-align: center;
  background-color: #47b6fd;
  color: #fff;
  padding: 10px 16px;
  font-size: 1rem;
  border-radius: 30px;
}

.utensil-skim {
  display: flex;
  align-items: center;
  padding: 8px;
}

.uncheck {
  color: #999;
  font-size: 1.2rem;
}

.checked {
  color: #00b6fd;
  font-size: 1.2rem;
}

.skim-text {
  font-size: 0.8rem;
  line-height: 1.2rem;
}

.skim-text--small {
  font-size: 0.75rem;
  line-height: 1.2;
}

.mr-1 {
  margin-right: 4px;
}

.mb-1 {
  margin-bottom: 6px;
}

.text--red {
  color: #fe4f2e;
}
</style>
