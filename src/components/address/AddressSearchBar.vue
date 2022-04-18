<template>
  <!-- search bar  -->
  <div class="search-bar">
    <div class="city-container" @click="switchCityPage">
      <span class="city">{{ city }}</span>
      <span class="material-icons-outlined down-arrow-icon">expand_more</span>
    </div>

    <div class="divider"></div>
    <span class="material-icons-outlined search-icon">search</span>
    <p @click="switchLocatePage">请输入你的收货地址</p>
  </div>

</template>

<script>


export default {
  computed: {
    city() {
      return this.$store.getters.doneCity || '定位中';
    }
  },
  methods: {
    switchLocatePage() {
      this.$router.push({ name: 'locate', query: { redirect: this.$route.name === 'userConfirmAddress' ? 'userNewAddress' : '' } })
    },
    switchCityPage() {
      this.$router.push('/city');
    }
  },
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  height: 28px;
  display: flex;
  justify-content: start;
  align-items: center;
  border: none;
  background-color: #eaeaea;
  border-radius: 20px;
  font-size: 13px;
  padding: 0px;
}

.city-container {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.city {
  margin-left: 10px;
  width: 12%;
  font-size: 12px;
  color: rgb(73, 72, 72);
}

.down-arrow-icon {
  color: #ccc;
  font-size: 12px;
}

.search-icon {
  color: #757575;
  font-size: 16px;
}

.search-bar p {
  line-height: 1.2;
  font-size: 13px;
  margin: 0 4px;
  color: #aaaaaa;
}

.divider {
  height: 60%;
  width: 1px;
  background: #ccc;
  margin: 0 4px;
}
</style>