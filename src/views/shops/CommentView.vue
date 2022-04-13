<template>
  <section class="review">
    <div v-if="reviews" class="review-section" >
      <review-overview :reviews="reviews" />
      <review-item class="review-main" :reviews="reviews" />
    </div>

  </section>
</template>

<script>
import ReviewOverview from '@/components/reviews/ReviewOverview.vue';
import ReviewItem from '@/components/reviews/ReviewItem.vue';

export default {
  components: {
    ReviewOverview,
    ReviewItem
  },
  data() {
    return {
      reviews: null,
    }
  },
  methods: {
    fetchReviews() {
      this.$axios("/api/profile/comments").then(res => {
        this.reviews = res.data
      });
    },
  },
  created() {
    this.fetchReviews();
  },

}
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