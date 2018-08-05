/**
 * 对话框id
 */
export const DialogType = {
    NONE: '0',
    LOADING: '1',
    // footer
    CALL_ME: '1001',
}

/**
 * 弹框样式
 */
export const DialogStyle = {
    TITLE_AT_LEFT: 'left-title-dialog',
    TITLE_AT_MIDDLE: 'middle-title-dialog',
    FLOAT_TITLE: 'float-title-dialog',
}

/**
 * 弹框配置
 * {number} type DialogType
 * {Function} loader 按需加载弹框内容的方法，同一模块下的弹框最好使用相同的trunk，一起加载
 * {string} dialogClass 弹框样式，默认为DialogStyle.TITLE_AT_LEFT
 * {boolean} closeOnClickOutside 是否在点击窗口以外区域或按下ESC时关闭窗口，默认不关闭
 */
export const componentConfigs = [{
    // 添加跟进记录
    type: DialogType.CALL_ME,
    loader: () => import(/* webpackChunkName: "slider" */'./content/call-me.js'),
    dialogClass: DialogStyle.FLOAT_TITLE,
    closeOnClickOutside: true,
}]
