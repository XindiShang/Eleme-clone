<template>
    <section class="suggest" >
        <div v-for="(item, i) in info" :key="i" class="suggest-container">
            <div class="suggest-title">
                <p>{{ item.title }}</p>
            </div>

            <div class="suggest-body">
                <van-tag
                    v-for="(search, i) in item.body"
                    :key="i"
                    color="#f6f6f6"
                    text-color="#656565"
                    round
                    type="primary"
                >{{ search }}</van-tag>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            info: [
                {
                    title: '历史搜索',
                    body: [
                        '奶茶',
                        '蓝塔',
                        '老乡鸡',
                        '麦当劳',
                        '汉堡',
                    ]
                },
                {
                    title: '搜索发现',
                    body: [
                        '星巴克专星送',
                        '蓝塔',
                        '锅贴',
                        'kfc',
                        '炒面',
                    ]
                },
            ]
        }
    },

}
</script>

<style scoped>
.suggest {
    padding: 8px 12px;
}

.suggest-title {
    font-weight: bold;
    font-size: 0.8rem;
    margin-bottom: 10px;

}
.suggest-body {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    margin-bottom: 20px;

}
.van-tag {
    font-size: 10px;
    padding: 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 1%;
}
</style>