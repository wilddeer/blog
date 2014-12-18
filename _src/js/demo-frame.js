$.fn.demoFrame = function() {
    var $this = this;

    adjustAllFramesHeight();

    $(window).on('resize orientationchange', function() {
        adjustAllFramesHeight();
    });

    $this.on('load', function() {
        this.contentWindow.document.documentElement.style.overflow = 'hidden';
        adjustFrameHeight(this);
    });

    function adjustAllFramesHeight() {
        $this.each(function() {
            adjustFrameHeight(this);
        });
    }

    function adjustFrameHeight(frame) {
        if (!frame.contentWindow.document.documentElement) return;

        frame.style.height = '';
        frame.style.height = frame.contentWindow.document.documentElement.scrollHeight + 'px';
    }
};
