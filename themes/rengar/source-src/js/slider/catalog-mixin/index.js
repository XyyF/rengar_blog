export default {
    name: 'catalog-mixin',
    directives: {},
    components: {},
    mixins: [],
    data() {
        /* Notice: 给data里面的变量留下说明文字 */
        return {
            // 是否显示目录
            showCatalog: false,
        }
    },
    props: {
        /* Notice: 写下props数据的描述、用途 */
        /* Notice: props 里面的定义，使用此结构，type、default */
    },
    computed: {
        /* Notice: 写下computed数据的描述 */
    },
    filters: {},
    methods: {
        /* Notice: 复杂的方法，写下说明 */
        // 关闭弹窗
        hidCatalog() {
            this.showCatalog = false
        },
        // 点击显示目录
        clickCatalog() {
            this.showCatalog = !this.showCatalog
        },
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
