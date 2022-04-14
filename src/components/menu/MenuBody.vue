<template>
    <div class="menu-body-wrapper">
        <ul>
            <li class="menu-body-item" v-for="(item, i) in menuItems" :key="i">
                <div class="body-item-title">
                    <strong>{{ item.name }}</strong>
                    <span>{{ item.description }}</span>
                </div>

                <div @click="switchDetails(foodItem)" class="body-item-main" v-for="(foodItem, idx) in item.foods"
                    :key="idx">
                    <!-- image container  -->
                    <van-image class="food-item-img" radius="4" fit="cover" lazy-load :src="foodItem.image_path" />

                    <div class="text-container">
                        <!-- description container  -->
                        <div class="food-item-description">
                            <h3 class="des-title">{{ foodItem.name }}</h3>
                            <p class="des-main">{{ foodItem.description }}</p>
                            <p class="des-footer">
                                <span class="mr-1">月售{{ foodItem.month_sales }}份</span>
                                <span>好评率{{ foodItem.satisfy_rate }}%</span>
                            </p>
                        </div>

                        <!-- action container  -->
                        <div class="food-item-action">
                            <span class="price">
                                ￥
                                <strong class="price-bold">{{ foodItem.activity.fixed_price }}</strong>
                            </span>
                            <div class="action-container">
                                <add-to-cart :haveInitializer="false" class="action-component" :isFromCart="false" :item="foodItem">
                                </add-to-cart>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import AddToCart from '@/components/menu/AddToCart.vue';

// import BScroll from '@better-scroll/core'


export default {
    data() {
        return {
            scroller: null,
            heightList: [],
            height: 0,
        }
    },
    components: {
        AddToCart,

    },
    computed: {
        menuItems() {
            return this.$store.getters.doneSelectedShop.menu
        },
        cart() {
            return this.$store.getters.doneCart
        },
        formatPrice(price) {
            if (price < 0) {
                return price * -1;
            }
            return price;
        }

    },
    methods: {
        switchDetails(item) {
            this.$router.push({ name: 'foodDetails', params: { foodId: item.item_id, foodItem: JSON.stringify(item) } })
        }

        // initScroll() {
        //     this.scroller = new BScroll('.menu-body-wrapper', {
        //         click: true,
        //         probeType: 3,
        //     });
        //     // this.scroller.on('scroll', (position) => {
        //     //     console.log(position.y);
        //     // })
        //     console.log(this.scroller)
        // }
    },
    mounted() {
        // console.log(this.menuItems)
        // this.$nextTick(() => {
        //     this.initScroll();
        // })
        // const bodyScroller = this.$refs.bodyScroller;


    },

}
</script>

<style scoped>
.menu-body-wrapper {
    overflow: auto;
    box-sizing: border-box;
    height: 100%;
    width: 80vw;
    padding-bottom: 7vh;
}

.menu-body-item {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.menu-body-item:last-of-type {
    margin-bottom: 40%;
}

.body-item-title {
    /* margin-left: 2.666667vw; */
    padding: 2vw 8vw 2vw 2.6vw;
    height: 6vh;
    background-color: #fff;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    width: 100%;
}

.body-item-title strong {
    margin-right: 1.333333vw;
    font-weight: 700;
    font-size: 1.5vh;
    color: #000;
    flex: none;
}

.body-item-title span {
    flex: 1;
    color: #999;
    font-size: 1.2vh;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 0.9;
}

.body-item-main {
    height: 30vw;
    padding: 2.6vw;
    /* margin-bottom: 0.133333vw; */
    display: flex;
    align-items: flex-start;
}

.food-item-img {
    width: 24vw;
    height: 24vw;
    flex: none;
    margin-right: 2.6vw;
    box-sizing: border-box;
    border: 0.133333vw solid rgba(0, 0, 0, 0.08);
}

.food-item-description {
    flex: 1;
    /* padding-bottom: 6.666667vw; */
    padding-right: 4vw;
}

.food-item-description h3 {
    padding-right: 4vw;
    font-weight: 700;
    overflow: hidden;
    font-size: 2vh;
    white-space: nowrap;
    width: 40vw;
    text-overflow: ellipsis;
    color: #333;
}

.text-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.des-main {
    margin: 1.333333vw 0;
    font-size: 1vh;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 42.666667vw;
}

.des-footer {
    margin: 1.733333vw 0 !important;
    color: #999;
    font-size: 1vh;
    line-height: 1;
    min-height: 1em;
}

.food-item-action {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
}

.price {
    font-size: 0.7rem;
    line-height: 4.266667vw;
    color: #fe4a32;
    padding-bottom: 0.933333vw;
    vertical-align: text-bottom;

}

.price-bold {
    font-size: 2.2vh;
}

.action-container {
    width: 36%;
    height: 100%;
}

.mr-1 {
    margin-right: 2%;
}

::-webkit-scrollbar {
    width: 0 !important;
}
</style>