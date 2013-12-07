function moveCursorToEnd(el) {
    if (typeof el.selectionStart == "number") {
        el.focus();
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

/* for the glory of JekPot! (https://twitter.com/JekPot) */
function antiJekpotRandom(min, max, old) {
    var rand = Math.floor((Math.random()*(max-min+1))+min);

    /* sick recursion! */
    return (rand == old?antiJekpotRandom(min, max, old):rand);
}