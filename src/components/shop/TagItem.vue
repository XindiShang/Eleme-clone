<template>
    <div class="discount-item-wrapper">
        <div class="discount-item">
            <van-tag class="mr-2 discount-icon" :color="color" plain>{{ title }}</van-tag>
            <p class="discount-text">{{ text }}</p>
        </div>  </div>
</template>

<script>
export default {
    props: ['title', 'text', 'color']

}
</script>

<style scoped>
.discount-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 8px;
}

.discount-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1.5vh;
    color: #474646;
    line-height: 1;
}

.discount-icon {
    padding: 0 8px;
    font-size: 1.3vh;
}

.mr-2 {
    margin-right: 8px;
}
</style>