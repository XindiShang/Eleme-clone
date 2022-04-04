<template>
    <div class="not-found">
        <van-image
            class="not-found-img"
            fit="cover"
            lazy-load
            :src="require('@/assets/404.jpg')"
            alt
        />
        <h3>搜索无结果</h3>
        <p>抱歉，小宝用尽全力也没有搜索成功</p>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.not-found {
    padding: 8px 12px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
}

.not-found-img {
    width: 50vw;
    margin-bottom: 2%;
}

.not-found h3 {
    color: rgb(81, 80, 80);
    font-size: 0.9rem;
    margin-bottom: 2%;

}

.not-found p {
    color: #a09e9e;
    font-size: 0.8rem;
}
</style>