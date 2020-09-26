$('.preview').click(function(event) {
	// If it's not LMB or if a modifier key is pressed -- do nothing.
	if (
        event.button !== 0 ||
        event.shiftKey ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
    ) {
        return;
    }

	// Otherwise prevent the default action
	event.preventDefault();

	// and execute our function (e. g. show photo)
	alert('Function executed');
});
