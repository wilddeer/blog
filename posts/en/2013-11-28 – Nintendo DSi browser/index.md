---
image: dsi.jpg
---

# Nintendo DSi<div class="small">browser</div> {.is-small-mb}

<%- include('/svg/history-solid.svg') %>**Rare species:** some time ago I had fun exploring exotic browsers on some not so common devices. This is one of such studies.
{.notice .is-with-icon .is-info .out-of-the-box .block .is-mb}

![](dsi.jpg =960x509)
{.is-ootb}

| ---                                    | --- |
| *Screen resolution*                    | 256 &times; 192, 2 screens |
| *Viewport size*                        | 240 &times; 176 |
| *Browser*                              | Opera (Presto) |
| *User Agent*                           | `Opera/9.50 (Nintendo DSi; Opera/507; U; en-US)` |
| *[Acid3](http://acid3.acidtests.org/)* | 59/100 |
| *[HTML5 Test](http://html5test.com/)*  | [82/555](http://html5test.com/s/0329d12018b68bd6.html) |
| *[CSS3 Test](http://css3test.com/)*    | Failed to run |
{.key-value-table}

Nintendo DSi is a portable gaming console with two screens. Bottom screen is a resistive touchscreen, the top one isn’t. Console’s UI and touchscreen qualities assume that you use it with a stylus.

It’s pretty underpowered, with a 133 MHz processor and just 16 Mb of RAM. Internet connection is done via WiFi. Console’s browser is based on Opera (not Opera Mini, i.&nbsp;e. it doesn’t proxy its traffic through Opera’s serverside thingy).

There are two ways the browser can display a page. The first is for regular, not mobile-optimized sites. One of the screens is used to display a whole zoomed-out page, the other shows a zoomed-in highlighted area:

![](browser1.jpg =960x515)
{.is-ootb}

You can swap the screen functions and drag the selection rectangle on the bottom screen:

![](browser2.jpg =960x525)
{.is-ootb}

The second mode is for mobile-optimized websites. It uses the top screen as an extension of the bottom one. The page starts on the bottom screen, the top screen starts blank and fills up as you scroll:

![](browser3.jpg =960x510)
{.is-ootb}

Mobile-optimized mode is activated with an appropriate viewport meta-tag, e.&nbsp;g. `<meta name="viewport" content="width=device-width">`.

## Features

### Feature tests

<small>Feature tests are done using [Modernizr](//modernizr.com). [Full table of my tests](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing#gid=0) on google docs.</small>

<table>
	<thead>
		<tr>
			<th>Feature</th>
			<th>Test</th>
			<th>Actual result</th>
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
			<td class="is-bug">True <small>(no blur)</small></td>
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

As expected, the browser’s support for fancy new features isn’t huge: it supports `Media queries`, `opacity`, `box-sizing` and `text-shadow` without blur. [Modernizr](//modernizr.com)'s `box-sizing` test returns a false negative result. Turns out, the browser understands the CSS-property, but doesn’t react in any way to the `style.boxSizing` javascript property (including the Opera-prefixed variant).

### Fonts

The browser uses a single font for everything. It’s a sans-serif font, it has a couple of icons in its private use unicode area, which seem to be used somewhere in the console’s UI.

Moreover, the browser only uses three font sizes and transforms any other font size to one of those: small for `0px` – `11px` `ComputedStyle` size, medium for `12px` – `14px` and big for `15px` and above.

Despite this font-size transformation, other metrics remain the same, e.&nbsp;g. a paragraph with `margin: 0 0 1.5em 0` will have a margin calculated relatively to the specified `font-size` value, not the resulting one.

The font’s most annoying bug, though, is its weird letter-spacing for cyrillic characters:

![Compare the letter-spacing of latin and cyrillic characters](browser4.jpg =960x510)
{.is-ootb}

### Scrolling

Pages can be scrolled with the D-pad, using dragscroll or with a constantly visible scrollbar. Overflowed blocks also have a constantly visible scrollbar. Dragscroll doesn’t work for them.

### Forms

Surprisingly enough, the browser’s support for new input types is reasonable. It supports `url`, `email`, `datetime`, `date`, `month`, `week`, `time`, `datetime-local`, `number` and `range`:

![](form.jpg =669x500)

All the fields are validated according to their types when the form is submitted, `pattern` validation also works. Datepicker is buggy:

![In an attempt to fit into available space the datepicker becomes a mess](datepicker.jpg =960x480)
{.is-ootb}

### jQuery

jQuery doesn’t work starting from version 1.9.1 and above. No idea why.

## Conclusion

It’s totally possible to adapt a simple mobile website for this thingy pretty effortlessly. You just have to use proper fallbacks and consider the font problems. Twitter’s mobile site, for instance, is looking pretty good.

## Related links {#related_links}

- [Using the Nintendo DSi browser](http://maban.co.uk/73), *Anna Debenham*
- [Nintendo DS & DSi Browser](http://en.wikipedia.org/wiki/Nintendo_DS_%26_DSi_Browser), *Wikipedia*
- [Nintendo DSi](http://console.maban.co.uk/device/dsi) at *Game console browsers*
