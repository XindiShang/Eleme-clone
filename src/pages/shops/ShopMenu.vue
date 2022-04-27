<template>
  <div class="menu">
    <shop-recommendation></shop-recommendation>

    <section class="main">
      <!-- left side bar  -->
      <menu-side-bar
        @select-category="setCategory"
        :currentIdx="currentIndex"
        ref="sideBar"
      ></menu-side-bar>
      <!-- right menu body  -->
      <menu-body ref="menuBody"></menu-body>
    </section>
  </div>
</template>

<script>
import ShopRecommendation from "@/components/shop/ShopRecommendation.vue";
import MenuSideBar from "@/components/menu/MenuSideBar.vue";
import MenuBody from "@/components/menu/MenuBody.vue";
import BScroll from "@better-scroll/core";

export default {
  components: {
    ShopRecommendation,
    MenuSideBar,
    MenuBody,
  },
  data() {
    return {
      leftScroll: null,
      heightList: [],
      scrollY: 0,
      current: 0,
    };
  },
  computed: {
    shopInfo() {
      return this.$store.getters.shop;
    },
    currentIndex() {
      return this.current;
    },
  },
  methods: {
    initScroll() {
      this.leftScroll = new BScroll(".sidebar-wrapper", {
        click: true,
      });
    },
    setCategory(payloadIdx) {
      let categoryList = document.querySelectorAll(".menu-body-item");
      let target = categoryList[payloadIdx];
      target.scrollIntoView();

      const bodyScroller = document.querySelector(".menu-body-wrapper");
      this.scrollY = bodyScroller.scrollTop;

      // console.log('body scroller height is ' + bodyScroller.scrollTop)
      // console.log('set from click')

      this.setCategoryIndex();
    },
    getListHeight() {
      let categoryList = document.querySelectorAll(".menu-body-item");
      let height = 0;
      this.heightList.push(height);

      for (let i = 0; i < categoryList.length - 1; i++) {
        let category = categoryList[i];
        height += category.clientHeight;
        this.heightList.push(height);
      }

      // console.log(this.heightList)
    },
    setCategoryIndex() {
      let y = this.scrollY + 1;
      // console.log('outer y is' + y)
      for (let i = 0; i < this.heightList.length; i++) {
        let start = this.heightList[i];
        let end = this.heightList[i + 1];

        // console.log('y now is ' + y)
        if (y >= start && y < end) {
          this.current = i;
        }
        if (!end && y >= start && i === this.heightList.length - 1) {
          this.current = i;
        }
      }
      // console.log(this.heightList)
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
    if (this.leftScroll) {
      this.leftScroll.refresh();
    }
    this.getListHeight();
    const that = this;
    const bodyScroller = document.querySelector(".menu-body-wrapper");

    bodyScroller.onscroll = function () {
      that.scrollY = bodyScroller.scrollTop;
      // console.log('set from scroll')
      that.setCategoryIndex();
    };
  },
  watch: {
    shopInfo() {
      console.log(this.shopInfo);
    },
  },
};
</script>

<style scoped>
.slide-leave-active,
.slide-enter-active {
  transition: 0.4s;
}
.slide-enter {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(100%, 0);
}

.menu {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  /* background-color: pink; */
}

.main {
  box-sizing: border-box;
  overflow: hidden;
  height: calc(100% - 11.2vh);
  background-color: #fff;
  display: flex;
  position: sticky;
  top: 10.8vh;
}
</style>
