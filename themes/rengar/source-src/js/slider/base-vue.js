import {DialogType} from './pages/rg-dialog/dialog_configs'

import Dialog from './pages/rg-dialog/index'

import sliderMxin from './slider-mixin/index'
import catalogMixin from './catalog-mixin/index'

// 日期格式确定
function fixzero(str) {
    str = str + ''
    return str.length === 1 ? '0' + str : str
}

export default {
    el: '#container',
    name: 'app',
    directives: {},
    components: {
        // 弹窗组件
        [Dialog.name]: Dialog,
    },
    mixins: [sliderMxin, catalogMixin],
    data() {
        /* Notice: 给data里面的变量留下说明文字 */
        return {
            // 是否render完成
            renderContainer: false,
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
        // 点击联系我显示微信加好友
        showCallMe() {
            this.$dialog.showDialog(DialogType.CALL_ME)
        },
        // 获取当前文章的url
        goToArchive(tag) {
            const year = new Date(tag.date).getFullYear()
            const month = new Date(tag.date).getMonth()
            const date = new Date(tag.date).getDate()
            return `${window.yiliaConfig.root}${year}/${month + 1}/${date}/${tag.title}/`
        },
        // 阻止冒泡
        stop(e) {
            e.stopPropagation()
        },
        isFalse(val) {
            return val === false
        },
        isEmptyStr(str) {
            return str === ''
        },
        isNotEmptyStr(str) {
            return str !== ''
        },
        dateformat(str) {
            let d = new Date(str)
            return d.getFullYear() + '-' + fixzero((d.getMonth() + 1)) + '-' + fixzero(d.getDate())
        },
        urlForMat(str) {
            if (window.yiliaConfig && window.yiliaConfig.root) {
                return window.yiliaConfig.root + str
            }
            return '/' + str
        },
        tagformat(str) {
            return `#${str}`
        },
    },
    watch: {
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    async mounted() {
        // 防止页面先行显示出来
        this.renderContainer = true
        this.$nextTick(() => {
            Vue.prototype.$dialog = this.$refs.dialog
        })
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
