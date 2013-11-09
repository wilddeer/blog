---
layout: post
title: "Тестовый пост"
lang: ru
---

<div class="js-gallery" data-force="true">
	{% include pic.htm src='chrome-devtools.png' c='Девтулз' %}
	{% include pic.htm src='chrome-debug.png' c='Результат на девайсе' p=true %}
</div>

{% include pic.htm src='whiteboard.jpg' a='Доска результатами теста сайта в различных браузерах' %}

Как правильно [замечают](http://www.quirksmode.org/blog/archives/2010/02/the_iphone_obse.html) многие хорошие ребята, проверить работоспособность вашего адаптивного творения на айфончике недостаточно. Как минимум, стоит озаботиться несколькими основными платформами: iOS, Android (а там свой зоопарк браузеров), Windows Phone,
Blackberry.

Очень примитивный пример:

{% highlight js %}
var customConsole = {
	log: function(message) {
		if (message === undefined) message = '<i>undefined</i>';
		notify.create(message, 'info', 10000);
	},
	warn: function(message) {
		notify.create(message, 'warning', 10000);
	},
	error: function(message, source, file) {
		notify.create([message,source,file].join(' '), 'danger', 10000);
	}
}

if (dev_console) {
	window.console = customConsole;

	window.onerror = function(message, source, file) {console.error(message, source, file)};
}
{% endhighlight %}

Если вы Лев Толстой не только на словах, то все перечисленное --- ваш обязательный
минимум, который вы радостно расширяете любыми попадающимися под руку железками и эмуляторами.

##Коротко про десктопные браузеры

###Windows

Первым делом --- последние стабильные версии Firefox, Chrome, Opera, Safari, IE плюс Opera 12, с этим все ясно. Через годик о 12 Опере и движке Presto можно будет забыть насовсем :-(

{% include pic.htm src='virtual_machines.jpg' c='Уи-и-и-и' %}

В IE10 по умолчанию включено автообновление, поэтому, надеюсь, когда выйдет 11, под десятый не придется делать еще одну виртуалку.

{% include pic.htm src='virtual_machines.jpg' c='Уи-и-и-и' t=true %}

##Мобильные устройства

Первое правило: есть возможность тестировать на железке, а не на эмуляторе, --- тестируйте на железке. Вот пара причин:

- Эмулятор не потрогать. Размер текста, ссылок, кнопок, работу тача в целом можно адекватно оценить только на устройстве.
- Производительность эмулятора часто не соответствует производительности железки. Не получится увидеть тормоза и переполнение памяти на слабых устройствах при загрузке кучи хайрезных картинок, не оценить скорость отрисовки анимаций и работы скриптов.
- Много глючных и неудобных эмуляторов.
- Отсутствие эмуляторов редких устройств.

ПЕРЕРАБОТАТЬ

Мой подход к покупке девайсов был такой: купить устройства на разных платформах с разным назначением, и хотя бы одно должно быть планшетом (другой вьюпорт). В результате были куплены планшет Galaxy Tab 2 с андроидом 4.1, мобилка HTC 8x на WP8 и iPod Touch 5.

Потом появились Nexus 4 (мобилка с андроидом), Kindle Keyboard со своим черно-белым вебкитом (одна из тех железок, под которые стоит адаптировать сайты просто из спортивного интереса) и Nokia Asha 501 (мобилка на модифицированной S40 с ужасным Ovi браузером и Оперой мини на JAVA). Еще из Китая едет нонеймовая мобилка с андроидом 2.3 и Nintendo DSi, который я заказал после прочтения [вот этой статьи](http://maban.co.uk/73).

{% include pic.htm src='zoo.jpg' c='Зоопарк' %}

Покупайте девайсы, отбирайте старье у друзей, заказывайте редкие штуки на [dx.com](//dx.com) и на [ебее](//ebay.com). Разводите свой зоопарк.

###На чем тестировать

Обязательный набор:

- **iOS** --- Safari и Opera Mini
- **Android** --- дефолтный браузер на 2.x, дефолтный браузер на 4.x, Chrome, Firefox, Opera Classic, Opera, Opera Mini
- Windows Phone 8
- Blackberry 10

Бонус-пак в порядке важности (субъективно):

- Java-приложение Opera Mini
- Windows Phone 7.8
- Прошлые версии iOS
- Прошлые версии Blackberry
- Ovi browser

For fun:

<ul class="posts">
<li>Kindle Keyboard</li>
<li>Sony PSP, PS Vita</li>
<li>Nintendo DSi, 3DS</li>
<li>Steam Big Picture browser</li>
<li>Телеки со смарт-тв, холодильники с интернетом, любые другие железки и эмуляторы, до которых дотянутся руки</li>
</ul>

###Где взять эмуляторы

{% include stuff/emulators.md %}

##Дебаггинг на мобильных устройствах

###Android

В **стоковом браузере** набираем в адресную строку `about:debug`. После этого в настройках браузера появляется пункт "Отладка" с разными опциями, в том числе возможностью включить консоль.

<div class="gallery">
{% include pic.htm src='android_browser_dev_options.png' c='Опции отладки' p=true %}
{% include pic.htm src='android_browser_console.png' c='Консоль' p=true %}
</div>

В **Хроме под Андроидом** можно воспользоваться [отладкой через десктопный хром](https://developers.google.com/chrome-developer-tools/docs/remote-debugging):

- Ставим [плагин](https://chrome.google.com/webstore/detail/adb/dpngiggdglpdnjdoaefidgiigpemgage) на десктопный Хром
- Включаем USB debugging в настройках девайса
- Подключаем девайс шнурком
- Профит

Получаем полный набор инструментов, как в десктопной девелоперской панели. Все изменения в реалтайме отображаются на девайсе:

###iOS

###Blackberry

На блекберри есть [удаленная отладка через веб-версию вебкитовских девтулзов](https://developer.blackberry.com/html5/documentation/web_inspector_overview_1553586_11.html):

- Подключаем девайс по USB, либо вешаем его на один вай-фай с компьютером.
- В настройках браузера на девайсе включаем веб-инспектор. Там же появится IP и порт. В эмуляторе IP не появится, но его можно посмотреть в контроллере эмулятора, в нижней части окна (контроллер идет вместе с эмулятором как отдельная программа). Порт при этом будет 1337.
- Заходим по адресу `IP:Port` с десктопного браузера, получаем вебкитовскую девпанель в виде веб-страницы.

Как это не смешно, но панель у меня согласилась нормально работать только в Опере 15:

{% include pic.htm src='blackberry-debugging.png' c='Удаленный дебаггинг на эмуляторе Blackberry' %}

###[Jsconsole.com](http://jsconsole.com/)

Отличный инструмент для дебаггинга практически любого девайса. Вставляем на свой сайт скрипт с уникальным айдишником (желательно до запуска остальных скриптов, чтобы не пропустить логи и ошибки), получаем удаленную консоль с выводом ошибок и возможностью выполнять команды. Главное --- не забудьте убрать скрипт из продакшена.

Можно почитать [подробнее об использовании](http://jsconsole.com/remote-debugging.html).

###Своя консолька

Если *jsconsole* использовать по какой-то причине неудобно, всегда можно написать свою консоль, заредефайнив `console.log`, `console.warn`, `console.error`, `window.onerror` и еще что-то по вкусу. Получится довольно простой инструмент, которого достаточно в большинстве случаев.

Очень примитивный пример:

{% highlight js %}
var customConsole = {
	log: function(message) {
		if (message === undefined) message = '<i>undefined</i>';
		notify.create(message, 'info', 10000);
	},
	warn: function(message) {
		notify.create(message, 'warning', 10000);
	},
	error: function(message, source, file) {
		notify.create([message,source,file].join(' '), 'danger', 10000);
	}
}

if (dev_console) {
	window.console = customConsole;

	window.onerror = function(message, source, file) {console.error(message, source, file)};
}
{% endhighlight %}

Допиливайте по вкусу и потребностям.

##Как тестировать сайт, запущенный на локальном веб-сервере