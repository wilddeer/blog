---
layout: post
title: "Sniffer.js"
categories: en scripts
lang: en
---

#<a href="https://github.com/wilddeer/Sniffer" class="iconlink"><i class="icon-heart-empty"> </i><span>Sniffer.js</span></a> {#header}

##&rsquo;cause if you can&rsquo;t detect it, you should sniff it! {#subheader}

Сниффер вычисляет браузер, движок и операционку/девайс по юзер-агенту.

Sniffer detects browser name, engine and OS/device using user-agent.

> --- Why u no feature-detect??/?////

I feature-detect like a boss. But when I can't, I use this shit to help me out.

- You can't reliably detect `overflow: scroll` behavior on mobile devices. And lot's of other stuff. Use da Sniffer!
- You have to sniff [false-positive & false-negative feature detects](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing).
- You want to support those two idiots coming to your site from Kindle? I do! Make'em happy with contrast colors and disabled animations.

##Use it

Put it in your `<head>`, where you keep your [Modernizr](//modernizr.com) (Modernizr is not required, but you do use it, right?).

Now you have this beautiful object in your global scope:

{% highlight js cssclass=codewrap %}
Sniffer = {
  browser: {
    name,
    engine,
    version
  },
  os: {
    name,
    version
  },
  features: {
    bw: bool, /* black-and-white */
    mobile: bool,
    serverside: bool /* serverside js & rendering, a-la Opera Mini */
  }
}
{% endhighlight %}
  
You also have some fancy classes in your `HTML` tag: one for browser name, one for browser engine, one for OS name and one for each feature that appears to be true.

##Detects

Class & property name in square brackets.

**Browsers:**

- **Chrome** *[chrome]*
- **Firefox** *[firefox]*
- **IE** *[ie]*
- **Opera** *[opera]*
- **Opera Mini** *[operamini]*
- **Nokia Browser** *\[nokiabrowser\]* (!= Nokia Xpress) — Symbian Belle phones
- **Ovi Browser** a.k.a **Nokia Xpress** *[ovi]* — Nokia Asha, Series40 & Series60 phones

No Safari, 'cause there is no reliable way to detect it. No, srsly. If you desperately want Safari test, try `Sniffer.browser.name === undefined && Sniffer.browser.engine == 'webkit'`. Lots of other webkits will pass this test, though.

**Engines:**

- **WebKit** *[webkit]*
- **Gecko** *[gecko]*
- **Trident** *[trident]*
- **Presto** *[presto]*

**OS/Device:**

- **Windows** *[win]*
- **Mac** *[mac]*
- **Windows Phone** *[winphone]*
- **Android** *[android]*
- **iOS** *[ios]*
- **Blackberry** *[blackberry]*
- **Symbian** *[symbian]*
- **Kindle** *\[kindle\]* (Kindle Fire should be detected as Android)
- **Nintendo DSi** *[dsi]*
- **Nintendo 3DS** *[3ds]*
- **Linux** *[linux]* — actually anything linux-based not from the list above

**Features:**

- **Black and white** *[bw]*
- **Mobile** *[mobile]*
- **Serverside rendering** *[serverside]*

##Test

<div id="test_console"></div>

<script>
	dzDelayed.push(function() {
		testConsole.log('<b>Sniffer.os.name</b><br>'+Sniffer.os.name);
		testConsole.log('<b>Sniffer.os.version</b><br>'+Sniffer.os.version);
		testConsole.log('<b>Sniffer.browser.name</b><br>'+Sniffer.browser.name);
		testConsole.log('<b>Sniffer.browser.engine</b><br>'+Sniffer.browser.engine);
		testConsole.log('<b>Sniffer.browser.version</b><br>'+Sniffer.browser.version);

		for (var prop in Sniffer.features) {
			testConsole.log('<b>Sniffer.features.'+prop+':</b><br>'+Sniffer.features[prop]);
		}
	});
</script>

<a href="https://github.com/wilddeer/Sniffer/blob/master/README.md" class="iconlink"><i class="icon-book"> </i><span>Latest documentation</span></a>