<template>
    <div class="wrapper">
        <div class="search-bar">
            <div class="bar-left">
                <div class="back-icon-container">
                    <span @click="emitBack" class="back-icon material-icons-outlined">arrow_back_ios</span>
                </div>

                <div class="input-field">
                    <div class="input-field-left">
                        <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                            :placeholder="placeholder" autofocus />
                    </div>
                    <div v-show="modelValue" @click="emitClear" class="input-field-right">
                        <span class="material-icons delete-icon">cancel</span>
                    </div>
                </div>
            </div>


            <a class="search-text" @click="emitConfirm">搜索</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['placeholder', 'modelValue'],
    emits: ['confirmSearch', 'clearVal', 'update:modelValue', 'goBack'],
    data() {
        return {
            // inputVal: '',
        }
    },
    methods: {
        emitClear() {
            this.$emit('clearVal');
        },
        emitConfirm() {
            this.$emit('confirmSearch');
        },
        emitInput() {
            this.$emit('inputChange', this.inputVal);
        },
        emitBack() {
            this.$emit('goBack')
        }
    },
    watch: {
        inputVal() {
            this.emitInput();
        }
    },

}
</script>


<style scoped>
.wrapper {
    padding: 8px 12px;
    background-color: #f6f6f6;
}

.search-bar {
    width: 100%;
    height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    font-size: 13px;
    padding: 0px;
}

.bar-left {
    height: 100%;
    width: 90%;
    display: flex;
    justify-content: center;
}

.search-text {
    padding: 0px;
    font-size: 0.86rem;
    line-height: 100%;
    text-decoration: none;
    color: rgb(73, 72, 72);
}

.back-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 7px;
}

.back-icon {
    color: rgb(73, 72, 72);
    font-size: 20px;
}

.input-field {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-radius: 20px;
}


.input-field-left {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-left: 7px;
    
}

.input-field-right {
    display: flex;
    align-items: center;
    margin-right: 7px;
}

.delete-icon {
    color: #ccc;
    font-size: 16px;
}

.search-icon {
    color: rgb(73, 72, 72);
    font-size: 16px;
    margin: 2% 0 0 8%;
}

.search-bar input,
.search-bar input:enabled {
    border: none;
    background-color: transparent;
    outline: none;
}

/* .no-result {
    padding: 18px 16px 4px 16px;
    text-align: center;
    color: rgb(170, 166, 166);
}

.no-result p {
    font-size: 12px;
} */
</style>