# Sniffer.js {#header}

## &rsquo;cause if you can&rsquo;t detect it, you should sniff it! {#subheader}

[Sniffer](https://github.com/wilddeer/Sniffer) is a clientside browser/engine/os/device detection tool.

> — Why u no feature-detect??/?////

I feature-detect like a boss. But when I can't, I use dirty hacks to help me out.

- Some features are just undetectable. For instance, `overflow: scroll` behavior on mobile devices is one of them. Use da Sniffer!
- You have to sniff [false-positives & false-negatives](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing) (some of my mobile browsers tests there).
- You want to support those two idiots coming to your site from Kindle? I do! Make 'em happy with contrast colors and disabled animations.

[Checkout docs and usage examples on GitHub](https://github.com/wilddeer/Sniffer)

## Live example

<div id="test_console"></div>

<script>
	dzDelayed.push(function() {
		testConsole.log('<b>Sniff.os.name</b><br>'+Sniff.os.name);
		testConsole.log('<b>Sniff.os.fullName</b><br>'+Sniff.os.fullName);
		testConsole.log('<b>Sniff.os.version</b><br>'+Sniff.os.version);
		Sniff.os.versionName && testConsole.log('<b>Sniff.os.versionName</b><br>'+Sniff.os.versionName);
		testConsole.log('<b>Sniff.browser.name</b><br>'+Sniff.browser.name);
		testConsole.log('<b>Sniff.browser.fullName</b><br>'+Sniff.browser.fullName);
		testConsole.log('<b>Sniff.browser.engine</b><br>'+Sniff.browser.engine);
		testConsole.log('<b>Sniff.browser.version</b><br>'+Sniff.browser.version);

		for (var prop in Sniff.features) {
			testConsole.log('<b>Sniff.features.'+prop+':</b><br>'+Sniff.features[prop]);
		}
	});
</script>
