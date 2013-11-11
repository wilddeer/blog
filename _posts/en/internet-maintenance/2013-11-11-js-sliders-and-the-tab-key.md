---
layout: post
title: "JS sliders and the Tab key"
categories: en internet-maintenance
lang: en
---

#JS sliders and the <kbd>Tab</kbd> key {#header}

Almost every JS slider has one particularly funny bug: the <kbd>Tab</kbd> key breaks them. The slider will inevitably break if a link, placed in one of the slides, cathes focus. Some examples on a [slider that doesn't break](/en/scripts/peppermint/) (oh, the irony):

<div class="peppermint js-peppermint">
  {% include pic.htm src='apple.jpg' p=true a='Broken slider at apple.com' c='Broken slider at <a href="http://apple.com">apple.com</a>' %}
  {% include pic.htm src='swipejs.jpg' p=true a='Broken Swipe slider' c='Broken <a href="http://swipejs.com">Swipe</a> slider' %}
  {% include pic.htm src='steam.jpg' p=true a='Broken Steam&rsquo;s slider' c='Broken <a href="http://store.steampowered.com">Steam&rsquo;s</a> slider' %}
</div>

Here's the catch: when a link hidden by `overflow: hidden` catches focus, browser scrolls the content of the block so you can see the link. Yes, blocks with `overflow: hidden` also have `scrollLeft` property and they act just like `overflow: auto` blocks.

To adress the problem, we need to gather the links from each slide and bind `focus` event listener to each one of them. We then need to switch the slide to one containing the link and reset `scrollLeft` of the container when the event fires:

{% highlight js cssclass=codewrap %}
for (var j = links.length - 1; j >= 0; j--) {
  addEvent(links[j], 'focus', function(x) {
    return function() {
      _this.scrollLeft = 0;
      //Zero timeout solves WebKit's issue where `scrollLeft` is set after the event
      setTimeout(function() {
        _this.scrollLeft = 0;
      }, 0);
      changeActiveSlide(x);
    }
  }(i), false); //i -- slide number
};
{% endhighlight %}

"Dots" under the slider should also be keyboard friendly. Not to make a fuss over the solution, it's enough to make them <kbd>Tab</kbd>&rsquo;able (set attribute `tabindex="0"`) and switch to a particular slide when <kbd>Enter</kbd> is pressed.

Also worth mentioning that it's, of course, unacceptable to turn off the `outline` for focused dots. But we still want to get rid of it when using a mouse. I use two methods to deal with it: first, get rid of the `outline` for `:active` items. No more outline when a mouse button is pressed:

{% highlight css cssclass=codewrap %}
.peppermint.active > ul.dots > li:active {
  outline: none;
}
{% endhighlight %}

Second, defocus the item after mouse click:

{% highlight js cssclass=codewrap %}
addEvent(dot, 'click', (function(x, b) {
  return function() {
    b.blur(); //defocus the dot
    changeActiveSlide(x); //change the slide
    
    ...

  };
})(i, dot), false);
{% endhighlight %}

Now our slider properly works with the keyboard and seems to meet the requirements of <a href="http://www.w3.org/TR/WCAG20/" class="iconlink">"<span>Web Content Accessibility Guidelines</span>"</a>. So it goes.
