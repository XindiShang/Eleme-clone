<template>
    <section class="panel">
        <recent-search></recent-search>
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
import RecentSearch from './RecentSearch.vue';

export default {
    components: {
        RecentSearch,
    },
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
    box-sizing: border-box;
}

table {
    margin: 6px 0px 0;
    box-sizing: border-box;
    display: block;
    left: 0;
}

td {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    padding: 0 6px;
    width: 100%;
    text-align: center;
    margin-bottom: 14px;
}

p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.top {
    width: auto;
    display: grid;
    gap: 2%;
    grid-template-columns: repeat(5, 1fr);
}

.top img {
    width: 50px;
    height: 50px;
    margin: auto;
}

.middle {
    width: auto;
    display: grid;
    gap: 2%;
    grid-template-columns: repeat(5, 1fr);
}

.middle img {
    width: 30px;
    height: 30px;
    margin: auto;
}

.bottom {
    width: auto;
    display: grid;
    gap: 2%;
    grid-template-columns: repeat(5, 1fr);
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