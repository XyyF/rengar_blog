// 样式
import '../css/main.scss'
// 图片查看器
import Viewer from './viewer'
// 分享
import Share from './share'
// 边缘
import Gotop from './gotop'

import {addLoadEvent} from './util'

addLoadEvent(function() {
	new Share().init()
	new Viewer().init()
	new Gotop().init()
})
