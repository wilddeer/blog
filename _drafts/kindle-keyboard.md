---
layout: post
title: "Браузер Kindle Keyboard"
categories: rare-species
lang: ru
---

#Браузер Kindle Keyboard {#header}

{% include pic.htm src='kindle-keyboard.jpg' a='Kindle Keyboard' %}

{:.specification}
| *Экран* | 600 &times; 800, 16 оттенков серого |
| *Размер вьюпорта* | 582 &times; 706 |
| *Браузер* | На движке WebKit |
| *User Agent* | `Mozilla/5.0 (Linux; U; en-US) AppleWebKit/528.5+ (KHTML, like Gecko, Safari/528.5+) Version/4.0 Kindle/3.0 (screen 600x800; rotate)` |
| *[Acid3](http://acid3.acidtests.org/)* | 99/100 |
| *[HTML5 Test](http://html5test.com/)* | 68/500 |
| *[CSS3 Test](http://css3test.com/)* | 35% |

Kindle Keyboard (он же Kindle 3) --- читалка от Амазона с e-ink экраном (без тача) и qwerty-клавиатурой. В читалку встроен экспериментальный браузер.

Во время выхода читалки Амазон расщедрился и сделал бесплатный 3G для читалки по всему миру, но затем ограничил доступ через 3G сайтом Амазона и Википедией. По вайфаю браузер по-прежнему работает без ограничений.

Браузер однооконный, управляется джойстиком, который двигает курсор по экрану, а также кнопками перелистывания страниц по бокам девайса, которые работают как *Page Up* и *Page Down*.

Браузер прекрасно переваривает яваскрипт, хорошо справляется со страницами средней сложности, но начинает заметно тормозить и брыкаться на перегруженных большими изображениями сайтах. Сказывается небольшой объем оперативки.

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
				<td class="false">False</td>
				<td class="false">False</td>
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

Забавно, что девайс поддерживает анимации и транзишены. Качество [анимации](/experiments/pepyaka-font-using-css-animations/) на e-ink дисплее полностью передается скриншотом:

{% include pic.htm src='screen-animations.gif' a='Скриншот, демонстрирующий работу css-анимации' %}

###Ссылки {#links}

Для всех ссылок насильно выставляется `text-decoration: underline`, который не оверрайдится ни свойством с `!important`, ни через яваскрипт.

Ссылки с `target="_blank"` не открываются, вместо этого показывается предупреждение:

{% include pic.htm src='screen-warning.gif' a='Скриншот с предупреждением о невозможности открытия нескольких окон' %}

###Шрифты {#fonts}

Кастомные шрифты браузер понимает только в SVG. Почему-то отказывается работать оригинальный [Font Awesome](http://fortawesome.github.io/Font-Awesome/), при этом он же, но сгенерированный с помощью [Айконмуновского аппа](http://icomoon.io/app/), работает замечательно.

###Скролл {#scroll}

Блоки со скроллом можно проскролливать курсором: он залипает внутри блока, пока не просроллит его до конца в выбранном направлении:

{% include pic.htm src='screen-scroll.gif' a='Блок со скроллом' %}

###Формы {#forms}

Новые типы полей ввода не поддерживаются, валидация отсутствует.

##Итого {#conclusion}

##Ссылки по теме {#related_links}
