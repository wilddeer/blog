(function() {
    var queue = [];

    function draw() {
        if (queue.length && !document.getElementById('console')) return;

        var consoleBlock = document.getElementById('console');

        for (var i = 0; i < queue.length; i++) {
            consoleBlock.innerHTML += queue[i];
        };
        queue = [];
    }

    window.console = customConsole = {
        log: function(message) {
            this.add(message, 'info');
        },
        warn: function(message) {
            this.add(message, 'warning');
        },
        error: function(message, source, file) {
            this.add([message, source, file].join('<br>'), 'error');
        },
        add: function(message, type) {
            if (typeof message !== 'string') message = '<i>' + message + '</i>';
            queue.push('<p class=' + type + '>' + message + '</p>');
        }
    }

    window.onerror = function(message, source, file) {
        console.error(message, source, file);
    };

    setInterval(function() {draw();}, 50);
})();