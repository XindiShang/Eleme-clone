<template>
    <div class="results">
        <div class="shop-box" v-if="shopResults">
            <shop-result v-for="(shop, i) in shopResults" :key="i" :shop="shop"></shop-result>
        </div>
        <div class="word-box" v-if="wordResults">
            <word-result @word-click="emitSelectShop" :noResult="false" v-for="(word, i) in wordResults" :key="i" :word="word"></word-result>
        </div>
        <div class="no-result-box" v-if="!hasResult">
            <word-result @word-click="emitSelectShop" :noResult="!hasResult" :word="val"></word-result>
        </div>
    </div>
</template>

<script>
import ShopResult from './ShopResult.vue';
import WordResult from './WordResult.vue';

export default {
    props: ['shopResults', 'wordResults'],
    emits: ['selectShop'],
    inject: ['inputVal'],
    components: {
        ShopResult,
        WordResult,
    },
    computed: {
        val() {
            return this.inputVal;
        },
        hasResult() {
            if (
                (this.shopResults && this.shopResults.length !== 0) ||
                (this.wordResults && this.wordResults.length !== 0)
            ) {
                return true;
            }
            return false;
        }
    },
    methods: {
        emitSelectShop(payload){
            this.$emit('selectShop', payload)
        }
    },
}
</script>

<style scoped>
.results {
    padding: 8px 12px;
    overflow: auto;
}
</style>