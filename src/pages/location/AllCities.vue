<template>
  <div class="city">
    <header>
      <base-search-bar
        @cancelSearch="cancel"
        @clearVal="clearInput"
        class="search"
        v-model="inputVal"
        :placeholder="placeholderPassed"
      ></base-search-bar>
    </header>

    <section v-if="!showSearchResults">
      <current-location
        size="24px"
        class="current"
        :isCity="true"
      ></current-location>
      <cities-list
        v-if="cityInfo"
        ref="roll"
        class="cities"
        :cityInfo="cityInfo"
        :keys="keys"
      ></cities-list>
    </section>

    <div class="search_list" v-else>
      <ul>
        <li @click="setCity" v-for="(item, i) in finalSearchResults" :key="i">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseSearchBar from "../../components/UI/BaseSearchBar.vue";
import CurrentLocation from "../../components/address/CurrentLocation.vue";
import CitiesList from "../../components/address/CitiesList.vue";
import { Toast } from "vant";

export default {
  components: {
    BaseSearchBar,
    CurrentLocation,
    CitiesList,
  },
  data() {
    return {
      placeholderPassed: "输入城市名或拼音",
      inputVal: "",
      cityInfo: null,
      keys: [],
      searchResults: [],
    };
  },
  computed: {
    finalSearchResults() {
      return this.searchResults;
    },
    showSearchResults() {
      return this.searchResults.length;
    },
  },
  methods: {
    clearInput() {
      this.inputVal = "";
    },
    cancel() {
      this.$router.back();
    },
    // ******
    async getCityInfo() {
      try {
        const res = await this.$axios("/api/posts/cities");
        this.cityInfo = res.data;
        this.keys = Object.keys(res.data);
        // remove hot cities
        this.keys.pop();
        this.keys.sort();
        this.$nextTick(() => {
          this.$refs.roll.initScroll();
        });

        this.$store.dispatch("resetAllCities");

        this.keys.forEach((key) => {
          this.cityInfo[key].forEach((city) => {
            this.$store.dispatch("getAllCities", city);
          });
        });
      } catch {
        Toast("获取城市列表失败，请重试");
      }
    },
    searchCity() {
      if (!this.inputVal) {
        this.searchResults = [];
      } else {
        this.searchResults = this.$store.getters.doneAllCities.filter((el) =>
          el.name.includes(this.inputVal)
        );
      }
    },
    setCity(e) {
      this.$store.dispatch("getCity", e.target.innerText);
      this.$router.back();
    },
  },
  watch: {
    inputVal() {
      this.searchCity();
    },
  },
  created() {
    this.getCityInfo();
  },
};
</script>

<style scoped>
.city {
  height: 100%;
  /* width: 100; */
  background-color: #eaeaea;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

header {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  z-index: 1;
}

section {
  /* top: 45px;
    position: relataie; */
  height: 100%;
}

.current {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
  /* top: 45px; */
  /* position: relative; */
}

.search_list {
  background: #fff;
  padding: 5px 16px;
  height: 100%;
  overflow: scroll;
}

.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
