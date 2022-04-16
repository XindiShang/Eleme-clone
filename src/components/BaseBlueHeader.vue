<template>
  <div class="base-blue-header">
    <div class="blue-header-content">
      <div class="header-icon-container blue-header-container ">
        <span @click="emitGoBack" class="header-back-icon material-icons-outlined">
          arrow_back_ios
        </span>
      </div>
      <div class="blue-header-container text-center">
        <h3 class="blue-header-title">
          {{ headerTitle }}
        </h3>
      </div>
      <div class="blue-header-container text-end">
        <span @click="emitRight" class="blue-header-right-text">
          {{ rightText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['headerTitle', 'rightText'],
  emits: ['goBack', 'rightClick'],
  methods: {
    emitGoBack() {
      this.$emit('goBack');
    },
    emitRight() {
      this.$emit('rightClick');

    }
  },
}
</script>

<style scoped>
.base-blue-header {
  background: linear-gradient(to right, #42abfe, #3585fe);
  /* padding: 18px 16px 4px 16px; */
  padding: 8px 12px;
  /* height: auto; */
  width: 100%;
}

.blue-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 28px;
}

.blue-header-container {
  color: #fff;
  width: 33.333%;
}

.header-icon-container {
  display: flex;
  align-items: center;
}

.header-back-icon {
  font-size: 1.4rem;
}

.blue-header-title {
  font-size: 1.1rem;
  font-weight: bold;
}

.blue-header-right-text {
  font-size: .9rem;
}

.text-center {
  text-align: center
}

.text-end {
  text-align: end;
}
</style>