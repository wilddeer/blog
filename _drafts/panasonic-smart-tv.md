---
layout: post
title: "Браузер Panasonic Viera Smart TV"
categories: rare-species
lang: ru
---

#Браузер Panasonic Viera Smart TV {#header}

##(TX-LR32E6)

{% include pic.htm src='tv.jpg' a='Panasonic Viera Smart TV (TX-LR32E6' %}

{:.specification}
| *Разрешение экрана* | 1920 &times; 1080 |
| *Размер вьюпорта* | 1256 &times; 630 |
| *Браузер* | Модифицированный Chrome |
| *User Agent* | `Mozilla/5.0 (X11; FreeBSD; U; Viera; ru-RU) AppleWebKit/537.11 (KHTML, like Gecko) Viera/3.3.2 Chrome/23.0.1271.97 Safari/537.11` |
| *[Acid3](http://acid3.acidtests.org/)* | 100/100, с багами |
| *[HTML5 Test](http://html5test.com/)* | [333/555](http://html5test.com/s/cdd96d20133ac84a.html) |
| *[CSS3 Test](http://css3test.com/)* | 54% |

Браузер одновкладочный, на движке WebKit (модифицированный Chrome). Довольно медленный, особенно неохотно работает с анимациями.

###Взаимодействие {#interaction}

{% include pic.htm src='remote.jpg' p=true float='right' a='Пульт' c='Пульт' %}

Браузер управляется пультом (можно подключить мышку и клавиатуру). Курсор передвигается стрелками на пульте. Цветные кнопки используются как контекстные функциональные клавиши. В основном окне браузера они привязаны к зуму и изменению режима курсора.

Зум приближает часть вьюпорта, не изменяя размера самого вьюпорта.

Режим курсора меняется между перемещением и перетаскиванием (второй эмулирует перемещение мыши с зажатой кнопкой). Состояния `:hover`, `:active` работают с курсором почти без проблем (`:active` срабатывает после двух секунд задержки и в режиме перетаскивания).

Сайт скроллится подведением курсора к краю экрана. Блоки со скроллом можно поскроллить только нажатием на стрелочки скроллбара (скроллбар виден постоянно).

###Тесты {#tests}

[Acid3](http://acid3.acidtests.org/) проходится полностью, но не без багов:

{% include pic.htm src='acid.jpg' a='Acid3 test result' %}

[HTML5 Test](http://html5test.com/) теперь сохраняет результаты тестирования для каждого девайса, можно [посмотреть подробно результаты всех тестов](http://html5test.com/s/cdd96d20133ac84a.html).

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

###Шрифты {#fonts}

Из дефолтных шрифтов есть только monospace и sans-serif. Fantasy, cursive и serif отображаются sans-serif'ом. Подключаемые шрифты поддерживаются без проблем.

###Формы {#forms}

Браузер в зачаточной форме поддерживает некоторые типы полей ввода:

{% include pic.htm src='form.jpg' a='Тест различных типов полей ввода' %}

Датапикера нет. Экранная клавиатура никак не адаптируется под тип поля. Валидация работает для `email`, `url`, полей с аттрибутами `required` и `pattern`.

###Итого {#conclusion}

Практически полноценный Хром в плане рендеринга, медленный и с плохим интерфейсом.

