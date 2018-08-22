import Vue from 'vue'
import {DialogType, DialogStyle, componentConfigs} from './dialog_configs'
import loadingDialog from './content/loading'

// 如果加载弹框内容超过了这个时间还没加载好，就显示loading
const LOADING_DIALOG_PENDDING_TIME = 300
const STATE_CLOSED = 1
// 正在加载内容组件，此时时限还没到，不展示任何弹框
const STATE_LOAD_PENNDING = 2
// 正在加载内容组件，此时展示loading状态
const STATE_LOADING = 3
const STATE_SHOWN = 4
const STATE_CLOSING = 5

const dialog = {
    name: 'rg-dialog',
    directives: {},
    data() {
        return {
            // 是否显示弹窗
            isShowDialog: false,
            // 打开的弹窗组件名
            contentComponentName: '',
            // 传入弹窗prop的数据
            dialogData: {},
            // 是否点击本身之外关闭弹窗
            closeOnClickOutside: false,
            // 弹窗的默认样式
            dialogClass: DialogStyle.MIDDLE_DIALOG,
            // 当前弹窗状态
            dialogState: STATE_CLOSED,
            // 当前打开的弹窗
            currentDialogType: DialogType.NONE,
        }
    },
    methods: {
        // 点击关闭弹窗
        hiddenDialog(el) {
            const target = el.target || el.srcElement
            if (target.id !== 'rg-dialog') return
            this.isShowDialog = false
            this.contentComponentName = ''
        },
        setupComponent(config, component, dialogData) {
            Vue.component(component.name, component)
            this.dialogData = dialogData
            this.closeOnClickOutside = config.closeOnClickOutside
            this.dialogClass = config.dialogClass || DialogStyle.MIDDLE_DIALOG
            this.contentComponentName = component.name
            this.isShowDialog = true
        },
        /**
         * 显示指定弹框
         * @param {string} dialogType 定义在dialog_configs中的DialogType
         * @param {object?} dialogData 要传递给窗口内容组件的数据
         */
        showDialog(dialogType, dialogData = {}, fullscreen = false) {
            const config = componentConfigs.find(item => item.type === dialogType)
            if (!config) {
                console.error(`找不到弹窗类型${dialogType}对应的组件`)
                return
            }
            if (dialogType !== DialogType.LOADING) {
                this.showLoadingAfterAWhile()
            }
            this.dialogState = STATE_LOAD_PENNDING
            config.loader().then((component) => {
                // 在loading状态下用户关闭了弹框
                if (this.dialogState !== STATE_LOAD_PENNDING && this.dialogState !== STATE_LOADING) {
                    return
                }
                this.currentDialogType = dialogType
                this.dialogState = STATE_SHOWN
                this.setupComponent(config, component.default, dialogData)
            })
        },
        // 延迟一下，如果还没加载好，再显示加载动画
        showLoadingAfterAWhile() {
            // 如果当前窗口已经显示出来了，可以直接显示loading，否则pendding状态下会显示一个无内容的弹框。setTimeout期间如果要显示的对话框已经加载过，会在timeout之前就先完成loader的
            const duration = this.dialogState === STATE_SHOWN ? 0 : LOADING_DIALOG_PENDDING_TIME
            setTimeout(() => {
                if (this.dialogState !== STATE_LOAD_PENNDING) {
                    return
                }
                this.dialogState = STATE_LOADING
                const config = componentConfigs.find(item => item.type === DialogType.LOADING)
                this.setupComponent(config, loadingDialog)
            }, duration)
        },
    },
    mounted() {
    },
    // render输出
    render(h) {
        const createComponet = (h) => {
            if (this.isShowDialog) {
                return h(this.contentComponentName, {
                    props: {
                        dialogData: this.dialogData
                    },
                    attrs: {
                        'class': this.dialogClass,
                    },
                })
            }
            return null
        }
        return h('div', {
            attrs: {
                id: 'rg-dialog',
                'class': this.isShowDialog ? 'show-dialog' : 'hidden-dialog',
            },
            on: {
                click: this.hiddenDialog.bind(this)
            },
        }, [createComponet(h)])
    }
}

export default dialog
