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
| *[CSS3 Test](http://css3test.com/)* | Failed to run |

Nintendo DSi is a portable gaming console with two screens. Bottom screen is a resistive touchscreen, the top one isn't. Console's UI and touchscreen qualities assume that you use it with a stylus.

It's pretty underpowered, with a 133 MHz processor and just 16 Mb of RAM. Internet connection is done via WiFi. Console's browser is based on Opera (not Opera Mini, i.&nbsp;e. it doesn't proxy it's traffic through Opera's serverside thingy).

There are two ways the browser can display a page. The first is for regular, not mobile-optimized sites. One of the screens is used to display a whole zoomed-out page, the other shows a zoomed-in highlighted area:

{% include pic.htm src='browser1.jpg' a="Regular mode for non-mobile sites" %}

You can swap the screen functions and drag the selection rectangle on the bottom screen:

{% include pic.htm src='browser2.jpg' a="Regular mode with swapped screen functions" %}

The second mode is for mobile-optimized websites. It uses the top screen as an extension of the bottom one. The page starts on the bottom screen, the top screen starts blank and it fills up as you scroll:

{% include pic.htm src='browser3.jpg' a='Mobile-optimized mode' %}

Mobile-optimized mode is activated with an appropriate viewport meta-tag, e.&nbsp;g. `<meta name="viewport" content="width=device-width">`.

##Features

###Feature tests

<small>Feature tests done with [Modernizr](//modernizr.com). [Full table of my tests](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing#gid=0) on google docs.</small>

<div class="table-holder">
	<table>
		<thead>
			<tr>
				<th>Feature</th>
				<th markdown="1">Test</th>
				<th>Actual result</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>backgroundsize</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
			<tr>
				<td>bgsizecover</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
			<tr>
				<td>borderradius</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
			<tr>
				<td>boxshadow</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
			<tr>
				<td>boxsizing </td>
				<td class="false">False</td>
				<td class="true">True</td>
			</tr>
			<tr>
				<td>cssanimations</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
			<tr>
				<td>csstransforms</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
			<tr>
				<td>csstransforms3d</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
			<tr>
				<td>csstransitions</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
			<tr>
				<td>fontface</td>
				<td class="false">False</td>
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
				<td class="false">False</td>
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

As expected, the browser's support for fancy new features isn't huge: it supports `Media queries`, `opacity` and `box-sizing`. [Modernizr](//modernizr.com)'s `box-sizing` test returns a false negative result. Turns out, the browser understands the CSS-property, but doesn't react in any way to the `style.boxSizing` javascript property (including the Opera-prefixed variant).

###Fonts

The browser uses a single font for everything. It's a sans-serif font, it has a couple of icons in its private use unicode area, which seem to be used somewhere in the console's UI.

Moreover, the browser only uses three font sizes and transforms any other font size to one of those: small for `0px` -- `11px` `ComputedStyle` size, medium for `12px` -- `14px` and big for `15px` and above.

Despite this font-size transformation, other metrics remain the same, e.&nbsp;g. a paragraph with `margin: 0 0 1.5em 0` will have a margin calculated relatively to the specified `font-size` value, not the resulting one.

The font's most annoying bug, though, is its weird letter-spacing for cyrillic characters:

{% include pic.htm src='browser4.jpg' c='Compare the letter-spacing of latin and cyrillic characters' a='An example of a letter-spacing bug' %}

###Scrolling

Pages can be scrolled with the D-pad, using dragscroll or with a constantly visible scrollbar. Overflowed blocks also have a constantly visible scrollbar. Dragscroll doesn't work for them.

###Forms

Surprisingly enough, the browser supports quite a bunch of new input types: `url`, `email`, `datetime`, `date`, `month`, `week`, `time`, `datetime-local`, `number`, `range`:

{% include pic.htm src='form.jpg' a='Input fields of different types' %}

All the fields are validated according to their types when the form is submitted, `pattern` validation also works. Datepicker is buggy:

{% include pic.htm src='datepicker.jpg' c='In an attempt to fit into available space, the datepicker becomes a mess' %}

It only happens to the datepicker in `date` fields. Datepickers in other fields don't hesitate to go partly offscreen and thus are looking good.

###jQuery

jQuery doesn't work starting from version 1.9.1 and above. No idea why.

##Conclusion

It's totally possible to adapt a simple mobile website for this thingy pretty effortlessly. You just have to use proper fallbacks and consider the font problems. Twitter's mobile site, for instance, is looking pretty good.

##Related links {#related_links}

- [Using the Nintendo DSi browser](http://maban.co.uk/73), *Anna Debenham*
- [Nintendo DS & DSi Browser](http://en.wikipedia.org/wiki/Nintendo_DS_%26_DSi_Browser), *Wikipedia*
- [Nintendo DSi](http://console.maban.co.uk/device/dsi) at *Game console browsers*
