<template>
    <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div>
            <shop-item v-for="(item, i ) in shops" :key="i" :shop="item.restaurant"></shop-item>
        </div>
    </van-list>
    <!-- </van-pull-refresh> -->
</template>

<script>
import ShopItem from './ShopItem.vue';
// import { Toast } from 'vant';

export default {
    components: {
        ShopItem,
    },
    data() {
        return {
            page: 0,
            size: 5,
            loading: false,
            finished: false,
            // allLoaded: false,
        }
    },
    computed: {
        shops() {
            return this.$store.getters.doneAllShops;
        }
    },
    methods: {
        // onLoad() {
        //     // 异步更新数据
        //     // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        //     if (this.isInit) {
        //         this.page++;
        //         this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`)
        //             .then(res => {
        //                 if (res.data.length > 0) {
        //                     res.data.forEach(item => {
        //                         this.$store.dispatch('getSingleShop', item);
        //                     })
        //                     this.loading = false;
        //                 } else {
        //                     this.finished = true;
        //                     this.$emit('finish-loading', false);
        //                 }
        //                 console.log(this.$store.getters.doneAllShops.length)
        //             })
        //     }

        // },
        onLoad() {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            if (this.page == 0) {
                this.$store.dispatch('clearAllShops');
            }
            this.page++;
            console.log(`current page: ${this.page}`)
            this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`)
                .then(res => {
                    if (res.data.length > 0) {
                        res.data.forEach(item => {
                            this.$store.dispatch('getSingleShop', item);
                        })
                        this.loading = false;
                    } else {
                        this.finished = true;
                    }
                    console.log(`current store length: ${this.$store.getters.doneAllShops.length}`)
                })


        },
    }

}
</script>

<style scoped>
</style>