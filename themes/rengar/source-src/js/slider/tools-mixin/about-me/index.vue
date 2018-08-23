<template>
    <div class="tools-about-me-root">
        <section class="tools-section tools-section-me" v-if="toolsSelected === 'aboutme'">
            <div class="aboutme-wrap" id="js-aboutme" v-html="aboutme"></div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'tools-about-me',
        directives: {},
        components: {},
        mixins: [],
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {}
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
            // 模版配置的aboutme信息
            aboutme: {
                type: String,
                default: ''
            },
            // 选择的tools
            toolsSelected: {
                type: String,
                default: ''
            }
        },
        computed: {
            /* Notice: 写下computed数据的描述 */
        },
        filters: {},
        methods: {
            /* Notice: 复杂的方法，写下说明 */
        },
        watch: {
            /* Notice: 写下说明 */
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        activated() {
        },
        deactivated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        errorCaptured() {
        },
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    .tools-about-me-root {
        width: 100%;
        height: 100%;
        .aboutme-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            color: #fffdd8;
            text-shadow: 1px 1px rgba(77, 77, 77, 0.45);
            text-align: center;
        }
    }
</style>
