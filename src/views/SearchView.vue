<template>
    <div class="search">
        <search-bar
            @confirm-search="cancel"
            @clear-val="clearInput"
            @go-back="switchPageBack"
            class="search"
            v-model="inputVal"
            :placeholder="placeholderPassed"
        ></search-bar>

        <search-suggest></search-suggest>
    </div>
</template>

<script>
import SearchBar from '../components/search/SearchBar.vue';
import SearchSuggest from '../components/search/SearchSuggest.vue';
export default {
    components: {
        SearchBar,
        SearchSuggest,
        
    },
    data() {
        return {
            placeholderPassed: '汉堡',
            inputVal: '',
        }
    },
    methods: {
        // ** handle emits **
        clearInput() {
            this.inputVal = '';
        },
        switchPageBack() {
            this.$router.back();
        },
        confirm() {
            //
        },
        searchCity() {
            if (!this.inputVal) {
                this.searchResults = [];
            } else {
                this.searchResults = this.$store.getters.doneAllCities.filter(el => el.name.includes(this.inputVal))
            }
        },
    },
    watch: {
        inputVal() {
            this.searchCity();
        }
    },

}
</script>

<style scoped>
.search{

}
</style>