<template>
    <van-popup
        v-model:show="show"
        :style="{ height: '80%' }"
        round
        position="bottom"
        class="discount-pop"
        teleport="body"
    >
        <header :class="headerClass" class="discount-header">
            <h2 class="header-text">红包优惠</h2>
            <span @click="closePopup" class="close-icon material-icons-outlined">close</span>
        </header>
        <div class="discount-body">
            <van-notice-bar class="mb-2" left-icon="volume-o" :scrollable="false" :text="notice" />

            <!-- coupons  -->
            <div class="mb-2">
                <h3 class="h3-title">红包</h3>
                <coupon-item
                    v-for="(pack, i) in redPacks"
                    :key="i"
                    :title="pack.title"
                    :value="pack.value"
                    :beansLeft="beansLeft"
                    :dueDate="dueDate"
                ></coupon-item>
            </div>

            <!-- discounts  -->
            <div class="mb-2">
                <h3 class="h3-title">优惠</h3>
                <tag-item
                    v-for="(item, i) in discounts"
                    :key="i"
                    class="discount-tag"
                    :color="discountColor"
                    :title="item.icon_name"
                    :text="item.description"
                ></tag-item>
            </div>
        </div>
    </van-popup>
</template>

<script>
import CouponItem from "./CouponItem.vue";
import TagItem from "./TagItem.vue";

export default {
    components: {
        CouponItem,
        TagItem,
    },
    props: ['discountIsShown', 'shop'],
    emits: ['closePopup'],
    data() {
        return {
            show: false,
            beansLeft: 500,
            notice: '店铺红包、平台红包可叠加使用哦~'

        }
    },
    computed: {
        redPacks() {
            return this.shop.redpack;
        },
        discounts() {
            return this.shop.rst.activities;
        },
        dueDate() {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 2);
            return date
        },
        discountColor() {
            return '#fe4d35';
        },
        headerClass() {
            return {
                'header-close': !this.show
            }
        }
    },
    methods: {
        closePopup() {
            this.show = false;
        }
    },
    watch: {
        discountIsShown() {
            if (this.discountIsShown) {
                this.show = true;
            } else {
                this.show = false;
                this.$emit('closePopup')
            }
        }
    }
}
</script>

<style scoped>
.discount-header {
    height: 6%;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 10;
    border-radius: 16px;
}

.header-close {
    display: none;
}

.header-text {
    font-size: 2vh;
    font-weight: bold;
    text-align: center;
}
.close-icon {
    position: absolute;
    right: 4%;
    color: #757471;
}

.discount-body {
    height: 120%;
    position: relative;
    top: 8%;
    padding: 2px 12px;
}


.h3-title {
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 1.6vh;
}

.mb-2 {
    margin-bottom: 8px;
}
</style>