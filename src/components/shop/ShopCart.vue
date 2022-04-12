<template>
    <div class="shop-cart-section">
        <!-- discount bar when no popup -->
        <div v-if="!isEmpty && !show" class="cart-discount-bar">
            <p v-if="!discountIsApplied">满{{ discountBar }}减{{ discountApplied }}元，还差{{ discountLeft }}元 <a
                    class="anchor-pure" href="">去凑单<span class="calc-icon material-icons-outlined">
                        chevron_right
                    </span></a></p>
            <p v-else>已减{{ discountLeft }}元</p>
        </div>
        <!-- *** discount bar *** -->

        <div class="shop-cart">

            <!-- main cart component -->
            <div class="cart-wrapper">
                <div class="left-container" @click="showCartPopup">
                    <div :class="{ 'icon-container-active': !isEmpty }" class="icon-container">
                        <span class="cart-icon material-icons-outlined">shopping_cart</span>

                        <div v-if="!isEmpty" class="cart-count-container">
                            <span class="cart-count-num">{{ totalCount }}</span>
                        </div>


                    </div>

                    <div class="price-container">
                        <div class="price-top">
                            <p v-if="!isEmpty">
                                <span class="price-final">
                                    ￥
                                    <span class="price-bold">{{ finalPrice }}</span>
                                </span>
                                <span v-if="priceHasDiscount" class="price-old">￥{{ oldPrice }}</span>
                            </p>

                            <span v-else class="price-none">未选购商品</span>
                        </div>
                        <p class="delivery">
                            另需配送费￥{{ delivery }}
                            <span v-if="deliveryHasDiscount" class="delivery-old">￥{{ oldDelivery }}</span>
                        </p>
                    </div>
                </div>
                <div class="right-container">
                    <a href :class="{ 'btn-active': !isEmpty && finalPrice >= minFee }" class="btn">
                        <span>{{ btnText }}</span>
                    </a>
                </div>
            </div>
        </div>
        <!-- *** main cart component *** -->

        <!-- cart details popup -->
        <van-overlay class="overlay" :show="show" @click="show = false">
            <div :class="{ 'popUp': show }" class="pop-wrapper" @click.stop>
                <div class="pop-fixed">
                    <div class="cart-discount-bar-pop">
                        <p v-if="!discountIsApplied">满{{ discountBar }}减{{ discountApplied }}元，还差{{ discountLeft }}元 <a
                                class="anchor-pure" href="">去凑单<span class="calc-icon material-icons-outlined">
                                    chevron_right
                                </span></a></p>
                        <p v-else>已减{{ discountLeft }}元</p>
                    </div>
                    <div class="pop-title-container">
                        <p class="pop-title-left">已选商品</p>

                        <div @click="confirmClear" class="clear">
                            <span class="clear-icon material-icons-outlined">
                                delete
                            </span>
                            <span>清空</span>
                        </div>
                    </div>
                </div>

                <div class="cart-pop-main">
                    <div @click="switchDetails(item)" v-for="(item, i) in cart" :key="i" class="pop-body-container mb-2">
                        <div class="pop-item-container">
                            <div class="pop-left">
                                <van-image class="pop-img mr-2" radius="4" fit="cover" lazy-load :src="item.img">
                                </van-image>
                                <div class="pop-text">
                                    <p class="pop-name mb-4">{{ item.name }}</p>
                                    <p class="pop-price">￥{{ item.price * item.count }}</p>
                                </div>
                            </div>
                            <div class="pop-right">
                                <add-to-cart :isFromCart="true" :item="item"></add-to-cart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-overlay>
        <!-- *** cart details popup *** -->

        <!-- clear cart CTA -->
        <van-popup v-model:show="showCTA" closeable round>
            <div class="cta-container">
                <p class="cta-title">确定清空购物车？</p>
                <div class="cta-actions">
                    <van-button class="cta-cancel" @click="showCTA = false" size="mini" round plain color="#47b6fd">取消
                    </van-button>
                    <van-button class="cta-confirm" @click="clearCart" size="small" round color="#47b6fd">确定
                    </van-button>
                </div>
            </div>


        </van-popup>
    </div>

    
