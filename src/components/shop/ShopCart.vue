<template>
    <div class="shop-cart">
        <div class="cart-wrapper">
            <div class="left-container">
                <div :class="{ 'icon-container-active': !isEmpty }" class="icon-container">
                    <span class="cart-icon material-icons-outlined">shopping_cart</span>
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

                        <span v-else class="price-none">{{ finalPrice }}</span>
                    </div>
                    <p class="delivery">
                        另需配送费￥{{ delivery }}
                        <span v-if="deliveryHasDiscount" class="delivery-old">￥{{ oldDelivery }}</span>
                    </p>
                </div>
            </div>
            <div class="right-container">
                <a href :class="{ 'btn-active': !isEmpty }" class="btn">
                    <span>{{ btnText }}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // props: ['isEmpty'],
    data() {
        return {
            price: 0,
            minFee: 20,
            oldPrice: 10,
            delivery: 5,
            oldDelivery: 9,
            priceHasDiscount: false,
            deliveryHasDiscount: false,
        }
    },
    computed: {
        shopInfo() {
            return this.$store.getters.doneSelectedShop
        },
        isEmpty() {
            if (this.price == 0) {
                return true;
            }
            return false;
        },
        finalPrice() {
            if (this.price == 0) {
                return '未选购商品'
            }
            return this.price;
        },
        btnText() {
            if (this.price < this.minFee) {
                if (this.price == 0) {
                    return `￥${this.minFee}起送`
                }
                return `差￥${this.minFee}起送`

            } else {
                return '去结算'
            }
        },
    },
}
</script>


<style scoped>
.shop-cart {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.94);
    height: 7vh;
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
    /* height: 100%; */
}
.icon-container {
    background-color: #cccccc;
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
    text-align: center;
    margin-right: 1vh;
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
    font-size: 0.7rem;
    margin-bottom: 2%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.price-none {
    color: #9f9f9f;
    font-weight: bold;
}
.price-old {
    text-decoration: line-through;
    margin-left: 4px;
    color: #9f9f9f;
}

.price-bold {
    font-size: 1.2rem;
    font-weight: bold;
}
.delivery {
    font-size: 0.7rem;
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
    font-size: 0.94rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.btn:link,
.btn:visited {
    text-decoration: none;
    color: #fff;
}

.btn-active {
    background-color: #47b6fd;

}
</style>