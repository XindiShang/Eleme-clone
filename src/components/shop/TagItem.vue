<template>
    <div class="discount-item-wrapper">
        <div class="discount-item">
            <van-tag  class="mr-2 discount-icon" :color="color" plain>{{ title }}</van-tag>
            <p class="discount-text">{{ text }}</p>
        </div>
    </div>
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
    margin-bottom: 2%;
}

.discount-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 0.7rem;
    color: #474646;
    line-height: 1;
}

.discount-icon {
    padding: 0 2%;
    font-size: .7rem;
}

.mr-2 {
    margin-right: 2%;
}

</style>