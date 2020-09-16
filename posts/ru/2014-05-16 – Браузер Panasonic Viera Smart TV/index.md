**Редкие звери:** когда-то давно я развлекался исследованием экзотических браузеров на всяких не сильно распространенных устройствах. Это — одно из таких исследований.
{.notice .is-info}

# Браузер Panasonic Viera Smart&nbsp;TV <small>(TX-LR32E6)</small>

![](tv.jpg =960x450)

| ---                                    | --- |
| *Разрешение экрана*                    | 1920 &times; 1080 |
| *Размер вьюпорта*                      | 1256 &times; 630 |
| *Браузер*                              | На движке WebKit |
| *User Agent*                           | `Mozilla/5.0 (X11; FreeBSD; U; Viera; ru-RU) AppleWebKit/537.11 (KHTML, like Gecko) Viera/3.3.2 Chrome/23.0.1271.97 Safari/537.11` |
| *[Acid3](http://acid3.acidtests.org/)* | 100/100, с багами |
| *[HTML5 Test](http://html5test.com/)*  | [333/555](http://html5test.com/s/cdd96d20133ac84a.html) |
| *[CSS3 Test](http://css3test.com/)*    | 54% |
{.key-value-table}

Браузер одновкладочный, на движке WebKit (похоже на модифицированный Chrome). Довольно медленный, особенно неохотно работает с анимациями.

## Взаимодействие {#interaction}

![Пульт](remote.jpg =184x400)
{.is-float-right}

Браузер управляется пультом (можно подключить мышку и клавиатуру). Курсор передвигается стрелками на пульте. Цветные кнопки используются как контекстные функциональные клавиши. В основном окне браузера они привязаны к зуму и изменению режима курсора. Зум приближает часть вьюпорта, не изменяя размера самого вьюпорта.

Режим курсора меняется между перемещением и перетаскиванием (второй эмулирует перемещение мыши с зажатой кнопкой). Состояния `:hover` и `:active` работают с курсором без проблем (`:active` срабатывает после небольшой задержки).

Сайт скроллится подведением курсора к краю экрана. Блоки со скроллом можно поскроллить только нажатием на стрелочки скроллбара, что не очень удобно. Скроллбар виден постоянно.

## Тесты {#tests}

[Acid3](http://acid3.acidtests.org/) проходится полностью, но с багами:

![](acid.jpg =590x403)

## Поддержка фич {#feature-tests}

<small>Фичи тестировались [Модернайзером](//modernizr.com). [Полная таблица моих тестов](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing#gid=0) на гугл доксах.</small>

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
			<td class="is-true">True</td>
			<td class="is-true">True</td>
		</tr>
		<tr>
			<td>bgsizecover</td>
			<td class="is-true">True</td>
			<td class="is-true">True</td>
		</tr>
		<tr>
			<td>borderradius</td>
			<td class="is-true">True</td>
			<td class="is-true">True</td>
		</tr>
		<tr>
			<td>boxshadow</td>
			<td class="is-true">True</td>
			<td class="is-true">True</td>
		</tr>
		<tr>
			<td>boxsizing </td>
			<td class="is-true">True</td>
			<td class="is-true">True</td>
		</tr>
		<tr>
			<td>cssanimations</td>
			<td class="is-true">True</td>
			<td class="is-true">True <small>(-webkit-)</small></td>
		</tr>
		<tr>
			<td>cssgradients</td>
			<td class="is-true">True</td>
			<td class="is-true">True <small>(-webkit-)</small></td>
		</tr>
		<tr>
			<td>csstransforms</td>
			<td class="is-true">True</td>
			<td class="is-true">True <small>(-webkit-)</small></td>
		</tr>
		<tr>
			<td>csstransforms3d</td>
			<td class="is-false">False</td>
			<td class="is-true">True <small>(-webkit-)</small></td>
		</tr>
		<tr>
			<td>csstransitions</td>
			<td class="is-true">True</td>
			<td class="is-true">True <small>(-webkit-)</small></td>
		</tr>
		<tr>
			<td>fontface</td>
			<td class="is-true">True</td>
			<td class="is-true">True</td>
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
			<td class="is-true">True</td>
			<td class="is-true">True</td>
		</tr>
		<tr>
			<td>textshadow</td>
			<td class="is-true">True</td>
			<td class="is-true">True</td>
		</tr>
		<tr>
			<td>touch</td>
			<td class="is-false">False</td>
			<td class="is-false">False</td>
		</tr>
	</tbody>
</table>

## Шрифты {#fonts}

Из дефолтных шрифтов есть только monospace и sans-serif. Fantasy, cursive и serif отображаются sans-serif'ом. Подключаемые шрифты поддерживаются без проблем.

## Формы {#forms}

Браузер в зачаточной форме поддерживает некоторые типы полей ввода:

![](form.jpg =600x584)

Датапикера нет. Экранная клавиатура никак не адаптируется под тип поля. Валидация работает для полей `email` и `url`, дружит с аттрибутами `required` и `pattern`.

## Итого {#conclusion}

Практически полноценный Хром в плане рендеринга, но медленный и с плохим интерфейсом.

