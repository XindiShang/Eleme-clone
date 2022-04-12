<template>
    <!-- <section class="sidebar-container"> -->
    <div class="sidebar-wrapper">
        <ul>
            <li @click="emitSelectCategory(i)" :class="{ 'current': i === currentIdx }" class="bar-item"
                v-for="(item, i) in menuItems" :key="i">
                <van-image v-if="item.icon_url" class="menu-icon" fit="cover" lazy-load :src="item.icon_url" alt />
                <span class="bar-item-text">{{ item.name }}</span>
                <div v-if="!item.icon_url && count(item) !== 0" class="count-container">
                    <span class="count-num">{{ count(item) }}</span>
                </div>
            </li>
        </ul>
    </div>
    <!-- </section> -->
</template>

<script>

export default {
    props: ['currentIdx'],
    emits: ['selectCategory'],

    computed: {
        menuItems() {
            return this.$store.getters.doneSelectedShop.menu
        },

    },
    methods: {
        emitSelectCategory(index) {
            this.$emit('selectCategory', index)
        },
        count(menuItem) {
            const cart = this.$store.getters.doneCart;
            let finalCount = 0;
            if (cart.length === 0) {
                return 0;
            } else {
                for (let item of cart) {
                    for (let foodItem of menuItem.foods) {
                        if (item.id === foodItem.item_id) {
                            // console.log(item.count)
                            finalCount += item.count;
                        }
                    }
                }
                return finalCount;
            }
        },
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

.current {
    background-color: white;
    font-weight: bold;
    color: #000 !important;
}

.sidebar-wrapper {
    overflow-y: auto;
    height: 100%;
    /* bottom cart set to fixed  */
    /* height: calc(100% - 12.8vw); */
    background-color: #f1f1f1;
    /* padding-left: 4px; */
    padding-bottom: 7vh;
    width: 20vw;
    /* overflow: scroll; */
}

.bar-item {
    padding: 4vw 8px 4vw 16px;
    font-size: 1vh;
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
    width: 1.8vh;
    height: 1.8vh;
    text-align: center;
    /* border: 1px solid white; */
    position: absolute;
    right: 8%;
    top: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.count-num {
    font-size: .1rem;
    color: white;
    line-height: .9;
    /* width: .4rem;
    height: .4rem; */
}

::-webkit-scrollbar {
    width: 0 !important;
}
</style>