<template>
    <section class="shop" ref="shop">
        <!-- header part  -->
        <shop-header v-if="!isDetails" :early="early" :mid="mid" :late="late" :final="final"></shop-header>
        <van-image v-if="!isDetails" class="shop-bg-image" lazy-load fit="cover" :src="shopBackground" />
        <shop-intro @show-discount="toggleDiscountShow" @show-info="toggleInfoShow" v-if="!isLoading && !isDetails"
            :shop="shopInfo" class="shop-info"></shop-intro>

        <!-- header popups -->
        <div v-if="!isLoading && !isDetails" class="">
            <discount-popup :shop="shopInfo" :discountIsShown="discountIsShown" @close-popup="toggleDiscountShow">
            </discount-popup>

            <shop-info-popup :shop="shopInfo" :infoIsShown="infoIsShown" @close-popup="toggleInfoShow">
            </shop-info-popup>
        </div>

        <!-- navbar  -->
        <shop-nav v-if="!isLoading && !isDetails" class="shop-nav" />

        <!-- nav content: 1. menu 2. reviews 3. seller info  -->
        <router-view @share="hideCart" v-if="!isLoading" class="shop-body" v-slot="{ Component }">
            <transition name="slide">
                <component :is="Component" />
            </transition>
        </router-view>

        <!-- shopping cart for menu and reviews section  -->
        <keep-alive>
            <shop-cart v-if="!isLoading && showCart && !shareIsOn"></shop-cart>
        </keep-alive>

    </section>
</template>

<script>
import ShopHeader from '../../components/shop/ShopHeader.vue';
import ShopIntro from '../../components/shop/ShopIntro.vue';
import DiscountPopup from '../../components/shop/DiscountPopup.vue';
import ShopInfoPopup from '../../components/shop/ShopInfoPopup.vue';
import ShopNav from '@/components/shop/ShopNav.vue';
import ShopCart from '@/components/shop/ShopCart.vue';

export default {
    components: {
        ShopHeader,
        ShopIntro,
        DiscountPopup,
        ShopInfoPopup,
        ShopNav,
        ShopCart
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
            shareIsOn: false,

        }
    },
    computed: {
        showCart() {
            return this.$route.name !== 'seller';
        },
        isDetails() {
            return this.$route.name === 'foodDetails';
        }

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
                        if (foodItem.activity.fixed_price < 0) {
                            foodItem.activity.fixed_price *= -1;
                        }
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
        },
        hideCart(payload) {
            this.shareIsOn = payload;
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
        })
    }

}

</script>

<style scoped>
.slide-leave-active,
.slide-enter-active {
    transition: .5s ease;
}

.slide-enter-from {
    transform: translate(100%, 0);
}

.slide-leave-to {
    transform: translate(-100%, 0);
}


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
    bottom: 3%;
    height: 100%;
    display: initial;
    overflow: scroll;
    /* background-color: pink; */
}
</style>