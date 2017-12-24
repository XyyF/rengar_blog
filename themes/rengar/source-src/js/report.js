const jsCookie = require('js-cookie')

require('badjs-report')

function getQueryString(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	let r = window.location.search.substr(1).match(reg);
	if (r !== null) return unescape(r[2]); return null;
}
// 统计用，开发者不需要理会
if (window.BJ_REPORT) {
	BJ_REPORT.init({
  		id: 1
	});
	BJ_REPORT.init({
		id: 1,
		uin: window.location.origin,
		combo: 0,
		delay: 1000,
		url: "//litten.me:9005/badjs/",
		ignore: [/Script error/i],
		random: 1,
		repeat: 500000,
		onReport: function(id, errObj){},
		ext: {}
	});
	// iframe不上报
	let host = window.location.host
	let isNotFrame = (top === window)
	let isNotLocal = !((/localhost/i.test(host) || /127.0.0.1/i.test(host) || /0.0.0.0/i.test(host)))
	isNotFrame && isNotLocal && BJ_REPORT.report('renagr-' + window.location.host)

	// 来源上报
	let from = getQueryString('f');
	let fromKey = 'rengar-from';
	if (from) {
		isNotFrame && BJ_REPORT.report('from-' + from);
		// 种cookie
		jsCookie.set(fromKey, from);
	} else {
		if (document.referrer.indexOf(window.location.host) >= 0) {
			// 取cookie
			from = jsCookie.get(fromKey);
			from && isNotFrame && BJ_REPORT.report('from-' + from);
		} else {
			// 清cookie
			jsCookie.remove(fromKey);
		}
	}
}

module.exports = {
	init: function() {}
}
