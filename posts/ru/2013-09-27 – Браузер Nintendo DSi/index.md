**Редкие звери:** когда-то давно я развлекался исследованием экзотических браузеров на всяких не сильно распространенных устройствах. Это — одно из таких исследований.
{.notice .is-info}

# Браузер Nintendo DSi {#header}

{% include pic.htm src='dsi.jpg' a='Nintendo DSi' %}

{:.specification}
| *Разрешение экрана* | 256 &times; 192, 2 штуки |
| *Размер вьюпорта* | 240 &times; 176 |
| *Браузер* | Opera (Presto) |
| *User Agent* | `Opera/9.50 (Nintendo DSi; Opera/507; U; en-US)` |
| *[Acid3](http://acid3.acidtests.org/)* | 59/100 |
| *[HTML5 Test](http://html5test.com/)* | [82/555](http://html5test.com/s/0329d12018b68bd6.html) |
| *[CSS3 Test](http://css3test.com/)* | Не запустился |

Nintendo DSi — портативная игровая приставка с двумя экранами. Нижний — тачскрин с резистивным тачем, верхний — обычный экран. Интерфейс и качество тачскрина предполагают управление стилусом.

Железка крайне слабая. Частота процессора 133 МГц, оперативная память — 16 Мб. Связь с интернетом по Wi-Fi. Браузер — Опера (не мини, то есть не пропускает трафик через свой сервер).

Сайты могут отображаться в двух режимах. Первый — для сайтов, не адаптированных под мобильные устройства. Один экран в этом случае используется для отображения уменьшенной картинки сайта, другой показывает увеличенный выделенный участок:

{% include pic.htm src='browser1.jpg' a='Демонстрация работы браузера с обычными сайтами' %}

Функции экранов можно менять местами, при этом на нижнем экране можно перетаскивать выделенную область:

{% include pic.htm src='browser2.jpg' a='Демонстрация работы браузера с обычными сайтами в альтернативном режиме' %}

Второй режим для адаптированных под маленькие экраны сайтов. В этом случае верхний экран служит продолжением нижнего. Сайт появляется на нижнем экране, верхний изначально пустой. При скролле страницы верхний экран заполняется:

{% include pic.htm src='browser3.jpg' a='Демонстрация работы браузера с мобильными сайтами' %}

Мобильный режим активируется при наличии мета-тега с подходящим вьюпортом, например `<meta name="viewport" content="width=device-width">`.

## Особенности {#features}

### Поддержка фич {#feature-tests}

<small>Фичи тестировались [Модернайзером](//modernizr.com). [Полная таблица моих тестов](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing#gid=0) на гугл доксах.</small>

<div class="table-holder">
	<table>
		<thead>
			<tr>
				<th>Фича</th>
				<th markdown="1">Тест</th>
				<th>Реальный результат</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>backgroundsize</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
			<tr>
				<td>bgsizecover</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
			<tr>
				<td>borderradius</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
			<tr>
				<td>boxshadow</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
			<tr>
				<td>boxsizing </td>
				<td class="is-false">False</td>
				<td class="is-true">True</td>
			</tr>
			<tr>
				<td>cssanimations</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
			<tr>
				<td>cssgradients</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
			<tr>
				<td>csstransforms</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
			<tr>
				<td>csstransforms3d</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
			<tr>
				<td>csstransitions</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
			<tr>
				<td>fontface</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
			<tr>
				<td>mediaqueries</td>
				<td class="is-true">True</td>
				<td class="is-true">True</td>
			</tr>
			<tr>
				<td>opacity</td>
				<td class="is-true">True</td>
				<td class="is-true">True</td>
			</tr>
			<tr>
				<td>rgba</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
			<tr>
				<td>textshadow</td>
				<td class="is-true">True</td>
				<td class="bug">True <small>(без блюра)</small></td>
			</tr>
			<tr>
				<td>touch</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
			<tr>
				<td>video</td>
				<td class="is-false">False</td>
				<td class="is-false">False</td>
			</tr>
		</tbody>
	</table>
</div>

Из моего набора тестов браузер поддерживает только `Media queries`, `opacity`, `box-sizing` и `text-shadow` без размывки. Причем тест [Модернайзера](//modernizr.com) на поддержку `box-sizing` дает ложноотрицательный результат. Браузер понимает и корректно обрабатывает CSS-свойство, но никак не реагирует на обращение к `style.boxSizing` через яваскрипт (в том числе с префиксом Оперы).

### Шрифты {#fonts}

Браузер использует один шрифт для всего вообще. Шрифт без засечек. Где-то в приватной области юникода лежит набор пиктограмм, которые, видимо, используются в интерфейсе консоли.

Кроме того, браузер использует всего три размера шрифта и преобразует любой размер в один из своих: маленький для `ComputedStyle` от `0px` до `11px`, средний для `12px` — `14px` и большой для `15px` и больше.

При этом все остальные метрики остаются неизменными. Поэтому, например, если у параграфа стоит свойство `margin: 0 0 1.5em 0`, отступ получится относительно заданного размера шрифта, а не относительно получившегося в результате.

Главный и самый противный баг шрифта: кириллические символы отображаются с огромным межбуквенным расстоянием:

{% include pic.htm src='browser4.jpg' c='Сравните межбуквенное расстояние у латиницы и кириллицы' a='Баг с чрезмерным межбуквенным расстоянием в кириллических текстах' %}

### Скролл {#scroll}

Сайт можно скроллить джойстиком, драгскроллом (перетаскиванием), либо с помощью постоянно видимого скроллбара.

Блоки с `overflow: scroll / auto` при переполнении также имеют постоянно видимый скролл. Драгскролл для них не работает.

### Формы {#forms}

Браузер, на удивление, поддерживает довольно много новых типов полей ввода: `url`, `email`, `datetime`, `date`, `month`, `week`, `time`, `datetime-local`, `number`, `range`:

{% include pic.htm src='form.jpg' a='Отображение различных типов полей ввода' %}

Все поля валидируются на соответствие типу при отправке формы. Также работает валидация по аттрибуту `pattern`. Датапикер глючит:

{% include pic.htm src='datepicker.jpg' c='Пытаясь уместиться в свободное пространство, датапикер превращается в неюзабельное месиво' %}

### jQuery {#jquery}

jQuery не работает начиная с версии 1.9.1 и выше. Причину выяснить я не смог.

## Итого {#conclusion}

Вполне можно адаптировать несложный мобильный сайт под эту железку без особых усилий, если использовать грамотные фоллбеки и исправить проблему с шрифтом. Тот же сайт твиттера, например, работает вполне сносно.

## Ссылки по теме {#related_links}

- [Using the Nintendo DSi browser](http://maban.co.uk/73), *Anna Debenham*
- [Nintendo DS & DSi Browser](http://en.wikipedia.org/wiki/Nintendo_DS_%26_DSi_Browser), *Wikipedia*
- [Nintendo DSi](http://console.maban.co.uk/device/dsi) на *Game Console Browsers*
