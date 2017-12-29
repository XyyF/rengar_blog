const Vue = require('vue')
const Promise = require("bluebird");
// safari不支持fetch
import * as fetch from 'fetch-ie8'
import {on} from 'utils/event'
import clickoutside from 'common/vue_plugins/clickoutside'
import sliderConst from 'common/slider_const'

// 动画
import Anm from './anm'
// 浏览器判断
import Browser from './browser'

window.fetch = window.fetch || fetch

let localTagKey = 'rengar-tag'
let localSearchKey = 'rengar-search'
const isMobile = (Browser.versions.mobile && window.screen.width < 800)

// 日期格式确定
function fixzero(str) {
    str = str + ''
    return str.length === 1 ? '0' + str : str
}

function setScrollZero() {
    let $sct = document.querySelectorAll('.tools-section')
    $sct.forEach((em) => {
        em.scrollTop = 0
    })
}

function timeOutPromise(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}

function init() {
    const app = new Vue({
        el: '#container',
        data() {
            return {
                sliderConst,
                isCtnShow: false,
                isShow: false,
                sliderSelected: sliderConst.SLIDER_OPTIONS.CLOSE,
                items: [],
                jsonFail: false,
                showTags: false,
                search: '',
                isShowDialog: false,
                isContentLoading: true,
            }
        },
        methods: {
            // 点击联系我显示微信加好友
            showCallMe() {
                this.isShowDialog = true
            },
            // 隐藏dialog
            hiddenDialog() {
                this.isShowDialog = false
            },
            // 获取当前文章的url
            goToArchive(tag) {
                const year = new Date(tag.date).getFullYear()
                const month = new Date(tag.date).getMonth()
                const date = new Date(tag.date).getDate()
                return `${window.yiliaConfig.root}${year}/${month + 1}/${date}/${tag.title}/`
            },
            // v-clickoutside点击tools自身以外触发事件
            clickCloseTools() {
                if (app.isShow) {
                    app.isShow = false
                    app.isCtnShow = false
                    app.sliderSelected = sliderConst.SLIDER_OPTIONS.CLOSE
                }
            },
            // 阻止冒泡
            stop: (e) => {
                e.stopPropagation()
            },
            // 搜索-watch-search
            choseTag: (e, name) => {
                app.search = `#${name ? name : e.target.innerHTML}`
            },
            // 取消搜索
            clearChose: (e) => {
                app.search = ''
            },
            toggleTag: () => {
                app.showTags = !app.showTags
                window.localStorage && window.localStorage.setItem(localTagKey, app.showTags)
            },
            openSlider(e, type) {
                e.stopPropagation()
                if (!type) {
                    type = 'innerArchive'
                }
                // innerArchive: '所有文章'
                // friends: '友情链接'
                // aboutme: '关于我'
                app.sliderSelected = type
                type = true
                app.isShow = true
                app.isCtnShow = true
                setScrollZero()
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
        directives: {
            clickoutside,
        },
        watch: {
            'search': function(val) {
                window.localStorage && window.localStorage.setItem(localSearchKey, val)
                handleSearch(val)
            }
        },
        async mounted() {
            // 防止页面先行显示出来
            document.querySelector('#container').setAttribute('class', '')
        },
    })

    function handleSearch(val) {
        val = (val || '').toLowerCase()
        let type = 'title'
        if (val.indexOf('#') === 0) {
            val = val.substr(1, val.length)
            type = 'tag'
        }
        let items = app.items
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
        app.items = items
    }

    window.fetch(window.yiliaConfig.root + 'content.json?t=' + (+new Date()), {
        method: 'get',
    }).then((res) => {
        return res.json()
    }).then((data) => {
        data.forEach((em) => {
            em.isShow = true
        })
        app.items = data
        // 搜索
        let searchWording = (window.localStorage && window.localStorage.getItem(localSearchKey)) || ''
        app.search = searchWording
        searchWording !== '' && handleSearch(searchWording)
    }).catch((err) => {
        console.log(err)
        app.jsonFail = true
    });

    // tag 显示/隐藏
    let localTag = false
    if (window.localStorage) {
        localTag = window.localStorage.getItem(localTagKey)
    }
    let isTagOn = 'false'
    if (localTag === null) {
        isTagOn = (window.yiliaConfig && window.yiliaConfig.showTags) ? 'true' : 'false'
    } else {
        isTagOn = (window.localStorage && window.localStorage.getItem(localTagKey)) || 'false'
    }
    app.showTags = JSON.parse(isTagOn)

    // 其他标签点击
    // 标签
    let $tags = document.querySelectorAll('.tagcloud a.js-tag')
    for (let i = 0, len = $tags.length; i < len; i++) {
        let $em = $tags[i]
        $em.setAttribute('href', 'javascript:void(0)')
        on($em, 'click', (e) => {
            e.stopPropagation()
            app.sliderSelected = sliderConst.SLIDER_OPTIONS.INNER_ARCHIVE
            app.isShow = true
            app.isCtnShow = true
            app.search = `#${$em.innerHTML}`
            setScrollZero()
            return false
        })
    }
}

init()
if (!isMobile) {
    Anm.init()
}

module.exports = {}
