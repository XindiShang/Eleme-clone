<template>
    <div class="locate-view">
        <base-util-header bg-color="white" @go-back="switchBack" :header-title="headerTitle" />

        <!-- search bar  -->
        <div class="wrapper">
            <div class="search-bar">
                
                <div class="city-container" @click="switchCityPage">
                    <span class="city">{{ city }}</span>
                    <span class="material-icons-outlined down-arrow-icon">expand_more</span>
                </div>

                <div class="divider"></div>

                <div class="input-field">
                    <div class="input-field-left">
                        <span class="material-icons-outlined search-icon">search</span>
                        <input v-model="inputVal" type="text" placeholder="请输入你的收货地址" />
                    </div>
                    <div v-show="inputVal" @click="clearInput" class="input-field-right">
                        <span class="material-icons delete-icon">cancel</span>
                    </div>
                </div>

            </div>

            <a class="cancel-text" @click="switchBack">取消</a>
        </div>


        <div class="search-results up">
            <address-search-result v-for="item in results" :key="item.id" :result="item"></address-search-result>
            <div v-if="showMsg" class="no-result">
                <h3>找不到地址？</h3>
                <p>请尝试只输入小区，写字楼或学校名，</p>
                <p>详细地址（如门牌号）可稍后输入哦。</p>
            </div>
        </div>
    </div>
</template>

<script>
import debounce from 'lodash.debounce';
import AddressSearchResult from '../../components/address/AddressSearchResult.vue';
import BaseUtilHeader from '@/components/UI/BaseUtilHeader.vue';

export default {
    components: {
        AddressSearchResult,
        BaseUtilHeader
    },
    data() {
        return {
            inputVal: '',
            results: [],
        }
    },
    computed: {
        city() {
            return this.$store.getters.doneCity || '定位中';
        },
        showMsg() {
            if (!this.inputVal) {
                return false;
            } else {
                return true;
            }
        },
        headerTitle() {
            return '选择收货地址'
        }
    },
    methods: {
        switchBack() {
            this.$router.back();
        },
        switchCityPage() {
            this.$router.push('/city');

        },
        debouncedSearch: debounce(
            function () {
                /* eslint-disable */
                const that = this;
                that.results = [];
                AMap.plugin('AMap.Autocomplete', function () {
                    // 实例化Autocomplete
                    var autoOptions = {
                        //city 限定城市，默认全国
                        city: that.$store.getters.doneCity
                    }
                    var autoComplete = new AMap.Autocomplete(autoOptions);
                    autoComplete.search(that.inputVal, function (status, result) {
                        // 搜索成功时，result即是对应的匹配数据
                        that.results = result.tips
                    })
                })
                /* eslint-disable */
            }, 300
        ),
        clearInput() {
            this.inputVal = '';
        }
    },
    watch: {
        inputVal() {
            this.debouncedSearch();
        },
    },

}
</script>

<style scoped>
.locate-view {
    width: 100%;
    height: 100%;
    padding-top: 8px;
}
.up {
    position: relative;
    top: -4px;
}

.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 16px;

}

.search-bar {
    width: 90%;
    height: 28px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: none;
    background-color: #eaeaea;
    border-radius: 20px;
    font-size: 13px;
}

.cancel-text {
    font-size: 13px;
    line-height: 1;
    text-decoration: none;
    color: rgb(73, 72, 72);
}

.input-field {
    width: 76%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.input-field-left {
    display: flex;
    justify-content: start;
    align-items: center;
}

.input-field-right {
    display: flex;
    align-items: center;
}

.delete-icon {
    color: #ccc;
    font-size: 16px;
}

.city-container {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.city {
    margin-left: 10px;
    width: 12%;
    font-size: 12px;
    color: rgb(73, 72, 72);
}

.down-arrow-icon {
    color: #ccc;
    font-size: 12px;
}

.search-icon {
    color: #757575;
    font-size: 16px;
}


.search-bar input,
.search-bar input:enabled {
    border: none;
    background-color: transparent;
    outline: none;
}

.divider {
    height: 60%;
    width: 1px;
    background: #ccc;
    margin: 0 4px;
}

.no-result {
    padding: 18px 16px 4px 16px;
    text-align: center;
    color: rgb(170, 166, 166);
}

.no-result p {
    font-size: 12px;
}
</style>