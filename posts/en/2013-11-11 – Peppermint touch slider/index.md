---
layout: layouts/postWrap
postMod: is-no-padding-top
---

# Peppermint touch slider {.sr-only}

<link rel="stylesheet" href="/css/peppermint.suggested.css">

<style>
<%- include('peppermint-demo.css') %>
</style>

<div class="content-fullwidth stage peppermint" id="peppermint">
  <figure class="yellow">
    <h2 class="h2">Peppermint.js</h2>
    <p class="h3">Proper touch slider</p>
    <p>
      <a href="https://github.com/wilddeer/Peppermint" class="github">
        <%- include('/svg/github-alt-brands.svg') %>
        Fork me on GitHub
      </a>
    </p>
  </figure>
  <figure class="red">
      <h2 class="h2">Fast, lightweight &amp; extensible</h2>
      <p>7.7 Kb, fast &amp; smooth touch, <a href="#api">API</a> for extensibility</p>
  </figure>
  <figure class="green">
      <h2 class="h2">Works everywhere</h2>
      <p>Works on <%- include('/svg/apple-brands.svg') %>&nbsp;iPhones, <%- include('/svg/android-brands.svg') %>&nbsp;Androids, <%- include('/svg/windows-brands.svg') %>&nbsp;Winphones. Library agnostic. <%- include('/svg/internet-explorer-brands.svg') %>&nbsp;IE7+ compatible.</p>
  </figure>
  <figure class="blue">
    <p class="h2"><a href="/en/JS_sliders_and_the_Tab_key/">On good terms</a> with the <kbd class="kbd">Tab</kbd> key</p>
  </figure>
</div>

<script src="/js/peppermint.min.js"></script>

<script>
  Peppermint(document.getElementById('peppermint'), {
    dots: true,
    slideshow: true,
    slideshowInterval: 7000,
    stopSlideshowAfterInteraction: true
  });
</script>

<div class="text">

