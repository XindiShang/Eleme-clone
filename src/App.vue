<template>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      latResult: null,
      lngResult: null,
    }
  },
  methods: {
    getLocation() {
      const that = this;
      /* eslint-disable */

      // convert to formatted address, cuz browser doesn't allow http get location
      const geocoderWrapper = function () {
        AMap.plugin('AMap.Geocoder', function () {
          var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            // city: '010'
          })

          var lnglat = [that.lngResult, that.latResult]

          geocoder.getAddress(lnglat, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // result为对应的地理位置详细信息
              // console.log('converted')
              const payload = {
                city: result.regeocode.addressComponent['city'] || result.regeocode.addressComponent['province'],
                province: result.regeocode.addressComponent['province'],
                address: result.regeocode.formattedAddress,
                lat: that.lngResult,
                lng: that.latResult,
              }
              // console.log(payload);
              that.address = result.regeocode.formattedAddress;
              that.$store.dispatch('getAddress', payload)
            }
          })
        })
      }

      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // // 定位按钮的停靠位置的偏移量
          // offset: [10, 20],
          // //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          // zoomToAccuracy: true,
          // //  定位按钮的排放位置,  RB表示右下
          // position: 'RB'
        })

        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            onComplete(result)
          } else {
            onError(result)
          }
        });

        function onComplete(data) {
          // data是具体的定位信息
          that.latResult = data.position.lat || null;
          that.lngResult = data.position.lng || null;
          geocoderWrapper()
        }

        function onError() {
          // 定位出错
          that.address = '定位失败'
        }
      })


      /* eslint-disable */
    }
  },
  created() {
    this.getLocation();
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  font-size: 14px;
  background: white;
  
}
</style>
