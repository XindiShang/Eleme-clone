<template>
    <section class="shop" ref="shop">
        <shop-header :early="early" :mid="mid" :late="late" :final="final"></shop-header>
        <van-image
            class="shop-image"
            lazy-load=""
            fit="cover"
            :src="shopBackground"
        />
        <div class="shop-body" style="height: 2000px; background-color: blue" ref="shopBody"></div>
    </section>
</template>

<script>
import ShopHeader from '../../components/shop/ShopHeader.vue';

export default {
    components: {
        ShopHeader,
    },

    data() {
        return {
            shopInfo: null,
            shopBackground: null,
            early: false,
            mid: false,
            late: false,
            final: false,

        }
    },
    computed: {

    },
    methods: {
        async getData() {
            await this.$axios("/api/profile/batch_shop")
                .then(res => {
                    console.log(res.data);
                    this.shopInfo = res.data;
                    this.shopBackground = res.data.rst.scheme;
                })
        },

    },

    created() {
        this.getData();
    },
    mounted() {
        const shop = this.$refs.shop;
        const that = this;
        shop.addEventListener('scroll', function () {
            that.early = false;
            that.mid = false;
            that.late = false;
            that.final = false;
            // if (shop.scrollTop < 10) {
            // }
            if (shop.scrollTop >= 10 && shop.scrollTop < 30) {
                that.early = true;

            } else if (shop.scrollTop >= 30 && shop.scrollTop <= 50) {

                that.mid = true;

            } else if (shop.scrollTop >= 50 && shop.scrollTop < 80) {

                that.late = true;

            } else if (shop.scrollTop >= 80) {
                that.final = true;
            } else {
                that.early = false;

            }

            // console.log(shop.scrollTop)

        })
    }

}

</script>

<style scoped>
.shop {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    background-color: white;
    overflow: scroll;
}


.shop-image {
    /* position: absolute; */
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem
}

.shop-body {
    /* height: calc(100% - 10rem); */
}
</style>