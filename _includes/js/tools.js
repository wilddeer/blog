function moveCursorToEnd(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    }
    else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
    else {
    	el.focus();
    }
}

function antiJekpotRandom(min, max, old) {
    var rand = Math.floor((Math.random()*(max-min+1))+min);

    return (rand == old?antiJekpotRandom(max, old):rand);
}