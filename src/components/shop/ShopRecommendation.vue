<template>
    <div class="recommend" v-for="(recommendation, i) in recommendations" :key="i">
        <p class="recommend-title">{{ recommendation.name }}</p>

        <div class="recommend-body">
            <ul>
                <li v-for="(item, idx) in recommendation.items" :key="idx">
                    <van-image
                        class="recommend-img"
                        fit="cover"
                        radius="6px"
                        lazy-load
                        :src="item.image_path"
                        alt
                    />
                    <div class="recommend-description">
                        <div class>
                            <p class="des-title">{{ item.name }}</p>
                        </div>
                        <div class>
                            <div class="des-subtitle">
                                <span class="mr-1">月售{{ item.month_sales }}</span>
                                <span>好评率{{ item.satisfy_rate }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="recommend-action">
                        <div class="price">
                            <span class="mr-1">
                                ￥
                                <span class="price-bold">{{ item.activity.fixed_price }}</span>
                            </span>
                            <span class="price-old">￥{{ item.activity.fixed_price * 2 }}</span>
                        </div>
                        <div class="add">
                            <span
                                class="add-icon material-icons-outlined"
                                @click="increase(item)"
                            >add_circle</span>
                            <div v-show="item.count > 0" class="count-container">
                                <span class="count-num">{{ item.count }}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        recommendations() {
            return this.$store.getters.doneSelectedShop.recommend
        }
    },
    methods: {
        increase(foodItem) {
            foodItem.count++;


        }
    }
}
</script>

<style scoped>
.recommend {
    padding: 0 12px;
    width: 100%;
}

.recommend-title {
    font-size: 0.8rem;
    font-weight: bold;
    margin-bottom: 1%;
}
.recommend-body {
    overflow-x: scroll;
    display: flex;
    width: 100%;
}

.recommend-body ul {
    display: flex;
}
.recommend-body ul li {
    flex: none;
    width: 28vw;
    margin-right: 2%;
}

.recommend-img {
    display: block;
    width: 28vw;
    height: 28vw;
    border-radius: 4px;
}
.recommend-description .des-title {
    color: #333;
    font-size: 0.8rem;
    margin: 3% 0 2%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.des-subtitle {
    color: #999;
    font-size: 0.6rem;
    margin-bottom: 2%;
    min-height: 1em;
    display: flex;
    justify-content: flex-start;
}

.recommend-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.price {
    font-size: 0.6rem;
    color: #fe4a32;
    width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.price-bold {
    font-size: 1rem;
    font-weight: bold;
}

.price-old {
    color: #999;
    text-decoration-line: line-through;
}

.add-icon {
    color: #00b6fd;
    font-size: 1.4rem;
}

.add {
    height: 100%;
    position: relative;
}

.count-container {
    background-color: #ff5339;
    border-radius: 50%;
    width: 0.9rem;
    height: 0.9rem;
    text-align: center;
    border: 1px solid white;
    position: absolute;
    right: -20%;
    top: -20%;
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

.mr-1 {
    margin-right: 4%;
}
</style>