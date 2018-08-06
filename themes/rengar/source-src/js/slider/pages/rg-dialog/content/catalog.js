export default {
    name: 'catalog-dialog',
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
        dialogData: {
            type: Object,
            default: () => {
                return {}
            }
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
    render(h) {
        return h('div', {
            attrs: {
                'class': 'catalog-dialog'
            },
            domProps: {
                innerHTML: this.dialogData.catalogHtml
            },
        })
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
