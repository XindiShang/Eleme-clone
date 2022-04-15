<template>
  <section class="review-overview">
    <div v-for="(user, i) in comments" :key="i" class="card">
      <!-- user info  -->
      <div class="user-info-container mb-1">
        <div class="user-info">
          <div class="user-avatar mr-1">
            <van-image v-if="user.avatar" :src="user.avatar" round fit="cover" lazy-load></van-image>
            <van-image v-else :src="require('@/assets/homeLogo.svg')" round fit="cover" lazy-load></van-image>
          </div>
          <div class="user-description">
            <div class="user-identity">
              <span class="user-name">{{ user.username }}</span>
              <van-image v-if="user.is_super_vip" class="user-vip" :src="require('@/assets/svip.png')"></van-image>
            </div>
            <div class="user-review-date">{{ user.rated_at }}</div>
          </div>
        </div>
        <div>
          <span class="report-icon material-icons-outlined">
            more_horiz
          </span>
        </div>
      </div>

      <!-- rating numbers -->
      <div class="ratings-container mb-1">
        <p class="rating-title">
          满意度
          <van-rate v-model="user.rating" size="1vh" color="#fe4a32" void-color="#ccc" void-icon="star" readonly />
        </p>
      </div>

      <!-- user review text  -->
      <div v-if="user.rating_text" class="rating-body mb-1">
        <p>{{ user.rating_text }}</p>
      </div>

      <!-- user review images  -->
      <div v-if="user.order_images">
        <div v-if="user.order_images.length > 0" class="rating-images mb-1">
          <van-image @click="show = true" class="rating-image" radius="4" v-for="(img, idx) in user.order_images"
            :key="idx" :src="img.image_hash"></van-image>

        </div>
      </div>

      <!-- shop reply  -->
      <div class="reply mb-1">
        <p class="reply-title">商家回复</p>
        <p> {{ user.reply.content }} </p>
      </div>

      <div class="rating-footer mb-1">
        <div v-show="user.food_ratings" class="recommend-wrapper">
          <div v-if="user.food_ratings.length > 0" class="recommend-container">
            <span class="recommend-title">TA的推荐：</span>
            <div class="recommend-body">
              <div class="recommend-text">
                <span v-for="(food, index) in user.food_ratings" :key="index"><span v-if="index > 0">、</span>{{
                  food.rate_name
                }}</span>
              </div>
              <span class="expand-icon material-icons-outlined">
                chevron_right
              </span>
            </div>
          </div>

        </div>

        <div @click="toggleUseful" class="thumbs-up">
          <span :class="thumbClasses" class="thumbs-up-icon">
            thumb_up
          </span>
          <span>有用<span v-if="isUseful">1</span></span>
        </div>
      </div>


    </div>

    <p class="end-of-reviews">没有更多了</p>

  </section>

</template>

<script>
export default {
  props: ['comments'],
  data() {
    return {
      // comments: this.reviews.comments,
      show: false,
      isUseful: false,
    }
  },
  computed: {
    thumbClasses() {
      return {
        'thumb-filled': this.isUseful,
        'material-icons': this.isUseful,
        'material-icons-outlined': !this.isUseful
      }
    }

  },
  methods: {
    formatNum(num) {
      return parseFloat(num.toFixed(1));
    },
    toggleUseful() {
      this.isUseful = !this.isUseful;
    }

  },
  mounted() {
    // console.log(this.comments)
  },

}
</script>

<style scoped>
.card {
  margin: 0 12px 8px;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-info-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 70%;
}

.user-avatar {
  width: 10vw;
  height: 10vw;
  max-width: 48px;
  max-height: 48px;
}

.user-description {
  display: flex;
  flex-direction: column;
  font-size: 1.6vh;
  width: 60%;
}

.user-name {
  margin-right: 8px;
}

.user-identity {
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}

.user-review-date {
  font-size: 1.4vh;
  color: #999;
}

.user-vip {
  width: 64px;
  height: 14px;
  /* height: 100%; */
}

.report-icon {
  color: #999;
  font-size: 2.4vh;
}

.ratings-container {
  width: 100%;
}

.rating-title {
  color: #999;
  font-size: 1.5vh;
}

.rating-body {
  font-size: 1.8vh;
}

.rating-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.rating-image {
  width: 49%;
  max-width: 200px;
  border-radius: 4px;
}

.reply {
  background-color: #f6f6f6;
  color: #7d7d7d;
  font-size: 1.5vh;
  padding: 8px 12px;
  border-radius: 6px;
}

.reply-title {
  font-weight: bold;
  margin-bottom: 4px;
}

.rating-footer {
  display: flex;
  justify-content: space-between;

}

.recommend-wrapper {
  width: 80%;
}

.recommend-container {
  font-size: 1.5vh;
  width: 100%;
  display: flex;
  align-items: center;
}

.recommend-body {
  background-color: #e6f7ff;
  color: #00b6fd;
  padding: 3px 6px;
  max-width: 60%;
  display: flex;
  align-items: center;
}

.recommend-text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 2vh;
}

.expand-icon {
  font-size: 2vh;
}

.thumbs-up {
  font-size: 1.5vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 15%;
  line-height: 1.6vh;
}

.thumbs-up-icon {
  font-size: 1.6vh;
  margin-right: 3%;
}

.thumb-filled {
  color: #fe4a32;
  animation: awesomeScale .5s ease-in;
}

@keyframes awesomeScale {
  0% {
    transform: scale(1);
  }

  40% {
    transform: scale(1.25);
  }

  70% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.end-of-reviews {
  text-align: center;
  font-size: 1.5vh;
  color: #999;
}

.mr-1 {
  margin-right: 8px;
}

.mb-1 {
  margin-bottom: 10px;
}

.mb-2 {
  margin-bottom: 14px;
}
</style>