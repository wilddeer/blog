---
layout: post
title: "Kindle Keyboard browser"
categories: en rare-species
lang: en
---

#Kindle Keyboard browser {#header}

{% include pic.htm src='kindle-keyboard.jpg' a='Kindle Keyboard' %}

{:.specification}
| *Screen resolution* | 600 &times; 800, 16 shades of gray |
| *Viewport size* | 582 &times; 706 |
| *Browser* | WebKit-powered |
| *User Agent* | `Mozilla/5.0 (Linux; U; en-US) AppleWebKit/528.5+ (KHTML, like Gecko, Safari/528.5+) Version/4.0 Kindle/3.0 (screen 600x800; rotate)` |
| *[Acid3](http://acid3.acidtests.org/)* | 99/100 |
| *[HTML5 Test](http://html5test.com/)* | [59/555](http://html5test.com/s/af89ab2018cb33eb.html) |
| *[CSS3 Test](http://css3test.com/)* | 35% |

Kindle Keyboard (aka Kindle 3) is an e-book reader by Amazon with e-ink (not touch) screen and experimental browser on board.

It has Wi-Fi and optional 3G. When it first came out, Amazon provided free 3G around the globe, but then it was limited to Wikipedia and Amazon's website. Wi-Fi is, needless to say, still unlimited.

Browser has single window. D-pad is moving the cursor, <kbd>back</kbd> button (under the d-pad) is used to go back through the history, buttons on the sides of the device act as <kbd>Page Up</kbd> and <kbd>Page Down</kbd>.

Browser works fine with javascript, copes well with medium complexity pages, but slowes significantly when dealing with big amounts of high-res pics (supposedly due to the lack of RAM).

###Feature tests {#feature-tests}

<small>Feature tests are done using [Modernizr](//modernizr.com). [Full table of my tests](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing#gid=0) on google docs.</small>

<div class="table-holder">
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
				<td class="true">True <small>(-webkit-)</small></td>
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
				<td class="true">True <small>(.svg only)</small></td>
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
				<td class="bug">True <small>(no blur)</small></td>
			</tr>
			<tr>
				<td>touch</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
		</tbody>
	</table>
</div>

Funnily enough, it supports animations and transitions. [Animation](/en/experiments/pepyaka-font-using-css-animations/) quality is accurately captured on the screenshot (although the nature of badly rendered animation on the screenshot is progressive reading, whereas on the screen it's e-paper's response time):

{% include pic.htm src='screen-animations.gif' a='screenshot with animations quality demonstration' %}

###Zoom {#zoom}

Websites not optimized for mobile devices are shown "zoomed-out", while the cursor is replaced with a zooming frame:

{% include pic.htm src='screen-zoom.gif' a='screenshot showing a website, not optimized for mobile devices' %}

<kbd>Back</kbd> button brings you back from zoomed-in to zoomed-out view.

###Links {#links}

All the links forcibly receive `text-decoration: underline`. It cannot be overridden neither by `!important`, nor through javascript.

Links with `target="_blank"` don't work, instead a warning is shown:

{% include pic.htm src='screen-warning.gif' a='screenshot showing a warning message: Web Browser could not open this link because opening multiple windows is not supported.' %}

###Fonts {#fonts}

The only supported format for external fotns is SVG. Original [Font Awesome](http://fortawesome.github.io/Font-Awesome/) doesn't works for some reason, although it works just fine when generated with [Icomoon app](http://icomoon.io/app/).

###Scroll {#scroll}

Internal blocks are scrollable with the cursor: it sticks to the edge of the block until the block is scrolled to the end in a particular direction:

{% include pic.htm src='screen-scroll.gif' a='screenshot showing internal block with scroll' %}

###Forms {#forms}

New input types are not supported, no validation is implemented.

##Conclusion {#conclusion}

Not too shabby for an e-book reader. Virtually no problems showing mobile and adaptive websites.

You may use `html.bw` selector in conjunction with [sniffer.js](/en/scripts/sniffer/) to play around with the colors and disable animations for Kindle users (if you are desperate about such things).