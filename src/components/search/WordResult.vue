<template>
    <div class="word-item mb-4">
        <div class="word-icon-container mr-2">
            <span class="word-icon material-icons-outlined">search</span>
        </div>


        <div class="word-wrapper">
            <div class="top-row">
                <span @click="emitWordClick" v-if="noResult" class="mr-1 no-result-text">
                    查找
                    <span class="no-result-keyword">“{{ keyword }}”</span>
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
        keyword(){
            return this.word.trim();
        }

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

.mb-4 {
    margin-bottom: 10px;
}

.word-item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 4px 0;
    border-bottom: 1px solid #f1f1f1;
    cursor: pointer;
    height: 20%;
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
    height: 100%;
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