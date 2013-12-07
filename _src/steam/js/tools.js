function addEvent(el, event, func, bool) {
	if (!event) return;

	el.addEventListener? el.addEventListener(event, func, !!bool): el.attachEvent('on'+event, func);
}

function removeEvent(el, event, func, bool) {
	if (!event) return;

	el.removeEventListener? el.removeEventListener(event, func, !!bool): el.detachEvent('on'+event, func);
}