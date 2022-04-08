<template>
    <!-- <section class="sidebar-container"> -->
    <div class="sidebar-wrapper">
        <ul>
            <li class="bar-item" v-for="(item, i) in menuItems" :key="i">
                <van-image
                    v-if="item.icon_url"
                    class="menu-icon"
                    fit="cover"
                    lazy-load
                    :src="item.icon_url"
                    alt
                />
                <!-- <van-badge :content="5" :offset="['.2rem', '6px']"> -->
                <span class="bar-item-text">{{ item.name }}</span>
                <!-- </van-badge> -->
                <div v-if="!item.icon_url" class="count-container">
                    <span class="count-num">4</span>
                </div>
            </li>
        </ul>
    </div>
    <!-- </section> -->
</template>

<script>
export default {
    computed: {
        menuItems() {
            return this.$store.getters.doneSelectedShop.menu
        }
    },

}
</script>

<style scoped>
/* .sidebar-container {
    box-sizing: border-box;
    height: 100%;
    background-color: pink;
    display: flex;
} */
.sidebar-wrapper {
    /* overflow-y: scroll; */
    height: 100%;
    /* bottom cart set to fixed  */
    /* height: calc(100% - 12.8vw); */
    background-color: #f8f8f8;
    padding-left: 4px;
    padding-bottom: 10.666667vw;
    width: 19vw;
    overflow: scroll;
}
.bar-item {
    padding: 4.666667vw 2vw;
    font-size: 0.6rem;
    color: #666;
    line-height: 1.2;
    width: 100%;
    position: relative;
}

.bar-item-text {
    width: 100%;
}
.menu-icon {
    max-width: 100%;
    width: 3.466667vw;
    height: 3.466667vw;
    vertical-align: top;
    margin-right: 1.4vw;
}
.count-container {
    background-color: #ff5339;
    border-radius: 50%;
    width: 0.9rem;
    height: 0.9rem;
    text-align: center;
    border: 1px solid white;
    position: absolute;
    right: 6%;
    top: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.count-num {
    font-size: 0.1rem;
    color: white;
}

::-webkit-scrollbar {
    width: 0 !important;
}
</style>