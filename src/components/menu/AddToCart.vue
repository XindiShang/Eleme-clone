<template>

    <div class="add-to-cart">

        <div v-if="haveInitializer && count === 0" @click.stop="emitChangeNUm(1)" class="initial-btn">
            <span>加入购物车</span>
        </div>

        <div v-else class="action-box">
            <span v-if="count > 0" @click.stop="emitChangeNUm(-1)"
                class="minus-icon material-icons-outlined">remove_circle_outline</span>
            <span v-if="count > 0" class="count-num">{{ count }}</span>
            <span @click.stop="emitChangeNUm(1)" id="cart-add-icon" :class="{ 'add-icon-active': toss }"
                class="add-icon material-icons-outlined">add_circle</span>
        </div>


    </div>


</template>

<script>
import debounce from 'lodash.debounce';

export default {
    props: ['item', 'isFromCart', 'haveInitializer'],
    data() {
        return {
            toss: false,
            timer: null,
        }
    },
    computed: {
        count() {
            const cart = this.$store.getters.doneCart;
            if (cart.length === 0) {
                return 0;
            } else {
                return this.getCount();
            }
        }
    },
    methods: {
        emitChangeNUm(n) {
            if (n === 1) {
                this.toss = false
                this.debouncedToss();
                this.debouncedCancelToss()

            }
            let cartItem;
            if (this.isFromCart) {
                cartItem = {
                    id: this.item.id,
                    name: this.item.name,
                    count: this.count + n,
                    price: this.item.price,
                    img: this.item.img,
                }
                // console.log(cartItem)
            } else {
                cartItem = {
                    id: this.item.item_id,
                    name: this.item.name,
                    count: this.count + n,
                    price: this.item.activity.fixed_price,
                    img: this.item.image_path,
                }
            }
            this.$store.dispatch('getCartItem', cartItem);
        },
        debouncedToss: debounce(
            function () {
                this.toss = true;
            }, 100
        ),
        debouncedCancelToss: debounce(
            function () {
                this.toss = false;
            }, 500
        ),
        getCount() {
            const cart = this.$store.getters.doneCart;
            if (this.isFromCart) {
                for (let item of cart) {
                    if (item.id === this.item.id) {
                        return item.count;
                    }
                }
            } else {
                for (let item of cart) {
                    if (item.id === this.item.item_id) {
                        return item.count;
                    }
                }
            }
            return 0;
        },
    }
}
</script>

<style scoped>
.add-to-cart {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.action-box {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;

}

.initial-btn {
    width: 76%;
    max-width: 180px;
    height: 100%;
    text-align: center;
    background-color: #00b6fd;
    color: #fff;
    line-height: 1.6vh;
    padding: 4px 5px;
    border-radius: 20px;
    cursor: pointer;

}

.initial-btn span {
    font-size: 1.6vh;
}

.minus-icon {
    color: #00b6fd;
    font-size: 3vh;
    animation: roll .2s;
    animation-iteration-count: 1;
    cursor: pointer;

}

.count-num {
    font-size: 2.2vh;
    margin-left: 10%;
}

.add-icon {
    color: #00b6fd;
    font-size: 3vh;
    margin-left: 10%;
    cursor: pointer;

}


.add-icon-active::after {
    color: #00b6fd;
    font-size: 3vh;
    margin-left: 10%;
    z-index: 1;
    animation: bounceLeft .4s cubic-bezier(0.25, 0.1, 0.25, 1);
    content: 'add_circle';
    position: absolute;
    right: 0;
}

@keyframes roll {
    0% {
        transform: rotate(90deg) translate(0, -40px);
        opacity: .1;
    }

    25% {
        transform: rotate(90deg) translate(0, -30px);
        opacity: .3;
    }

    50% {
        transform: rotate(90deg) translate(0, -20px);
        opacity: .5;
    }

    100% {
        transform: translate(0, 0);
        opacity: 1;
    }
}

@keyframes bounceLeft {
    0% {
        transform: translate(0, 0);
    }

    30% {
        transform: translate(-25vw, -10vh);
        opacity: .4;
    }

    100% {
        transform: translate(-40vw, 0);
        opacity: 0;
    }
}
</style>