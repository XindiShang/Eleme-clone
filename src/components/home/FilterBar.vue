<template>
    <div :class="{ 'open': openFilter || openScreen }" @click.self="hideFilter">
        <div v-if="showFilter" class="filter_wrap"
            :class="{ 'filter-wrap-fixed': openFilter || openScreen || fixedOn }">
            <aside class="filter" :class="{ 'filter-fixed': openFilter || openScreen }">
                <div class="filter-nav" v-for="(item, i) in filterData.navTab" :key="i" @click="filterSort(i)">
                    <span :class="{ 'filter-selected': currentIdx == i }">{{ item.name }}</span>
                    <span v-if="item.icon" class="material-icons-outlined nav-icon">arrow_drop_down</span>
                </div>
            </aside>
        </div>

        <!-- sort -->
        <section v-if="openFilter" class="filter-extend">
            <ul>
                <li class="filter-item" v-for="(item, i) in filterData.sortBy" :key="i" @click="selectSort(item, i)">
                    <span :class="{ 'name-selected': currentSort == i }">{{ item.name }}</span>
                    <div v-show="currentSort == i" class="filter-check">
                        <span class="material-icons-outlined check-icon">done</span>
                    </div>

                </li>
            </ul>
        </section>

        <!-- screen  -->
        <section v-if="openScreen" class="filter-extend">
            <div class="filter-sort">
                <div class="screen-box">
                    <div v-for="(screen, i) in filterData.screenBy" :key="i" class="screen-container">
                        <p class="screen-title">{{ screen.title }}</p>
                        <ul>
                            <li :class="{ 'selected': item.select }" class="screen-item"
                                v-for="(item, idx) in screen.data" :key="idx" @click="selectScreen(item, screen)">
                                <img v-if="item.icon" :src="item.icon" alt />
                                <span>{{ item.name }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="screen-btn-container">
                    <span :class="{ 'btn-clear-available': editStatus, 'btn-disabled': !editStatus }" class="screen-btn-clear"
                        @click="clearScreen">清空</span>
                    <span class="screen-btn-ok" @click="setScreen">查看商家</span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    emits: ['searchFixed', 'get-condition', 'lift'],
    props: ['fixedOn'],
    data() {
        return {
            currentIdx: 0,
            openFilter: false,
            currentSort: 0,
            openScreen: false,
            isEdit: false

        }
    },
    computed: {
        showFilter() {
            return this.filterData;
        },
        filterData() {
            return this.$store.getters.doneFilterData;
        },
        editStatus() {
            this.checkScreen();
            return this.isEdit;
        }


    },
    methods: {
        filterSort(idx) {
            this.currentIdx = idx;
            switch (idx) {
                case 0:
                    if (this.openFilter) {
                        this.openFilter = false;
                        this.$emit('searchFixed', false)

                    } else {
                        this.openFilter = true;
                        this.$emit('searchFixed', true)
                    }
                    this.openScreen = false;
                    break;
                case 1:
                    this.$emit('get-condition', this.filterData.navTab[1].condition)
                    this.hideFilter();

                    break;
                case 2:
                    this.$emit('get-condition', this.filterData.navTab[2].condition)
                    this.hideFilter();


                    break;
                case 3:
                    if (this.openScreen) {
                        this.openScreen = false;
                        this.$emit('searchFixed', false)

                    } else {
                        this.openScreen = true;
                        this.$emit('searchFixed', true)
                    }
                    this.openFilter = false;
                    break;
                default:
                    this.hideFilter();

                    break;
            }
        },
        hideFilter() {
            this.openFilter = false;
            this.openScreen = false;
            this.$emit('searchFixed', false);
            this.$emit('lift')

        },
        selectSort(name, idx) {
            this.currentSort = idx;
            this.filterData.navTab[0].name = this.filterData.sortBy[idx].name;
            this.hideFilter();
            const condition = name.code;
            this.$emit('get-condition', condition);
            this.$emit('lift')


        },
        selectScreen(item, screen) {
            if (screen.id !== "MPI") {
                // single select
                screen.data.forEach(el => {
                    if (el != item) {
                        el.select = false
                    }
                })
            }
            item.select = !item.select;
        },
        checkScreen() {
            this.isEdit = false;
            this.filterData.screenBy.forEach(screen => {
                screen.data.forEach(item => {
                    if (item.select) {
                        this.isEdit = true;
                    }
                })
            })
        },
        clearScreen() {
            this.filterData.screenBy.forEach(screen => {
                screen.data.forEach(item => {
                    item.select = false;
                })
            })
        },
        setScreen() {
            let screenData = {
                MPI: '',
                offer: '',
                per: ''
            }
            let mpiStr = "";
            this.filterData.screenBy.forEach(screen => {
                screen.data.forEach((item, idx) => {
                    if (item.select) {
                        //single
                        if (screen.id !== "MPI") {
                            console.log(idx)
                            screenData[screen.id] = item.code
                        } else {
                            //multi
                            mpiStr += item.code + ",";
                            screenData[screen.id] = mpiStr
                        }
                    }
                })
            })
            console.log(screenData);
            this.hideFilter();
            this.$emit('lift')



        }
    },

}
</script>