</template>

<script>
import AddToCart from '@/components/menu/AddToCart.vue';

export default {
    components: {
        AddToCart
    },
    data() {
        return {
            show: false,
            showCTA: false,
            oldPrice: 10,
            delivery: 5,
            oldDelivery: 9,
            priceHasDiscount: false,
            deliveryHasDiscount: false,
            discounts: [
                {
                    bar: 69,
                    discount: 10,
                },
                {
                    bar: 89,
                    discount: 25,
                },
            ],
            discountIsApplied: false,
            discountBar: 0,
            discountApplied: 0,
        }
    },
    computed: {
        minFee() {
            return this.shopInfo.rst.float_minimum_order_amount;
        },
        discountLeft() {
            return this.calculateDiscount();

        },
        shopInfo() {
            return this.$store.getters.doneSelectedShop
        },
        cart() {
            return this.$store.getters.doneCart;
        },
        totalCount() {
            let cart = this.cart;
            let final = 0;
            for (let item of cart) {
                final += item.count;
            }
            return final;
        },
        isEmpty() {
            if (this.cart.length === 0) {
                return true;
            }
            return false;
        },
        finalPrice() {
            if (this.isEmpty) {
                return 0;
            }
            let price = 0;
            for (let item of this.cart) {
                price += item.count * item.price;
            }
            return this.formatNum(price);
        },
        btnText() {
            if (this.finalPrice < this.minFee) {
                if (this.finalPrice === 0) {
                    return `￥${this.minFee}起送`
                }
                return `差￥${this.formatNum(this.minFee - this.finalPrice)}起送`

            } else {
                return '去结算'
            }
        },

        // discountsShown() {
        //     let discounts = this.shop.rst.activities[0].tips;
        //     discounts = discounts.split('，')
        //     return discounts;
        // },
    },
    methods: {
        formatNum(num) {
            return parseFloat(num.toFixed(2));
        },
        calculateDiscount() {
            this.setBar();
            if (this.finalPrice !== 0 && this.finalPrice < this.discountBar) {
                this.discountIsApplied = false;
                return this.formatNum(this.discountBar - this.finalPrice);
            } else if (this.finalPrice === 0) {
                this.discountIsApplied = false;
                return 0;
            }
            else {
                this.discountIsApplied = true;
                return this.discountApplied;
            }
        },
        setBar() {
            for (let el of this.discounts) {
                if (this.finalPrice <= el.bar) {
                    this.discountBar = el.bar;
                    this.discountApplied = el.discount;
                    return;
                }
            }
        },
        showCartPopup() {
            if (!this.isEmpty) {
                this.show = !this.show;
            } else {
                this.show = false;
            }
        },
        confirmClear() {
            this.showCTA = true;
        },
        clearCart() {
            this.$store.dispatch('resetCart');
            this.showCTA = false;
        },
        switchDetails(item) {
            this.show = false;
            this.$router.push({ name: 'foodDetails', params: { foodId: item.id } })
        }
    },
    watch: {
        cart: {
            handler() {
                if (this.isEmpty) {
                    this.show = false;

                }
                console.log(this.cart);
                // console.log('bar is: ' + this.discountBar);
                // console.log('discount is : ' + this.discountApplied);
                // console.log('use discount : ' + this.discountIsApplied);
            },
            deep: true
        }
    },
    mounted() {
        // console.log(this.shopInfo)
        // this.shopInfo
    }
}
</script>


<style scoped>
.cart-discount-bar {
    position: fixed;
    left: 0;
    bottom: 7vh;
    width: 100%;
    background-color: #fcf5db;
    height: 3.2vh;
    text-align: center;
    z-index: 5;
    font-size: 1.6vh;

}

.cart-discount-bar-pop {
    width: 100%;
    background-color: #fcf5db;
    height: 3.2vh;
    text-align: center;
    font-size: 1.6vh;
}

