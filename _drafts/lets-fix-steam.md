---
layout: post
title: "Let's fix Steam"
categories: en internet-maintenance
lang: en
---

<style>
    .steam-demo {
        width: 100%;
        font-size: 16px;
        color: white;
        background: #222;
        padding: 3em 4%;
        font-family: Arial, Helvetica, sans-serif;
        color: #f5f5f5;
        margin-bottom: 1.5em;
    }

    .steam-demo.white {
        padding-top: 1.5em;
        padding-bottom: 1.5em;
        background: transparent;
    }

    .steam-demo.fullwidth {
        padding-left: 0;
        padding-right: 0;
    }

    @media all and (min-width: 40em) {
        .steam-demo {
            width: 92%;
            padding-left: 1.5em;
            padding-right: 1.5em;
        }
    }

    .steam-demo a,
    .steam-demo a:visited {
        color: #1f98df;
    }

    .steam-demo a:hover {
        text-decoration: underline;
        background: transparent;
        color: #2ac6ed;
    }

    .steam-demo p {
        margin: 0 0 1.2em 0;
    }

    .steam-demo h3 {
        font-size: 1.25em;
    }

    .steam-demo .small {
        font-size: 0.8em;
    }

    .steam-demo .user,
    .steam-demo .user:visited {
        color: #aaa;
    }

    .steam-demo .user.user-online:visited {
        color: #7cb8e4;
    }

    .steam-demo .user.user-ingame:visited {
        color: #94de35;
    }

    .steam-demo .user:hover,
    .steam-demo .user:visited:hover {
        color: #c0c0c0;
    }

    .steam-demo .user.user-online:visited:hover {
        color: #92cdf8;
    }

    .steam-demo .user.user-ingame:visited:hover {
        color: #aef651;
    }

    .steam-demo .thumbs ul li {
        padding-left: 0;
    }

    .steam-demo .thumbs ul li:before {
        content: '';
        display: none;
    }

    .steam-demo .peppermint.active {
        margin-bottom: 0;
    }

    .steam-demo .steam-demo-peppermint.active .dots {
        display: block;
    }

    .steam-demo .peppermint.active figure {
        padding: 0;
    }

    .no-js .js-controls {
        display: none;
    }

    .js-controls {
        text-align: center;
    }

    .problem {
        color: #ca3f27;
    }

    .solution {
        color: #8bca27;
    }
</style>

#Let's fix Steam {#header}

