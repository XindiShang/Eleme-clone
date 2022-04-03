<template>
    <base-header>
        <!-- select menu  -->
        <div class="select-menu">
            <span class="material-icons-outlined select-menu-left" @click="switchHomePage">close</span>
            <span class="select-menu-middle">选择收货地址</span>
            <span>新增地址</span>
        </div>
        <!-- search bar  -->
        <div class="search-bar">
            <div @click="switchCityPage">
                <span class="city">{{ city }}</span>
                <span class="material-icons-outlined down-arrow-icon">expand_more</span>
            </div>

            <div class="divider"></div>
            <span class="material-icons-outlined search-icon">search</span>
            <p @click="switchLocatePage">请输入你的收货地址</p>
        </div>
    </base-header>

    <current-location ></current-location>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import CurrentLocation from '../components/address/CurrentLocation.vue';

export default {
    components: {
        BaseHeader,
        CurrentLocation,
    },
    computed: {
        city() {
            return this.$store.getters.doneCity || '定位中';
        }
    },
    methods: {
        switchHomePage() {
            this.$router.push('/home');
        },
        switchLocatePage() {
            this.$router.push('/locate');
        },
        switchCityPage(){
            this.$router.push('/city');

        }
    },
}
</script>

<style scoped>
.select-menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 14px;
}

.select-menu-left {
    width: 16%;
}
.select-menu-middle {
    font-size: 16px;
    font-weight: bold;
}

.search-bar {
    width: 100%;
    height: 28px;
    display: flex;
    justify-content: start;
    align-items: center;
    border: none;
    background-color: #f1f1f1;
    border-radius: 20px;
    font-size: 13px;
    padding: 0px;
    margin-top: 14px;
}

.city {
    margin-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: calc(12%);
    font-size: 12px;
    color: rgb(73, 72, 72);
}

.down-arrow-icon {
    color: #ccc;
    font-size: 12px;
}

.search-icon {
    color: rgb(73, 72, 72);
    font-size: 16px;
}

.search-bar p {
    line-height: 1.2;
    font-size: 13px;
    margin: 0 4px;
    color: #ccc;
}

.divider {
    height: 60%;
    width: 1px;
    background: #ccc;
    margin: 0 4px;
}
</style>