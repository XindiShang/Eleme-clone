<template>
    <section class="shop-intro">
        <div class="card-wrapper">
            <div class="card">
                <div @click="emitShowInfo" class="card-title mb-2">
                    <div class="title-left">
                        <h2 class="shop-title mb-2">{{ shop.rst.name }}</h2>
                        <div class="shop-details">
                            <van-tag v-if="isExclusive" class="mr-2 exclusive-tag" plain text-color="#38bdf2"
                                color="#e8f7fc" size="medium">蓝骑士专送</van-tag>
                            <p class="mr-2">约{{ shop.rst.order_lead_time }}分钟</p>
                            <p class="mr-2">·</p>
                            <p>月售{{ shop.rst.recent_order_num }}</p>
                        </div>
                    </div>

                    <div class="title-right">
                        <van-image class="shop-img" lazy-load fit="cover" :src="shop.rst.image_path" alt />
                    </div>
                </div>

                <div @click="emitShowDiscount" class="card-body">
                    <div class="first-row mb-2">
                        <p class="announcement">公告：{{ shop.rst.promotion_info }}</p>
                    </div>

                    <div v-if="shop.redpack" class="second-row mb-2">
                        <van-tag v-for="(pack, i) in shop.redpack" :key="i" class="coupon" size="large"
                            color="linear-gradient(to right, #f9dfac, #eed090)" text-color="#7d4d1f">
                            <img class="crown" :src="require('@/assets/crown.png')" alt />
                            ￥
                            <span class="font-larger">{{ pack.value }}</span>
                            {{ pack.title }} | 兑
                        </van-tag>
                    </div>

                    <div v-if="hasDiscount" class="last-row ">
                        <div class="discount-left">
                            <van-tag v-for="(item, i) in discountsShown" :key="i" class="discount mr-2" plain
                                color="#f1525b">{{ item }}</van-tag>
                        </div>

                        <div class="expand">
                            <p v-if="discountNum > 1" class="mr-2">{{ discountNum }}个优惠</p>
                            <span class="expand-icon material-icons-outlined">expand_more</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
</template>

<script>
export default {
    props: ['shop'],
    emits: ['showDiscount', 'showInfo'],
    data() {
        return {
            shopInfo: this.$store.getters.doneSelectedShop,
        }
    },
    computed: {
        isExclusive() {
            return (this.shop.rst.delivery_mode && this.shop.rst.delivery_mode.text === "蜂鸟专送");
        },
        hasDiscount() {
            return this.shop.rst.activities;
        },
        discountsShown() {
            let discounts = this.shop.rst.activities[0].tips;
            discounts = discounts.split('，')
            return discounts;
        },
        discountNum() {
            return this.shop.rst.activities.length;
        }

    },
    methods: {
        formatDiscount() {
            let discounts = this.shop.rst.activities[0].tips;
            discounts = discounts.split(',')
            console.log(discounts)
        },
        emitShowDiscount() {
            this.$emit('showDiscount');
        },
        emitShowInfo() {
            this.$emit('showInfo');

        }
    },

}
</script>

<style scoped>
.shop-intro {
    width: 100%;
    height: 40vw;
    max-height: 180px;
    box-sizing: border-box;
    margin-bottom: 4px;
}

.card-wrapper {
    padding: 2px 12px;
    height: 100%;
}

.card {
    width: 100%;
    height: 100%;
    /* padding: 8px; */
    padding: 2%;
    border-radius: 6px;
    -webkit-box-shadow: 1px 0px 4px -1px rgba(0, 0, 0, 0.3);
    box-shadow: 1px 0px 4px -1px rgba(0, 0, 0, 0.3);
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
}

.card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.title-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.title-right {
    width: 20%;
    /* height: 100%; */
    display: flex;
    justify-content: flex-end;
}

.shop-title {
    font-weight: bold;
    font-size: 2.26vh;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.exclusive-tag {
    border-radius: 4px;
}

.shop-details {
    display: flex;
    justify-content: flex-start;
    width: 90%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1.5vh;
}

.shop-img {
    width: 16vw;
    max-width: 64px;
    border: 1px solid rgb(228, 225, 225);
    border-radius: 6px;
    overflow: hidden;
}

.announcement {
    font-size: 1.5vh;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #7d7d7d;
}

.crown {
    width: 1.8vh;
}

.font-larger {
    font-size: 2vh;
    font-weight: bold;
    margin-right: 4px;
}

.coupon {
    font-size: 1.4vh;
    line-height: 1;
}

.last-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
}

.discount-left {
    width: 70%;
}

.discount {
    padding: 1px 4px;
    border-radius: 4px;
}

.expand {
    display: flex;
    font-size: 1.5vh;
    width: 30%;
    justify-content: flex-end;
    align-items: center;
    color: #9b9b9b;
}

.expand-icon {
    font-size: 1.8vh;
}

/* helper classes */
.mr-2 {
    margin-right: 2%;
}

.mb-2 {
    margin-bottom: 6px;
}
</style>