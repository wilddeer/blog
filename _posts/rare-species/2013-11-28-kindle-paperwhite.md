---
layout: post
title: "Браузер Kindle Paperwhite"
categories: rare-species
lang: ru
---

#Браузер Kindle Paperwhite {#header}

{% include pic.htm src='device.jpg' a='Kindle Paperwhite' %}

{:.specification}
| *Разрешение экрана* | 768 &times; 1024, 16 оттенков серого |
| *Размер вьюпорта* | 758 &times; 899 |
| *Браузер* | На движке WebKit |
| *User Agent (javascript)* | `Mozilla/5.0 (X11; ; U; Linux armv7l; en-us) AppleWebKit/534.26+ (KHTML, like Gecko) Version/5.0 Safari/534.26+` |
| *User Agent (http header)* | `Mozilla/5.0 (X11; U; Linux armv7l like Android; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/533.2+ Kindle/3.0+` |
| *[Acid3](http://acid3.acidtests.org/)* | 100/100 |
| *[HTML5 Test](http://html5test.com/)* | [212/555](http://html5test.com/s/9957252018bec558.html) |
| *[CSS3 Test](http://css3test.com/)* | 45% |

Kindle Paperwhite --- новая Амазоновская читалка с e-ink тачскрином. Девайс оборудован вайфаем, есть модели с 3G.

Браузер в читалке --- усовершенствованная версия браузера из [Kindle Keyboard](/rare-species/kindle-keyboard/). По ощущениям производительность браузера довольно сильно возросла по сравнению с предшественником.

С юзер-агентом у нового Киндла беда. На сервер отправляется вполне типичный для Киндлов юзер-агент, а вот из `navigator.userAgent` доступен другой, который сложно как-либо идентифицировать среди десятков других вебкитов. Жирная палка в колеса моему [снифферу](/scripts/sniffer/).

<figure class="info icon-fire" markdown="1">
Далее в статье используется селектор `html.kindle`, полученный с помощью грязного некошерного хака. Уберите детей от экрана:

{% highlight js cssclass=codewrap %}
Sniffer.browser.engine == 'webkit' && navigator.userAgent.indexOf('armv7l') != -1 && navigator.userAgent.indexOf('X11') != -1
{% endhighlight %}

Селектор используется для примера, а не как руководство к действию.
</figure>

###Поддержка фич {#feature-tests}

<small>Фичи тестировались [Модернайзером](//modernizr.com). [Полная таблица моих тестов](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing#gid=0) на гугл доксах.</small>

<div class="table-holder">
	<table>
		<thead>
			<tr>
				<th>Фича</th>
				<th>Тест</th>
				<th>Реальный результат</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>backgroundsize</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>bgsizecover</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>borderradius</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>boxshadow</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>boxsizing </td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>cssanimations</td>
				<td class="true">True</td>
				<td class="true">True <small>(-webkit-)</small></td>
			</tr>
			<tr>
				<td>cssgradients</td>
				<td class="true">True</td>
				<td class="true">True <small>(-webkit-)</small></td>
			</tr>
			<tr>
				<td>csstransforms</td>
				<td class="true">True</td>
				<td class="true">True <small>(-webkit-)</small></td>
			</tr>
			<tr>
				<td>csstransforms3d</td>
				<td class="false">False</td>
				<td class="true">True <small>(-webkit-)</small></td>
			</tr>
			<tr>
				<td>csstransitions</td>
				<td class="true">True</td>
				<td class="true">True <small>(-webkit-)</small></td>
			</tr>
			<tr>
				<td>fontface</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>mediaqueries</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>opacity</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>rgba</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>textshadow</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>touch</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
		</tbody>
	</table>
</div>

###Анимации {#animations}

Так же, как и [предшественник](/rare-species/kindle-keyboard/), Kindle Paperwhite поддерживает анимации и транзишены, которые, с учетом времени отклика е-инка, выглядят довольно печально.

###Тач {#touch}

Новый Киндл лишен железных кнопок и полностью контроллируется с тач-скрина. Браузер управляется привычными жестами, поддерживает мультитач для зума. Отрисовка при скроллинге и зуме для е-инка весьма неплохая.

Как видно из таблички выше, несмотря на тач-экран, тачэвенты браузер не поддерживает.

###Ссылки {#links}

Для всех ссылок насильно выставляется `text-decoration: underline`. Но, в отличии от [Kindle Keyboard](/rare-species/kindle-keyboard/), на Paperwhite свойство можно заредефайнить с помощью `!important`:

{% highlight css cssclass=codewrap %}
h1.title a {
	text-decoration: none !important;
}
{% endhighlight %}

###Шрифты {#fonts}

Поддерживаются все основные форматы веб-шрифтов (*woff*, *ttf*, *svg*). У браузера индивидуальная непереносимость к шрифту Scada:

{% include pic.htm src='font-bug.png' p=true a='Баг с шрифтом Scada' %}

Другие шрифты работают без проблем.

###Скролл {#scroll}

Блоки со скроллом скроллятся не всегда корректно. Если на странице есть блок с горизонтальным скроллом, вертикальное движение пальцем внутри блока часто приводит к горизонтальному проскролливанию самого блока вместо скролла страницы.

Например, здесь блок с кодом имеет горизонтальный скролл. Проскроллить страницу вниз в таком случае крайне сложно:

{% include pic.htm src='scroll.png' p=true a='Высокий блок с горизонтальным скроллом' %}

Глюк решается добавлением `max-height` к блокам с кодом:

{% highlight css cssclass=codewrap %}
html.kindle pre {
	max-height: 17em;
}
{% endhighlight %}

{% include pic.htm src='scroll-fixed.png' p=true c='Теперь все скроллится!' a='Исправленный блок со скроллом' %}

###Баг с `box-shadow` {#boxshadow-bug}

Если тень блока выезжает за вьюпорт, или если где-то вне вью-порта живет блок с `box-shadow` (даже если он находится в *overflow* другого блока), вьюпорт расширится, чтобы захватить собой тень. Такой вот дурацкий баг.

Рекомендуется отрубить нафиг тени для Киндла:

{% highlight css cssclass=codewrap %}
html.kindle * {
	box-shadow: none !important;
}
{% endhighlight %}

###Формы {#forms}

Браузер в зачаточной форме поддерживает некоторые типы полей ввода. Очень плохо работает `range`:

{% include pic.htm src='form.png' p=true a='Тест различных типов полей ввода' %}

Валидации нет, аттрибуты `required` и `pattern`, соответственно, тоже не поддерживаются.

##Итого {#conclusion}

Эволюционное развитие [предыдущего поколения](/rare-species/kindle-keyboard/). Если у вас есть оптимизированный под мобильные устройства сайт, есть большая вероятность того, что он прекрасно заработает на новом Киндле без дополнительных ухищрений.

Впрочем, немобильные сайты тоже работают вполне адекватно.