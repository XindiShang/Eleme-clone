<template>
  <div :class="cellClass" class="expand-cell">
    <div class="title-container">
      <h3 :class="titleClass">{{ title }}</h3>
    </div>
    <div class="action-container">
      <div class="text-container">
        <h3 class="text--bold action__text" :class="actionClass">
          {{ action }}
        </h3>
        <p
          v-if="hasNewLine"
          class="text--bold action__text"
          :class="actionClass"
        >
          {{ actionMore }}
        </p>
      </div>

      <div v-if="isExpandable" class="expand-container">
        <span class="expand-icon material-icons-outlined"> chevron_right </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    action: {
      type: String,
    },
    actionColor: {
      type: String,
    },
    isExpandable: {
      type: Boolean,
      default: true,
    },
    hasNewLine: {
      type: Boolean,
      default: false,
    },
    actionMore: {
      type: String,
    },
    titleIsBold: {
      type: Boolean,
      default: true,
    },
    hasMargin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    actionClass() {
      return {
        "text--grey": this.actionColor === "grey",
        "text--black": this.actionColor === "black",
      };
    },
    titleClass() {
      return {
        "text--bold": this.titleIsBold,
      };
    },
    cellClass(){
      return {
        'mb-2': this.hasMargin
      }
    }
  },
};
</script>

<style scoped>
.expand-cell {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.8rem;
}

.action-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #5abdfd;
  width: 75%;
  white-space: initial;
  word-wrap: break-word;
}

.text-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.text--bold {
  font-weight: bold;
}

.action__text {
  max-width: 100%;
  word-wrap: break-word;
  white-space: initial;
}

.text--grey {
  color: #999999;
  font-weight: normal;
}

.text--black {
  color: #333;
  font-weight: normal;
}

.expand-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.expand-icon {
  color: #c6c6c6;
  font-size: 1.4rem;
  margin-right: -6px;
}

.mb-2 {
  margin-bottom: 3px;
}
</style>
