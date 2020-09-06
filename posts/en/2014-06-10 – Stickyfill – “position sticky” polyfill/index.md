<style>
{% include snippets/stickyfill-demo.css %}
</style>

<script>
{% include snippets/stickyfill-demo.js %}
</script>

<section style="height: 120em;" markdown="1">
  <hgroup class="sticky-1 sticky">
    <h1 class="article-title"><a href="https://github.com/wilddeer/stickyfill">Stickyfill</a></h1>

    <h2 class="tagline"><code>position:&nbsp;sticky</code> polyfill</h2>
  </hgroup>

  <p class="sticky sticky-1-2" style="text-align: center; opacity: 0.3; margin-bottom: 60em; top: 8em; ">
    <i class="icon-chevron-down scroll-me"></i>
  </p>
</section>

<section style="height: 60em;" markdown="1">
  <p class="sticky-2 sticky" style="top: 3em; font-size: 1.2em; margin-top: 2em;">
    Sticky is a block that sticks to the edge of the screen when you scroll past its top border. And when it reaches the bottom of the parent element – goes along with it. Just like this paragraph.
  </p>
</section>

<section style="height: 100em;" markdown="1">
  <div class="sticky-3 sticky" style="top: 3em; margin-bottom: 2.7em;">
    <p>
      CSS code is straightforward:
    </p>

    <pre><code>.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}</code></pre>

  </div>

  <p class="sticky-4 sticky" style="top: 16em; margin-top: 40em; margin-bottom: 0;">
    <small><code>top</code> changes sticky's position relatively to the edge of the viewport. You may also specify <code>margin-bottom</code> to alter sticky's bottom limit a bit.</small>
  </p>
</section>

<section style="min-height: 160em;" markdown="1">
  <div class="sticky-5 sticky" style="top: 3em; margin-top: 30em; font-size: 1.2em; margin-bottom: 5em;">
    <p>
      The problem is, stickies are currently <a href="http://caniuse.com/#feat=css-sticky">supported</a> only in Safari on OS X and iOS.
    </p>
  </div>

  <div class="sticky-6 sticky" style="top: 8em; margin-top: 50em; font-size: 1.2em;">
    <p>
      So I made <a href="https://github.com/wilddeer/stickyfill">Stickyfill</a>. It emulates stickies where they aren't supported natively.
    </p>
  </div>
</section>

<section style="min-height: 90em;" markdown="1">
  <div class="sticky-7 sticky" style="top: 5em; margin-top: 10em;">
    <h3>What it does:</h3>

    <ul>
      <li>Supports top-positioned stickies</li>
      <li><del>Supports table cell stickies</del> Disabled until Firefox <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=975644">makes a native implementation</a></li>
      <li>Works in IE9+</li>
      <li>Disables in older browsers and in browsers with native sticky support</li>
      <li>Mimics original sticky behavior (where it can)</li>
      <li>Considers <a href="http://wilddeer.github.io/stickyfill/test/">a whole lot of different use cases</a></li>
    </ul>
  </div>
</section>

<section style="min-height: 80em;" markdown="1">
  <div class="sticky-8 sticky" style="top: 5em; margin-top: 5em;">
    <h3>What it doesn't do:</h3>

    <ul>
      <li>Doesn't support left, right, bottom or combined stickies</li>
      <li>Doesn't support stacking of table cell stickies</li>
      <li>Doesn't work in overflowed blocks</li>
      <li>Doesn't parse your CSS (launch it manually)</li>
    </ul>
  </div>
</section>

<section style="min-height: 160em;" markdown="1">
  <p class="sticky-9 sticky" style="top: 5em; margin-top: 50em; font-size: 1.2em; text-align: center;">
    <a href="https://github.com/wilddeer/stickyfill" class="big-fucking-button"><i class="icon-github">&nbsp;</i>Get it on GitHub</a>
  </p>
</section>


<figure class="info icon-heart-empty" style="margin-top: 30em;" markdown="1">
In four days of diving into browser box models' hell I discovered the difference between `window.pageYOffset`, `document.documentElement.scrollTop`, `window.scrollY` and `document.body.scrollTop`, discrepancies in `offsetWidth` of a block with  `box-sizing: border-box` in different browsers, how `element.offsetWidth` and `node.getBoundingClientRect().width` differ and why, what's the difference between `getComputedStyle(element)` and real values, how to get viewport's width without scroll width and how rounding errors tend to accumulate in the most inopportune moment.
</figure>