<style scoped>
.btn-disabled {
    pointer-events: none;
}

.filter_wrap {
    background: transparent;
    padding: 4px 16px 4px 16px;
    position: sticky;
    top: 42px;
    z-index: 10;
    box-sizing: border-box;
    height: 30px;
}

.filter-wrap-fixed {
    background: white;
    padding: 4px 16px 4px 16px;
    position: fixed;
    top: 42px;
    z-index: 10;
    width: 100%;
    box-sizing: border-box;
    height: 30px;
}

.filter {
    position: relative;
    z-index: 101;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
}

.filter-fixed {
    position: fixed;
    z-index: 101;
    height: 30px;
    top: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    width: 90%;
    /* background: white; */
}

.filter-nav {
    color: #666;
    font-size: 13px;
    line-height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
}

.nav-icon {
    font-size: 16px;
}

.filter-selected {
    color: black;
    font-weight: bold;
}

.icon-selected {
    transform: rotate(90deg);
}

.open {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 72px);
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-in-out;
    z-index: 3;
}

.filter-extend {
    background-color: #fff;
    color: #333;
    position: absolute;
    width: 100%;
    z-index: 4;
    left: 0;
    top: 0;
    font-size: 13px;
}

.filter-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1;
    padding: 4px 16px;
    overflow: hidden;
    height: 7vw;
    max-height: 40px;
    margin: 6px 0;
    cursor: pointer;

}

.filter-check {
    color: #53c1fc;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.check-icon {
    font-size: 14px;
}

.name-selected {
    color: #53c1fc;
}

/* 筛选 */
.filter-sort {
    background-color: #fff;
    color: #333;
    position: absolute;
    width: 100%;
    z-index: 4;
    left: 0;
    font-size: 14px;
    line-height: normal;
}

.screen-box {
    padding: 0 16px;
}

.screen-container {
    margin: 6px 0;
    overflow: hidden;
}

.screen-title {
    margin-bottom: 4px;
    color: #999;
    font-size: 0.5rem;
}

.screen-container ul {
    font-size: 0.8rem;
    width: 100%;
    margin: 8px auto;
    display: grid;
    gap: 2%;
    grid-template-columns: repeat(3, 1fr);
}

.screen-item {
    box-sizing: border-box;
    width: 100%;
    height: 10vw;
    max-height: 40px;
    background: #fafafa;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    margin-bottom: 4px;
    cursor: pointer;

}

.screen-container li img {
    width: 3vw;
    height: 3vw;
    max-width: 18px;
    max-height: 18px;
    vertical-align: middle;
    line-height: normal;
    margin-right: 2vw;
}

.screen-container li span {
    vertical-align: middle;
}

.screen-btn-container {
    display: flex;
    align-items: center;
    background-color: #fafafa;
    box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
    height: 11.466667vw;
    max-height: 50px;
    box-sizing: border-box;
    cursor: pointer;

}

.screen-btn-container span {
    font-size: 0.826667rem;
    text-decoration: none;
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.screen-btn-clear {
    color: #999;
    background: #fff;
}

.screen-btn-ok {
    color: #fff;
    background: #3ea1fe;
    border: 0.133333vw solid #3ea1fe;
}

.selected {
    color: #3ea1fe;
    background-color: #e6f4ff;
}

.btn-clear-available {
    color: #333 !important;
}
</style>