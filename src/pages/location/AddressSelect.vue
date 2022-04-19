<template>
    <div class="address-view">
        <base-util-header bg-color="white" left-icon="close" @go-back="switchHomePage" @right-click="addNewAddress"
            :header-title="headerTitle" :right-text="rightText" />

        <div class="address-view-body">
            <!-- search bar  -->
            <address-search-bar />
            <current-location class="current-location" />

        </div>

    </div>


</template>

<script>
import AddressSearchBar from '../../components/address/AddressSearchBar.vue';
import CurrentLocation from '../../components/address/CurrentLocation.vue';
import BaseUtilHeader from '@/components/UI/BaseUtilHeader.vue';

export default {
    components: {
        BaseUtilHeader,
        CurrentLocation,
        AddressSearchBar
    },
    computed: {
        city() {
            return this.$store.getters.doneCity || '定位中';
        },
        headerTitle() {
            return '选择收货地址'
        },
        rightText() {
            return '新增地址'
        }
    },
    methods: {
        switchHomePage() {
            this.$router.push('/home');
        },
        switchLocatePage() {
            this.$router.push('/locate');
        },
        switchCityPage() {
            this.$router.push('/city');
        },
        addNewAddress() {
            this.$router.push({ name: 'userNewAddress', params: { userId: 'a-fake-id-333' } });
        }
    },
}
</script>

<style scoped>
.address-view {
    width: 100%;
    height: 100%;
    padding-top: 8px;
}

.address-view-body {
    padding: 4px 16px;
}

.current-location {
    margin-top: 8px;
}
</style>