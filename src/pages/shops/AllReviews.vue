<template>
  <section class="review">
    <div v-if="reviews" class="review-section">
      <review-overview :reviews="reviews" @setFilter="filterComments" />
      <review-items class="review-main" :comments="comments" />
    </div>
  </section>
</template>

<script>
import ReviewOverview from "@/components/reviews/ReviewOverview.vue";
import ReviewItems from "@/components/reviews/ReviewItems.vue";
import { Toast } from "vant";

export default {
  components: {
    ReviewOverview,
    ReviewItems,
  },
  data() {
    return {
      reviews: null,
      comments: null,
    };
  },
  methods: {
    async fetchReviews() {
      const res = await this.$axios("https://eleme-clone-default-rtdb.asia-southeast1.firebasedatabase.app/reviews.json");
      this.reviews = res.data;
      this.comments = this.reviews.comments;
    },
    filterComments(payload) {
      if (payload == 1) {
        this.comments = this.reviews.comments.sort(function (a, b) {
          return (
            new Date(b.rated_at.replace("-", "/")) -
            new Date(a.rated_at.replace("-", "/"))
          );
        });
      } else if (payload == 2) {
        this.comments = this.reviews.comments.filter(
          (comment) => comment.rating >= 4
        );
      } else if (payload == 3) {
        this.comments = this.reviews.comments.filter(
          (comment) => comment.rating <= 2
        );
      } else if (payload == 4) {
        this.comments = this.reviews.comments.filter(
          (comment) => comment.order_images
        );
      } else {
        this.comments = this.reviews.comments;
      }
      Toast("筛选成功");
    },
  },
  async created() {
    await this.fetchReviews();
  },
};
</script>

<style scoped>
.review-section {
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  overflow: auto;
}

.review-main {
  padding-bottom: 12vh;
}
</style>
