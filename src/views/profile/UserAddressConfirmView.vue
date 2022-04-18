<template>
  <div class="user-address-confirm-view">
    <base-util-header class="header-fixed" bgColor="white" @go-back="switchPageBack" :headerTitle="headerTitle" />

    <div class="address-confirm-body">
      <address-search-bar class="search-bar" />

      <div id="mapContainer"></div>



      <div class="card">
        <div v-if="nearby" class="nearby-list">
          <nearby-item v-for="(place, i) in nearby" :key="i" :item="place" :isChosen="i === 0" />
        </div>
      </div>



    </div>


  </div>

</template>

<script>
import BaseUtilHeader from "@/components/BaseUtilHeader.vue";
import AddressSearchBar from '../../components/address/AddressSearchBar.vue';
import NearbyItem from '../../components/address/NearbyItem.vue';
import { Toast } from 'vant';
import AMap from 'AMap'

export default {
  components: {
    BaseUtilHeader,
    AddressSearchBar,
    NearbyItem
  },
  data() {
    return {
      map: null,
      nearby: null,
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

      // AMap.plugin('AMap.Geolocation', function () {
      //   var geolocation = new AMap.Geolocation({
      //     enableHighAccuracy: true,//是否使用高精度定位，默认:true
      //     timeout: 10000,          //超过10秒后停止定位，默认：5s
      //     buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //     zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
      //     showButton: false,
      //     noIpLocate: 2

      //   });

      //   that.map.addControl(geolocation);
      //   geolocation.getCurrentPosition(function (status, result) {
      //     if (status == 'complete') {
      //       onComplete(result)
      //     } else {
      //       onError(result)
      //     }
      //   });
      // });
      // //解析定位结果
      // function onComplete(data) {
      //   var str = [];
      //   str.push('定位结果：' + data.position);
      //   str.push('定位类别：' + data.location_type);
      //   console.log(data)


      // }
      // //解析定位错误信息
      // function onError(data) {
      //   console.log(data.message)
      // }

      const store = that.$store.getters;


      AMap.service(["AMap.PlaceSearch"], function () {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type: '餐饮服务', // 兴趣点类别
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: store.doneCity, // 兴趣点城市

          // citylimit: true, 

          // map: that.map, // 展现结果的地图实例
          // autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });

        console.log(store.doneLngLat)
        console.log(store.doneCity)


        var cpoint = [store.doneLngLat[1], store.doneLngLat[0]]; //中心点坐标
        placeSearch.searchNearBy('', cpoint, 200, function (status, result) {
          if (status == 'complete') {
            console.log(result)
            that.nearby = result.poiList.pois;
          } else {
            Toast('获取周边地址失败，请手动输入地址')
          }
        });
      });
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
  height: 50%;
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
  width: 100%;
  height: calc(100% - 44px);
}

.search-bar {
  margin: 4px 0;
}

.card {
  background-color: #fff;
  border-radius: 6px;
  padding: 12px;
  height: 50%;
  overflow: auto;
}
</style>