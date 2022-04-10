<template>
    <div class="coupon-wrapper">
        <div class="coupon">
            <div class="coupon-main">
                <div class="main-left">
                    <p>
                        ￥
                        <span class="value">{{ value }}</span>
                    </p>
                    <p class="left-title">{{ title }}</p>
                </div>
                <div class="main-right">
                    <h3 class="right-title">店铺红包</h3>
                    <p>兑换后{{ dueDate }}到期</p>
                </div>
            </div>
            <div class="divider"></div>
            <div class="coupon-use">
                <div class="bean-row">
                    <img class="bean-img" :src="require('@/assets/bean.png')" alt />
                    <p>{{ beansLeft }}吃货豆</p>
                </div>
                <van-button
                    class="use-button"
                    size="small"
                    round
                    color="linear-gradient(to right, #dea05b, #bf7a31)"
                    text-color="#fff"
                >兑换</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value', 'title', 'dueDate', 'beansLeft'],
    data() {
        return {
           
        }
    },

}
</script>

<style scoped>
.coupon-wrapper {
    width: 100%;
    height: 10vh;
}

.coupon {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 6px;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.coupon-main {
    width: 70%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 6px;
    background-color: #fbdc9f;
    height: 100%;
}

.main-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 20%;
    margin-right: 6%;
    color: #8b511e;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.main-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 80%;
    font-size: 0.7em;
    color: #63573c;
}

.value {
    font-size: 1.5rem;
    font-weight: bold;
}

.left-title {
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}

.right-title {
    font-size: 0.86rem;
    font-weight: bold;
    /* margin-bottom: 4%; */
    color: #000;
    margin: 1% 0 3.4% 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.divider {
    /* height: ; */
    height: 60%;
    outline: 1px dashed #cab07d;
    /* offset: -1px; */
}
.coupon-use {
    width: 30%;
    border-radius: 6px;
    background-color: #fbdc9f;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.bean-row {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    font-size: .6rem;
    color: #59460c;
    justify-self: center;
    line-height: 1;

}
.bean-img {
    width: 20%;
    margin-right: 1%;
}

.use-button {
    padding: 0 6%;
    font-weight: bold;
    width: 80%;
}
</style>