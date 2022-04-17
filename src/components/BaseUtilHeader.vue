<template>
  <div :class="bgColorClass" class="base-util-header">
    <div class="util-header-content">
      <div class="header-icon-container util-header-container ">
        <span @click="emitGoBack" class="header-back-icon material-icons-outlined">
          {{leftIcon}}
        </span>
      </div>
      <div class="util-header-container text-center">
        <h3 class="util-header-title">
          {{ headerTitle }}
        </h3>
      </div>
      <div class="util-header-container text-end">
        <span @click="emitRight" class="util-header-right-text">
          {{ rightText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerTitle: {
      type: String
    },
    rightText: {
      type: String
    },
    bgColor: {
      type: String
      
    },
    leftIcon: {
      type: String,
      default: 'arrow_back_ios'

    }
  },
  emits: ['goBack', 'rightClick'],
  methods: {
    emitGoBack() {
      this.$emit('goBack');
    },
    emitRight() {
      this.$emit('rightClick');

    }
  },
  computed: {
    bgColorClass() {
      return {
        'bg-blue': this.bgColor === 'blue',
        'bg-white': this.bgColor === 'white'
      }
    }
  },
}
</script>

<style scoped>
.base-util-header {
  padding: 8px 12px;
  width: 100%;
}

.bg-blue {
  background: linear-gradient(to right, #42abfe, #3585fe);
  color: #fff;
}

.bg-white {
  background: #fff;
  color: #333;
}


.util-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 28px;
}

.util-header-container {
  /* color: #fff; */
  width: 33.333%;
}

.header-icon-container {
  display: flex;
  align-items: center;
}

.header-back-icon {
  font-size: 1.4rem;
}

.util-header-title {
  font-size: 1.1rem;
  font-weight: bold;
}

.util-header-right-text {
  font-size: .9rem;
}

.text-center {
  text-align: center
}

.text-end {
  text-align: end;
}
</style>