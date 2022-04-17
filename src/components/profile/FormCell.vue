<template>
  <div class="form-cell">
    <div class="form-label-container">
      <label :for="inputId">{{ label }}</label>
    </div>
    <div :class="{ 'border-none': isEnd }" class="form-input-container ">
      <slot name="default" v-if="isCustomized"></slot>
      <div v-else class="input-slot-container">
        <div :class="{ 'full-length': isFullLength, 'half-length': isHalfLength }"  class="input-field">
          <input :class="{'half-length': isHalfLength}" :type="inputType" :id="inputId"
            :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder">
          <div v-show="modelValue" @click="emitClear" class="input-field-right">
            <span class="material-icons delete-icon">cancel</span>
          </div>
        </div>

        <div class="icon-container">
          <slot name="rightSlot"></slot>
          <span v-if="hasArrow" @click="emitExpand" class="more-icon material-icons-outlined">
            chevron_right
          </span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    inputId: String,
    label: String,
    inputType: {
      type: String,
      default: 'text'
    },
    isEnd: Boolean,
    isCustomized: Boolean,
    hasArrow: Boolean,
    placeholder: String,
    isFullLength: Boolean,
    isHalfLength: Boolean,
    modelValue: {
      default: String,
    }
  },
  emits: ['clearVal', 'update:modelValue', 'expand'],
  methods: {
    emitInput() {
      this.$emit('inputChange', this.inputVal);
    },
    emitClear() {
      this.$emit('clearVal');
    },
    emitExpand(){
      this.$emit('expand');
    }
  },

}
</script>

<style scoped>
.form-cell {
  display: flex;
  align-items: baseline;
  width: 100%;
  margin: 8px 0;
  color: #333;
}

.form-label-container {
  width: 18%;
  font-size: .9rem;
  font-weight: bold;
}

.form-input-container {
  width: 82%;
  border-bottom: 1px solid #f1f1f1;
  padding: 10px 0;
}

.input-slot-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9b9b9b;
}

input {
  border: none;
  background: none;
}

input:enabled {
  border: none;
  outline: none;
}


.input-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-icon {
  color: #9b9b9b;
  font-size: .9rem;
}

.full-length {
  width: 90%;
}

.half-length {
  width: 58%;
}

.border-none {
  border: none;
}
</style>