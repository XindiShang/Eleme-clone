<template>
  <div @click="setAddress" class="nearby-item">
    <div class="icon-container">
      <span v-if="isChosen" class="is-chosen nearby-icon material-icons-outlined">
        gps_fixed
      </span>
      <span v-else class="nearby-icon material-icons-outlined">
        gps_not_fixed
      </span>
    </div>
    <div class="text-container">
      <h3 :class="{ 'is-chosen': isChosen }">
        {{ item.name }}
      </h3>
      <p class="description">
        {{ item.address }}
      </p>
    </div>

  </div>
</template>

<script>
export default {
  props: ['item', 'isChosen'],
  methods: {
    setAddress() {
      this.$router.replace({ name: 'userNewAddress', params: { chosenAddress: this.item.name + '' + this.item.address } })
    },
  },

}
</script>

<style scoped>
.nearby-item {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.icon-container {
  margin-right: 12px;
  /* width: 10%; */
}

.nearby-icon {
  font-size: 1.3rem;

}

.text-container {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1rem;
}

.description {
  color: #aaa;
  font-size: .76rem;
  margin-top: 2px;

}

.is-chosen {
  color: #3ea1fe;
}
</style>