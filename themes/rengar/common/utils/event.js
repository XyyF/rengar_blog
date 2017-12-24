/**
 * created by rengar 2017/12/24
 * 事件处理封装
 */

const on = (el, eventName, handle) => {
    if (!el || !eventName || !handle) {
        return null
    }
    if (document.addEventListener) {
        el.addEventListener(eventName, handle, false)
    } else {
        el.attachEvent(`on${eventName}`, handle)
    }
}

const off = (el, eventName, handle) => {
    if (!el || !eventName || !handle) {
        return null
    }
    if (document.removeEventListener) {
        el.removeEventListener(eventName, handle)
    } else {
        el.detachEvent(`on${eventName}`, handle)
    }
}

export {
    on,
    off,
}
