<template>
    <div class="tools-friends-root">
        <section class="tools-section tools-section-friends" v-if="toolsSelected === 'friends'">
            <ul class="search-ul">
                <li class="search-li" v-for="f in friendsArr">
                    <a
                        :href="f[1]"
                        target="_blank"
                        class="search-title">
                        <i class="icon-youqinglianjie icon"></i>
                        {{f[0]}}
                    </a>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'tools-friends',
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
            // 模版配置的friends信息-经过JSON.stringify()转义
            friends: {
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
            friendsArr() {
                if (!this.friends) return []
                const friends = JSON.parse(this.friends)
                return Object.entries(friends)
            }
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
    .tools-friends-root {
        .tools-section-friends {
            padding-top: 30px;
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

        .icon-youqinglianjie {
            font-size: 25px;
            color: #333 !important;
        }
    }
</style>
