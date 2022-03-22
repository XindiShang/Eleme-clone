<template>
    <div class="current-location">
        <p class="title">当前定位</p>
        <div class="location-bar">
            <div class="location">
                <span class="material-icons-outlined">place</span>
                <span class="location-text">{{ place }}</span>
            </div>
            <a href class="relocate" @click="relocate">重新定位</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            latResult: null,
            lngResult: null,
        }
    },
    computed: {
        place() {
            if (!this.$store.getters.doneAddress) {
                return '定位中...';
            }
            return this.$store.getters.doneAddress;
        }
    },
    methods: {
        relocate() {
            const that = this;
            /* eslint-disable */
            const geocoderWrapper = function () {
                AMap.plugin('AMap.Geocoder', function () {
                    var geocoder = new AMap.Geocoder({
                    })

                    var lnglat = [that.lngResult, that.latResult]

                    geocoder.getAddress(lnglat, function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            const payload = {
                                city: result.regeocode.addressComponent['city'] || result.regeocode.addressComponent['province'],
                                province: result.regeocode.addressComponent['province'],
                                address: result.regeocode.formattedAddress,
                            }
                            that.address = result.regeocode.formattedAddress;
                            that.$store.dispatch('getAddress', payload)
                        }
                    })
                })
            }

            AMap.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,
                    timeout: 10000,
                })

                geolocation.getCurrentPosition(function (status, result) {
                    if (status == 'complete') {
                        onComplete(result)
                    } else {
                        onError(result)
                    }
                });

                function onComplete(data) {
                    that.latResult = data.position.lat || null;
                    that.lngResult = data.position.lng || null;
                    geocoderWrapper()
                }

                function onError() {
                    that.address = '定位失败'
                }
            })


            /* eslint-disable */
        }
    },

}
</script>

<style scoped>
.current-location {
    background-color: white;
    padding: 4px 16px 2px 16px;
    height: 7%;
    width: auto;
}

.title {
    color: #ccc;
    font-size: 12px;
}
.location-bar {
    display: flex;
    justify-content: space-between;
    align-items: end;
    height: 58%;
}

.location {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
}

.location-text {
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
}
.relocate {
    text-decoration: none;
    color: #2b99dd;
    font-size: 12px;
    position: relative;
    bottom: 4px;
}
</style>