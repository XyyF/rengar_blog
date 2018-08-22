/**
 * vue应用中，directives引入
 * <div v-loading="true/false">
 * created by rengar 2018/8/22
 */

let originOverflow = ''

const loading = document.createElement('div')
loading.setAttribute('class', 'rengar-loading-wrap')
const loadingSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
const loadingCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
loadingSvg.setAttribute('class', 'circular')
loadingSvg.setAttribute('viewBox', '25 25 50 50')
loadingCircle.setAttribute('class', 'path')
loadingCircle.setAttribute('cx', '50')
loadingCircle.setAttribute('cy', '50')
loadingCircle.setAttribute('r', '20')
loadingCircle.setAttribute('fill', 'none')
loadingSvg.appendChild(loadingCircle)
loading.appendChild(loadingSvg)

export default {
    bind(el, binding, vnode) {
        originOverflow =  el.style.overflow
        el.style.overflow = 'hidden'
        el.appendChild(loading)
    },

    update(el, binding) {
        if (binding.oldValue !== binding.value) {
            if (binding.value) {
                el.style.overflow = 'hidden'
                el.appendChild(loading)
            } else {
                el.style.overflow = originOverflow
                el.removeChild(loading);
            }
        }
    },

    unbind(el, binding) {
        el.style.overflow = originOverflow
        el.removeChild(loading);
    }
};
