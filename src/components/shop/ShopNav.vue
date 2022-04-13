<template>
    <van-sticky offset-top="2.3rem">
        <div class="nav">
            <div class="nav-left">
                <div class="nav-item-container mr-4">
                    <router-link @click="activate('menu')" :to="{ name: 'menu' }" class="nav-item">
                        <p class="nav-title">点餐</p>
                    </router-link>
                    <span :class="menuLine" class="material-icons-outlined">maximize</span>
                </div>

                <div class="nav-item-container mr-2">
                    <router-link
                        @click="activate('reviews')"
                        :to="{ name: 'reviews' }"
                        class="nav-item"
                    >
                        <p class="nav-title">评价</p>
                    </router-link>
                    <span :class="reviewLine" class="material-icons-outlined">maximize</span>
                </div>

                <div class="nav-item-container">
                    <router-link
                        @click="activate('seller')"
                        :to="{ name: 'seller' }"
                        class="nav-item"
                    >
                        <p class="nav-title">商家</p>
                    </router-link>
                    <span :class="sellerLine" class="material-icons-outlined">maximize</span>
                </div>
            </div>

            <div class="nav-right">
                <van-tag plain round color="#38bdf2" size="medium">好友拼单</van-tag>
            </div>
        </div>
    </van-sticky>

    <!-- <div class>
        <van-tabs swipeable line-width="20px" color="#2395ff" v-model:active="activeName">
            <van-tab title-class="hi" :to="{ name: 'menu' }" title="点餐" name="menu">
                <router-view></router-view>
            </van-tab>
            <van-tab :to="{ name: 'reviews' }" title="评价" name="reviews">
                <router-view></router-view>
            </van-tab>
            <van-tab :to="{ name: 'seller' }" title="商家" name="seller">
                <router-view></router-view>
            </van-tab>
            <template #nav-right>
                <van-tag plain round size="medium" color="#38bdf2">好友拼单</van-tag>
            </template>
        </van-tabs>
    </div>-->
</template>

<script>
export default {
    data() {
        return {
            activeName: 'menu'
        }
    },
    computed: {
        menuLine() {
            return {
                'underline': this.activeName === 'menu',
                'base-line': this.activeName !== 'menu'
            }
        },
        reviewLine() {
            return {
                'underline': this.activeName === 'reviews',
                'base-line': this.activeName !== 'reviews'
            }
        },
        sellerLine() {
            return {
                'underline': this.activeName === 'seller',
                'base-line': this.activeName !== 'seller'
            }
        }
    },
    methods: {
        activate(name) {
            this.activeName = name;
        }
    },
    mounted() {
        this.activate(this.$route.name)
    },
}
</script>

<style scoped>
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    background: white;
    z-index: 10;
    padding: 6px 16px;
    height: 2.4rem;
}

.nav-left {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    width: 60%;
    height: 100%;
}

.nav-right {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.nav-item-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.nav-title {
    margin: 0;
}

.nav-item {
    text-align: center;
    font-size: 1.7vh;
    text-decoration: none;
    color: #000;
    height: 100%;
}

.mr-4 {
    margin-right: 17%;
}
.mr-2 {
    margin-right: 8%;
}

.active {
    color: #333;
    font-weight: bold;
}

.line {
    width: 1rem;
    height: 0.2rem;
    background: #2395ff;
    /* display: inline-block; */
    position: relative;
    top: 0.2rem;
    /* position: absolute;
    left: 45%;
    bottom: 0;
    margin-left: -10px; */
}

.base-line {
    position: relative;
    top: 0.04rem;
    height: 4px;
    font-weight: bold;
    opacity: 0;
    font-size: 1rem;
}
.underline {
    color: #2395ff;
    position: relative;
    top: 0.04rem;
    height: 4px;
    font-weight: bold;
    font-size: 1rem;
}
</style>