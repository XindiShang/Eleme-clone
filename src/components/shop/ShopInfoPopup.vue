<template>
    <van-popup
        v-model:show="show"
        :style="{ height: '60%' }"
        round
        position="bottom"
        class="shop-info-pop"
        teleport="body"
        
    >
        <header :class="headerClass" class="shop-info-header">
            <h2 class="header-text">{{ shop.rst.name }}</h2>
            <span @click="closePopup" class="close-icon material-icons-outlined">close</span>
        </header>
        <div class="shop-info-body">
            <div class="mb-2">
                <h3 class="h3-title">商家服务</h3>
                <tag-item
                    v-for="(service, i) in services"
                    :key="i"
                    :text="service.description"
                    :title="service.name"
                    :color="serviceColor"
                ></tag-item>
            </div>
            <div class="mb-2">
                <h3 class="h3-title">公告</h3>
                <p class="announcement">公告：{{ shop.rst.promotion_info }}</p>
            </div>
        </div>
    </van-popup>
</template>

<script>

import TagItem from "./TagItem.vue";


export default {
    components: {
        TagItem
    },
    props: ['infoIsShown', 'shop'],
    emits: ['closePopup'],
    data() {
        return {
            show: false,

        }
    },
    computed: {
        serviceColor() {
            return '#757471';
        },
        services() {
            return this.shop.rst.supports;
        },
        headerClass(){
            return {
                'header-close': !this.show
            }
        }
    },
    methods: {
        closePopup() {
            this.show = false;
        }
    },
    watch: {
        infoIsShown() {
            if (this.infoIsShown) {
                this.show = true;
            } else {
                this.show = false;
                this.$emit('closePopup')
            }
        }
    }
}
</script>

<style scoped>
.shop-info-header {
    height: 6%;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 10;
    border-radius: 16px;
    
}

.header-close {
    display: none;
    
}
.header-text {
    width: 90%;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
}
.close-icon {
    position: absolute;
    right: 4%;
    color: #757471;
}

.shop-info-body {
    height: 120%;
    position: relative;
    top: 14%;
    padding: 2px 12px;
}

.announcement {
    font-size: 0.7rem;
    color: #474646;
}

.h3-title {
    font-weight: bold;
    margin-bottom: 2%;
    font-size: 0.84rem;
}

.mb-2 {
    margin-bottom: 2%;
}
</style>