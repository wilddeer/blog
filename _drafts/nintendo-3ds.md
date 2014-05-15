---
layout: post
title: "Браузер Nintendo 3DS"
categories: rare-species
lang: ru
---

#Браузер Nintendo 3DS {#header}

{% include pic.htm src='device.jpg' a='Nintendo 3DS' %}

{:.specification}
| *Верхний экран* | 400 &times; 240|
| *Нижний экран* | 320 &times; 240 |
| *Размер вьюпорта* | 416 &times; 480 |
| *Браузер* | NetFront (WebKit) |
| *User Agent* | `Mozilla/5.0 (Nintendo 3DS; U; ; ru) Version/1.7552.EU` |
| *[Acid3](http://acid3.acidtests.org/)* | 92/100 |
| *[HTML5 Test](http://html5test.com/)* | [97/555](http://html5test.com/s/3c77232018f49fcc.html) |
| *[CSS3 Test](http://css3test.com/)* | 39% |

Nintendo 3DS --- портативная игровая консоль из последней линейки. Как и предшественник, [Nintendo DSi](/rare-species/nintendo-dsi), 3DS обладает двумя экранами. Верхний экран способен работать в режиме 3D, однако на браузере это никак не отражается. Нижний экран, как и в DSi, --- резистивный тачскин, заточенный под управление стилусом.

Хотя железка более чем в два раза мощнее своего предшественника (2 процессора по 266 МГц, 128 Мб оперативки), до производительности свежих мобилок ей далеко. При загрузке средних размеров сайтов часто заканчивается память, скрипты работают довольно медленно.

В отличии от DSi, использовавшего Оперу, 3DS использует браузер, основанный на NetFront (который, в свою очередь, использует движок WebKit).

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
				<td class="false">False</td>
			</tr>
			<tr>
				<td>boxsizing </td>
				<td class="true">True</td>
				<td class="true">True <small>(-webkit-)</small></td>
			</tr>
			<tr>
				<td>cssanimations</td>
				<td class="true">True</td>
				<td class="true">True <small>(-webkit-)</small></td>
			</tr>
			<tr>
				<td>cssgradients</td>
				<td class="true">True</td>
				<td class="false">False</td>
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
				<td class="false">False</td>
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
				<td class="false">False</td>
			</tr>
			<tr>
				<td>touch</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
		</tbody>
	</table>
</div>

Из моего набора тестов браузер поддерживает только `Media queries`, `opacity` и `box-sizing`. Причем тест [Модернайзера](//modernizr.com) на поддержку `box-sizing` дает ложноотрицательный результат. Браузер понимает и корректно обрабатывает CSS-свойство, но никак не реагирует на обращение к `style.boxSizing` через яваскрипт (в том числе с префиксом Оперы).

###Шрифты {#fonts}

Браузер использует один шрифт для всего вообще. Шрифт без засечек. Где-то в приватной области юникода лежит набор пиктограмм, которые, видимо, используются в интерфейсе консоли.

Кроме того, браузер использует всего три размера шрифта и преобразует любой размер в один из своих: маленький для `ComputedStyle` от `0px` до `11px`, средний для `12px` --- `14px` и большой для `15px` и больше.

При этом все остальные метрики остаются неизменными. Поэтому, например, если у параграфа стоит свойство `margin: 0 0 1.5em 0`, отступ получится относительно заданного размера шрифта, а не относительно получившегося в результате.

Главный и самый противный баг шрифта: кириллические символы отображаются с огромным межбуквенным расстоянием:

{% include pic.htm src='browser4.jpg' c='Сравните межбуквенное расстояние у латиницы и кириллицы' a='Баг с чрезмерным межбуквенным расстоянием в кириллических текстах' %}

Когда мне будет совсем нечего делать --- напишу скрипт, исправляющий эту проблему.

###Скролл {#scroll}

Сайт можно скроллить джойстиком, драгскроллом (вертикальным движением в любом месте, лучше стилусом), либо с помощью постоянно видимого скроллбара. 

Блоки с `overflow: scroll / auto` при переполнении также имеют постоянно видимый скролл. Драгскролл для них не работает.

###Формы {#forms}

Браузер, на удивление, поддерживает довольно много новых типов полей ввода: `url`, `email`, `datetime`, `date`, `month`, `week`, `time`, `datetime-local`, `number`, `range`:

{% include pic.htm src='form.jpg' a='Отображение различных типов полей ввода' %}

Все поля валидируются на соответствие типу при отправке формы. Также работает валидация по аттрибуту `pattern`. Датапикер глючит:

{% include pic.htm src='datepicker.jpg' c='Пытаясь уместиться в свободное пространство, датапикер превращается в неюзабельное месиво' %}

Происходит это только с датапикером в поле `date`. Датапикеры из других типов полей не стесняются выезжать за рамки видимой области экрана и выглядят нормально.

###jQuery {#jquery}

jQuery не работает начиная с версии 1.9.1 и выше. Причину выяснить я не смог.

##Итого {#conclusion}

Вполне можно адаптировать несложный мобильный сайт под эту железку без особых усилий, если использовать грамотные фоллбеки и исправить проблему с шрифтом. Тот же сайт твиттера, например, работает вполне сносно.


##Ссылки по теме {#related_links}

- [Nintendo 3DS browser](https://en.wikipedia.org/wiki/Internet_Browser_(Nintendo_3DS)), *Wikipedia*
- [Nintendo 3DS](http://console.maban.co.uk/device/3ds) на *Game Console Browsers*