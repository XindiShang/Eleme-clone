<template>
  <section class="review-overview">
    <div class="card">
      <!-- fixed height  -->
      <div class="ratings-container mb-2">
        <div class="overall-rating">
          <h3 class="rating-large mr-1">{{ overallFixed }}</h3>
          <div class="stars">
            <p class="stars-description">高于附近{{ comparedRating }}%的商家</p>
            <van-rate v-model="overallRating" size="1vh" void-icon="star" color="#fe4a32" readonly allow-half />
          </div>

        </div>
        <div class="detailed-ratings">
          <!-- specifics no.1  -->
          <div class="specific-rating text-center">
            <p>味道</p>
            <h5 class="specific-black">{{ flavorRating }}</h5>
          </div>
          <!-- specifics no.2  -->
          <div class="specific-rating text-center">
            <p>包装</p>
            <h5 class="specific-black">{{ packageRating }}</h5>
          </div>
          <div class="divider"></div>
          <!-- specifics no.3  -->
          <div class="specific-rating">
            <p>配送满意度</p>
            <h5 class="specific-black">{{ satisfyRating }}%</h5>
          </div>
        </div>

      </div>

      <!-- tags container  -->
      <div class="review-tags mb-1">
        <a v-for="(tag, i) in tags" :key="i" @click="setFilter(i)" :class="{ 'tag-item-active': currentFilter === i }"
          class="tag-item">
          {{ tag.name }}<span v-if="tag.count > 0">{{ tag.count }}</span>
        </a>
      </div>

      <!-- skimming -->
      <div class="review-skim">
        <span @click="toggleSkim" v-if="isSkimmed" class="checked mr-1 material-icons">
          check_circle
        </span>
        <span @click="toggleSkim" v-else class="uncheck mr-1 material-icons-outlined">
          radio_button_unchecked
        </span>
        <p class="skim-text">只看有内容的评价</p>
      </div>
    </div>

  </section>

</template>

<script>
export default {
  props: ['reviews'],
  emits: ['setFilter'],
  data() {
    return {
      overallRating: this.reviews.rating.overall_score,
      tags: this.reviews.tags,
      currentFilter: 0,
      isSkimmed: true,
    }
  },
  computed: {
    rating() {
      return this.reviews.rating;
    },
    overallFixed() {
      return this.formatNum(this.rating.overall_score);
    },
    comparedRating() {
      return this.formatNum(this.rating.compare_rating * 100);
    },
    flavorRating() {
      return this.formatNum(this.rating.food_score);
    },
    packageRating() {
      return this.formatNum(this.rating.package_score);
    },
    satisfyRating() {
      return this.formatNum(this.rating.item_good_score * 100);

    }


  },
  methods: {
    formatNum(num) {
      return parseFloat(num.toFixed(1));
    },
    toggleSkim() {
      this.isSkimmed = !this.isSkimmed;
    },
    setFilter(filterId) {
      this.currentFilter = filterId;
      this.$emit('setFilter', filterId)
    },
  },

}
</script>

<style scoped>
.card {
  margin: 0 12px;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2vh;
}

.ratings-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 20%;
}

.overall-rating {
  display: flex;
  align-items: center;
  width: 55%;
}

.rating-large {
  font-size: 4vh;
  font-weight: bold;
  color: #fe4a32;
}

.stars {
  font-size: 1.4vh;
  color: #999;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
}

.stars-description {
  margin-bottom: 2%;
}

.detailed-ratings {
  display: flex;
  align-items: center;
  font-size: 1.4vh;
  color: #999;
}

.specific-rating {
  margin-left: 2vw;
}

.specific-black {
  color: #000;
  font-size: 1.8vh;
}

.divider {
  line-height: 3vh;
  height: 3vh;
  width: 1px;
  background-color: #ccc;
  margin-left: 2vw;
  vertical-align: middle;
}

.review-tags {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.tag-item {
  background-color: #f6f6f6;
  padding: 1.5vw 2vw;
  margin: 0 2vw 2vw 0;
  border-radius: 4px;
  font-size: 1.5vh;
}

.tag-item:link,
.tag-item:visited {
  text-decoration: none;
  color: #000;
}

.tag-item-active {
  background-color: #e6f7ff;
  color: #00b6fd;
}

.review-skim {
  display: flex;
  align-items: center;
}

.uncheck {
  color: #999;
  font-size: 2.2vh;
}

.checked {
  color: #00b6fd;
  font-size: 2.2vh;
}

.skim-text {
  font-size: 1.5vh;
  line-height: 2.2vh;
}

.mr-1 {
  margin-right: 2vw;
}

.mb-1 {
  margin-bottom: 1vh;
}

.mb-2 {
  margin-bottom: 2vh;
}

.flex-start {
  display: flex;
  justify-content: flex-start;
}

.flex-center {
  display: flex;
  justify-content: center;
}

.text-center {
  text-align: center;
}
</style>