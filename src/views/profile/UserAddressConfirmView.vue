<template>
  <div class="user-address-confirm-view">
    <base-util-header class="header-fixed" bgColor="white" @go-back="switchPageBack" :headerTitle="headerTitle" />

    <div class="address-confirm-body">
      <address-search-bar class="search-bar" />

      <div id="mapContainer"></div>



      <div class="card">
        hi

      </div>




    </div>


  </div>

</template>

<script>
import BaseUtilHeader from "@/components/BaseUtilHeader.vue";
import AddressSearchBar from '../../components/address/AddressSearchBar.vue';

// import { Toast } from 'vant';
import AMap from 'AMap' // 引入高德地图

export default {
  components: {
    BaseUtilHeader,
    AddressSearchBar,
  },
  data() {
    return {
      map: null
    }
  },
  computed: {
    headerTitle() {
      return '确认收货地址'
    },
  },
  methods: {
    switchPageBack() {
      this.$router.back();
    },

    clearInput(label) {
      if (label === '地址') {
        this.address.val = '';
      } else if (label === '门牌号') {
        this.addressSpecific = '';
      } else if (label === '收货人') {
        this.recipientName.val = '';
      } else if (label === '手机号') {
        this.phone.val = '';
      } else {
        return;
      }
    },

    initMap() {
      this.map = new AMap.Map('mapContainer', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始地图级别
        mapStyle: 'amap://styles/2de08eeb11b2025dc74ddede43708d08',
      })

      const that = this;

      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
        });

        that.map.addControl(geolocation);
        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            onComplete(result)
          } else {
            onError(result)
          }
        });
      });
      //解析定位结果
      function onComplete(data) {
        var str = [];
        str.push('定位结果：' + data.position);
        str.push('定位类别：' + data.location_type);
        console.log(data)


      }
      //解析定位错误信息
      function onError(data) {
        console.log(data.message)
      }
    }
    // addNewAddress() {
    //   this.$router.push({ name: 'userAddAddress' });
    // }
  },
  mounted() {
    this.initMap();
  },

}
</script>

<style scoped>
#mapContainer {
  height: 150px;
  width: 100%;
}

.user-address-confirm-view {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.header-fixed {
  position: fixed;
  top: 0;
  z-index: 1;
}

.address-confirm-body {
  position: absolute;
  top: 44px;
  /* top: 100px; */
  width: 100%;
  height: calc(100% - 44px);
}

.search-bar {
  margin: 4px 0;
}

.card {
  margin: 0 16px 8px;
  background-color: #fff;
  border-radius: 6px;
  padding: 12px;
}

</style>