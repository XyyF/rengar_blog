import {DialogType} from './../pages/rg-dialog/dialog_configs'

export default {
    name: 'catalog-mixin',
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
    },
    computed: {
        /* Notice: 写下computed数据的描述 */
    },
    filters: {},
    methods: {
        /* Notice: 复杂的方法，写下说明 */
        // 点击显示目录
        clickCatalog(e, catalogHtml) {
            this.$dialog.showDialog(DialogType.CATALOG, {catalogHtml})
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
