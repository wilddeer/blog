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

## Kit

{:.nopadding}
- <a href="https://raw.github.com/wilddeer/Peppermint/master/dist/peppermint.min.js" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.min.js</span></a> -- minified production script
- <a href="https://raw.github.com/wilddeer/Peppermint/master/dist/peppermint.required.css" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.required.css</span></a> -- styles required for proper functioning
- <a href="https://raw.github.com/wilddeer/Peppermint/master/dist/peppermint.suggested.css" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.suggested.css</span></a> -- default styles to start with (required styles included)

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

You are free to use any other tag instead of `figure`. When using `figure`, don't forget to include [html5shiv](https://github.com/aFarkas/html5shiv), otherwise it won't work in old IEs.

Place anything you want within the slides.

## Settings

Peppermint can take settings object as an optional second parameter (first when using jQuery). Default settings:

```js
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

`slideTo(n)` -- change active slide to `n`;

`next()` -- next slide;

`prev()` -- previous slide;

`start()` -- start slideshow;

`stop()` -- stop slideshow;

`pause()` -- pause slideshow until the next slide change;

`getCurrentPos()` -- get current slide number;

`getSlidesNumber()` -- get total number of slides;

`recalcWidth()` -- recalculate slider's and slides' widths. Usefull when the container width is changed. Width recalculation runs automatically on window resize and device orientation change.

### Examples

JS:

```js
//init Peppermint and save the API object
var slider = Peppermint(document.getElementById('peppermint')),
    //save links to HTML nodes
    rightArr = document.getElementById('right-arr'),
    leftArr = document.getElementById('left-arr'),
    getSlidesNumberButton = document.getElementById('getslidesnumber');

//click `#right-arr` to go to the next slide
rightArr.addEventListener('click', slider.next, false);

//click `#left-arr` to go to the previous slide
leftArr.addEventListener('click', slider.prev, false);

//click `#getslidesnumber` to alert total number of slides
getSlidesNumberButton.addEventListener('click', function() {
  alert('There are ' + slider.getSlidesNumber() + ' slides');
}, false);
```

JS + jQuery:

```js
//save jQuery link to slider's block
var slider = $('#peppermint');

//init Peppermint
slider.Peppermint();

//click `#right-arr` to go to the next slide
$('#right-arr').click(slider.data('Peppermint').next);

//click `#left-arr` to go to the previous slide
$('#left-arr').click(slider.data('Peppermint').prev);

//click `#getslidesnumber` to alert total number of slides
$('#getslidesnumber').click(function() {
    alert('There are ' + slider.data('Peppermint').getSlidesNumber() + ' slides');
});
```

## Using Peppermint?

Drop me a link &rarr; <a href="mailto:wd@dizaina.net" class="iconlink"><i class="icon-envelope">&nbsp;</i>wd@dizaina.net</a>.

## License

[MIT license](http://opensource.org/licenses/MIT).
