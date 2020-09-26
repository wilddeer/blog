# <div class="small">Браузер</div>Kindle Keyboard {.is-small-mb}

<%- include('/svg/history-solid.svg') %>**Редкие звери:** когда-то давно я развлекался исследованием экзотических браузеров на всяких не сильно распространенных устройствах. Это — одно из таких исследований.
{.notice .is-with-icon .is-info .out-of-the-box .block .is-mb}

![](kindle-keyboard.jpg =960x510)
{.is-ootb}

| ---                                    | --- |
| *Экран*                                | 600 &times; 800, 16 оттенков серого |
| *Размер вьюпорта*                      | 582 &times; 706 |
| *Браузер*                              | На движке WebKit |
| *User Agent*                           | `Mozilla/5.0 (Linux; U; en-US) AppleWebKit/528.5+ (KHTML, like Gecko, Safari/528.5+) Version/4.0 Kindle/3.0 (screen 600x800; rotate)` |
| *[Acid3](http://acid3.acidtests.org/)* | 99/100 |
| *[HTML5 Test](http://html5test.com/)*  | [59/555](http://html5test.com/s/af89ab2018cb33eb.html) |
| *[CSS3 Test](http://css3test.com/)*    | 35% |
{.key-value-table}

Kindle Keyboard (он же Kindle 3) — читалка от Амазона с e-ink экраном (без тача) и qwerty-клавиатурой. В читалку встроен экспериментальный браузер.

В читалке есть вайфай и, опционально, 3G. Во время выхода читалки Амазон расщедрился и сделал бесплатный 3G для читалки по всему миру, но затем ограничил доступ, оставив сайт Амазона и Википедию. По вайфаю браузер по-прежнему работает без ограничений.

Браузер однооконный, управляется джойстиком, который двигает курсор по экрану, кнопкой <kbd>back</kbd> под джойстиком для перехода назад по истории, а также кнопками перелистывания страниц по бокам девайса, которые работают как <kbd>Page Up</kbd> и <kbd>Page Down</kbd>.

Браузер прекрасно переваривает яваскрипт, хорошо справляется со страницами средней сложности, но начинает заметно тормозить и брыкаться на перегруженных большими изображениями сайтах. Сказывается небольшой объем оперативки.

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
			<td class="is-false">False</td>
			<td class="is-false">False</td>
		</tr>
		<tr>
			<td>borderradius</td>
			<td class="is-true">True</td>
			<td class="is-true">True <small>(-webkit-)</small></td>
		</tr>
		<tr>
			<td>boxshadow</td>
			<td class="is-true">True</td>
			<td class="is-false">False</td>
		</tr>
		<tr>
			<td>boxsizing </td>
			<td class="is-true">True</td>
			<td class="is-true">True <small>(-webkit-)</small></td>
		</tr>
		<tr>
			<td>cssanimations</td>
			<td class="is-true">True</td>
			<td class="is-true">True <small>(-webkit-)</small></td>
		</tr>
		<tr>
			<td>cssgradients</td>
			<td class="is-true">True</td>
			<td class="is-false">False</td>
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
			<td class="is-true">True <small>(только .svg)</small></td>
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

Забавно, что девайс поддерживает анимации и транзишены. Качество [анимации](/Пепякошрифт_средствами_css-анимаций/) на e-ink дисплее полностью передается скриншотом (хотя природа плохой отрисовки анимации на скриншоте — построчное считывание, а на экране — время отклика электронной бумаги):

![](screen-animations.gif =600x800)

## Зум {#zoom}

Сайты, не адаптированные для мобильных устройств, изначально отображаются в «отзумленном» варианте, при этом курсор заменяется рамкой зума:

![](screen-zoom.gif =600x800)

Вернуться из увеличенного варианта обратно к общему обзору можно кнопкой <kbd>back</kbd>.

## Ссылки {#links}

Для всех ссылок насильно выставляется `text-decoration: underline`, который не оверрайдится ни свойством с `!important`, ни через яваскрипт.

Ссылки с `target="_blank"` не открываются, вместо этого показывается предупреждение:

![](screen-warning.gif =480x256)

## Шрифты {#fonts}

Кастомные шрифты браузер понимает только в SVG. Почему-то отказывается работать оригинальный [Font Awesome](http://fortawesome.github.io/Font-Awesome/), при этом он же, но сгенерированный с помощью [Айконмуновского аппа](http://icomoon.io/app/), работает замечательно.

## Скролл {#scroll}

Блоки со скроллом можно проскролливать курсором: он залипает внутри блока, пока не проскроллит его до конца в выбранном направлении:

![](screen-scroll.gif =498x298)

## Формы {#forms}

Новые типы полей ввода не поддерживаются, валидация отсутствует.

## Итого {#conclusion}

Неплохой такой браузер для читалки. Практически без проблем отображает мобильные и адаптивные сайты. Можно воспользоваться селектором `html.bw` из [сниффера](/Sniffer.js/), чтобы сделать для киндла контрастные цвета и отключить анимации.
