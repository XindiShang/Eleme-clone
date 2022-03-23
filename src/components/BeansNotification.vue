<template>
    <div class="beans">
        <div class="notification">
            <div class="left">
                <van-tag size="medium" color="#fbc02d">赚豆</van-tag>
                <div class="text">
                    <span class="left">{{ leftNum }}</span>
                    <p>吃货豆即将过期</p>
                </div>
            </div>

            <van-button color="#fbc02d" size="mini" round plain type="primary">去领取</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            leftNum: 300,
        }
    },

}
</script>

<style scoped>
.beans {
    margin: 2px 14px 6px 14px;
}

.notification {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-radius: 6px;
    padding: 6px 6px;
}

.left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    color: #fbc02d;
    font-weight: bold;
    font-size: 13px;
}

.text {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 130px;
    line-height: 1.8;
    text-align: center;
}

.van-button {
    padding: 0 4px;
    width: 14%;
}

.van-tag {
    margin: 0 4px;
    border-radius: 4px;
}

p {
    color: black;
    font-weight: normal;
    display: block;
    font-size: 12px;
    margin-left: 2px;
}

</style>