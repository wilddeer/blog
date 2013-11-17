---
layout: post
title: "Peppermint touch slider"
categories: en scripts
lang: en
---

<style>
  .stage.peppermint {
    position: relative;
    padding-left: 0;
    padding-right: 0;
    margin-top: -1em;
    margin-bottom: 24px;
    margin-bottom: 1.5rem;
    background: #dcdcdc;
  }

  .stage.peppermint .slides {
    padding: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: stretch;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
  }

  html.blackberry .stage.peppermint .slides {
    min-height: 16em;
  }

  html.no-flexbox.no-flexboxlegacy .stage.peppermint .slides {
    height: 20em;
  }

  .stage.peppermint figure {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
    margin-bottom: 0;
  }

  .stage.peppermint.active figure {
    padding-bottom: 3em;
  }

  html.no-flexbox.no-flexboxlegacy .stage.peppermint figure {
    height: 100%;
  }

  .stage.peppermint figure:last-child {
    margin-bottom: 0;
  }

  .stage.peppermint figure img {
    box-shadow: none;
  }

  .stage.peppermint figure figcaption {
    font-size: 0.7em;
    color: #fff;
  }

  .stage.peppermint ul.dots {
    position: absolute;
    bottom: 1.5em;
    left: 0;
    right: 0;
  }

  .stage.peppermint ul.dots li span {
    background: #fff;
  }

  .stage.peppermint ul.dots li.active span {
    background: transparent;
    border-color: #fff;
  }

  .stage.peppermint code {
    border-color: #fff;
  }

  .stage.peppermint a,
  .stage.peppermint a:hover,
  .stage.peppermint a:active {
    background: transparent;
    color: #fff;
  }

  .stage.peppermint .yellow {
    background: #fdeb75;
    color: #333;
  }

  .stage.peppermint .yellow h1 {
    margin-bottom: 0;
  }

  .stage.peppermint .yellow h3 {
    margin-bottom: 2em;
  }

  .stage.peppermint .yellow a.github {
    color: #3fa0b5;
    text-decoration: none;
    padding: 0.5em 1em;
    border: 1px solid;
    border-color: #bfa451;
    border-color: rgba(50,0,0,0.2) rgba(50,0,0,0.3) rgba(50,0,0,0.4) rgba(50,0,0,0.3);
    border-radius: 0.5em;
    box-shadow: inset 0 1px 0 2px rgba(255,255,255,0.3),
                0 2px 0 0 rgba(30,0,0,0.1);
    text-shadow: 1px 1px 0 rgba(255,255,255,0.3);
  }

  .stage.peppermint .yellow a.github:hover {
    background: rgba(255,50,50,0.05);
  }

  .stage.peppermint .red {
    color: #fff;
    background: #ca5d40 url("/pics/peppermint/red.jpg") 50% 50% no-repeat;
    background-size: auto 100%;
    -moz-background-size: cover;
    background-size: cover;
  }

  .stage.peppermint .green {
    color: #fff;
    text-shadow: 1px 1px 2px rgba(150,214,73,0.4);
    background-image: linear-gradient(90deg, rgba(255,255,255,.08) 50%, transparent 50%),
                      linear-gradient(90deg, rgba(255,255,255,.14) 50%, transparent 50%),
                      linear-gradient(90deg, transparent 50%, rgba(255,255,255,.18) 50%),
                      linear-gradient(90deg, transparent 50%, rgba(255,255,255,.2) 50%);
    background-size: 13px, 29px, 37px, 53px;
    background-color: #8bcc3c;
  }

  .stage.peppermint .blue {
    color: #fff;
    text-shadow: 1px 1px 2px rgba(89,135,198,0.6);
    background: #5988c6 url("/pics/peppermint/blue.jpg") 50% 50% no-repeat;
    background-size: auto 100%;
    -moz-background-size: cover;
    background-size: cover;
  }

  .stage.peppermint .blue h1 {
    line-height: 1.6;
  }

  .stage.peppermint .blue p a,
  .stage.peppermint .blue p a:hover,
  .stage.peppermint .red p a,
  .stage.peppermint .red p a:hover {
    color: #fff;
    text-decoration: underline;
  }

  html.winphone .stage.peppermint .blue,
  html.winphone .stage.peppermint .green {
    text-shadow: none;
  }

  .stage.peppermint kbd {
    color: #333;
    text-shadow: none;
  }

  @media all and (min-width: 40em) {
    .stage.peppermint h1 {
      font-size: 4em;
    }

    .stage.peppermint a.github {
      font-size: 1.5em;
    }
  }

  @media all and (min-width: 65em) {
    .stage.peppermint .slides {
      height: 25em;
    }

    .stage.peppermint h1 {
      font-size: 5em;
    }
  }
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
    <p><a href="https://github.com/wilddeer/Peppermint" class="github"><i class="icon-github">&nbsp;</i>Get it on GitHub</a></p>
  </figure>

  <figure class="red">
      <h1>Fast, lightweight &amp; extensible</h1>
      <p>5 Kb, fast &amp; smooth touch, <a href="#api">API</a> for extensibility</p>
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

- Works with mouse, [Touch Events](http://www.w3.org/TR/touch-events/), [Pointer Events](http://www.w3.org/TR/pointerevents/), old [IE10 Point Erevents](http://msdn.microsoft.com/en-us/library/ie/hh673557(v=vs.85).aspx)
- Works on iPhones, Androids, Windows Phones, Blackberries, Windows 8 devices
- IE7+ compatible
- Library agnostic. If jQuery is available, registers itself as a plugin.
- Uses CSS3 transforms &amp; animations, falls back to timer animations when necessary
- Only 6 Kb minified
- Perfomance-optimized `touch` functions
- API and callback functions for extensibility
- [Doesn't break](/en/internet-maintenance/js-sliders-and-the-tab-key/) when <kbd>tab</kbd>&rsquo;bing

##Kit

{:.nopadding}
- <a href="https://raw.github.com/wilddeer/Peppermint/master/peppermint.min.js" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.min.js</span></a> -- minified production script
- <a href="https://raw.github.com/wilddeer/Peppermint/master/peppermint.required.css" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.required.css</span></a> -- styles required for proper functioning
- <a href="https://raw.github.com/wilddeer/Peppermint/master/peppermint.suggested.css" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.suggested.css</span></a> -- default styles to start with (required styles not included!)

##Usage

HTML markup:

{% highlight html cssclass=codewrap %}
<div class="peppermint" id="peppermint">
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

  //starting slide
  startSlide: 0,

  //show dots
  dots: false,

  //dots before slides
  dotsFirst: false,

  //use mouse to drag the slider
  mouseDrag: false,

  //Prefix to be used with peppermint classes,
  //such as `active`, `mouse` and `drag`.
  //Don't forget to change the stylesheet appropriately!
  cssPrefix: '',

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