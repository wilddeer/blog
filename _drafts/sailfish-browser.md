---
layout: post
title: "Браузер Sailfish"
categories: rare-species
lang: ru
---

#Браузер Sailfish<br><small>на примере Jolla phone</small> {#header}

{% include pic.htm src='device.jpg' a='Jolla phone' %}

{:.specification}
| *ОС* | Sailfish OS 1.1.1.27 _[Vaarainjärvi](https://blog.jolla.com/sailfish-os-update-performance-improvements-new-features/)_|
| *Разрешение экрана* | 540 &times; 960 |
| *Размер вьюпорта* | 360 &times; 640 |
| *Ретинистость* | 1.5 |
| *Движок* | Gecko |
| *User Agent* | `Mozilla/5.0 (Maemo; Linux; U; Jolla; Sailfish; Mobile; rv:31.0) Gecko/31.0 Firefox/31.0 SailfishBrowser/1.0` |
| *[Acid3](http://acid3.acidtests.org/)* | 100/100, с багами |
| *[HTML5 Test](http://html5test.com/)* | [457/555](http://html5test.com/s/f5098f249793bef5.html) |
| *[CSS3 Test](http://css3test.com/)* | 53% |

После того, как Нокия закрыла разработку MeeGo, разработчики, работавшие над проектом, ушли из Нокии, собрались вместе и накраудфандили себе ось [Sailfish](https://sailfishos.org/), основанную на открытых наработках MeeGo, и телефон [Jolla](https://jolla.com/jolla).

Sailfish OS использует свой собственный Sailfish browser, базирующийся, внезапно, на движке Gecko. С последним обновлением движок обновился до 31 версии. Браузер довольно бодрый, хорошо справляется со сложными CSS-анимациями.

###Вьюпорт {#viewport}

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
				<td class="true">True</td>
			</tr>
			<tr>
				<td>cssgradients</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>csspositionsticky</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
			<tr>
				<td>csstransforms</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>csstransforms3d</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>csstransitions</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>emoji</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
			<tr>
				<td>fileinput</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>fontface</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>formvalidation</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>mediaqueries</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>notification</td>
				<td class="true">True</td>
				<td class="false">False</td>
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
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>video</td>
				<td class="true">True</td>
				<td class="true">True</td>
			</tr>
		</tbody>
	</table>
</div>

Браузер не дотянул одну версию движка до `position: sticky` :–( В целом, браузер умеет все то, что умеет 31 Фаерфокс. Все интересные особенности и глюки, как всегда, в компонентах, так или иначе завязанных на операционную систему.

###Шрифты {#fonts}

Из дефолтных шрифтов есть `serif`, `sans-serif` и `monospace`. `cursive` и `fantasy` фоллбечатся на санс-сериф. Кaстомные шрифты работают без проблем. Emoji не поддерживаются.

###Формы {#forms}

###Баг с нотификейшенами {#notifications-bug}

##Итого {#conclusion}

В техническом плане к браузеру нет почти никаких претензий.
