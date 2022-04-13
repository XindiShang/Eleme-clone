<template>
  <section class="seller">
    <div class="card">

      <!-- address and contact info  -->
      <div class="shop-geography mb-2">
        <div class="shop-location">
          <p class="card-title">{{ shopInfo.name }}</p>
          <div class="shop-address">
            <span class="location-icon material-icons-outlined">
              place
            </span>
            <span>{{ shopInfo.address }}</span>
          </div>
        </div>

        <span @click="show = true" class="tel-icon material-icons-outlined">
          phone
        </span>

      </div>

      <!-- shop general info  -->
      <div class="general-info mb-2">
        <p class="card-title">商家信息</p>
        <p>商家品类：<span>{{ shopType }}</span></p>
        <p>营业时间：<span>{{ openingHours }}</span></p>
      </div>

      <!-- shop qualifications check  -->
      <div class="safety-check mb-2">
        <a class="anchor-pure" :href="shopInfo.qualification.link" target="blank">查看本店食品安全信息</a>
      </div>

    </div>

    <div class="card report-container">
      <p>举报商家</p>
    </div>

    <van-action-sheet v-model:show="show" cancel-text="取消" close-on-click-action @select="makeCall"
      @cancel="onCancel">
      <div @click="makeCall" class="call-cell">
        <span class="tel-icon-pop material-icons">
          call
        </span>
        <span>呼叫{{ shopInfo.phone }}</span>
      </div>
    </van-action-sheet>

  </section>
</template>

<script>
import { Toast } from 'vant';

export default {
  data() {
    return {
      show: false
    }
  },
  computed: {
    shopInfo() {
      return this.$store.getters.doneSelectedShop.rst
    },
    openingHours() {
      return this.shopInfo.opening_hours[0].replace('/', '-')
    },
    shopType() {
      return '汉堡薯条/炸鸡炸串'
    }
  },
  methods: {
    makeCall() {
      this.show = false;
      Toast('已呼叫');
    },
    onCancel() {
      Toast('已取消');
    }
  },


}
</script>

<style scoped>
.seller {
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
}

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

.card-title {
  font-size: 1.5vh;
  font-weight: bold;
  margin-bottom: 2%;
}

.shop-geography {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shop-location {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 70%;
}

.shop-address {
  display: flex;
  align-items: center;
  font-size: 1.3vh;
  color: #333;
}

.location-icon {
  font-size: 2vh;
  margin-right: 1%;
}

.tel-icon {
  font-size: 3.8vh;
  color: #47b6fd;
}

.general-info {
  font-size: 1.3vh;
  color: #333;
}

.safety-check {
  text-align: center;
}

.anchor-pure {
  font-size: 1.3vh;
  border-radius: 30px;
  border: 1px solid #ccc;
  padding: 1% 4%;

}

.anchor-pure:link,
.anchor-pure:visited {
  text-decoration: none;
  color: #333;

}

.report-container {
  font-size: 1.6vh;
  color: #333;
  text-align: center;
}

.call-cell {
  padding: 3% 4%;
  display: flex;
  align-items: center;
  color: #147efb;
  font-size: 2vh;
  
}

.tel-icon-pop  {
  font-size: 3vh;
  color: #333;
  margin-right: 3%;
}

.mb-2 {
  margin-bottom: 4%;
}
</style>