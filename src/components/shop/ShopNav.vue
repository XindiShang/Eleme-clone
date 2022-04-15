<template>
    <van-sticky offset-top="6.8vh">
        <div class="nav">
            <div class="nav-left">
                <div class="nav-main-item-wrapper">
                    <div class="nav-item-container">
                        <router-link @click="activate('menu')" :to="{ name: 'menu' }" class="nav-item">
                            <p class="nav-title">点餐</p>
                        </router-link>
                        <span :class="menuLine" class="material-icons-outlined">maximize</span>
                    </div>
                </div>

                <div class="nav-item-wrapper">

                    <div class="nav-item-container mr-2">
                        <router-link @click="activate('reviews')" :to="{ name: 'reviews' }" class="nav-item">
                            <p class="nav-title">评价</p>
                        </router-link>
                        <span :class="reviewLine" class="material-icons-outlined">maximize</span>
                    </div>
                </div>
                <div class="nav-item-wrapper">
                    <div class="nav-item-container">
                        <router-link @click="activate('seller')" :to="{ name: 'seller' }" class="nav-item">
                            <p class="nav-title">商家</p>
                        </router-link>
                        <span :class="sellerLine" class="material-icons-outlined">maximize</span>
                    </div>
                </div>




            </div>

            <div class="nav-right">
                <div class="friend-btn">
                    <span>好友拼单</span>

                </div>
            </div>
        </div>
    </van-sticky>

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
    height: 4.2vh;
    margin-bottom: 4px;

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
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.friend-btn {
    width: 100%;
    max-width: 170px;
    text-align: center;
    border: 1px solid #38bdf2;
    border-radius: 20px;
    color: #38bdf2;
    padding: 3px 6px;
    font-size: 1.2vh;
}


.nav-item-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}

.nav-main-item-wrapper {
    display: flex;
    width: 30%;
    min-width: 70px;
    max-width: 170px;
}

.nav-item-wrapper {
    display: flex;
    width: 30%;
    min-width: 70px;
    max-width: 170px;
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


.mr-2 {
    margin-right: 8px;
}

.active {
    color: #333;
    font-weight: bold;
}

.line {
    width: 1rem;
    height: 0.2rem;
    background: #2395ff;
    position: relative;
    top: 0.2rem;
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