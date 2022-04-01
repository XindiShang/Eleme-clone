<template>
    <div class="grid-items">
        <table>
            <tr>
                <td v-for="(ad, i) in gridAds" :key="i">
                    <div class="grid-text">
                        <h3>{{ ad.title }}</h3>
                        <p>{{ ad.des }}</p>
                    </div>
                    <img :src="require(`@/assets/${ad.title}大.png`)" alt />
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {

    data() {
        return {

            gridAds: [
                { title: '推荐有奖', des: '最高15元' },
                { title: '关注服务号', des: '订阅消息' },
                { title: '超级吃货卡', des: '每月20元' },
            ]
        }
    },

}
</script>

<style scoped>
.grid-items {
    margin: 2px 10px 6px 10px;
    box-sizing: border-box;
}

table {
    /* margin: auto; */
    width: 100%;
}

tr {
    display: flex;
    justify-content: space-bewteen;
    align-items: center;
}

td {
    padding: 0 6px;
    width: 30%;
    height: 50px;
    background-color: white;
    margin: 0 4px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.grid-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 70%;
    margin-bottom: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}

h3 {
    font-weight: bold;
    font-size: 12px;
    line-height: 1.2;
}

p {
    font-size: 10px;
    color: #9c9b9b;
    line-height: 1.2;
}

table img {
    width: 40px;
    height: 40px;
}
</style>