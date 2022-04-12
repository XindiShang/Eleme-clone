<template>
    <div class="current-location">
        <p class="title">当前定位</p>
        <div class="location-bar">
            <div class="location">
                <span :class="logoClass">{{ logo }}</span>
                <span @click="switchPage" class="location-text">{{ result }}</span>
            </div>
            <a href class="relocate" @click="relocate">重新定位</a>
        </div>  </div>
</template>

<script>

export default {
    props: {
        isCity: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            latResult: null,
            lngResult: null,
        }
    },
    computed: {
        result() {
            if (this.isCity) {
                return this.$store.getters.doneCity || '定位中...';
            } else {
                return this.$store.getters.doneAddress || '定位中...';
            }

        },
        logo() {
            if (this.isCity) {
                return 'near_me';
            }
            return 'place';
        },
        logoClass() {
            // if (this.isCity) {
            //     return 'material-icons';
            // }
            // return 'material-icons-outlined';
            return {
                'material-icons': this.isCity,
                'material-icons-outlined': !this.isCity,
                'logo-blue': this.isCity,
            }
        }
    },
    methods: {
        switchPage() {
            if (this.isCity) {
                this.$router.back();
            } else {
                this.$router.push('/home');

            }
        },
        relocate() {
            const that = this;
            // console.log('relocating')
            /* eslint-disable */
            const geocoderWrapper = function () {
                AMap.plugin('AMap.Geocoder', function () {
                    var geocoder = new AMap.Geocoder({
                    })

                    var lnglat = [that.lngResult, that.latResult]
                    // console.log(lnglat)

                    geocoder.getAddress(lnglat, function (status, result) {
                        // console.log(status)
                        // console.log(result)
                        if (status === 'complete' && result.info === 'OK') {
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
                    // console.log(data)
                    geocoderWrapper()
                }

                function onError() {
                    that.address = '定位失败'
                }
            })


            /* eslint-disable */
        }
    },
    mounted() {
        this.relocate();
    },

}
</script>

<style scoped>
.current-location {
    background-color: white;
    padding: 4px 16px 2px 16px;
    height: 7%;
    width: auto;
    /* display: relative;
    margin-top: 100px; */
}

.title {
    color: #aaa;
    font-size: 12px;
    margin-bottom: 2%;
}

.location-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 58%;
}

.location {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
}

.location-text {
    font-size: 1rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
}

.relocate {
    text-decoration: none;
    color: #53c1fc;
    font-size: .86rem;
    position: relative;
    line-height: 1;
    margin: auto;
    /* bottom: 4px; */
}

.logo-blue {
    color: #46a4ff;
    font-size: 12px;
    margin-right: 2px;
}
</style>