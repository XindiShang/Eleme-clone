<template>

    <div class="add-to-cart">

        <span v-if="count > 0" @click.stop="emitChangeNUm(-1)"
            class="minus-icon material-icons-outlined">remove_circle_outline</span>
        <span v-if="count > 0" class="count-num">{{ count }}</span>
        <span @click.stop="emitChangeNUm(1)" class="add-icon material-icons-outlined">add_circle</span>
        <!-- <span v-if="boom" class="add-icon-after material-icons-outlined">add_circle</span> -->

        <!-- <div class="count-container">
            <span class="count-num">{{ item.count }}</span>
        </div>-->
    </div>

    
</template>

<script>
export default {
    props: ['item', 'isFromCart'],
    data() {
        return {
            // boom: false
        }
    },
    computed: {
        // recommendations() {
        //     return this.$store.getters.doneSelectedShop.recommend
        // }
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
            // if (n === 1) {
            //     this.boom = true;
            // }
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
            // this.boom = false;
        },
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
        }
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



.minus-icon {
    color: #00b6fd;
    font-size: 3vh;

}

.count-num {
    font-size: 2.2vh;
    margin-left: 10%;
}

.add-icon {
    color: #00b6fd;
    font-size: 3vh;
    margin-left: 10%;
    /* animation: bounceLeft 5s ease-in-out; */

}

/* .add-icon-after {
    color: #00b6fd;
    font-size: 1.4rem;
    margin-left: 10%;
    position: absolute;
    z-index: -1;
    animation: bounceLeft 1s ease-in-out;
} */



/* .add-icon::after {
    color: #00b6fd;
    font-size: 1.4rem;
    margin-left: 10%;
} */
/* .add-icon:active {
    color: #00b6fd;
    font-size: 1.4rem;
    margin-left: 10%;
    animation: bounceLeft 5s ease-in-out;;
}

@keyframes bounceLeft {
    0% {
        transform: translate(0, 0);
        background-color: red;
    }

    50% {
        transform: translate(-25vw, -50vw);
        background-color: red;
    }

    100% {
        transform: translate(-50vw, 0);
    }
} */
</style>