import toolsConst from 'common/tools-const'

import AboutMeComponent from './about-me/index'
import FriendsComponent from './friends/index'
import InnerArchiveComponent from './inner-archive/index'


export default {
    name: 'tools-mixin',
    directives: {},
    components: {
        AboutMeComponent,
        FriendsComponent,
        InnerArchiveComponent,
    },
    mixins: [],
    data() {
        /* Notice: 给data里面的变量留下说明文字 */
        return {
            // tools-type
            toolsConst,
            // 当前选中的tools-type
            toolsSelected: toolsConst.TOOLS_OPTIONS.CLOSE,
            // 是否显示tools
            isShow: false,
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
        // 点击打开tools
        openTools(e, type) {
            // 阻止默认行为
            e.stopPropagation()
            if (!type) {
                type = 'innerArchive'
            }
            // innerArchive: '所有文章'
            // friends: '友情链接'
            // aboutme: '关于我'
            this.toolsSelected = type
            this.isShow = true
            this.setScrollZero()
        },
        // v-clickoutside点击tools自身以外触发事件
        clickCloseTools(mouseDown) {
            // 将mousedown事件的元素传入，判断'所有文章/友情链接/关于我'三个按钮
            if (this.isShow && mouseDown.target.className !== 'click-show-tools') {
                this.isShow = false
                this.toolsSelected = toolsConst.TOOLS_OPTIONS.CLOSE
            }
        },
        // slider的滚动条置顶
        setScrollZero() {
            let $sct = document.querySelectorAll('.tools-section')
            $sct.forEach((em) => {
                em.scrollTop = 0
            })
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
