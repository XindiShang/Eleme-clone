<template>
    <van-tag v-for="(search, i) in doneSearches" :key="i" color="#ebebeb" text-color="black" round type="primary"> {{search}} </van-tag>
</template>

<script>
export default {
    data() {
        return {
            recentSearches: [
                '奶茶',
                '红烧牛肉饭',
                '水果',
                '香菜拌牛肉',
                '像素汉堡',
                '老乡鸡'
            ]
        }
    },
    computed:{
        doneSearches(){
            return this.recentSearches;
        }
    }

}
</script>

<style scoped>
.van-tag {
    font-size: 10px;
    padding: 0 8px;
}
</style>