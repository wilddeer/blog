# Panasonic Viera Smart TV browser {#header}

## (TX-LR32E6)

{% include pic.htm src='tv.jpg' a='Panasonic Viera Smart TV (TX-LR32E6' %}

{:.specification}
| *Screen resolution* | 1920 &times; 1080 |
| *Viewport size* | 1256 &times; 630 |
| *Browser* | WebKit-powered |
| *User Agent* | `Mozilla/5.0 (X11; FreeBSD; U; Viera; ru-RU) AppleWebKit/537.11 (KHTML, like Gecko) Viera/3.3.2 Chrome/23.0.1271.97 Safari/537.11` |
| *[Acid3](http://acid3.acidtests.org/)* | 100/100, with bugs |
| *[HTML5 Test](http://html5test.com/)* | [333/555](http://html5test.com/s/cdd96d20133ac84a.html) |
| *[CSS3 Test](http://css3test.com/)* | 54% |

Browser runs on WebKit (looks like a modified version of Chrome). It’s pretty slow, especially when dealing with animations.

### Interaction {#interaction}

{% include pic.htm src='remote.jpg' p=true float='right' a='Remote control' c='Remote control' %}

The browser is controlled with a remote control (you can optionally plug in keyboard and mouse). The cursor is controlled with directional keys on the remote. Colored keys are contextual. When viewing sites, they control zooming and switching between "moving" and "dragging" cursor modes. Zooming doesn’t affect the viewport size.

Both `:hover` and `:active` states work fine, but `:active` state is triggered after a short delay.

Scrolling is done by moving the cursor to the edge of the screen. Internal overflowed blocks can be scrolled by pressing arrow buttons on the scrollbar, which can be tricky. Scrollbars are constantly visible.

### Tests {#tests}

[Acid3](http://acid3.acidtests.org/) test is passed with bugs:

{% include pic.htm src='acid.jpg' a='screenshot showing Acid3 test result' %}

### Feature tests {#feature-tests}

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

### Fonts {#fonts}

The only default fonts available are sans-serif and monospace. Fantasy, cursive and serif fall back to sans-serif. External fonts are supported without noticible problems.

### Forms {#forms}

Browser’s support for new input types is pretty weak:

{% include pic.htm src='form.jpg' a='screenshot showing input type test results' %}

There’s no datepicker. Onscreen keyboard doesn’t apadt to input types. Validation works for `email` and `url` input types, `required` and `pattern` attributes also work fine.

### Conclusion {#conclusion}

Almost fully-featured Chrome in terms of rendering, although pretty slow and with fiddly UI.
