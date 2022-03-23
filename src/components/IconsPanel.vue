<template>
    <section class="panel">
        <table>
            <tr class="top">
                <td v-for="(img, i) in imagesTop" :key="i">
                    <img :src="require(`@/assets/${img}.png`)" alt />
                    <p>{{ img }}</p>
                </td>
            </tr>
            <tr class="middle">
                <td v-for="(img, i) in imagesMiddle" :key="i">
                    <img :src="require(`@/assets/${img}.png`)" alt />
                    <p>{{ img }}</p>
                </td>
            </tr>
            <tr class="bottom">
                <td v-for="(img, i) in imagesBottom" :key="i">
                    <img :src="require(`@/assets/${img}.png`)" alt />
                    <p>{{ img }}</p>
                </td>
            </tr>
        </table>
    </section>
</template>

<script>
export default {
    data() {
        return {
            imagesTop: [
                '美食外卖',
                '商超便利',
                '水果',
                '跑腿',
                '甜品饮品',
            ],

            imagesMiddle: [
                '下午茶',
                '汉堡披萨',
                '推荐有奖',
                '炸鸡炸串',
                '买菜',
            ],
            imagesBottom: [
                '鲜花绿植',
                '日韩料理',
                '地方美食',
                '快餐便当',
                '送药上门',
            ],
        }
    },
}
</script>

<style scoped>
.panel {
    margin: 2px 15px;
}

table {
}

td {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    padding: 0 6px;
    width: 60px;
    text-align: center;
    margin-bottom: 14px;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.top img {
    width: 56px;
    height: 56px;
    margin: auto;
}

.middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.middle img {
    width: 30px;
    height: 30px;
    margin: auto;
}

.bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bottom img {
    width: 30px;
    height: 30px;
    margin: auto;
}

p {
    font-size: 13px;
}
</style>