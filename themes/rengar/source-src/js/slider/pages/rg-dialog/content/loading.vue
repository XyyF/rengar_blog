<template>
    <div class="loading-dialog" v-loading="true">
    </div>
</template>

<script>
    export default {
        name: 'loading-dialog',
        mixins: [],
        data() {
            return {};
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .loading-dialog {
        height: 200px;
        margin-bottom: 65px;
    }
</style>
