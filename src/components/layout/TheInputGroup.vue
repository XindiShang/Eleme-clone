<template>
  <div class="text_group">
    <div class="input_group" :class="{ 'is-invalid': errorMsg }">
      <input
        @focus="showClear"
        @blur="hideClear"
        :type="inputType"
        :value="modelValue"
        :placeholder="inputPlaceholder"
        @input="emitInputValue"
        :name="inputName"
      />
      <div id="clearBtn" v-show="show" @click="emitClearBtn">
        <span class="clear-icon material-icons">cancel</span>
      </div>
      <button
        v-if="inputBtnText"
        class="inputBtn"
        :class="{ available: isAvailable }"
        :disabled="isDisabled"
        @click="setBtnEvent"
      >
        {{ inputBtnText }}
      </button>
    </div>

    <div v-if="errorMsg" class="invalid-feedback">{{ errorMsg }}</div>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue", "inputBtnClick", "clearBtnClick"],
  props: {
    inputType: {
      type: String,
      default: "Text here",
    },
    modelValue: String,
    inputPlaceholder: String,
    inputName: String,
    inputBtnText: String,
    isDisabled: Boolean,
    errorMsg: String,
    hasClearBtn: Boolean,
    isAvailable: Boolean,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    emitInputValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    setBtnEvent() {
      this.$emit("inputBtnClick");
    },
    emitClearBtn() {
      this.$emit("clearBtnClick");
    },
    showClear() {
      this.show = true;
    },
    hideClear() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.text_group {
  margin-top: 20px;
}

.input_group {
  border: 1px solid #ccc;
  border-radius: 4px;
  /* padding: 6px; */
  padding: 6px 10px;
  display: flex;
  height: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.input_group input {
  height: 100%;
  width: 60%;
  border: none;
}

.input_group input:enabled {
  border: none;
  outline: none;
}

.inputBtn {
  border: 1px solid #ccc;
  border-radius: 20px;
  background: none;
  color: #aaa;
  font-size: 12px;
  height: 100%;
}

.inputBtn[disabled] {
  border: 1px solid #ccc;
  color: #aaa;
}

.is-invalid {
  border: 1px solid red;
}

.invalid-feedback {
  color: red;
  padding-top: 5px;
}

#clearBtn {
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.clear-icon {
  color: #ccc;
  font-size: 1rem;
}

.available {
  border: 1px solid rgb(14, 179, 255);
  color: rgb(14, 179, 255);
}

/* hide arrow of number input field  */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
