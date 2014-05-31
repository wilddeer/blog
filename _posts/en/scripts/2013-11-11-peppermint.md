---
layout: post
title: "Peppermint touch slider"
categories: en scripts
lang: en
---

<style>
{% include snippets/peppermint-demo.css %}
</style>

<script>
  dzDelayed.push(function() {
    $('#peppermint').Peppermint({
      mouseDrag: true,
      dots: true,
      slideshow: true,
      slideshowInterval: 7000,
      stopSlideshowAfterInteraction: true
    });
  });
</script>

<div class="stage peppermint" id="peppermint">
  <figure class="yellow">
    <h1>Peppermint.js</h1>
    <h3>Proper touch slider</h3>
    <p><a href="https://github.com/wilddeer/Peppermint" class="github"><i class="icon-github">&nbsp;</i>Fork me on GitHub</a></p>
  </figure>

  <figure class="red">
      <h1>Fast, lightweight &amp; extensible</h1>
      <p>7.7 Kb, fast &amp; smooth touch, <a href="#api">API</a> for extensibility</p>
  </figure>

  <figure class="green">
      <h1>Works on everything</h1>
      <p>Works on <i class="icon-apple">&nbsp;</i>iPhones, <i class="icon-android">&nbsp;</i>Androids, <i class="icon-windows">&nbsp;</i>Winphones. Library agnostic. <i class="icon-IE">&nbsp;</i>IE7+ compatible.</p>
  </figure>

  <figure class="blue">
    <h1><a href="/en/internet-maintenance/js-sliders-and-the-tab-key/">On good terms</a> with the <kbd>Tab</kbd> key</h1>
    
  </figure>
</div>

[Peppermint.js](https://github.com/wilddeer/Peppermint) -- Yet another touch slider. Only better.

- Works with mouse, [Touch Events](http://www.w3.org/TR/touch-events/), [Pointer Events](http://www.w3.org/TR/pointerevents/), old [IE10 Pointer Events](http://msdn.microsoft.com/en-us/library/ie/hh673557(v=vs.85).aspx)
- Responsive, works on iPhones, Androids, Windows Phones, Blackberries, Windows 8 devices
- IE7+ compatible
- Library agnostic. If jQuery is available, registers itself as a plugin.
- Uses CSS3 transforms &amp; animations, falls back to timer animations when necessary
- Only 7.7 Kb minified
- Perfomance-optimized `touch` functions
- API and callback functions for extensibility
- Keyboard accessible, [doesn't break](/en/internet-maintenance/js-sliders-and-the-tab-key/) when <kbd>tab</kbd>&rsquo;bing

##Kit

{:.nopadding}
- <a href="https://raw.github.com/wilddeer/Peppermint/master/dist/peppermint.min.js" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.min.js</span></a> -- minified production script
- <a href="https://raw.github.com/wilddeer/Peppermint/master/dist/peppermint.required.css" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.required.css</span></a> -- styles required for proper functioning
- <a href="https://raw.github.com/wilddeer/Peppermint/master/dist/peppermint.suggested.css" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.suggested.css</span></a> -- default styles to start with (required styles included)

##Usage

HTML markup:

{% highlight html cssclass=codewrap %}
<div class="peppermint inactive" id="peppermint">
  <figure> ... </figure>

  <figure> ... </figure>

  <figure> ... </figure>
</div>
{% endhighlight %}

Javascript:

{% highlight js cssclass=codewrap %}
var slider = Peppermint(document.getElementById('peppermint'));
{% endhighlight %}

Or javascript + jQuery:

{% highlight js cssclass=codewrap %}
$('.peppermint').Peppermint();
{% endhighlight %}

`inactive` class is not required. It is replaced with `active` during setup.

You are free to use any other tag instead of `figure`. When using `figure`, don't forget to include [html5shiv](https://github.com/aFarkas/html5shiv), otherwise it won't work in old IEs.

Place anything you want within the slides.

##Settings

Peppermint can take settings object as an optional second parameter (first when using jQuery). Default settings:

{% highlight js cssclass=codewrap %}
{
  //transition time when changing slides, ms
  speed: 300,

  //transition time when changing slides after touch, ms
  touchSpeed: 300,

  //slideshow enabled
  slideshow: false,

  //slideshow interval, ms
  slideshowInterval: 4000,

  //stop slideshow after user interacts with the slider
  stopSlideshowAfterInteraction: false,

  //slide number to start with
  startSlide: 0,

  //use mouse to drag the slider
  mouseDrag: true,

  //don't initialize Peppermint if there's only one slide
  disableIfOneSlide: true,

  //Prefix to be used with Peppermint classes,
  //such as `inactive`, `active`, `mouse`, `drag`, etc.
  //Don't forget to change the stylesheet appropriately!
  cssPrefix: 'peppermint-',

  //show dots
  dots: false,

  //prepend dots to dotsContainer (default is append)
  dotsPrepend: false,

  //Element to contain dots, defaults to Peppermint's root element.
  //Can be anywhere on the page.
  dotsContainer: undefined,

  //element containing slides, defaults to Peppermint's root element
  slidesContainer: undefined,

  //Callback function, runs at slide change.
  //Receives slide number as a parameter.
  onSlideChange: undefined,

  //Callback function, runs at setup end.
  //Receives total number of slides as a parameter.
  onSetup: undefined
}
{% endhighlight %}

Example:

{% highlight js cssclass=codewrap %}
var slider = Peppermint(document.getElementById('peppermint'), {
  dots: true,
  slideshow: true,
  speed: 500,
  slideshowInterval: 5000,
  stopSlideshowAfterInteraction: true,
  onSetup: function(n) {
    console.log('Peppermint setup done. Slides found: ' + n);
  }
});
{% endhighlight %}

##API

Peppermint exposes a set of functions upon installation. These functions can be used to controll the slider externally:

`slideTo(n)` -- change active slide to `n`;

`next()` -- next slide;

`prev()` -- previous slide;

`start()` -- start slideshow;

`stop()` -- stop slideshow;

`pause()` -- pause slideshow until the next slide change;

`getCurrentPos()` -- get current slide number;

`getSlidesNumber()` -- get total number of slides;

`recalcWidth()` -- recalculate the slider's and slides' widths. Usefull when the container width is changed. Width recalculation runs automatically on window resize and device orientation change.

Example:

{% highlight js cssclass=codewrap %}
var slider = Peppermint(document.getElementById('peppermint')),
    rightArr = document.getElementById('right-arr'),
    leftArr = document.getElementById('left-arr');

rightArr.addEventListener('click', slider.next, false);
leftArr.addEventListener('click', slider.prev, false);
{% endhighlight %}

##License

[MIT license](http://opensource.org/licenses/MIT).