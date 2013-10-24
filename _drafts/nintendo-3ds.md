---
layout: post
title: "Браузер Nintendo 3DS"
categories: rare-species
lang: ru
---

#Браузер Nintendo 3DS {#header}

{% include pic.htm src='3ds.jpg' a='Nintendo 3DS' %}

{:.specification}
| *Верхний экран* | 400 &times; 240|
| *Нижний экран* | 320 &times; 240 |
| *Размер вьюпорта* | 416 &times; 480 |
| *Браузер* | На движке WebKit |
| *User Agent* | `Mozilla/5.0 (Nintendo 3DS; U; ; ru) Version/1.7552.EU` |
| *[Acid3](http://acid3.acidtests.org/)* | 92/100 |
| *[HTML5 Test](http://html5test.com/)* | 109/500 |
| *[CSS3 Test](http://css3test.com/)* | 39% |

Kindle Paperwhite --- новая Амазоновская читалка с e-ink тачскрином. Как и в [Kindle Keyboard](/rare-species/kindle-keyboard/), в читалке есть браузер.

С юзер-агентом у нового Киндла беда. В то время как на сервер отправляется типичный для Киндлов юзер-агент, из `navigator.userAgent` доступен другой, который сложно как-либо идентифицировать среди десятков других вебкитов. Палка в колеса моему [снифферу].

<figure class="info"><div class="icon-fire" markdown="1">
Далее в статье используется селектор `html.kindle`, полученный с помощью грязных некошерных хаков.
</div></figure>

###Поддержка фич {#feature-tests}

<small>Фичи тестировались [Модернайзером](//modernizr.com). [Полная таблица моих тестов](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing#gid=0) на гугл доксах.</small>

<div class="table-holder">
	<table>
		<thead>
			<tr>
				<th>Свойство</th>
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
				<td class="true">True</td>
			</tr>
			<tr>
				<td>csstransforms</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>csstransforms3d</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
			<tr>
				<td>csstransitions</td>
				<td class="true">True</td>
				<td class="true">True</td>
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
				<td>touch</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
		</tbody>
	</table>
</div>

###Анимации {#animations}

Так же, как и [предшественник](/rare-species/kindle-keyboard/), Kindle Paperwhite поддерживает анимации и транзишены, которые, с учетом времени отклика е-инка, выглядят довольно грустно.

###Тач {#touch}

Новый Киндл лишен железных кнопок и полностью управляется с тач-скрина. Браузер управляется привычными жестами, поддерживает мультитач для зума.

Отрисовка при скроллинге и зуме для е-инка очень даже ничего. В целом браузер позволяет довольно комфортно просматривать не сильно перегруженные сайты.

Как видно из таблички выше, несмотря на тач-экран, тачэвенты браузер не поддерживает.

###Шрифты {#fonts}

Первое, чем меня встретил новый киндловый браузер:

{% include pic.htm src='font-bug.png' p=true a='Баг с шрифтом Scada' %}

У нового киндла индивидуальная непереносимость к шрифту Scada. Другие протестированные мной шрифты работают без проблем.

Баг со Скадой фиксится редефайном шрифта для киндла:

{% highlight css cssclass=codewrap %}
html.kindle,
html.kindle button,
html.kindle input,
html.kindle select,
html.kindle textarea {
	font-family: sans-serif;
}
{% endhighlight %}

###Скролл {#scroll}

Блоки со скроллом скроллятся не всегда корректно. Если на странице есть блок с горизонтальным скроллом, вертикальное движение пальцем внутри блока часто приводит к горизонтальному проскролливанию самого блока вместо скролла страницы.

Например, здесь блок с кодом имеет горизонтальный скролл. Проскроллить страницу вниз в таком случае крайне сложно:

{% include pic.htm src='scroll.png' p=true a='Высокий блок с горизонтальным скроллом' %}

Глюк решается простым добавлением `max-height` к блокам с кодом:

{% highlight css cssclass=codewrap %}
html.kindle pre {
	max-height: 17em;
}
{% endhighlight %}

{% include pic.htm src='scroll-fixed.png' p=true c='Теперь все скроллится!' a='Исправленный блок со скроллом' %}

###Баг с `box-shadow` {#boxshadow}

Если тень блока выезжает за вьюпорт, или если где-то вне вью-порта живет блок с `box-shadow` (даже если он находится в *overflow* другого блока), вьюпорт расширится, чтобы захватить собой тень. Такой вот дурацкий баг.

Рекомендуется отрубить нафиг тени для Киндла:

{% highlight css cssclass=codewrap %}
html.kindle * {
	box-shadow: none !important;
}
{% endhighlight %}

###Формы {#forms}

Браузер в зачаточной форме поддерживает некоторые типы полей ввода. Особенно ущербно работает `range`:

{% include pic.htm src='form.png' p=true a='Тест различных типов полей ввода' %}

Валидации нет, `required` и `pattern`, соответственно, тоже не поддерживаются.

##Итого {#conclusion}

##Ссылки по теме {#related_links}

- [Nintendo 3DS browser](https://en.wikipedia.org/wiki/Internet_Browser_(Nintendo_3DS)), *Wikipedia*
- [Nintendo 3DS](http://console.maban.co.uk/device/3ds) на *Game console browsers*