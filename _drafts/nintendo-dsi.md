---
layout: post
title: "Nintendo DSi browser"
categories: en rare-species
lang: en
---

#Nintendo DSi browser {#header}

{% include pic.htm src='dsi.jpg' a='Nintendo DSi' %}

{:.specification}
| *Screen resolution* | 256 &times; 192, 2 screens |
| *Viewport size* | 240 &times; 176 |
| *Browser* | Opera (Presto) |
| *User Agent* | `Opera/9.50 (Nintendo DSi; Opera/507; U; en-US)` |
| *[Acid3](http://acid3.acidtests.org/)* | 59/100 |
| *[HTML5 Test](http://html5test.com/)* | 94/500 |
| *[CSS3 Test](http://css3test.com/)* | Failed |

Nintendo DSi --- портативная игровая приставка с двумя экранами. Нижний --- тачскрин с резистивным тачем, верхний --- обычный экран. Интерфейс и качество тачскрина предполагают управление стилусом.

Nintendo DSi is a portable gaming console with two screens. Bottom screen is a resistive touch screen, top screen doesn't have touch. Console's UI and touchscreen quality assumes that you use it with a stylus.

Железка крайне слабая. Частота процессора 133 МГц, оперативная память --- 16 Мб. Связь с интернетом по Wi-Fi. Браузер --- Опера (не мини, то есть не пропускает трафик через свой сервер).

The console is pretty underpowered, it's got a 133 MHz processor and just 16 Mb of RAM. Internet connection is done via WiFi. Console uses Opera as a browser (not Opera Mini, i.&nbsp;e. it doesn't proxy it's traffic through Opera's serverside thingy).

Сайты могут отображаться в двух режимах. Первый --- для сайтов, не адаптированных под мобильные устройства. Один экран в этом случае используется для отображения уменьшенной картинки сайта, другой показывает увеличенный выделенный участок:

There are two ways the browser can display a page. The first mode is for regular, not mobile-optimized sites. One of the screens is used to display a whole zoomed-out page, the other shows zoomed-in highlighted area:

{% include pic.htm src='browser1.jpg' a="Regular mode for non-mobile sites" %}

Функции экранов можно менять местами, при этом на нижнем экране можно перетаскивать выделенную область:

You can swap the functions of the screens and drag the selection on the bottom screen:

{% include pic.htm src='browser2.jpg' a="Regular mode with swapped screen functions" %}

Второй режим для адаптированных под маленькие экраны сайтов. В этом случае верхний экран служит продолжением нижнего. Сайт появляется на нижнем экране, верхний изначально пустой. При скролле страницы верхний экран заполняется:

The second mode is for mobile-optimized sites. It uses the top screen as an extension of the bottom one. The page starts on the bottom screen, the top screen is blank and it fills up while you scroll.

{% include pic.htm src='browser3.jpg' a='Mobile-optimized mode' %}

Мобильный режим активируется при наличии мета-тега с подходящим вьюпортом, например `<meta name="viewport" content="width=device-width">`.

Mobile-optimized mode can be activated with an appropriate viewport meta-tag, e.&nbsp;g. `<meta name="viewport" content="width=device-width">`.

##Особенности {#features}

##Features {#features}

Из моего [набора тестов](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing) браузер поддерживает только `Media queries`, `opacity` и `box-sizing`. Причем тест [Модернайзера](//modernizr.com) на поддержку `box-sizing` дает ложноотрицательный результат. Браузер понимает и корректно обрабатывает CSS-свойство, но никак не реагирует на обращение к `style.boxShadow` через яваскрипт (в том числе с префиксом оперы).

As expected, the browser's support for new fancy HTML5 features isn't huge at all. I ran [a couple of feature tests](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing): it supports `Media queries`, `opacity` and `box-sizing`. [Modernizr](//modernizr.com)'s `box-sizing` test returns a false negative result. Turns out that the browser understands the CSS-property, but doesn't react in any way to `style.boxSizing` javascript property (including the Opera-prefixed variant).

###Шрифты {#fonts}

###Fonts {#fonts}

Браузер использует один шрифт для всего вообще. Шрифт без засечек. Где-то в приватной области юникода лежит набор пиктограмм, которые, видимо, используются в интерфейсе консоли.

The browser uses a single font for everything. It's a sans-serif font. It has a couple of icons in it's private use unicode area, which seem to be used somewhere in console's UI.

Кроме того, браузер использует всего три размера шрифта и преобразует любой размер в один из своих: маленький для `ComputedStyle` от `0px` до `11px`, средний для `12px` --- `14px` и большой для `15px` и больше.

On the top of that, it only uses three font sizes and transforms any font size to one of those: small for `0px` -- `11px` `ComputedStyle` sizes, medium for `12px` -- `14px` sizes and big for `15px` and everything above.

При этом все остальные метрики остаются неизменными. Поэтому, например, если у параграфа стоит свойство `margin: 0 0 1.5em 0`, отступ получится относительно заданного размера шрифта, а не относительно получившегося в результате.

Bare in mind that, despite the font-size transformation, everything else remains the same, e.&nbsp;g. paragraph with `margin: 0 0 1.5em 0` will have a margin calculated relatively to the specified value, not the resulting one.

Главный и самый противный баг шрифта: кириллические символы отображаются с огромным межбуквенным расстоянием:

The most annoying font's bug, though, is it's weird letter-spacing for cyrillic symbols:

{% include pic.htm src='browser4.jpg' c='Compare the letter-spacing of latin and cyrillic symbols' a='An example of a letter-spacing bug' %}

Когда мне будет совсем нечего делать --- напишу скрипт, исправляющий эту проблему.

Maybe I'll write a script fixing this problem when I got nothing good left to do.

###Скролл {#scroll}

###Scrolling {#scroll}

Сайт можно скроллить джойстиком, драгскроллом (вертикальным движением в любом месте, лучше стилусом), либо с помощью постоянно видимого скроллбара.

The page can be scrolled with a D-pad, using dragscroll or with a constantly visible scrollbar.

Блоки с `overflow: scroll / auto` при переполнении также имеют постоянно видимый скролл. Драгскролл для них не работает.

Overflowed blocks also have a constantly visible scrollbar. Dragscroll doesn't work for them.

###Формы

###Forms {#forms}

Браузер, на удивление, поддерживает довольно много новых типов полей ввода: `url`, `email`, `datetime`, `date`, `month`, `week`, `time`, `datetime-local`, `number`, `range`:

Surprisingly enough, the browser supports quite a bunch of new input types: `url`, `email`, `datetime`, `date`, `month`, `week`, `time`, `datetime-local`, `number`, `range`:

{% include pic.htm src='form.jpg' a='Input fields of different types' %}

Все поля валидируются на соответствие типу при отправке формы. Также работает валидация по аттрибуту `pattern`. Датапикер глючит:

All the fields are validated according to their types when the form is submitted, `pattern` validation also works. Datepicker is buggy:

{% include pic.htm src='datepicker.jpg' c='Trying to fit into the available space datepicker becomes a mess' %}

Проиходит это только с датапикером в поле `date`. Датапикеры из других типов полей не стесняются выезжать за рамки видимой области экрана и выглядят нормально.

It only happens to the datepicker in `date` fields. Datepickers in other fields don't hesitate to go partly offscreen and thus are lookin good.

###jQuery {#jquery}

jQuery не работает начиная с версии 1.9.1 и выше. Причину выяснить не удалось.

jQuery starting from version 1.9.1 and above doesn't work. I couldn't find the reason.

##Итого {#conclusion}

##Conclusion {#conclusion}

Вполне можно адаптировать несложный мобильный сайт под эту железку без особых усилий, если использовать грамотные фоллбеки и исправить проблему с шрифтом. Тот же сайт твиттера, например, работает вполне сносно.

It's totally possible to adapt a simple mobile website for this thingy pretty effortlessly. You just have to use proper fallbacks and consider the font problems. Twitter's mobile site, for example, is looking pretty good.

##Ссылки по теме {#related_links}

##Related links {#related_links}

- [Using the Nintendo DSi browser](http://maban.co.uk/73), *Anna Debenham*
- [Nintendo DS & DSi Browser](http://en.wikipedia.org/wiki/Nintendo_DS_%26_DSi_Browser), *Wikipedia*
- [Nintendo DSi](http://console.maban.co.uk/device/dsi) at *Game console browsers*
