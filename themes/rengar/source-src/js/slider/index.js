import Vue from 'vue'

// app
import BaseVue from './base-vue'

// 动画
import Anm from './../anm'
// 浏览器判断
import Browser from './../browser'

/**
 * window.yiliaConfig -- _config.yml配置
 */

// 初始化app
const app = new Vue(BaseVue)

const isMobile = (Browser.versions.mobile && window.screen.width < 800)
if (!isMobile) {
    Anm.init()
}
