// 样式
import '../css/main.scss'
// 图片查看器
import Viewer from './viewer'
// 分享
import Share from './share'
// 边缘
import Gotop from './gotop'
// 评论
import Gitment from './gitment'

import {addLoadEvent} from './util'
// 波纹
import Ripple from './ripple/index'

addLoadEvent(function() {
	new Share().init()
	new Viewer().init()
	new Gotop().init()
    new Gitment().init()
    new Ripple().init()
})
