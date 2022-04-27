<template>
  <div class="money-actions card">
    <div class="money-actions-content">
      <div
        @click="switchPage(item.routeName)"
        v-for="(item, i) in actionList"
        :key="i"
        class="action-item"
      >
        <span
          :class="iconLiveClass(item)"
          class="action-icon material-icons-outlined"
        >
          {{ item.icon }}
        </span>
        <h4 v-if="item.title" class="action-name">
          {{ item.title }}
        </h4>
        <h4
          v-else
          :class="{ 'action-name-bold': nameBold }"
          class="action-name"
        >
          {{ item.name }}
        </h4>
        <p v-if="item.des" class="action-description">
          {{ item.des }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  props: ["actionList", "nameBold"],
  computed: {
    iconLiveClass() {
      return (item) => {
        return {
          "action-icon--live": item.name === "我的地址",
        };
      };
    },
  },
  methods: {
    switchPage(routeName) {
      if (routeName) {
        this.$router.push({ name: routeName });
      } else {
        Toast("功能尚未开通~");
      }
    },
  },
};
</script>

<style scoped>
.card {
  margin: 0 16px 8px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
}

.money-actions-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}

.action-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}

.action-icon {
  margin-bottom: 4px;
  color: #333;
}

.action-icon--live {
  color: #42abfe;
  animation: wiggle 2s linear infinite;
}

.action-name {
  font-size: 0.8rem;
}

.action-name-bold {
  font-weight: bold;
}

.action-description {
  font-size: 0.6rem;
  color: #999;
}

@keyframes wiggle {
  0%,
  7% {
    transform: rotateZ(0);
  }
  15% {
    transform: rotateZ(-15deg);
  }
  20% {
    transform: rotateZ(10deg);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  30% {
    transform: rotateZ(6deg);
  }
  35% {
    transform: rotateZ(-4deg);
  }
  40%,
  100% {
    transform: rotateZ(0);
  }
}
</style>
