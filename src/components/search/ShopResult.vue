<template>
    <div @click="switchShopPage" class="shop-item">
        <span class="shop-icon material-icons-outlined mr-2">storefront</span>

        <div class="shop-wrapper">
            <div class="top-row ">
                <span ref="shopName" class="mr-1">{{ shop.name }}</span>
                <van-tag v-if="showTag" text-color="#47b6fd" plain color="#ededed">蓝骑士专送</van-tag>
            </div>

            <div class="bottom-row ">
                <span class="mr-2">评价{{ shop.rating }}</span>
                <span class="mr-2">配送￥{{ shop.float_delivery_fee }}</span>
                <span>{{ distance }}km</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['shop'],
    inject: ['inputVal'],
    computed: {
        showTag() {
            if (this.shop.tags.length > 1) {
                return this.shop.tags[1].name == '蜂鸟'

            }
            return false;
        },
        distance() {
            return (this.shop.distance / 1000).toFixed(2);
        }
    },
    methods: {
        switchShopPage() {
            this.$router.push({ name: 'shop', params: { shopId: this.shop.id } });
        }
    },
    mounted() {
        let ipt = this.inputVal;
        let name = this.$refs.shopName;
        if (ipt) {
            ipt = ipt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            let pattern = new RegExp(`${ipt}`, "gi");
            name.innerHTML = name.textContent.replace(pattern, match => `<mark>${match}</mark>`)
        }
    },
    watch: {
        inputVal() {
            let ipt = this.inputVal;
            let name = this.$refs.shopName;
            if (ipt) {
                ipt = ipt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                let pattern = new RegExp(`${ipt}`, "gi");
                name.innerHTML = name.textContent.replace(pattern, match => `<mark>${match}</mark>`)
            }

        }
    }


}
</script>

<style scoped>
.mr-1 {
    margin-right: 1%;
}

.mr-2 {
    margin-right: 2%;
}

.shop-item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid #f1f1f1;
    cursor: pointer;
    margin-bottom: 10px;

}

.shop-icon {
    font-size: 1.2rem;
    color: #706c6c;
}

.shop-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
}

.top-row {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: 0.86rem;
    margin-bottom: 4px;
}

.bottom-row {
    width: 100%;
    font-size: 0.7rem;
    color: #a09e9e;
    margin-bottom: 4px;
}
</style>