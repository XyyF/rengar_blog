import Vue from 'vue'
import {DialogType, DialogStyle, componentConfigs} from './dialog_configs'

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
                // return this.showDialogResult
            }
            // if (dialogType !== DialogType.LOADING) {
            //     this.showLoadingAfterAWhile()
            // }
            // this.dialogState = STATE_LOAD_PENNDING
            config.loader().then((component) => {
                // 在loading状态下用户关闭了弹框
                // if (this.dialogState !== STATE_LOAD_PENNDING && this.dialogState !== STATE_LOADING) {
                //     return
                // }
                // this.currentDialogType = dialogType
                // this.dialogState = STATE_SHOWN
                this.setupComponent(config, component.default, dialogData)
                // this.visible = true
                // this.fullscreen = fullscreen

                // this.callOpenListeners(dialogType)
            })

            // return this.showDialogResult
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
