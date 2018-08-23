/**
 * 对话框id
 */
export const DialogType = {
    NONE: '0',
    LOADING: '1',
    // base
    CALL_ME: '1001',
    CATALOG: '1002',
}

/**
 * 弹框样式
 */
export const DialogStyle = {
    // 居中显示
    MIDDLE_DIALOG: 'middle-dialog',
    // 靠右显示
    RIGHT_DIALOG: 'right-dialog',
}

/**
 * 弹框配置
 * {number} type DialogType
 * {Function} loader 按需加载弹框内容的方法，同一模块下的弹框最好使用相同的trunk，一起加载
 * {string} dialogClass 弹框样式，默认为DialogStyle.TITLE_AT_LEFT
 * {boolean} closeOnClickOutside 是否在点击窗口以外区域或按下ESC时关闭窗口，默认不关闭
 */
export const componentConfigs = [{
    // 联系我
    type: DialogType.CALL_ME,
    loader: () => import(/* webpackChunkName: "slider" */'./content/call-me.vue'),
    dialogClass: DialogStyle.MIDDLE_DIALOG,
    closeOnClickOutside: true,
}, {
    // 目录
    type: DialogType.CATALOG,
    loader: () => import(/* webpackChunkName: "slider" */'./content/catalog.js'),
    dialogClass: DialogStyle.RIGHT_DIALOG,
    closeOnClickOutside: true,
}]
