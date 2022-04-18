<template>
    <div class="citiesList" ref="scrollArea">
        <div class="scroll_wrap">
            <div class="hot_wrap selectTargets">
                <div class="title">历史访问城市</div>
                <ul class="hot_city">
                    <li @click="setCity" v-for="(city, i) in visited" :key="i">{{ city }}</li>
                </ul>
            </div>
            <div class="hot_wrap">
                <div class="title">热门城市</div>
                <ul class="hot_city">
                    <li
                        @click="setCity"
                        v-for="(item, i) in cityInfo.hotCities"
                        :key="i"
                    >{{ item.name }}</li>
                </ul>
            </div>

            <div class="city_wrap" ref="stickyTop">
                <div class="city_content selectTargets" v-for="(letter, i) in keys" :key="i">
                    <div class="title">{{ letter }}</div>

                    <ul>
                        <li
                            @click="setCity"
                            v-for="(city, i) in cityInfo[letter]"
                            :key="i"
                        >{{ city.name }}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="area_keys">
            <table>
                <tr>
                    <td @click="selectKey(0)">#</td>
                </tr>
                <tr v-for="(letter, i) in keys" :key="i">
                    <td @click="selectKey(i + 1)">{{ letter }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
    props: {
        cityInfo: Object,
        keys: Array,
    },
    data() {
        return {
            scroll: null,
        }
    },
    computed: {
        visited() {
            const visitedCities = this.$store.getters.doneVisited;
            const result = [];
            for (let i = 0; i < 3; i++) {
                let lastIdx = visitedCities.length - 1;
                if (visitedCities[lastIdx - i] !== undefined) {
                    result.push(visitedCities[lastIdx - i]);
                }
            }
            if (result.length === 0) {
                return null;
            }
            return result;
        },
        stickyTop() {
            return this.$refs.stickyTop;
        }
    },
    methods: {
        setCity(e) {
            this.$store.dispatch('getCity', e.target.innerText);
            this.$router.back();
        },
        initScroll() {
            this.scroll = new BScroll(this.$refs.scrollArea, {
                click: true,
            })
        },
        selectKey(idx) {
            const selects = this.$refs.scrollArea.querySelectorAll('.selectTargets');
            let target = selects[idx];
            this.scroll.scrollToElement(target, 250);
        }
    },
    mounted() {
        // if (this.scroll) {
        //     this.scroll.refresh();
        // }
        this.$nextTick(() => {
            this.initScroll();
        })
    }

}
</script>

<style scoped>
.citiesList {
    margin-top: 6px;
    box-sizing: border-box;
    background: #f1f1f1;
    height: calc(100% - 65px);
    width: 100%;
    overflow: hidden;
}
.scroll_wrap {
    background: #fff;
    padding: 0 16px;
    /* overflow: auto; */
    /* height: 120%; */
}
.title {
    color: #848484;
    padding: 12px 0;
    font-size: 13px;
}
.hot_city {
    padding: 0 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.hot_city li {
    width: 30%;
    background: #f6f6f6;
    margin: 0 8px 8px 0;
    text-align: center;
    padding: 6px;
    font-size: 13px;
    box-sizing: border-box;
}
.city_content li {
    padding: 8px;
    border-bottom: 1px solid #eee;
}
.area_keys {
    position: fixed;
    right: 0;
    top: 25%;
    color: #7a7a7a;
    font-size: 12px;
    line-height: 1.4;
    text-align: center;
    padding: 0 5px;
}
</style>