<template>
    <div @click="switchShopPage" class="shop-item mb-4">
        <span class="shop-icon material-icons-outlined mr-2">storefront</span>

        <div class="shop-wrapper">
            <div class="top-row mb-1">
                <span ref="shopName" class="mr-1">{{ shop.name }}</span>
                <van-tag v-if="showTag" text-color="#0EB3FF" plain color="#ededed">蓝骑士专送</van-tag>
            </div>

            <div class="bottom-row mb-2">
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
        switchShopPage(){
            this.$router.push('/shop');
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

.mb-1 {
    margin-bottom: 1%;
}
.mb-2 {
    margin-bottom: 2%;
}
.mb-4 {
    margin-bottom: 4%;
}
.shop-item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid #f1f1f1;
    cursor: pointer;
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
}

.bottom-row {
    width: 100%;
    font-size: 0.7rem;
    color: #a09e9e;
}
</style>