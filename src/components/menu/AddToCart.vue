<template>
    <div class="add-to-cart">
        <span
            v-if="item.count > 0"
            @click="emitDecrease"
            class="minus-icon material-icons-outlined"
        >remove_circle_outline</span>
        <span v-if="item.count > 0" class="count-num">{{ item.count }}</span>
        <span @click="emitIncrease" class="add-icon material-icons-outlined">add_circle</span>
        <!-- <div class="count-container">
            <span class="count-num">{{ item.count }}</span>
        </div>-->
    </div>
</template>

<script>
export default {
    props: ['item'],
    emits: ['increase', 'decrease'],
    computed: {
        // recommendations() {
        //     return this.$store.getters.doneSelectedShop.recommend
        // }
    },
    methods: {
        emitIncrease() {
            this.$emit('increase');
        },
        emitDecrease() {
            this.$emit('decrease');
        }
    }
}
</script>

<style scoped>
.add-to-cart {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.add-icon {
    color: #3ea2fa;
    font-size: 1.4rem;
    margin-left: 10%;
}
.minus-icon {
    color: #3ea2fa;
    font-size: 1.4rem;
}

.count-num {
    margin-left: 10%;
}
</style>