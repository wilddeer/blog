---
layout: post
title: "Kindle Paperwhite browser"
categories: en rare-species
lang: en
---

#Kindle Paperwhite browser {#header}

{% include pic.htm src='device.jpg' a='Kindle Paperwhite' %}

{:.specification}
| *Screen resolution* | 768 &times; 1024, 16 shades of gray |
| *Viewport size* | 758 &times; 899 |
| *Browser* | WebKit-powered |
| *User Agent (javascript)* | `Mozilla/5.0 (X11; ; U; Linux armv7l; en-us) AppleWebKit/534.26+ (KHTML, like Gecko) Version/5.0 Safari/534.26+` |
| *User Agent (http header)* | `Mozilla/5.0 (X11; U; Linux armv7l like Android; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/533.2+ Kindle/3.0+` |
| *[Acid3](http://acid3.acidtests.org/)* | 100/100 |
| *[HTML5 Test](http://html5test.com/)* | [212/555](http://html5test.com/s/9957252018bec558.html) |
| *[CSS3 Test](http://css3test.com/)* | 45% |

Kindle Paperwhite is a new e-book reader by Amazon, equipped with e-ink touch-screen, Wi-Fi and, optionally, 3G.

Peperwhite's Browser is an improved version of [Kindle Keyboard](/en/rare-species/kindle-keyboard/)'s browser. Browser's performance increased significantly compared to the predecessor, its support for HTML5 features improved.

Paperwhite's user-agent string is weird. While http header contains quite typical user-agent string, `navigator.userAgent` contains another, which can be hardly identified among the dozens of other WebKits. Yet another reason to use feature detection.

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
			<tr>
				<td>video</td>
				<td class="false">False</td>
				<td class="false">False</td>
			</tr>
		</tbody>
	</table>
</div>

###Animations {#animations}

Just like the [predecessor](/en/rare-species/kindle-keyboard/), Kindle Paperwhite supports animation and transitions, which is a painful sight considering e-paper’s response time. 

###Touch {#touch}

New Kindle doesn't have any hardware keys and is fully controlled from the touch screen. The browser is controlled with habitual swipe and pinch gestures. Touch events, however, are not supported.

###Links {#links}

All the links are forced with `text-decoration: underline`. But, unlike on [Kindle Keyboard](/en/rare-species/kindle-keyboard/), on Paperwhite you can redefine this using `!important`:

{% highlight css cssclass=codewrap %}
h1.title a {
	text-decoration: none !important; /* no underline for Kindle! */
}
{% endhighlight %}

###Fonts {#fonts}

All the major font formats are supported (*woff*, *ttf* and *svg*). The browser has weird intolerance for Scada font:

{% include pic.htm src='font-bug.png' p=true a='screenshot showing bug with Scada font' %}

Other fonts seem to work just fine.

###Scrolling {#scrolling}

Scrolling isn't that slick when it come to internal scrollable blocks. If, for instance, there's an internal block with horizontal scroll occupying entire viewport, it's very problematic to scroll the page as all your attemps lead to that block being scrolled horizontally instead:

{% include pic.htm src='scroll.png' p=true a='screenshot showing an example state when it’s problematic to scroll the page' c='Can’t scroll this!' %}

###`box-shadow` bug {#boxshadow-bug}

If there is a shadow going outside of the viewport, or there is a block with `box-shadow` sitting somewhere outside of the viewport (even if it's in the *overflow* of the other block), viewport expands to fit the shadow. Rather weird and annoying bug.

###Forms {#forms}

The browser has rudimentary support for new input types. `range` slider barely works:

{% include pic.htm src='form.png' p=true a='screenshot showing input types test result' %}

There's no validation, and, therefore, no support for `required` and `pattern` attributes.

##Conclusion {#conclusion}

Evolutionary descendant of [the previous generation](/en/rare-species/kindle-keyboard/). There's a big chance your mobile-optimized site will work just fine on new Kindle without any additional tweaks. 

Non-mobile sites also work quite adequately.
