<template>
    <div class="word-item mb-4">
        <span class="word-icon material-icons-outlined mr-2">search</span>

        <div class="word-wrapper">
            <div class="top-row mb-2">
                <span @click="emitWordClick" v-if="noResult" class="mr-1 no-result-text">
                    查找
                    <span class="no-result-keyword">“{{ word }}”</span>
                </span>
                <span @click="emitWordClick" v-else ref="wordName" class="mr-1">{{ word }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['word', 'noResult'],
    inject: ['inputVal'],
    emits: ['wordClick'],
    computed: {

    },
    methods: {
        emitWordClick() {
            this.$emit('wordClick', this.word);
        }

    },
    mounted() {
        let ipt = this.inputVal;
        let name = this.$refs.wordName;
        if (ipt && name) {
            ipt = ipt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            let pattern = new RegExp(`${ipt}`, "gi");
            name.innerHTML = name.textContent.replace(pattern, match => `<mark>${match}</mark>`)
        }
    },
    watch: {
        inputVal() {
            let ipt = this.inputVal;
            let name = this.$refs.wordName;
            if (ipt && name) {
                ipt = ipt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                let pattern = new RegExp(`${ipt}`, "gi");
                name.innerHTML = name.textContent.replace(pattern, match => `<mark>${match}</mark>`)
            }

        }
    }


}
</script>

<style scoped>
.mr-1 {
    margin-right: 1%;
}
.mr-2 {
    margin-right: 2%;
}

.mb-2 {
    margin-bottom: 2%;
}
.mb-4 {
    margin-bottom: 4%;
}
.word-item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid #f1f1f1;
    cursor: pointer;
}

.word-icon {
    font-size: 1.2rem;
    color: #706c6c;
}
.word-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
}

.top-row {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: 0.86rem;
}

.no-result-text {
    color: #a09e9e;
}
.no-result-keyword {
    color: black;
}
</style>