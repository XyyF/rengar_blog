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
        // 模版配置的aboutme信息
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
    render() {
        if (this.toolsSelected === 'friends') {
            return (
                <section class="tools-section tools-section-friends">
                    <ul class="search-ul">
                    { this.friendsArr.map((f, index) => (
                        <li class="search-li">
                            <a
                                href={f[1]}
                                target="_blank"
                                class="search-title">
                                <i class="icon-youqinglianjie icon"></i>
                                {f[0]}
                            </a>
                        </li>
                    ))}
                    </ul>
                </section>
            )
        }
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
