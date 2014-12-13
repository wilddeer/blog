$.fn.demoFrame = function() {
    var $this = this;

    adjustFrameHeight();

    $(window).on('resize orientationchange', function() {
        adjustFrameHeight();
    });

    function adjustFrameHeight() {
        $this.each(function() {
            this.style.height = '';
            this.style.height = this.contentWindow.document.body.scrollHeight + 'px';
        });
    }
};
