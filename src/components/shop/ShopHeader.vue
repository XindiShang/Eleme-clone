<template>
    <van-sticky>
        <div :class="contentWrapperClass" class="content-wrapper">
            <div class="header-container">
                <span
                    :class="{ 'icon-white': !final }"
                    class="back-icon material-icons-outlined"
                    @click="switchPageHome"
                >arrow_back_ios</span>

                <div :class="inputContainerClass" class="input-container ml-1">
                    <span class="input-icon ml-2 material-icons-outlined">search</span>
                    <input type="text" placeholder="想吃什么搜一搜" />
                </div>

                <a href>
                    <img
                        :class="redIconClass"
                        class="red-icon"
                        :src="require('@/assets/red-pocket.png')"
                        alt
                    />
                </a>

                <span :class="searchIconClass" class="material-icons-outlined">search</span>

                <div class="heart-container">
                    <span
                        :class="{ 'icon-white': !final }"
                        class="material-icons-outlined"
                    >favorite_border</span>
                    <span :class="heartTextClass" class="icon-white">关注</span>
                </div>

                <div :class="rightCellClass" class="right-cell">
                    <span
                        :class="{ 'icon-white': !final }"
                        class="material-icons-outlined"
                    >more_horiz</span>
                    <span class="ml-3" id="divider">|</span>
                    <span
                        @click="switchPageHome"
                        :class="{ 'icon-white': !final }"
                        class="ml-3 material-icons-outlined"
                    >close</span>
                </div>
            </div>
        </div>
    </van-sticky>
</template>

<script>
export default {
    props: ['early', 'mid', 'late', 'final'],
    data() {
        return {

        }
    },
    methods: {
        switchPageHome() {
            this.$router.push({ path: '/home' });
        },
    },
    computed: {
        base() {
            return (!this.early && !this.mid && !this.late && !this.final);
        },

        contentWrapperClass() {
            return {
                'content-wrapper-base': this.base,
                'content-wrapper-early': this.early,
                'content-wrapper-mid': this.mid,
                'content-wrapper-late': this.late,
                'content-wrapper-final': this.final,
            }
        },
        inputContainerClass() {
            return {
                'input-container-base': this.base,
                'input-container-early': this.early,
                'input-container-mid': this.mid,
                'input-container-late': this.late,
                'input-container-final': this.final,
            }
        },
        searchIconClass() {
            return {
                'icon-white': this.base,
                'search-icon-early': this.early,
                'disappear': this.mid || this.late || this.final
            }
        },
        redIconClass() {
            return {
                'red-icon-mid': this.mid,
                'red-icon-late': this.late,
                'red-icon-final': this.final
            }
        },
        heartTextClass() {
            return {
                'heart-text-base': this.base,
                'heart-text-early': this.early,
                'disappear': this.mid || this.late || this.final

            }
        },
        rightCellClass() {
            return {
                'right-cell-base': this.base || this.early || this.mid | this.late,
                'right-cell-final': this.final
            }
        }
    },


}
</script>

<style scoped>
.content-wrapper {
    padding: 10px 16px 4px 16px;
    background-color: transparent;
    max-width: 100%;
    width: 100%;
    z-index: 4;
    position: fixed;
    top: 0;
    left: 0;
    height: 2.4rem;
}
.content-wrapper-base {
    background-color: transparent;
}
.content-wrapper-early {
    background-color: rgba(255, 255, 255, 0.4);
    transition: 0.1s ease-out;
}
.content-wrapper-mid {
    background-color: rgba(255, 255, 255, 0.6);
    transition: 0.1s ease-out;
}
.content-wrapper-late {
    background-color: rgba(255, 255, 255, 0.8);
    transition: 0.1s ease-out;
}

.content-wrapper-final {
    background-color: #fff;
    transition: 0.1s ease-out;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.back-icon {
    font-size: 0.9rem;
}

.input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(227, 227, 227);
    border-radius: 14px;
    padding: 1%;
}
.input-container-base {
    width: 40%;
    opacity: 0;
    transition: 0.1s ease-out;
}
.input-container-early {
    width: 25%;
    opacity: 0.2;
    transition: 0.1s ease-out;
}
.input-container-mid {
    width: 30%;
    opacity: 0.4;
    transition: 0.1s ease-out;
}
.input-container-late {
    width: 35%;
    opacity: 0.6;
    transition: 0.1s ease-out;
}
.input-container-final {
    width: 40%;
    opacity: 1;
    margin-right: 10%;
}

.input-icon {
    color: rgb(185, 183, 183);
    font-size: 1rem;
}

.input-container input {
    border: none;
    width: 100%;
    background-color: transparent;
    font-size: 0.8rem;
}

.search-icon-early {
    opacity: 0.4;
    color: white;
}

.red-icon {
    display: none;
}
.red-icon-mid {
    display: block;
    width: 6px;
    transform: translateY(-2px);
    transition: 0.1s ease-out;
}
.red-icon-late {
    display: block;
    width: 14px;
    transform: translateY(-2px);
    transition: 0.1s ease-out;
}
.red-icon-final {
    display: block;
    width: 22px;
    transform: translateY(-2px);
    transition: 0.1s ease-out;
    /* right: 0; */
}
.disappear {
    display: none;
}
.heart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16%;
}

.heart-text-base {
    font-size: 0.9rem;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.heart-text-early {
    font-size: 0.2rem;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.right-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    width: 18%;
    padding: 1px;
    transform: translateY(-4%);
}
.right-cell-base {
    background-color: rgba(105, 104, 104, 0.593);
}
.right-cell-final {
    background-color: transparent;
    border: 1px solid #d4d2d2;
}

.right-cell span {
    font-size: 1.1rem;
}

#divider {
    color: rgba(128, 128, 128, 0.163);
    /* font-size: .3rem; */
    font-weight: lighter;
}

.icon-white {
    color: rgb(243, 243, 243);
}

.ml-1 {
    margin-left: 2%;
}

.ml-2 {
    margin-left: 4%;
}
.ml-3 {
    margin-left: 8%;
}
</style>