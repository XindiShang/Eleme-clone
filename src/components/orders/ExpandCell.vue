<template>
  <div class="expand-cell">
    <div class="title-container">
      <h3>{{ title }}</h3>
    </div>
    <div class="action-container">
      <h3 :class="actionClasses">
        {{ action }}
      </h3>
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
  },
  computed: {
    actionClasses() {
      return {
        "text--grey": this.actionColor === "grey",
        "text--black": this.actionColor === "black",
      };
    },
  },
};
</script>

<style scoped>
.expand-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

.action-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #5abdfd;
}

h3 {
  font-weight: bold;
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
</style>
