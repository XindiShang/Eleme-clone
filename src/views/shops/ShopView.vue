<template>
    <section class="shop" ref="shop">
        <shop-header :early="early" :mid="mid" :late="late" :final="final"></shop-header>
        <van-image class="shop-bg-image" lazy-load fit="cover" :src="shopBackground" />
        <shop-intro
            @show-discount="toggleDiscountShow"
            @show-info="toggleInfoShow"
            v-if="!isLoading"
            :shop="shopInfo"
            class="shop-info"
        ></shop-intro>

        <shop-nav v-if="!isLoading" class="shop-nav" />
        <router-view v-if="!isLoading" class="shop-body"></router-view>

        <discount-popup
            v-if="!isLoading"
            :shop="shopInfo"
            :discountIsShown="discountIsShown"
            @close-popup="toggleDiscountShow"
        ></discount-popup>
        <shop-info-popup
            v-if="!isLoading"
            :shop="shopInfo"
            :infoIsShown="infoIsShown"
            @close-popup="toggleInfoShow"
        ></shop-info-popup>
        
    </section>
</template>

<script>
import ShopHeader from '../../components/shop/ShopHeader.vue';
import ShopIntro from '../../components/shop/ShopIntro.vue';
import DiscountPopup from '../../components/shop/DiscountPopup.vue';
import ShopInfoPopup from '../../components/shop/ShopInfoPopup.vue';
import ShopNav from '@/components/shop/ShopNav.vue';

export default {
    components: {
        ShopHeader,
        ShopIntro,
        DiscountPopup,
        ShopInfoPopup,
        ShopNav
    },


    data() {
        return {
            shopInfo: null,
            shopBackground: null,
            isLoading: null,
            early: false,
            mid: false,
            late: false,
            final: false,
            discountIsShown: false,
            infoIsShown: false,

        }
    },
    computed: {

    },
    methods: {
        async getData() {
            this.isLoading = true;
            try {
                const res = await this.$axios("/api/profile/batch_shop");
                res.data.recommend.forEach(recommend => {
                    recommend.items.forEach(item => {
                        item.count = 0
                    })
                })
                res.data.menu.forEach(category => {
                    category.foods.forEach(foodItem => {
                        foodItem.count = 0
                    })
                })
                this.shopInfo = res.data;
                this.shopBackground = res.data.rst.scheme;
                this.shopRst = res.data.rst;

                console.log(res.data);

                this.$store.dispatch('getSelectedShop', res.data);

            } catch (e) {
                console.log(e);
            }

            this.isLoading = false;


            //         .then(res => {
            //     console.log(res.data);
            //     this.shopInfo = res.data;
            //     this.shopBackground = res.data.rst.scheme;
            //     this.shopRst = res.data.rst;
            //     this.isLoading = false;

            //     this.$store.dispatch('getSelectedShop', res.data);
            // })
        },
        toggleDiscountShow() {
            this.discountIsShown = !this.discountIsShown;
        },
        toggleInfoShow() {
            this.infoIsShown = !this.infoIsShown;
        }

    },

    created() {
        this.getData();

    },
    mounted() {

        const shop = this.$refs.shop;
        const that = this;
        shop.addEventListener('scroll', function () {
            that.early = false;
            that.mid = false;
            that.late = false;
            that.final = false;
            // if (shop.scrollTop < 10) {
            // }
            if (shop.scrollTop >= 10 && shop.scrollTop < 30) {
                that.early = true;
            } else if (shop.scrollTop >= 30 && shop.scrollTop <= 50) {
                that.mid = true;
            } else if (shop.scrollTop >= 50 && shop.scrollTop < 80) {
                that.late = true;
            } else if (shop.scrollTop >= 80) {
                that.final = true;
            } else {
                that.early = false;
            }
            // console.log(shop.scrollTop)
        })
    }

}

</script>

<style scoped>
.shop {
    width: 100%;
    height: 100vh;
    overflow: scroll;
    box-sizing: border-box;
    background-color: #fafafa;
    
}

.shop-bg-image {
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
}

.shop-info {
    position: relative;
    bottom: 5%;
}

.shop-nav {
    position: relative;
    bottom: 4%;
    width: 100%;
}

.shop-body {
    position: relative;
    bottom: 4%;
    height: 100%;
    display: initial;
    overflow: scroll;
    /* background-color: pink; */
}
</style>