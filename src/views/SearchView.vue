<template>
    <div class="search">
        <van-sticky>
            <search-bar
                @confirm-search="confirm"
                @clear-val="clearInput"
                @go-back="switchPageBack"
                class="search"
                v-model="inputVal"
                :placeholder="placeholderPassed"
                ref="searchBarFixed"
            ></search-bar>
        </van-sticky>

        <!-- 把v-if条件改成反 -->
        <div v-if="!isConfirmed">
            <search-suggest v-if="!inputVal.trim()"></search-suggest>
            <search-results
                @select-shop="confirm"
                v-else
                :shopResults="restaurants"
                :wordResults="words"
            ></search-results>
        </div>

        <div v-else>
            <result-not-found v-if="!hasResult"></result-not-found>
            <div v-else>
                <van-sticky :offset-top="44">
                    <filter-bar
                        class="filter-bar-background"
                        @get-condition="setCondition"
                        :fixedOn="false"
                    ></filter-bar>
                </van-sticky>

                <shop-list :condition="conditionPassed"></shop-list>
            </div>
        </div>
    </div>
</template>

<script>
import SearchBar from '../components/search/SearchBar.vue';
import SearchSuggest from '../components/search/SearchSuggest.vue';
import SearchResults from '../components/search/SearchResults.vue';
import ResultNotFound from '../components/search/ResultNotFound.vue';
import FilterBar from '../components/home/FilterBar.vue';
import ShopList from '../components/home/ShopList.vue';

import debounce from 'lodash.debounce';
import { computed } from '@vue/runtime-core';

export default {
    components: {
        SearchBar,
        SearchSuggest,
        SearchResults,
        ResultNotFound,
        FilterBar,
        ShopList,

    },
    provide() {
        return {
            inputVal: computed(() => this.inputVal)

        }
    },
    data() {
        return {
            placeholderPassed: '汉堡',
            inputVal: '',
            restaurants: null,
            words: null,
            isConfirmed: false,
            conditionPassed: null,

        }
    },
    computed: {
        hasResult() {
            if (
                (this.restaurants && this.restaurants.length !== 0) ||
                (this.words && this.words.length !== 0)
            ) {
                return true;
            }
            return false;
        },
        searchBarFixed() {
            return this.$refs.searchBarFixed;
        }
    },
    methods: {
        setCondition(payload) {
            this.conditionPassed = payload;
        },
        // ** handle emits **
        clearInput() {
            this.inputVal = '';
        },
        switchPageBack() {
            this.$router.back();
        },
        async confirm(payload = this.inputVal) {
            this.inputVal = payload;
            const that = this;
            /* eslint-disable */

            await this.$axios(`/api/profile/typeahead/${payload}`)
                .then(res => {
                    that.restaurants = res.data.restaurants;
                    that.words = res.data.words
                    // if (res.data.restaurants.length == 0) {
                    //     that.clearInput();
                    // }
                })
                .catch(e => {
                    that.restaurants = null;
                    that.words = null;
                    console.log('no result')
                    that.clearInput();
                })
            this.isConfirmed = true;


            /* eslint-disable */


            //      this.$axios
            // .post(`/api/profile/restaurants/${this.page}/${this.size}`, this.data)
        },
        searchShop() {
            // if (!this.inputVal) {
            //     this.searchResults = [];
            // } else {
            //     this.searchResults = this.$store.getters.doneAllCities.filter(el => el.name.includes(this.inputVal))
            // }

        },
        debouncedSearch: debounce(
            async function () {
                /* eslint-disable */
                // console.log('searching:' + this.inputVal)
                const that = this;
                if (this.inputVal.trim()) {
                    await this.$axios(`/api/profile/typeahead/${this.inputVal}`)
                        .then(res => {
                            that.restaurants = res.data.restaurants;
                            that.words = res.data.words
                        })
                        .catch(e => {
                            that.restaurants = null;
                            that.words = null;
                        })
                }
                // console.log(this.restaurants);
                // console.log(this.words);
                /* eslint-disable */
            }, 300

        ),
    },

    watch: {
        inputVal() {
            this.isConfirmed = false;
            if (this.inputVal.trim()) {
                this.debouncedSearch();

            }
        }
    },

}
</script>

<style scoped>
.search {
}

.filter-bar-background {
    background-color: white;
}
</style>