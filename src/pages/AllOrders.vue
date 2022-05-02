<template>
  <div class="order-view">
    <h1>订单</h1>
    <p v-for="(el, i) in orders" :key="i">
      {{ el.id }}
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    orders() {
      return this.$store.getters.doneOrders;
    },
  },
};
</script>

<style scoped></style>
