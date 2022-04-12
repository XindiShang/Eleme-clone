<template>
    <div class="wrapper">
        <div class="search-bar">
            <div class="input-field">
                <div class="input-field-left">
                    <span class="material-icons-outlined search-icon">search</span>
                    <input
                        type="text"
                        :value="modelValue"
                        @input="$emit('update:modelValue', $event.target.value)"
                        :placeholder="placeholder"
                    />
                </div>
                <div v-show="modelValue" @click="emitClear" class="input-field-right">
                    <span class="material-icons delete-icon">cancel</span>
                </div>
            </div>
        </div>
        <a class="cancel-text" @click="emitCancel">取消</a>
    </div>
</template>

<script>
export default {
    props: ['placeholder', 'modelValue'],
    emits: ['cancelSearch', 'clearVal', 'update:modelValue'],
    data() {
        return {
            // inputVal: '',
        }
    },
    methods: {
        emitClear() {
            this.$emit('clearVal');

        },
        emitCancel() {
            this.$emit('cancelSearch');
        },
        emitInput() {
            this.$emit('inputChange', this.inputVal);

        }
    },
    watch: {
        inputVal() {
            this.emitInput();
        }
    }

}
</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.search-bar {
    width: 88%;
    height: 28px;
    display: flex;
    justify-content: start;
    align-items: center;
    border: none;
    background-color: #eaeaea;
    border-radius: 20px;
    font-size: 13px;
    padding: 0px;
    margin-top: 14px;
}

.cancel-text {
    padding: 0px;
    margin-top: 14px;
    font-size: 13px;
    line-height: 100%;
    text-decoration: none;
    color: #53c1fc;
}

.input-field {
    width: 96%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.input-field-left {
    display: flex;
    justify-content: start;
    align-items: center;
}
.input-field-right {
    display: flex;
    align-items: center;
}
.delete-icon {
    color: #ccc;
    font-size: 16px;
}

.search-icon {
    color: #757575;
    font-size: 16px;
    margin: 2% 0 0 8%;
}

.search-bar input,
.search-bar input:enabled {
    border: none;
    background-color: transparent;
    outline: none;
}

.no-result {
    padding: 18px 16px 4px 16px;
    text-align: center;
    color: rgb(170, 166, 166);
}
.no-result p {
    font-size: 12px;
}
</style>