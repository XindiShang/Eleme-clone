<template>
    <section class="card" @click="switchShopPage">
        <div class="card-body">
            <!-- left  -->
            <div class="logo_container">
                <!-- <van-badge :content="cartNum" color="#f73e00"> -->
                <van-image class="logo-img" fit="cover" radius="5" lazy-load :src="shop.image_path" alt />
                <!-- </van-badge> -->
                <div v-if="cartNum" class="count-container">
                    <span class="count-num">{{ cartNum }}</span>
                </div>
                <img class="brand-img" v-if="shop.is_premium" :src="require('@/assets/品牌.png')" alt />

            </div>
            <!-- right  -->
            <div class="card-main">
                <!-- 1 title and more  -->
                <div class="first-row">
                    <span class="shop-name">{{ shop.name }}</span>
                    <span class="material-icons-outlined more-icon">more_vert</span>
                </div>

                <!-- 2  -->
                <div class="second-row">
                    <div class>
                        <span class="rating">
                            <b class="rating-bold">{{ shop.rating }}</b>分
                        </span>
                        <span>月售{{ shop.recent_order_num }}</span>
                    </div>

                    <div class>
                        <span class="mr-1">{{ shop.order_lead_time }}分钟</span>
                        <span>{{ distance }}km</span>
                    </div>
                </div>

                <!-- 3 bar condition and exclusive-delivery -->
                <div class="third-row">
                    <div class>
                        <span class="mr-1">起送￥{{ shop.float_minimum_order_amount }}</span>
                        <span>配送￥{{ shop.float_delivery_fee }}</span>
                    </div>

                    <div class="delivery">
                        <span v-if="shop.delivery_mode">蓝骑士专送</span>
                    </div>
                </div>

                <!-- 4 impression  -->
                <div class="fourth-row">
                    <span class="comma">
                        “
                        <span class="impression">{{ randImpression }}</span>”
                    </span>
                </div>
                <!-- 5 discounts -->
                <div class="last-row">
                    <van-tag color="#f1525b" plain type="primary">{{ randTag }}</van-tag>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['shop'],
    data() {
        return {
            cart: 3,
            impressions: [
                '热情掌柜',
                '味道很好',
                '好吃做早餐的分量刚好',
                '雪菜很下饭很好吃，下次继续点',
                '味道很好，双击666',
                '性价比很高',
                '味道鲜美，价格便宜，实惠',
            ],
            tags: [
                '28减10',
                '45减16',
                '60减19',
                '35减4',
                '40减7',
                '23减2',
                '21减6',
            ]
        }
    },
    computed: {
        cartNum() {
            // to be determined by store value
            return this.getCartLength();
        },
        randNum() {
            return Math.floor(Math.random() * (this.impressions.length))
        },
        randImpression() {
            return this.impressions[this.randNum];
        },
        randTag() {
            return this.tags[this.randNum];
        },
        distance() {
            return (this.shop.distance / 1000).toFixed(2)
        }
    },
    methods: {
        switchShopPage() {
            this.$router.push({ name: 'shop', params: { shopId: this.shop.id } });
        },
        getCartLength() {
            const cart = this.$store.getters.doneCart;
            if (cart.length === 0) {
                return 0;
            } else {
                let total = 0;
                for (let item of cart) {
                    total += item.count
                }
                return total;
            }
        }
    },
}
</script>

<style scoped>
.mr-1 {
    margin-right: 0.4rem;
}

.count-container {
    background-color: #ff5339;
    border-radius: 50%;
    width: 4vw;
    height: 4vw;
    max-width: 20px;
    max-height: 20px;
    text-align: center;
    position: absolute;
    right: -4px;
    top: -4px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.count-num {
    font-size: .8rem;
    color: white;
    line-height: .9;
}


.card {
    box-sizing: border-box;
    background: #fff;
    color: #666;
    /* padding: 10px; */
    /* margin: 2px 10px 6px 10px; */
    /* margin: 2% 3%; */
    -webkit-box-shadow: 1px 0px 1px -1px rgba(0, 0, 0, 0.3);
    box-shadow: 1px 0px 1px -1px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    height: 20%;
    width: 100%;
    margin-bottom: 10px;
}

.card-body {
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    align-items: flex-start;
    height: 100%;
    width: 100%;
}

.logo_container {
    width: 30%;
    height: 100%;
    max-width: 180px;
    max-height: 180px;
    position: relative;
    display: flex;
    align-items: stretch;
}

.logo-img {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 180px;
    max-height: 180px;
    box-sizing: border-box;
    border: 0.133333vw solid rgba(0, 0, 0, 0.08);
    border-radius: 0.533333vw;
}

.brand-img {
    width: 36%;
    display: inline;
    position: absolute;
    top: -3%;
    left: 0;
}

.card-main {
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    flex-direction: column;
    font-size: 0.2rem;
    flex-grow: 1;
    width: 60%;
    margin-left: 4%;
}

.first-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    font-weight: bold;
    font-size: 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 2%;
}

.shop-name {
    width: 80%;
}

.more-icon {
    line-height: 1;
    font-size: 1.2rem;
    font-weight: normal;
}

.first-row span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.second-row {
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: space-between;
    font-size: 0.8rem;
    margin-bottom: 1.5%;
}

.rating {
    color: #ed7124;
}

.rating-bold {
    font-size: 0.92rem;
}

.third-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 1.1rem;
    margin-bottom: 1.5%;
}

.delivery {
    width: 30%;
    position: relative;

}

.delivery span {
    border: 1px solid #cde5f4;
    color: #41b3ec;
    padding: 0 6px;
    border-radius: 5px;
    white-space: nowrap;
    right: 0;
    position: absolute;

}

.fourth-row {
    height: 1.3rem;
    margin-bottom: 1.5%;
}

.comma {
    background-color: #faefe3;
    color: #ffad60;
    padding: 4px;
    border-radius: 5px;
}

.impression {
    color: #ed7124;
}

.last-row {
    margin-bottom: 1.5%;
}
</style>