import toolsConst from 'common/tools-const'
import {on} from 'utils/event'
// safari不支持fetch
import * as fetch from 'fetch-ie8'

window.fetch = window.fetch || fetch

// localStorage名称
const localSearchKey = 'rengar-search'
const localTagKey = 'rengar-tag'

export default {
    name: 'tools-mixin',
    directives: {},
    components: {},
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
            // 搜索内容
            search: '',
            // 文章列表
            items: [],
            // 代表fetch数据失败，显示提示语句
            jsonFail: false,
            // 是否显示标签
            showTags: false,
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
            // todo ???
            type = true
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
        // 搜索-watch-search
        choseTag(e, name) {
            this.search = `#${name ? name : e.target.innerHTML}`
        },
        // 取消搜索
        clearChose(e) {
            this.search = ''
        },
        // 搜索筛选
        handleSearch(val) {
            val = (val || '').toLowerCase()
            let type = 'title'
            if (val.indexOf('#') === 0) {
                val = val.substr(1, val.length)
                type = 'tag'
            }
            let items = this.items
            items.forEach((item) => {
                let matchTitle = false
                if (item.title.toLowerCase().indexOf(val) > -1) {
                    matchTitle = true
                }

                let matchTags = false
                item.tags.forEach((tag) => {
                    if (tag.name.toLowerCase().indexOf(val) > -1) {
                        matchTags = true
                    }
                })

                item.isShow = (type === 'title' && matchTitle) || (type === 'tag' && matchTags);
            })
            this.items = items
        },
        // 点击切换是否显示标签
        toggleTag() {
            this.showTags = !this.showTags
            window.localStorage && window.localStorage.setItem(localTagKey, JSON.stringify(this.showTags))
        },
    },
    watch: {
        /* Notice: 写下说明 */
        // 监听搜索内容
        search(val) {
            window.localStorage && window.localStorage.setItem(localSearchKey, val)
            this.handleSearch(val)
        }
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
        // 标签点击事件 todo v-on绑定
        let $tags = document.querySelectorAll('.tagcloud a.js-tag')
        for (let i = 0, len = $tags.length; i < len; i++) {
            let $em = $tags[i]
            $em.setAttribute('href', 'javascript:void(0)')
            on($em, 'click', (e) => {
                e.stopPropagation()
                this.toolsSelected = toolsConst.TOOLS_OPTIONS.INNER_ARCHIVE
                this.isShow = true
                this.search = `#${$em.innerHTML}`
                this.setScrollZero()
                return false
            })
        }

        // fetch文章列表
        window.fetch(window.yiliaConfig.root + 'content.json?t=' + (+new Date()), {
            method: 'get',
        }).then((res) => {
            return res.json()
        }).then((data) => {
            data.forEach((em) => {
                em.isShow = true
            })
            this.items = data
            // 搜索
            let searchWording = (window.localStorage && window.localStorage.getItem(localSearchKey)) || ''
            this.search = searchWording
            searchWording !== '' && this.handleSearch(searchWording)
        }).catch((err) => {
            console.log(err)
            // fetch失败，显示提示语句
            this.jsonFail = true
        });

        // tag标签 显示/隐藏 - 优先级：localStorage > config配置项 > false
        const localStorageTagKey = window.localStorage.getItem(localTagKey)
        const configTagKey = (window.yiliaConfig && window.yiliaConfig.showTags) ? true : false
        this.showTags = localStorageTagKey !== null ? JSON.parse(localStorageTagKey) : configTagKey
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
