# [Sniffer.js](https://github.com/wilddeer/Sniffer)

## If you can’t detect it, you should sniff it!

[Сниффер](https://github.com/wilddeer/Sniffer) определяет браузер, движок и операционку/девайс по юзер-агенту.

> — Но ведь правильно тестировать поддержку фич!!1!1

Я фигачу фиче-детекты как босс. Но когда они не работают, я возвращаюсь к грязным хакам:

- Нельзя, например, достоверно определить поведение блоков с `overflow: scroll / auto` на мобильных девайсах. И еще много других штук. Юзаем Сниффер!
- Сниффаем [ложные результаты фичетестов](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing#gid=0) (там моя табличка тестов мобильных браузеров).
- Хотите порадовать тех двух идиотов, что зашли на сайт с Киндла? Я хочу! Подарите им контрастные цвета и отключенные анимации.

## Живой пример

<pre><code id="test_console"></code></pre>

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
