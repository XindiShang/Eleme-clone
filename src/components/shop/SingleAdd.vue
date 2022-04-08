<template>
    <div class="add">
        <span class="add-icon material-icons-outlined" @click="increase">add_circle</span>
        <div class="count-container">
            <span class="count-num">{{ item.count }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],
    computed: {
        recommendations() {
            return this.$store.getters.doneSelectedShop.recommend
        }
    },
    methods: {
        increase() {

        }
    }
}
</script>

<style scoped>
.add-icon {
    color: #3ea2fa;
    font-size: 1.4rem;
}

.add {
    height: 100%;
    position: relative;
}

.count-container {
    background-color: #ff5339;
    border-radius: 50%;
    width: 0.9rem;
    height: 0.9rem;
    text-align: center;
    border: 1px solid white;
    position: absolute;
    right: -20%;
    top: -20%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.count-num {
    font-size: 0.1rem;
    color: white;
}

::-webkit-scrollbar {
    width: 0 !important;
}

.mr-1 {
    margin-right: 4%;
}
</style>