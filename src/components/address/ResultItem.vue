<template>
    <!-- <p @click="getgo">heihei</p> -->
    <div class="result" @click="setNewLocation">
        <div class="result-top">
            <h4>{{ name }}</h4>
            <span>{{ distance }}km</span>
        </div>
        <div class="result-bottom">
            <p>{{ address }}</p>
        </div>
    </div>
</template>

<script>

export default {
    props: ['result'],
    data() {
        return {
            latResult: null,
            lngResult: null,
            distance: null,
            doCount: false,
        }
    },
    computed: {
        name() {
            return this.result.name;
        },
        address() {
            if (!this.result.address.length) {
                return '';
            } else {
                return this.result.address;
            }

        },
        finalDistance() {
            return this.distance;
        }
    },

    methods: {
        showDistance() {
            this.doCount = true;
            this.changeAddress();
        },
        setNewLocation() {
            this.doCount = false;
            this.changeAddress();
            this.$router.replace(this.$route.query.redirect ? { name: this.$route.query.redirect, params: { userId: 'a-fake-id-333', chosenAddress: this.result.name + ' ' + this.result.address } } : { name: 'home' });

        },
        changeAddress() {
            /* eslint-disable */
            const that = this;
            // convert to formatted address, cuz browser doesn't allow http get location
            AMap.plugin('AMap.Geocoder', function () {
                var geocoder = new AMap.Geocoder({
                    // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                    // city: '010'
                })

                geocoder.getLocation(that.result.name, function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        that.latResult = result.geocodes[0].location.lat;
                        that.lngResult = result.geocodes[0].location.lng;
                        var lnglat = [that.lngResult, that.latResult];
                        if (!that.doCount) {
                            geocoder.getAddress(lnglat, function (status, result) {
                                if (status === 'complete' && result.info === 'OK') {
                                    // result为对应的地理位置详细信息
                                    const payload = {
                                        city: result.regeocode.addressComponent['city'] || result.regeocode.addressComponent['province'],
                                        province: result.regeocode.addressComponent['province'],
                                        address: result.regeocode.formattedAddress,
                                        lat: that.lngResult,
                                        lng: that.latResult,
                                    }
                                    that.$store.dispatch('getAddress', payload);
                                    // that.$router.push('/home');


                                }
                            })
                        } else {
                            var storedCoords = that.$store.getters.doneLngLat;
                            var newCoords = lnglat;
                            var dis = AMap.GeometryUtil.distance(storedCoords, newCoords);
                            if (dis) {
                                that.distance = (dis / 1000).toFixed(2);
                            } else {
                                that.distance = null;
                            }
                        }
                    }
                })
            })

            /* eslint-disable */

        }
    },
    mounted() {
        this.showDistance();
    },


}
</script>

<style scoped>
.result {
    border: 1px solid #f1f1f1;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    height: 50px;
    padding: 2px 16px 2px 16px;
}

.result-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.result-top h4 {
    font-size: 16px;
    font-weight: bold;
}

.result-top span {
    font-size: 12px;
    color: rgb(170, 166, 166);
}

.result-bottom {
    width: 100%;
}

.result-bottom p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: calc(96%);
    font-size: 12px;
    color: rgb(73, 72, 72);
}
</style>