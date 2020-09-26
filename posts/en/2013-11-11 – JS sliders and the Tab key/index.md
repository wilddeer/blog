# JS sliders and the <kbd>Tab</kbd> key {#header}

Almost every JS slider has one particularly funny bug: the <kbd>Tab</kbd> key breaks them. The slider will inevitably break if a link, placed in one of the slides, cathes focus. Some examples on a [slider that doesn't break](/en/Peppermint_touch_slider/) (oh, the irony):

<div class="peppermint js-peppermint">
  {% include pic.htm src='apple.jpg' p=true a='Broken slider at apple.com' c='Broken slider at <a href="http://apple.com">apple.com</a>' %}
  {% include pic.htm src='swipejs.jpg' p=true a='Broken Swipe slider' c='Broken <a href="http://swipejs.com">Swipe</a> slider' %}
  {% include pic.htm src='steam.jpg' p=true a='Broken Steam&rsquo;s slider' c='Broken <a href="http://store.steampowered.com">Steam&rsquo;s</a> slider' %}
</div>

Here's the catch: when a link hidden by `overflow: hidden` catches focus, browser scrolls the content of the block so you can see the link. Yes, blocks with `overflow: hidden` also have `scrollLeft` property and they act just like `overflow: auto` blocks.

To adress the problem, we need to capture the `focus` events occuring inside of the slides. We then need to switch the slide to one containing the event and reset `scrollLeft` of the container.

Since `focus` events don't bubble, event capturing is used to register them ([read about event bubbling and capturing](http://www.quirksmode.org/js/events_order.html)). For older IEs `focusein` event (which bubbles) is used as a fallback.

Run for each slide:

```js
//IE fallback first
slide.onfocusin = function() {
  //Reset the scroll
  _this.scrollLeft = 0;
  //WebKit sets the scroll after the event, we need to reset it with zero timeout.
  //Keep the first reset to prevent jittering in other browsers
  setTimeout(function() {
    _this.scrollLeft = 0;
  }, 0);

  //switch to the slide containing the event
  changeActiveSlide(i);
};

//Now use the function bound to `onfocusin` in a regular `addEventListener`
if (slide.addEventListener) slide.addEventListener('focus', slide.onfocusin, true); //`true` turns on the capturing
```

We could do fine with just a `focusin` event, but Firefox [still doesn't support it](https://bugzilla.mozilla.org/show_bug.cgi?id=687787) >:(

"Dots" under the slider should also be keyboard friendly. Not to make a fuss over the solution, it's enough to make them <kbd>Tab</kbd>&rsquo;able (set attribute `tabindex="0"`) and switch to a particular slide when <kbd>Enter</kbd> is pressed.

Also worth mentioning that it's, of course, unacceptable to turn off the `outline` for focused dots. But we still want to get rid of it when using a mouse. I use two methods to deal with it: first, get rid of the `outline` for `:active` items. No more outline when a mouse button is pressed:

```css
.peppermint.active > ul.dots > li:active {
  outline: none;
}
```

Second, defocus the item after mouse click:

```js
addEvent(dot, 'click', (function(x, d) {
  return function() {
    d.blur(); //defocus the dot
    changeActiveSlide(x); //change the slide

    ...

  };
})(i, dot), false);
```

<figure class="info icon-code" markdown="1">
Simple and universal `addEvent` function is used above:

```js
function addEvent(el, event, func, bool) {
  el.addEventListener? el.addEventListener(event, func, !!bool): el.attachEvent('on'+event, func);
}
```
</figure>

Now our slider properly works with the keyboard and seems to meet the requirements of <a href="http://www.w3.org/TR/WCAG20/" class="iconlink">"<span>Web Content Accessibility Guidelines</span>"</a>. So it goes.