[Peppermint.js](https://github.com/wilddeer/Peppermint) – Yet another touch slider. Only better.

- Works with mouse, [Touch Events](http://www.w3.org/TR/touch-events/), [Pointer Events](http://www.w3.org/TR/pointerevents/), old [IE10 Pointer Events](http://msdn.microsoft.com/en-us/library/ie/hh673557(v=vs.85).aspx)
- Responsive, works on iPhones, Androids, Windows Phones, Blackberries, Windows 8 devices
- IE7+ compatible
- Library agnostic. If jQuery is available, registers itself as a plugin.
- Uses CSS3 transforms &amp; animations, falls back to timer animations when necessary
- Only 7.7 Kb minified
- Perfomance-optimized `touch` functions
- API and callback functions for extensibility
- Keyboard accessible, [doesn’t break](/en/JS_sliders_and_the_Tab_key/) when <kbd>tab</kbd>&rsquo;bing

## Kit

- <a href="https://raw.github.com/wilddeer/Peppermint/master/dist/peppermint.min.js" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.min.js</span></a> – minified production script
- <a href="https://raw.github.com/wilddeer/Peppermint/master/dist/peppermint.required.css" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.required.css</span></a> – styles required for proper functioning
- <a href="https://raw.github.com/wilddeer/Peppermint/master/dist/peppermint.suggested.css" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.suggested.css</span></a> – default styles to start with (required styles included)

## Usage

HTML markup:

```html
<div class="peppermint peppermint-inactive" id="peppermint">
  <figure> ... </figure>

  <figure> ... </figure>

  <figure> ... </figure>
</div>
```

Javascript:

```js
var slider = Peppermint(document.getElementById('peppermint'));
```

Or javascript + jQuery:

```js
$('.peppermint').Peppermint();
```

`peppermint-inactive` class is not required. It is replaced with `peppermint-active` during setup.

You are free to use any other tag instead of `figure`. When using `figure`, don’t forget to include [html5shiv](https://github.com/aFarkas/html5shiv), otherwise it won’t work in old IEs.

Place anything you want within the slides.

## Settings

Peppermint can take settings object as an optional second parameter (first when using jQuery). Default settings:

```js
{
  // transition time when changing slides, ms
  speed: 300,

  // transition time when changing slides after touch, ms
  touchSpeed: 300,

  // slideshow enabled
  slideshow: false,

  // slideshow interval, ms
  slideshowInterval: 4000,

  // stop slideshow after user interacts with the slider
  stopSlideshowAfterInteraction: false,

  // slide number to start with
  startSlide: 0,

  // use mouse to drag the slider
  mouseDrag: true,

  // don’t initialize Peppermint if there’s only one slide
  disableIfOneSlide: true,

  // Prefix to be used with Peppermint classes,
  // such as `inactive`, `active`, `mouse`, `drag`, etc.
  // Don’t forget to change the stylesheet appropriately!
  cssPrefix: 'peppermint-',

  // show dots
  dots: false,

  // prepend dots to dotsContainer (default is append)
  dotsPrepend: false,

  // Element to contain dots, defaults to Peppermint’s root element.
  // Can be anywhere on the page.
  dotsContainer: undefined,

  // element containing slides, defaults to Peppermint’s root element
  slidesContainer: undefined,

  // Callback function, runs at slide change.
  // Receives slide number as a parameter.
  onSlideChange: undefined,

  // Callback function, runs at setup end.
  // Receives total number of slides as a parameter.
  onSetup: undefined
}
```

### Examples

JS:

```js
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
```

JS + jQuery:

```js
$('.peppermint').Peppermint({
  dots: true,
  slideshow: true,
  speed: 500,
  slideshowInterval: 5000,
  stopSlideshowAfterInteraction: true,
  onSetup: function(n) {
    console.log('Peppermint setup done. Slides found: ' + n);
  }
});
```

## API

Peppermint exposes a set of functions upon installation. These functions can be used to controll the slider externally:

`slideTo(n)` – change active slide to `n`;

`next()` – next slide;

`prev()` – previous slide;

`start()` – start slideshow;

`stop()` – stop slideshow;

`pause()` – pause slideshow until the next slide change;

`getCurrentPos()` – get current slide number;

`getSlidesNumber()` – get total number of slides;

`recalcWidth()` – recalculate slider’s and slides’ widths. Usefull when the container width is changed. Width recalculation runs automatically on window resize and device orientation change.

### Examples

JS:

```js
// init Peppermint and save the API object
var slider = Peppermint(document.getElementById('peppermint')),
    // save links to HTML nodes
    rightArr = document.getElementById('right-arr'),
    leftArr = document.getElementById('left-arr'),
    getSlidesNumberButton = document.getElementById('getslidesnumber');

// click `#right-arr` to go to the next slide
rightArr.addEventListener('click', slider.next, false);

// click `#left-arr` to go to the previous slide
leftArr.addEventListener('click', slider.prev, false);

// click `#getslidesnumber` to alert total number of slides
getSlidesNumberButton.addEventListener('click', function() {
  alert('There are ' + slider.getSlidesNumber() + ' slides');
}, false);
```

JS + jQuery:

```js
// save jQuery link to slider’s block
var slider = $('#peppermint');

// init Peppermint
slider.Peppermint();

// click `#right-arr` to go to the next slide
$('#right-arr').click(slider.data('Peppermint').next);

// click `#left-arr` to go to the previous slide
$('#left-arr').click(slider.data('Peppermint').prev);

// click `#getslidesnumber` to alert total number of slides
$('#getslidesnumber').click(function() {
    alert('There are ' + slider.data('Peppermint').getSlidesNumber() + ' slides');
});
```

## Using Peppermint?

Drop me a link &rarr; [me@grumpy.blog](mailto:me@grumpy.blog).

## License

[MIT license](http://opensource.org/licenses/MIT).
