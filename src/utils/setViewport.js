// viewport setting
function setViewport() {
	if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)) {
		document.querySelector('meta[name="viewport"]').remove()
		document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=1.0,user-scalable=yes')
	} else {
		document.querySelector('meta[name="viewport"]').remove()
		document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=1286px,user-scalable=auto')
	}
}

window.addEventListener('load', function() {
	setViewport()
})
window.addEventListener('resize', function() {
	setViewport()
})
