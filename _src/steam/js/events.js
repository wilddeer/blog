var steamEvents = {
	events: {

	},

	subscribe: function(eventName, handler) {
		if (!this.events[eventName]) this.events[eventName] = [];

		this.events[eventName].push(handler);
	},

	invoke: function(eventName) {
		if (!this.events[eventName]) return;

		for (var i = this.events[eventName].length - 1; i >= 0; i--) {
			this.events[eventName][i]();
		};
	}
}