Everything is good about [Steam](http://store.steampowered.com/), except for it's website. All the great ideas Valve's guys come up with recieve a pretty poor frontend implementation.

It's time to make our own Steam, with blackjack and hookers. I picked up a [game page](http://store.steampowered.com/app/212894/) for mockeries and remade it. It's not a full remake, I omitted Steam's header and footer, I also skipped some of the elements present on the original page. Design is not my forte, I did my best.

Without further ado, here's the result:

<p class="demo" style="text-align: center;"><a href="/steam/" style="font-size: 2.5em;">Demo</a></p>

And now about the things that make Steam's website bad and how I tried to solve them:

<hgroup>
    <h4 class="problem">Problem</h4>
    <h2>Incomplete mobile version</h2>
</hgroup>

Steam's mobile website doesn't recognize a lot of mobile devices and doesn't have half of the functions of desktop version. It doesn't have recently added user reviews, for instance.

Meanwhile it's considered a pretty terrible practice to limit the functionality of your mobile website. Mobile users should be able to use all the functions available in the so called "full" version. Both versions should be "full" versions, actually. There's [a pretty good and short book](http://www.abookapart.com/products/mobile-first) on this theme.

<hgroup>
    <h4 class="solution">Solution</h4>
    <h2>Responsive design</h2>
</hgroup>

Responsive design increases the time and complexity of the development, but, on the bright side, it allowes the whole functionality of the site to be available on any device and removes the need to maintein both versions and bother about adding new features to both of them. You still can use the combined approach in particularly difficult situations: generate part of the page on the server differently depending on the device, e. g. serve different picture sizes to different devices, or even substitute some of the templates with more simple or complex ones.

My demo is using mobile first principles, i.&nbsp;e. base styles for small screens, media queries for larger ones.

###Making the gallery responsive

New screenshot gallery should work on any device, with any type of touch events. I used my [Peppermint touch slider](/scripts/peppermint/) for this purpose. I also made a scroller for the thumbs based on the event unifying code from Peppermint (which I detached into a [separate script](https://github.com/wilddeer/Event-Burrito)). Now you can drag both the screenshots and the thumbs using mouse or touch:

<style>
{% include snippets/steam-gallery.css %}
</style>

<script>
dzDelayed.push(function() {
    {% include snippets/steam-gallery.js %}
    $('.js-steam-peppermint').steamGallery();
});
</script>

<div class="steam-demo fullwidth">
{% include snippets/steam-gallery.htm %}
</div>

Thumbs are replaced with the dots on small screens (you can see the dots by shrinking the browser window).

Everything combined and wrapped in a jQuery extension:

{% highlight js cssclass=codewrap_maxheight %}
{% include snippets/steam-gallery.js %}
{% endhighlight %}

###Background

I made a full-page background. To make mobile devices happier i give ’em smaller background pic. Compare the [full](/steam/i/page.bg.jpg) and [mobile](/steam/i/page.bg.mob.jpg) variants.

Since every store page have its own background, I put the style directly into the `head` of the page. I also took into account old IEs, which don't understant media queries:

{% highlight html cssclass=codewrap %}
<!--[if lt IE 9]>
<style>
    body {
        background-color: #1e231f;
        background-image: url(i/page.bg.jpg);
    }
</style>
<![endif]-->
<!--[if gt IE 8]><!-->
<style>
    body {
        background-image: url(i/page.bg.mob.jpg);
    }
    @media all and (min-width: 75em) {
        body {
            background-color: #1e231f;
            background-image: url(i/page.bg.jpg);
        }
    }
</style>
<!--<![endif]-->
{% endhighlight %}

To make mobile devices love the site even more I disabled the shadows and made the backgrounds opaque where possible.

<hgroup>
    <h4 class="problem">Problem</h4>
    <h2>Content obeys the design</h2>
</hgroup>

Here's the DLC info block in its current form:

{% include pic.htm src='dlc-block.png' a='Блок про DLC' %}

What happens if the phrase is twice as big? What happens when you then translate this phrase into the language in which it will be even longer? Here's what:

{% include pic.htm src='dlc-block-overflowed.png' c='DLC block is overflowed :-(' %}

This block has fixed width and height (no idea why the width is even defined, since it's the same as the parent's) and [a picture](http://cdn4.store.steampowered.com/public/images/v5/game_area_dlc.png) on the background. Even back in the days when there were no fancy CSS3 features you could make this block fluid. You would need a sprite and some hacks, but everything was made with hacks back then.

<hgroup>
    <h4 class="solution">Solution</h4>
    <h2>Make design obey the content</h2>
</hgroup>

<style>
{% include snippets/steam-dlc.css %}
</style>

<div class="steam-demo">
{% include snippets/steam-dlc.htm %}
</div>

<p class="js-controls"><button id="fill-it">fill me, baby</button></p>

<script>
dzDelayed.push(function() {
    var i = 0;

    $('#fill-it').click(function() {
        $('.game-dlc-notice').append('<p class="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris laoreet nulla non est malesuada, vitae dapibus libero congue. Integer cursus magna ut neque commodo fermentum sed a enim. Ut pharetra urna facilisis laoreet iaculis. Sed sapien nulla, venenatis sit amet magna eu, ultrices aliquam nibh.</p>');

        if (i++ > 3) {
            $(this).text('oh stop it, you!').attr('disabled','disabled');
        }
    });
});
</script>

One block, a header, a paragraph and a bunch of styles:

{% highlight html cssclass=codewrap %}
{% include snippets/steam-dlc.htm %}
{% endhighlight %}

{% highlight css cssclass=codewrap %}
{% include snippets/steam-dlc.css %}
{% endhighlight %}

Old browsers won't render the gradient and the rounded corners, not big deal.

The problem with the unflexible static markup is not limited to one block. Price blocks designed for dollar prices used to break in Russian shop. It's not the case now, for the most part, but there are still quite a bunch of static unflexible blocks:

{% include pic.htm src='price-overflowed.png' a='Overflowed price block' c="Steam won't handle yet another ruble collapse :-)" %}

There is a similar block in the neighborhood, which, surprisingly enough, is feeling great in the unusual circumstances:

{% include pic.htm src='proper-price-block.png' a='Proper price block'%}

This leads us to another problem:

<hgroup>
    <h4 class="problem">Problem</h4>
    <h2>Nonuniversal code</h2>
</hgroup>

Two similar looking blocks are using completely different markup, although, in fact, they must be identical.

<hgroup>
    <h4 class="solution">Solution</h4>
    <h2>Make the code universal</h2>
</hgroup>

Let's make the universal price block:

<style>
{% include snippets/price-area.css %}
</style>

<div class="steam-demo white">
  <div class="price-area" style="font-size: 0.7em;">
    <span class="discount">
      <span>-1%</span>
    </span>

    <span class="price">
      <del class="original-price">
        <span>£3.00</span>
      </del>
      
      <span class="final-price">
        <span>£2.97</span>
      </span>
    </span>
  </div>

  <div class="price-area">
    <span class="discount">
      <span>-33%</span>
    </span>

    <span class="price">
      <del class="original-price">
        <span>$49.99</span>
      </del>
      
      <span class="final-price">
        <span>$32.99</span>
      </span>
    </span>
  </div>

  <div class="price-area" style="font-size: 1.2em;">
    <span class="discount">
      <span>-600%</span>
    </span>

    <span class="price">
      <del class="original-price">
        <span>100 000 рублей</span>
      </del>
      
      <span class="final-price">
        <span>-500 000 рублей</span>
      </span>
    </span>
  </div>

  <div class="price-area" style="font-size: 1.5em;">
    <span class="discount">
      <span>-66%</span>
    </span>

    <span class="price">
      <del class="original-price">
        <span>¥ 999</span>
      </del>
      
      <span class="final-price">
        <span>¥ 333</span>
      </span>
    </span>
  </div>
</div>

Now it's enough to vary the font size to make a block of an appropriate size. All the properties are set in relative `em` units. Price values are wrapped in additional `span`’s, so you can set a specific font size for them without affecting the properties of the parental block:

{% highlight html cssclass=codewrap %}
{% include snippets/price-area.htm %}
{% endhighlight %}

{% highlight css cssclass=codewrap %}
{% include snippets/price-area.css %}
{% endhighlight %}

Sale is over? Set the regular price and get rid of unnecessary stuff in the markup: 

{% highlight html cssclass=codewrap %}
<div class="price-area">
    <span class="price">
        $5.99
    </span>
</div>
{% endhighlight %}

And everything just works.

<div class="steam-demo white">
    <div class="price-area" style="font-size: 1.5em;">
        <span class="price">
            ¥ 999
        </span>
    </div>

    <div class="price-area" style="font-size: 1.2em;">
        <span class="price">
            599 руб.
        </span>
    </div>

    <div class="price-area">
        <span class="price">
            $5.99
        </span>
    </div>
</div>

Same is applicable to any repeating block, e.&nbsp;g. user block:

<style>
{% include snippets/steam-user.css %}
</style>

<div class="steam-demo" style="text-align: center;">
  <p>
    <a href="#" class="user" style="font-size: 0.66em;">
      <span class="userpic"><img src="/steam/i/userpic1.jpg"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-online">
      <span class="userpic"><img src="/steam/i/userpic4.jpg"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-ingame" style="font-size: 1.5em;">
      <span class="userpic"><img src="/steam/i/userpic-med.jpg"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-online" style="font-size: 2.25em;">
      <span class="userpic"><img src="/steam/i/userpic-big.jpg"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-ingame user-square" style="font-size: 2.25em;">
      <span class="userpic"><img src="/steam/i/userpic-big2.jpg"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-online user-square" style="font-size: 1.5em;">
      <span class="userpic"><img src="/steam/i/userpic-med2.jpg"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-square">
      <span class="userpic"><img src="/steam/i/userpic3.jpg"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-ingame user-square" style="font-size: 0.66em;">
      <span class="userpic"><img src="/steam/i/userpic6.jpg"></span><span class="username">Username</span>
    </a>
  </p>
</div>

To adhere to the principle of universal code, it is important to properly structure your styles and to understand what purpose each part of the styles serves. I brought myself to the following system:

- **Base styles** -- base font and colors, styles for paragraphs, headings, lists, etc.
- **Utility classes** -- font size modifiers (a little bigger, a little smaller), info, warning and error colors, other universal utility stuff.
- **Layout** -- header, footer, sidebars, content blocks, other non-page specific base blocks.
- **Grid**. I don't like restrictive grids. In this demo, I use a simple grid as a bunch of helper classes to avoid repeating the same bunch of styles over and over. I deviate from the grid all the time to write a bunch of custom classes for a specific block.
- **Modules** -- this are the guys I was talking about. Modules are repeating blocks, their base styles should not depend on the context (but can be modified by the styles of the context, see below). Modules can be nested.
- **Page styles** -- styles of the blocks specific to the page. This is the place where you can modify the styles of the modules located in a specific block on the page.

<hgroup>
  <h4 class="problem">Problem</h4>
  <h2>“Obtrusive” javascript</h2>
</hgroup>

Substitution of the basic HTML functions with scripts and lack of proper fallbacks leads to a dreadful situation where the habitual functions of those elements are completely lost.

Steam's website contains all the classic mistakes collected in my [post about proper link usage](/en/links-please/). Here's, for instance, "View all screenshots" links, which isn't actually a link, since it doesn't lead anywhere:

{% highlight html cssclass=codewrap %}
<a class="linkbar" href="javascript:screenshot_popup('http://store.steampowered.com/screenshot/view/205100/0?snr=1_5_9__400', 800, 635, 0, 0);">...</a>
{% endhighlight %}

And here's a "previous spotlight" button made of an `a` element:

{% highlight html cssclass=codewrap %}
<a href="javascript:PrevSpotlight( 2 );"><img src="http://cdn4.store.steampowered.com/public/images/v5/ico_navArrow_left.gif"> Prev</a>
{% endhighlight %}

Another example -- community hub posts:

{% include pic.htm src='hub-post.png' a='Пост в центре сообщества игры' %}

Their code looks like this:

{% highlight html cssclass=codewrap %}
<div class="apphub_Card interactable" style="float: left; width: 468px; height: 345px;" onclick="ShowModalContent( 'http://steamcommunity.com/app/205100/discussions/0/648813728349716360/?insideModal=1', 'Read at http://steamcommunity.com/app/205100/discussions/0/648813728349716360/', 'http://steamcommunity.com/app/205100/discussions/0/648813728349716360/' );">

    ...

</div>
{% endhighlight %}

Not only they open in horrible modal popups (which, by the way, are invented by the people who hate tabs), they also can't be opened in a regular way, since they aren't links. Not to mention inline styles and huge inline function call.

<hgroup>
    <h4 class="solution">Solution</h4>
    <h2 markdown="1">Make the javascript [unobtrusive](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript)</h2>
</hgroup>

Whole block can be made of an `a` element and a popup (if you desperately want a popup) should only be opened if the left mouse button is pressed without any modifier keys.

Same is applicable to other UI elements: if the element leads somewhere, make a link. You can then apply any handler to it, just don't prevent opening it in a new tab. If an element does some action within the page, use a `button`. More details and examples in my [post about proper links](/en/links-please/).

Besides all the above, "obtrusive" javascript directly leads to another problem:

<hgroup>
    <h4 class="problem">Problem</h4>
    <h2>Low fault tolerance</h2>
</hgroup>

What would happen if the CDN server serving js files goes down? If one of the scripts fails to execute correctly? That's right, half of the functionality won't work. It could've been working though, even if not as good as with scripts.

Screenshot gallery becomes an empty rectangle without js, thumbs and scroll aren't working either:

{% include pic.htm src='gallery-nojs.jpg' a='Screenshot gallery with javascript turned off' %}

<hgroup>
    <h4 class="solution">Solution</h4>
    <h2>Use proper fallbacks</h2>
</hgroup>

I put the pictures into a horizontally scrollable block, which will become a normal gallery after the initialization. Since all the UI element are useless without javascript, I hid them:

<div class="steam-demo fullwidth">
    <section class="gallery peppermint steam-demo-peppermint inactive">
        <figure>
            <a href="/steam/i/1.jpg" target="_blank"><img src="/steam/i/m1.jpg"></a>
        </figure>

        <figure>
            <a href="/steam/i/2.jpg" target="_blank"><img src="/steam/i/m2.jpg"></a>
        </figure>

        <figure>
            <a href="/steam/i/3.jpg" target="_blank"><img src="/steam/i/m3.jpg"></a>
        </figure>
    </section>
</div>

<p class="js-controls"><button id="launch-it">Launch me</button></p>

<script>
dzDelayed.push(function() {
    $('#launch-it').click(function() {
        $('.steam-demo-peppermint').Peppermint({
            dots: true,
            mouseDrag: true
        });

        $(this).attr('disabled','disabled');
    });
});
</script>

Now you can view the screenshots even if the javascript is broken.

To implement this approach it's enough to give the gallary `inactive`, which will be then changed to `active` upon initialization, and write a bunch of styles for both states.

Same approach is applicable to "add to favourites" button, vote buttons, etc. -- you can wrap them in a `form` and cath `submit` event with a handler. If js is not available or broken, the form will be sent to the server and the server can then redirect the user back to the page he came from.

Same with the blocks opening different popups -- make ’em links, and they will thrive without javascript.

##A few more things

###Accessibility

Lot's of UI elements aren't focusable, which means they can't be <kbd>Tab</kbd>’bed on and screenreaders, voice control thingies and other accessibility tools won't know about them.

This is easily fixed by adding `tabindex="0"` to the UI elements and binding a common handler to clicks and <kbd>Enter</kbd> press.

###Performance optimization

Currently, one page load generates about 120 requests to the server (cache disabled), including 92 pics, 18 js and 8 css files. All the scripts are located in the `head` element, which significantly delays page rendering.

I concatenated all the scripts and styles, kepts the styles in the header and moved the scripts down to the closing `</html>` tag (except for Modernizr, I kept it in the `head` since it affects the styles).

This measures significantly reduced the amount of requests and the delay before the rendering start. There are 25 requests in my demo, including 21 pics, 2 scripts and 1 style. My design only uses two png sprites -- one for standard screens and one for hign density (plus three fallback images to emulate gradients and translucency in older browsers). At first I used single svg sprite, but unfortunately, it significantly dropped the performance of some mobile browsers and also looked blurry in IE mobile. So, for now, it's safer to use png sprites. Icon fonts are also acceptable, but they have a bunch of flaws, too.

The number of resourses on a real production server may be different, but the difference in the amount of requests is obvious.

###UI and navigation

There are a lot of unclear and inconsistent moments in Steam's navigation and the UI overall. A good UI designer could fix the situation. Unfortunately, I'm not one of them.

##Conclusion

**What's done:** responsive demo meeting the principles of [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement) and [unobtrusive javascript](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript), with improved fault tolerance. Works in IE8+ and in almost every mobile browser.

**What's not done:** Steam's header and footer, HTML5-video with a fallback to flash (for the trailers), skipped a bunch of blocks present on the original page.

Warm-up is officially finished.

##Bonus pack

Code of one of the items in Steam's main menu:

{% highlight html cssclass=codewrap %}
<a class="menuitem supernav" href="http://store.steampowered.com/" data-tooltip-content="
    &lt;a class=&quot;submenuitem&quot; href=&quot;http://store.steampowered.com/&quot;&gt;Featured&lt;/a&gt;
    &lt;a class=&quot;submenuitem&quot; href=&quot;http://store.steampowered.com/news/&quot;&gt;News&lt;/a&gt;
    &lt;a class=&quot;submenuitem&quot; href=&quot;http://store.steampowered.com/recommended/&quot;&gt;Recommended&lt;/a&gt;
    &lt;a class=&quot;submenuitem&quot; href=&quot;http://steamcommunity.com/my/wishlist/&quot;&gt;Wishlist&lt;/a&gt;
    &lt;a class=&quot;submenuitem&quot; href=&quot;http://store.steampowered.com/stats/&quot;&gt;STATS&lt;/a&gt;
  ">
    STORE </a>
{% endhighlight %}

{% include pic.htm src='wat.jpg' a='WAT'%}
