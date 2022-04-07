<template>
    <div class="nav">
        <div class="nav-left">
            <div class="nav-item-container mr-4">
                <router-link @click="activate('menu')" :to="{ name: 'menu' }" class="nav-item">
                    <p class="nav-title">点餐</p>
                </router-link>
                <span :class="menuLine" class="material-icons-outlined">maximize</span>
            </div>

            <div class="nav-item-container mr-2">
                <router-link @click="activate('review')" :to="{ name: 'reviews' }" class="nav-item">
                    <p class="nav-title">评价</p>
                </router-link>
                <span :class="reviewLine" class="material-icons-outlined">maximize</span>
            </div>

            <div class="nav-item-container">
                <router-link @click="activate('seller')" :to="{ name: 'seller' }" class="nav-item">
                    <p class="nav-title">商家</p>
                </router-link>
                <span :class="sellerLine" class="material-icons-outlined">maximize</span>
            </div>

            <!-- <router-link :to="{ name: 'seller' }" class="nav-item">
                <p>商家</p>
                <span class="line material-icons-outlined">horizontal_rule</span>
            </router-link>-->
        </div>

        <div class="nav-right">
            <van-tag plain round color="#38bdf2" size="medium">好友拼单</van-tag>
        </div>
    </div>

    <!-- <div class>
        <van-tabs line-width="20px" color="#2395ff" v-model:active="activeName">
            <van-tab title-class="hi" :to="{ name: 'menu' }" title="标签 1" name="menu"></van-tab>
            <van-tab :to="{ name: 'reviews' }" title="标签 2" name="reviews"></van-tab>
            <van-tab :to="{ name: 'seller' }" title="标签 3" name="seller"></van-tab>
            <template #nav-right>
                <van-tag plain round color="#38bdf2" >好友拼单</van-tag>
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
        menuLine(){
            return {
                'underline': this.activeName === 'menu',
                'base-line': this.activeName !== 'menu'
            }
        },
        reviewLine(){
            return {
                'underline': this.activeName === 'review',
                'base-line': this.activeName !== 'review'
            }
        },
        sellerLine(){
            return {
                'underline': this.activeName === 'seller',
                'base-line': this.activeName !== 'seller'
            }
        },
    },
    methods: {
        activate(name){
            this.activeName = name;
        }
    }
}
</script>

<style scoped>
.nav {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    box-sizing: border-box;
    /* line-height: 10.666667vw; */
    /* border-bottom: 1px solid #e4e4e4; */
    background: pink;
    /* position: sticky;
  top: 0px; */
    z-index: 10;
    padding: 4px 12px;
}

.nav-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
    font-size: 0.95rem;
    text-decoration: none;
    color: #666;
    height: 100%;
}

.mr-4 {
    margin-right: 8%;
}
.mr-2 {
    margin-right: 4%;
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
    top: 0.2rem;
    height: 10px;
    font-weight: bold;
    opacity: 0;
}
.underline {
    color: #2395ff;
    position: relative;
    top: 0.2rem;
    height: 10px;
    font-weight: bold;
}
</style>