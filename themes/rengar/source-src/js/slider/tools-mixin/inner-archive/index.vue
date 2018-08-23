<template>
    <div class="tools-inner-archive-root">
        <section class="tools-section tools-section-all" v-if="toolsSelected === 'innerArchive'">
            <div class="search-wrap">
                <input class="search-ipt" v-model="search" type="text" placeholder="find something…">
                <i class="icon-search icon" v-show="isEmptyStr(search)"></i>
                <i class="icon-close icon" v-show="isNotEmptyStr(search)" @click="e => clearChose(e)"></i>
            </div>
            <div class="widget tagcloud search-tag">
                <p class="search-tag-wording">tag:</p>
                <label class="search-switch">
                    <input type="checkbox" @click="toggleTag()" :checked="showTags ? 'checked' : ''">
                </label>
                <ul class="article-tag-list" v-show="showTags">
                    <% site.tags.forEach(function(tag, i){ %>
                    <li class="article-tag-list-item">
                        <a href="javascript:void(0)"
                           class="js-tag color<%= tag.name.length % 5 + 1 %>"><%- tag.name %></a>
                    </li>
                    <% }) %>
                    <div class="clearfix"></div>
                </ul>
            </div>
            <ul class="search-ul">
                <p v-show="jsonFail" style="padding: 20px; font-size: 12px;">
                    缺失模块。<br/>1、请确保node版本大于6.2<br/>2、在博客根目录（注意不是yilia根目录）执行以下命令：<br/> npm i hexo-generator-json-content
                    --save<br/><br/>
                    3、在根目录_config.yml里添加配置：
                <pre style="font-size: 12px;" v-show="jsonFail">
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
                <li v-for="tagsInItems in items"
                    v-if="tagsInItems.isShow"
                    class="search-li">
                    <a :href="urlForMat(tagsInItems.path)"
                       class="search-title">
                        <i class="icon-quo-left icon"></i>
                        <span v-text="tagsInItems.title"></span>
                    </a>
                    <p class="search-time">
                        <i class="icon-calendar icon"></i>
                        <span v-text="dateformat(tagsInItems.date)"></span>
                    </p>
                    <p class="search-tag">
                        <i class="icon-price-tags icon"></i>
                        <span v-for="tagInTags in tagsInItems.tags"
                              @click="e => choseTag(e, tagInTags.name)">{{tagformat(tagInTags.name)}}</span>
                    </p>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'tools-inner-archive',
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
    .tools-inner-archive-root {

    }
</style>
