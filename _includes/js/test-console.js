var testConsole = {
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
        var consoleBlock = document.getElementById('test_console');

        if (consoleBlock) {
            if (typeof message !== 'string') message = '<i>' + message + '</i>';
        
            consoleBlock.innerHTML += '<p class=' + type + '>' + message + '</p>';
        }
        else {
            console.warn('No test console block');
        }
    }
};