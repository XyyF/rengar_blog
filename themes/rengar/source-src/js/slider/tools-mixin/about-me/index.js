export default {
    name: 'about-me',
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
        aboutme: {
            type: String,
            default: ''
        },
        // 选择的tools
        toolsSelected: {
            type: String,
            default: ''
        }
    },
    computed: {
        /* Notice: 写下computed数据的描述 */
    },
    filters: {},
    methods: {
        /* Notice: 复杂的方法，写下说明 */
    },
    render(h) {
        if (this.toolsSelected === 'aboutme') {
            return (
                <section class="tools-section tools-section-me">
                    <div
                        domPropsInnerHTML={this.aboutme}
                        class="aboutme-wrap"
                        id="js-aboutme">
                    </div>
                </section>
            )
        }
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