.cart-discount-bar p,
.cart-discount-bar-pop p {
    margin: auto;
    display: inline;
    line-height: 3.2vh;
}

.calc-icon {
    font-size: 1.6vh;
    transform: translateY(10%);
}

.shop-cart {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.94);
    height: 7vh;
    z-index: 2;
}

.cart-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 2px 12px;
    height: 100%;
    width: 100%;
}

.left-container {
    display: flex;
    width: 60%;
    align-items: center;
}

.icon-container {
    background-color: #cccccc;
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
    text-align: center;
    margin-right: 1vh;
    position: relative;
}

.icon-container-active {
    background-color: #47b6fd;
}

.cart-icon {
    line-height: 5vh;
    color: #fff;
}

.price-container {
    height: 5vh;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.price-top {
    line-height: 0.9;
    font-size: 2vh;
    margin-bottom: 2%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.price-none {
    color: #9f9f9f;
    font-size: 1.6vh;
    font-weight: bold;
    line-height: 1.4;

}

.price-old {
    text-decoration: line-through;
    margin-left: 4px;
    color: #9f9f9f;
}

.price-bold {
    font-size: 2.2vh;
    font-weight: bold;
}

.delivery {
    font-size: 1.4vh;
    color: #9f9f9f;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.delivery-old {
    text-decoration: line-through;
}

.right-container {
    display: flex;
    width: 30%;
    align-items: center;
    justify-content: flex-end;
}

.btn {
    width: 100%;
    height: 5vh;
    text-align: center;
    line-height: 5vh;
    border-radius: 200px;
    background-color: grey;
    font-size: 1.8vh;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 2vw;
}

.btn:link,
.btn:visited {
    text-decoration: none;
    color: #fff;
}

.btn-active {
    background-color: #47b6fd;

}

.cart-count-num {
    font-size: 0.1rem;
    color: white;
    line-height: .9;
    margin: auto;
}

.cart-count-container {
    background-color: #ff5339;
    border-radius: 50%;
    width: 2vh;
    height: 2vh;
    text-align: center;
    position: absolute;
    right: -0.6vh;
    top: -0.2vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.anchor-pure:link,
.anchor-pure:visited {
    text-decoration: none;
    color: #fe4a32;
}

/* helpers  */
.mr-2 {
    margin-right: 2%;
}

.mb-2 {
    margin-bottom: 2%;
}

.mb-4 {
    margin-bottom: 4%;
}

/* *** */

/* cart popup  */

.overlay {
    height: calc(100% - 7vh);
    z-index: 6;

}

.pop-wrapper {
    position: fixed;
    bottom: 7vh;
    width: 100%;
    background-color: #fff;
    z-index: 1;
    max-height: 70vh;

}

.popUp {
    animation: popUp .3s ease-in-out;

}

@keyframes popUp {
    0% {
        opacity: 0;
        transform: translateY(50%);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }

}

.pop-title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.2vh;
    padding: 2px 12px;
    font-size: 1.6vh;
}

.clear {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5vh;
    color: #666;
    line-height: 2vh;
}

.clear-icon {
    font-size: 2vh;
}

.cart-pop-main {
    height: 100%;
    max-height: 63.6vh;
    overflow: scroll;

}

.pop-item-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 12px;
    width: 100%;
}

.pop-left {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 90%;

}

.pop-img {
    width: 18vw;
}

.pop-text {
    width: 70%;
}

.pop-name {
    font-size: 1.6vh;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.pop-price {
    font-size: 2.2vh;
    font-weight: bold;
    color: #47b6fd;
}

/* *** */

/* cta  */
.cta-container {
    text-align: center;
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cta-title {
    font-size: 2vh;
    font-weight: bold;
    margin: 6% 0;

}

.cta-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin-bottom: 1.4vh;
}

.cta-cancel,
.cta-confirm {
    padding: 1.4vh 7vw;
    font-size: 1.8vh;
    width: 45%;
}

/* *** cta ***  */
</style>