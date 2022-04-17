<template>
  <!-- search bar  -->
  <div class="search-bar">
    <div @click="switchCityPage">
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
       console.log(this.$route)
      this.$router.push({ name: 'locate', query: { redirect: this.$route.name === 'userConfirmAddress'?  'userConfirmAddress' : '' } })
      // this.$router.push('/locate');
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

.city {
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: calc(12%);
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