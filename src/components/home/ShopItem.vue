<template>
    <section class="card" @click="switchShopPage">
        <div class="card-body">
            <!-- left  -->
            <div class="logo_container">
                <van-badge :content="cartNum" color="#f73e00">
                    <van-image
                        class="logo-img"
                        fit="cover"
                        radius="5"
                        lazy-load
                        :src="shop.image_path"
                        alt
                    />
                </van-badge>
                <img class="brand-img" v-if="shop.is_premium" :src="require('@/assets/品牌.png')" alt />

            </div>
            <!-- right  -->
            <div class="card_main">
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
                        <span>{{distance}}km</span>
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
            return this.cart;
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
        switchShopPage(){
            this.$router.push('/shop');
        }
    },
}
</script>

<style scoped>
.mr-1 {
    margin-right: 0.4rem;
}
.card {
    background: #fff;
    color: #666;
    padding: 4vw 0;
    margin: 2% 3%;
    -webkit-box-shadow: 1px 0px 1px -1px rgba(0, 0, 0, 0.3);
    box-shadow: 1px 0px 1px -1px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    /* height: 20vh; */
}
.card-body {
    display: flex;
    justify-content: flex-start;
    padding: 0 2.666667vw;
    align-items: stretch;
    height: 100%;
}
.logo_container {
    width: 30vw;
    /* height: 100%; */
    position: relative;
    display: flex;
    align-items: stretch;
}

.logo-img {
    display: block;
    width: 30vw;
    height: 100%;
    box-sizing: border-box;
    border: 0.133333vw solid rgba(0, 0, 0, 0.08);
    border-radius: 0.533333vw;
    display: flex;
    align-items: center;
}

.van-image__img {
  
}
.brand-img {
    width: 36%;
    display: inline;
    position: absolute;
    top: -3%;
    left: 0;
}

.card_main {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    flex-direction: column;
    padding-left: 2.666667vw;
    font-size: 0.2rem;
    flex-grow: 1;
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
    margin: 1% 0;

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
    margin: 1% 0;

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
    margin: 1% 0;

}

.delivery {
    /* white-space: nowrap; */
    margin-right: 2%;
}
.delivery span {
    background-color: #cde5f4;
    color: #2b99dd;
    padding: 3%;
    border-radius: 5px;
    width: 100%;
    white-space: nowrap;
}

.fourth-row {
    height: 1.1rem;
    margin: 1% 0;

}
.comma {
    background-color: #faefe3;
    color: #ffad60;
    padding: 1.2%;
    border-radius: 5px;
}

.impression {
    color: #ed7124;
}

.last-row {
    margin: 1% 0;

}
</style>