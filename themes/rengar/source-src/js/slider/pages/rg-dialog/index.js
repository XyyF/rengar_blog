import Vue from 'vue'
import {DialogType, DialogStyle, componentConfigs} from './dialog_configs'

const dialog = {
    name: 'rg-dialog',
    directives: {
    },
    // template: '<div v-show="isShowDialog" id="dialog"><slot></slot></div>',
    data() {
        return {
            isShowDialog: false,
            contentComponentName: '',
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
            // this.dialogData = dialogData
            // this.closeOnClickOutside = !!config.closeOnClickOutside
            // this.dialogClass = config.dialogClass || DialogStyle.TITLE_AT_LEFT
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
                return h(this.contentComponentName)
            }
            return null
        }
        return h('div', {
            'class': this.isShowDialog ? 'show-dialog' : 'hidden-dialog',
            attrs: {
                id: 'rg-dialog',
            },
            on: {
                click: this.hiddenDialog.bind(this)
            },
        }, [createComponet(h)])
    }
}

export default dialog
