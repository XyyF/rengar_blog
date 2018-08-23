<template>
    <div class="tools-inner-archive-root" v-if="toolsSelected === 'innerArchive'">
        <section class="tools-section tools-section-all">
            <div class="search-wrap">
                <input
                    class="search-ipt"
                    v-model="search"
                    type="text"
                    placeholder="search tag name…" />
                <i
                    class="icon-search icon"
                    v-show="search === ''">
                </i>
                <i
                    class="icon-close icon"
                    v-show="search !== ''"
                    @click="e => clearChose(e)">
                </i>
            </div>
            <div class="widget tagcloud search-tag">
                <p class="search-tag-wording">tag:</p>
                <label class="search-switch">
                    <input
                        type="checkbox"
                        @click="toggleTag()"
                        :checked="showTags ? 'checked' : ''" />
                </label>
                <ul v-show="showTags" class="article-tag-list">
                    <li
                        v-for="(tag, i) in tags"
                        :key="i"
                        class="article-tag-list-item">
                        <a
                            href="javascript:void(0)"
                            class="js-tag">
                            <!--:class="{`color${tag.name.length % 5 + 1}`: true}">-->
                            {{tag.name}}
                        </a>
                    </li>
                    <div class="clearfix"></div>
                </ul>
            </div>
            <ul class="search-ul">
                <p v-if="jsonFail" style="padding: 20px; font-size: 12px;">
                    缺失模块。<br/>
                    1、请确保node版本大于6.2<br/>
                    2、在博客根目录（注意不是yilia根目录）执行以下命令：<br/>
                    npm i hexo-generator-json-content --save<br/><br/>
                    3、在根目录_config.yml里添加配置：
                <pre style="font-size: 12px;">
                        jsonContent:
                            meta: false
                            pages: false
                            posts:
                            title: true
                            date: true
                            path: true
                            text: false
                            raw: false
                            content: false
                            slug: false
                            updated: false
                            comments: false
                            link: false
                            permalink: false
                            excerpt: false
                            categories: false
                            tags: true
                    </pre>
                </p>
                <li
                    v-for="tagsInItems in items"
                    v-if="tagsInItems.isShow"
                    class="search-li">
                    <a :href="tagsInItems.path | urlForMat" class="search-title">
                        <i class="icon-quo-left icon"></i>
                        <span>{{tagsInItems.title}}</span>
                    </a>
                    <p class="search-time">
                        <i class="icon-calendar icon"></i>
                        <span>{{tagsInItems.date | dateformat}}</span>
                    </p>
                    <p class="search-tag">
                        <i class="icon-price-tags icon"></i>
                        <span
                            v-for="tagInTags in tagsInItems.tags"
                            @click="e => choseTag(e, tagInTags.name)">
                            {{tagInTags.name | tagformat}}
                        </span>
                    </p>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import {on} from 'utils/event'
    // safari不支持fetch
    import * as fetch from 'fetch-ie8'

    window.fetch = window.fetch || fetch
    // localStorage名称
    const localSearchKey = 'rengar-search'
    const localTagKey = 'rengar-tag'

    // 日期格式确定
    function fixzero(str) {
        str = str + ''
        return str.length === 1 ? '0' + str : str
    }

    export default {
        name: 'tools-inner-archive',
        directives: {},
        components: {},
        mixins: [],
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
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
            tagsInSite: {
                type: String,
                default: ''
            },
            // 选择的tools
            toolsSelected: {
                type: String,
                default: ''
            },
        },
        computed: {
            /* Notice: 写下computed数据的描述 */
            tags() {
                const tagsInSite = JSON.parse(this.tagsInSite)
                return Object.values(tagsInSite.data)
            }
        },
        filters: {
            urlForMat(str) {
                if (window.yiliaConfig && window.yiliaConfig.root) {
                    return window.yiliaConfig.root + str
                }
                return '/' + str
            },
            dateformat(str) {
                let d = new Date(str)
                return d.getFullYear() + '-' + fixzero((d.getMonth() + 1)) + '-' + fixzero(d.getDate())
            },
            tagformat(str) {
                return `#${str}`
            },
        },
        methods: {
            /* Notice: 复杂的方法，写下说明 */
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
            // slider的滚动条置顶
            setScrollZero() {
                let $sct = document.querySelectorAll('.tools-section')
                $sct.forEach((em) => {
                    em.scrollTop = 0
                })
            },
            // 取消搜索
            clearChose(e) {
                this.search = ''
            },
            // 点击切换是否显示标签
            toggleTag() {
                this.showTags = !this.showTags
                window.localStorage && window.localStorage.setItem(localTagKey, JSON.stringify(this.showTags))
            },
            // 搜索-watch-search
            choseTag(e, name) {
                this.search = `#${name ? name : e.target.innerHTML}`
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
                    // this.toolsSelected = toolsConst.TOOLS_OPTIONS.INNER_ARCHIVE
                    // this.isShow = true
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
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    %trans {
        transition: all 0.2s ease-in;
        -ms-transition: all 0.2s ease-in;
    }

    .tools-inner-archive-root {
        .search-wrap {
            width: 310px;
            margin: 20px 20px 10px 20px;
            position: relative;
            .search-ipt {
                width: 310px;
                color: #fff;
                background: none;
                border: none;
                border-bottom: 2px solid #fff;
                font-family: Roboto, "Roboto", serif;
            }
            .icon {
                position: absolute;
                right: 0;
                top: 7px;
                color: #fff;
                cursor: pointer;
                @extend %trans;
                &:hover {
                    transform: scale(1.2);
                }
            }
            ::-webkit-input-placeholder {
                color: #ededed;
            }
        }
        .search-tag.tagcloud {
            text-align: center;
            position: relative;
            .search-tag-wording {
                font-size: 12px;
                float: right;
                margin: 4px 80px 0 0;
            }
            .search-switch {
                width: 40px;
                height: 25px;
                display: block;
            }
            .search-switch input {
                width: 40px;
                height: 14px;
                position: absolute;
                top: -4px;
                right: 35px;
                z-index: 2;
                border: 0;
                background: 0 0;
                -webkit-appearance: none;
                outline: 0;
            }
            .search-switch input:before {
                content: '';
                width: 40px;
                height: 14px;
                border: 1px solid #bdcabc;
                background-color: #fdfdfd;
                border-radius: 20px;
                cursor: pointer;
                display: inline-block;
                position: relative;
                vertical-align: middle;
                box-sizing: content-box;
                box-shadow: #dfdfdf 0 0 0 0 inset;
                transition: border .4s, box-shadow .4s;
                background-clip: content-box
            }

            .search-switch input:checked:before {
                border-color: #64bd63;
                box-shadow: #64bd63 0 0 0 0.16rem inset;
                background-color: #64bd63;
                transition: border .4s, box-shadow .4s, background-color 1.2s;
            }
            .search-switch input:checked:after {
                left: 27px;
                background: #fff;
            }
            .search-switch input:after {
                content: '';
                width: 14px;
                height: 14px;
                position: absolute;
                top: 19px;
                left: 1px;
                -webkit-transform: translateY(-50%);
                border-radius: 100%;
                background-color: #91c0f1;
                box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
                -webkit-transition: left .2s;
                transition: left .2s;
                cursor: pointer;
            }
            .article-tag-list {
                @extend %trans;
                margin: 15px 10px 0;
                padding: 10px;
                background: rgba(255, 255, 255, 0.2);
                &.show {
                    display: block;
                }
            }
            .a {
                float: initial;
            }
        }
        .search-ul {
            margin-top: 10px;
            color: rgba(77, 77, 77, 0.75);
            -webkit-overflow-scrolling: touch;
            overflow-scrolling: touch;
            overflow-y: auto;
            .search-li {
                padding: 10px 20px;
                border-bottom: 1px dotted #dcdcdc;
                &:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            }
            .search-title {
                display: flex;
                align-items: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: rgba(255, 255, 248, 1);
                text-shadow: 1px 1px rgba(77, 77, 77, 0.25);
                .icon {
                    margin-right: 10px;
                    color: #fffdd8;
                }
                &:hover {
                    color: #fff;
                    @extend %trans;
                }
            }
            .search-time, .search-tag {
                font-size: 12px;
                color: #fffdd8;
                margin-right: 10px;
                .icon {
                    margin-right: 0px;
                }
                span {
                    cursor: pointer;
                    &:hover {
                        color: #fff;
                        @extend %trans;
                    }
                }
            }
            .search-time {
                float: left;
            }
            .search-tag {
                span {
                    margin-right: 5px;
                }
            }
        }
    }
</style>
