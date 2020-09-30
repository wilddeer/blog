# [Sniffer.js](https://github.com/wilddeer/Sniffer)

## If you can’t detect it, you should sniff it!

[Sniffer](https://github.com/wilddeer/Sniffer) is a browser/engine/os/device detection tool.

> — Why u no feature-detect??/?////

I feature-detect like a boss. But when I can’t, I use dirty hacks to help me out:

- Some features are just undetectable. For instance, `overflow: scroll` behavior on mobile devices is one of them. Use da Sniffer!
- You have to sniff [false-positives & false-negatives](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing) (some of my mobile browser tests there).
- Do you want to support those two idiots opening your site on Kindle? I do! Make ’em happy with contrast colors and disabled animations.

## Live example

<pre class="pre-wrap"><code id="test_console"></code></pre>

<script src="/js/sniffer.min.js"></script>
<script>
(function () {
	const consoleBlock = document.getElementById('test_console');

	function sanitize (text) {
		text = text.toString();
        text = text.replace(/&/g, '&amp;'); //before other sanitize replaces!
        text = text.replace(/</g, '&lt;');
        text = text.replace(/>/g, '&gt;');
        text = text.replace(/"/g, '&quot;');
        text = text.replace(/'/g, '&#39;');

        return text;
    }

    const elements = [];

    elements.push([
    	'navigator.userAgent',
    	navigator.userAgent
    ]);
	elements.push([
		'Sniff.os.name',
		Sniff.os.name
	]);
	elements.push([
		'Sniff.os.fullName',
		Sniff.os.fullName
	]);
	elements.push([
		'Sniff.os.version',
		Sniff.os.version
	]);
	if (Sniff.os.versionName) {
		elements.push([
			'Sniff.os.versionName',
			Sniff.os.versionName
		]);
	}
	elements.push([
		'Sniff.browser.name',
		Sniff.browser.name
	]);
	elements.push([
		'Sniff.browser.fullName',
		Sniff.browser.fullName
	]);
	elements.push([
		'Sniff.browser.engine',
		Sniff.browser.engine
	]);
	elements.push([
		'Sniff.browser.version',
		Sniff.browser.version
	]);

	for (let prop in Sniff.features) {
		elements.push([
			`Sniff.features.${prop}`,
			Sniff.features[prop]
		]);
	}

	consoleBlock.innerHTML = elements
		.map(([key, value]) => `<b>${sanitize(key)}</b>\n${sanitize(value)}`)
		.join('\n\n');
}());
</script>
