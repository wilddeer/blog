---
layout: layouts/postWrap
description: 'Reworking the Steam game page.'
image: cover.png
langLink: 'чиним_steam'
tags:
    - archive
---
<link rel="stylesheet" href="/css/peppermint.suggested.css">

<style>
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

    .steam-demo .peppermint.peppermint-active {
        margin-bottom: 0;
    }

    .steam-demo .steam-demo-peppermint.peppermint-active .peppermint-dots {
        display: block;
    }

    .steam-demo .peppermint.peppermint-active figure {
        padding: 0;
    }

    .problem {
        color: #ca3f27;
    }

    .solution {
        color: #8bca27;
    }

    /* Slime */
    .slime.active {
        position: relative;
        overflow: hidden;
        padding-left: 0;
        padding-right: 0;
        -ms-touch-action: pan-y;
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
        tap-highlight-color: transparent;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: move;
        cursor: -webkit-grab;
        cursor: -moz-grab;
        cursor: grab;
    }

    .slime.active .scroller {
        display: inline-block;
        position: relative;
    }

    .slime.active a:active,
    .slime.active a:active img {
        outline: none;
    }

    .slime.active,
    .slime.active .scroller {
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        -moz-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .slime.active.drag,
    .slime.active.drag * {
        cursor: move;
        cursor: -webkit-grabbing;
        cursor: -moz-grabbing;
        cursor: grabbing;
    }
</style>

<div class="text">

# Let’s fix Steam

<%- include('/svg/history-solid.svg') %>**Deprecated!** This post contains irrelevant old crap and is left for history and lulz.
{.notice .is-with-icon .is-warning .block .is-mb-big}

Everything is good about [Steam](http://store.steampowered.com/), except for its website. All the great ideas Valve guys come up with recieve a pretty poor frontend implementation.

It’s time to make our own Steam, with blackjack and hookers. I picked up a [game page](http://store.steampowered.com/app/212894/) for mockeries and remade it. It’s not a full remake, I omitted Steam’s header and footer, I also skipped some of the elements present on the original page. Also worth mentioning that it’s more of a tech remake, design is not my forte.

Without further ado, here’s the result:

<p style="text-align: center;"><a href="/demos/steam/" style="font-size: 2.5em;">Demo</a></p>

And now on the problems current Steam website has and how I tried to fix them:

## <small class="state-color state-color--danger">Problem</small><br>Incomplete mobile version

Steam’s mobile website doesn’t recognize a lot of mobile devices and doesn’t have half the functions desktop version provides. For instance, it doesn’t have recently added user reviews in any shape or form.

Meanwhile, limiting the functionality of your mobile website is a really bad practice. Mobile users should be able to use all the functions available in "full" version. Both versions should be "full" versions, actually. There’s [a pretty good read](http://www.abookapart.com/products/mobile-first) on the theme.

## <small class="state-color state-color--success">Solution</small><br>Responsive design

Responsive design increases the time and complexity of the development, but, on the bright side, it allowes the whole functionality of the site to be available on any device and removes the need to maintain both versions and bother about adding new features to both of them. You still can use a combined approach in particularly difficult situations: generate part of the page on the server differently depending on the device, e. g. serve different picture sizes to different devices, or even substitute some of the templates with more simple or complex ones.

My demo uses mobile first approach, i.&nbsp;e. base styles for small screens, media queries for larger ones.

### Making the gallery responsive

Responsive screenshot gallery should work on any device, with any type of touch events. I used my [Peppermint touch slider](/en/Peppermint_touch_slider/) for this purpose. I also made a scroller for the thumbnails based on the event unifying code from Peppermint (which I detached into a [separate script](https://github.com/wilddeer/Event-Burrito), by the way). Now you can drag both the screenshots and the thumbs using mouse or touch:

</div>

::: .demo .is-fullwidth

<style>
<%- include('steam-gallery.css') %>
</style>

<script src="/js/jquery-3.5.1.slim.min.js"></script>
<script src="/js/eventburrito.js"></script>
<script src="/js/peppermint.min.js"></script>

<%- include('steam-gallery.html') %>

<script>
    <%- include('slime.js') %>
    <%- include('steam-gallery.js') %>
    $('.js-steam-peppermint').steamGallery();
</script>

:::

<div class="text">

Thumbnails are replaced with dots on smaller screens (you can see the dots by shrinking the browser window).

Everything combined and wrapped in a jQuery extension:

::: .code-max-height
```js
<%- include('steam-gallery.js') %>
```
:::

### Responsive background

I made a full-page background. To make mobile devices happier i give ’em smaller background pic. Compare the [full]/demos/steam/i/page.bg.jpg) and [mobile]/demos/steam/i/page.bg.mob.jpg) variants.

Since every store page has its own background, I put the style directly into the `head` of the page. I also took into account old IEs that don’t understant media queries:

```html
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
```

To make mobile devices love the site even more I limited the amount of performance heavy CSS features (like shadows, gradients and opacity) on smaller screens.

## <small class="state-color state-color--danger">Problem</small><br>Content obeys the design

Here’s the DLC info block in its current form:

![](dlc-block.png =625x87)

What happens if the phrase is twice as big? What if the translated version is even longer? Here’s what:

![DLC block is overflowed :-(](dlc-block-overflowed.png =621x178)

This block has fixed width and height (no idea why the width is even defined, since it’s same as parent’s) and [a picture](http://cdn4.store.steampowered.com/public/images/v5/game_area_dlc.png) on the background. Even back in the days when there were no fancy CSS3 features you could make this block fluid. You would need a sprite and some hacks, but everything worked with hacks back then.

## <small class="state-color state-color--success">Solution</small><br>Make design obey the content

</div>

<style>
<%- include('steam-dlc.css') %>
</style>

::: .demo .is-fullwidth
::: .content-box
<%- include('steam-dlc.html') %>

<div class="align-center block is-mt-big">
    <button class="button is-white" id="fill-it">fill me, baby</button>
</div>

:::
:::

<div class="text">

<script>
    var i = 0;

    $('#fill-it').click(function() {
        $('.game-dlc-notice').append('<p class="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris laoreet nulla non est malesuada, vitae dapibus libero congue. Integer cursus magna ut neque commodo fermentum sed a enim. Ut pharetra urna facilisis laoreet iaculis. Sed sapien nulla, venenatis sit amet magna eu, ultrices aliquam nibh.</p>');

        if (i++ > 3) {
            $(this).text('oh stop it, you!').attr('disabled','disabled');
        }
    });
</script>

All we need is one block and a bunch of styles:

```html
<%- include('steam-dlc.html') %>
```

```css
<%- include('steam-dlc.css') %>
```

Old browsers won’t render the gradient and the rounded corners, not big deal.

The problem with unflexible static markup is not limited to one block. Price blocks designed for dollar prices used to break in Russian shop. It’s not the case now, for the most part, but there is still quite a bunch of static unflexible blocks:

![Steam won’t handle yet another ruble collapse :-)](price-overflowed.png =197x76)

There is a similar block in the neighborhood, which, surprisingly enough, is feeling great in unusual circumstances:

![](proper-price-block.png =296x129)

This leads us to another problem:

## <small class="state-color state-color--danger">Problem</small><br>Non-universal code

Two similar looking blocks are using completely different markup, although, in fact, they must be identical.

## <small class="state-color state-color--success">Solution</small><br>Make the code universal

Let’s make a universal price block:

</div>

::: .demo .is-light
<style>
<%- include('price-area.css') %>
</style>

<div class="steam-demo white align-center">
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
:::
:::

<div class="text">

Now it’s enough to vary the font size to make a block of an appropriate size. All the properties are set in relative `em` units. Price values are wrapped in additional `span`’s, so you can set a specific font size for them without affecting the properties of the parental element:

```html
<%- include('price-area.html') %>
```

```css
<%- include('price-area.css') %>
```

Sale is over? Set the regular price and get rid of unnecessary stuff in the markup:

```html
<div class="price-area">
    <span class="price">
        $5.99
    </span>
</div>
```

And everything just works.

</div>

::: .demo .is-fullwidth .is-light
<div class="steam-demo white align-center">
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
:::

<div class="text">

Same is applicable to any repeating block, e.&nbsp;g. user block:

</div>

::: .demo .is-fullwidth
<style>
<%- include('steam-user.css') %>
</style>

<div class="steam-demo" style="text-align: center;">
    <p>
        <a href="#" class="user" style="font-size: 0.66em;">
            <span class="userpic"><img src="/demos/steam/i/userpic1.jpg"></span><span class="username">Username</span>
        </a>
    </p>
    <p>
        <a href="#" class="user user-online">
            <span class="userpic"><img src="/demos/steam/i/userpic4.jpg"></span><span class="username">Username</span>
        </a>
    </p>
    <p>
        <a href="#" class="user user-ingame" style="font-size: 1.5em;">
            <span class="userpic"><img src="/demos/steam/i/userpic-med.jpg"></span><span class="username">Username</span>
        </a>
     </p>
    <p>
        <a href="#" class="user user-online" style="font-size: 2.25em;">
            <span class="userpic"><img src="/demos/steam/i/userpic-big.jpg"></span><span class="username">Username</span>
        </a>
    </p>
    <p>
        <a href="#" class="user user-ingame user-square" style="font-size: 2.25em;">
            <span class="userpic"><img src="/demos/steam/i/userpic-big2.jpg"></span><span class="username">Username</span>
        </a>
    </p>
    <p>
        <a href="#" class="user user-online user-square" style="font-size: 1.5em;">
            <span class="userpic"><img src="/demos/steam/i/userpic-med2.jpg"></span><span class="username">Username</span>
        </a>
    </p>
    <p>
        <a href="#" class="user user-square">
            <span class="userpic"><img src="/demos/steam/i/userpic3.jpg"></span><span class="username">Username</span>
        </a>
    </p>
    <p>
        <a href="#" class="user user-ingame user-square" style="font-size: 0.66em;">
            <span class="userpic"><img src="/demos/steam/i/userpic6.jpg"></span><span class="username">Username</span>
        </a>
    </p>
</div>
:::

<div class="text">

To adhere to the principle of the universal code, it is important to properly structure your styles and to understand what purpose each part of the styles serves. I brought myself to the following system:

- **Base styles** – base font and colors; paragraph, headings &amp; list styles, etc.
- **Utility classes** – font size modifiers (a little bigger, a little smaller); info, warning and error colors; other universal utility stuff.
- **Layout** – header, footer, sidebars, content blocks, other non-page-specific base blocks.
- **Grid**. I don’t like restrictive grids. In this demo, I use a simple grid as a bunch of helper classes to avoid repeating the same bunch of styles over and over. I deviate from the grid all the time to write a bunch of custom classes for a specific block.
- **Modules** – this are the guys I was talking about. Modules are repeating blocks, their base styles should not depend on the context (but can be modified by the styles of the context, see below). Modules can be nested.
- **Page styles** – styles of the blocks specific to the page. This is the place where you can modify the styles of the modules located in a specific block on the page.

## <small class="state-color state-color--danger">Problem</small><br>“Obtrusive” javascript

Substitution of basic element behaviour with scripts and lack of proper fallbacks leads to a situation where tipical and habitual functions of HTML elements are completely lost.

For instance, Steam website contains all the classic mistakes collected in my [post about proper link usage](/en/Links,_please/). Here’s, for example, “View all screenshots” link, which isn’t actually a link, since it doesn’t lead anywhere:

```html
<a class="linkbar" href="javascript:screenshot_popup('http://store.steampowered.com/screenshot/view/205100/0?snr=1_5_9__400', 800, 635, 0, 0);">...</a>
```

And here’s a “previous spotlight” button made with an `a` element:

```html
<a href="javascript:PrevSpotlight( 2 );"><img src="http://cdn4.store.steampowered.com/public/images/v5/ico_navArrow_left.gif"> Prev</a>
```

Another example – community hub posts:

![](hub-post.png =481x362)

Their code looks like this:

```html
<div class="apphub_Card interactable" style="float: left; width: 468px; height: 345px;" onclick="ShowModalContent( 'http://steamcommunity.com/app/205100/discussions/0/648813728349716360/?insideModal=1', 'Read at http://steamcommunity.com/app/205100/discussions/0/648813728349716360/', 'http://steamcommunity.com/app/205100/discussions/0/648813728349716360/' );">

    ...

</div>
```

Not only these posts are opened in horrible modal popups (which are invented by the people who hate tabs), they also can’t be opened in a regular way, since they are not links. Not to mention the usage of inline styles and huge inline function calls, which are an example of poor code style.

## <small class="state-color state-color--success">Solution</small><br>Make the javascript [unobtrusive](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript)

Whole block containing community hub post can be made of an `a` element, popup (if you desperately want a popup) should only be opened if the block is clicked with left mouse button without any modifier keys.

Same is applicable to other UI elements: if the element leads somewhere, make a link. You can then apply any handler to it, just don’t prevent opening it in a new tab. If an element does some action within the page, use a `button`. More details and examples can be found in my [post about proper links](/en/Links,_please/).

Besides all the above, “obtrusive” javascript directly leads to another problem:

## <small class="state-color state-color--danger">Problem</small><br>Low fault tolerance

What would happen if the CDN server serving js files goes down? If one of the scripts fails to execute correctly? That’s right, half of the functionality won’t work. It could’ve been working though, even if not as good as with the scripts.

Screenshot gallery becomes an empty rectangle without js, thumbs and scroll aren’t working either:

![](gallery-nojs.jpg =621x443)

## <small class="state-color state-color--success">Solution</small><br>Use proper fallbacks

Put the screenshots into a horizontally scrollable block, which will then become a normal gallery after the initialization. Since all the UI element are useless without javascript, hide them until the init.

To implement this approach it’s enough to give the gallary `inactive` class, which will be then changed to `active` upon initialization, and write a bunch of styles for both states:

</div>

::: .demo .is-fullwidth
<div class="steam-demo">
    <section class="gallery peppermint steam-demo-peppermint peppermint-inactive">
        <figure>
            <a href="/demos/steam/i/1.jpg" target="_blank"><img src="/demos/steam/i/m1.jpg" width="711" height="400"></a>
        </figure>
        <figure>
            <a href="/demos/steam/i/2.jpg" target="_blank"><img src="/demos/steam/i/m2.jpg" width="711" height="400"></a>
        </figure>
        <figure>
            <a href="/demos/steam/i/3.jpg" target="_blank"><img src="/demos/steam/i/m3.jpg" width="711" height="400"></a>
        </figure>
    </section>
</div>

<div class="align-center block is-mt-big">
    <button class="button is-white" id="launch-it">Launch me</button>
</div>

:::

<div class="text">

<script>
    $('#launch-it').click(function() {
        $('.steam-demo-peppermint').Peppermint({
            dots: true,
            mouseDrag: true
        });

        $(this).attr('disabled','disabled');
    });
</script>

Now you can view the screenshots even if the javascript is broken.

Same approach is applicable to “add to favourites” button, vote buttons, etc. – you can wrap them in a `form` and cath `submit` event with javascript handler. In case the javascript is not available or broken, the form will be sent to the server and the server can then redirect the user back to the page he came from.

Same with the blocks opening different popups – make ’em links, and they will thrive without javascript.

## A few more things

### Accessibility

Lots of the UI elements aren’t focusable, which means they can’t be <kbd>Tab</kbd>’bed on, and screenreaders, voice control thingies and other accessibility tools won’t know about them.

This is easily fixed by adding `tabindex="0"` to the UI elements and binding a common handler to clicks and <kbd>Enter</kbd> press.

### Performance optimization

Currently, one page load on Steam website generates about 120 requests to the server (cache disabled), including 92 pics, 18 js and 8 css files. All the scripts are located in the `head` element, which significantly delays page rendering.

I concatenated all the scripts and styles, kept the styles in the header and moved the scripts down to the closing `</html>` tag (except for Modernizr, I kept it in the `head` since it affects the styles).

This significantly reduced the amount of requests to the server and the delay before the page starts to render. There are 25 requests in my demo, including 21 pics, 2 scripts and 1 style. The number of the resourses on a real production server may differ, but the difference in the amount of requests is obvious.

My design only uses two png sprites – one for standard screens and one for hign density (plus three fallback images to emulate gradients and translucency in older browsers). At first I used a single svg sprite, but, unfortunately, it significantly dropped the performance in some mobile browsers and also looked blurry in IE mobile. So, for now, it’s safer to use png sprites. Icon fonts are also acceptable, but they have a bunch of flaws, too.

### UI and navigation

There are a lot of unclear and inconsistent moments in Steam’s navigation and the UI overall. A good UI designer could fix the situation. Unfortunately, I’m not one of them.

## Conclusion

**What has been done:** responsive demo meeting the principles of [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement) and [unobtrusive javascript](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript), with improved fault tolerance. Works in IE8+ and in almost every mobile browser.

**What hasn’t been done:** Steam’s header and footer, HTML5-video with a fallback to flash (for the game trailers), skipped a bunch of blocks present on the original page.

The warm-up is officially finished.

## Bonus pack

Code of one of the items in the Steam’s main menu:

```html
<a class="menuitem supernav" href="http://store.steampowered.com/" data-tooltip-content="
    &lt;a class=&quot;submenuitem&quot; href=&quot;http://store.steampowered.com/&quot;&gt;Featured&lt;/a&gt;
    &lt;a class=&quot;submenuitem&quot; href=&quot;http://store.steampowered.com/news/&quot;&gt;News&lt;/a&gt;
    &lt;a class=&quot;submenuitem&quot; href=&quot;http://store.steampowered.com/recommended/&quot;&gt;Recommended&lt;/a&gt;
    &lt;a class=&quot;submenuitem&quot; href=&quot;http://steamcommunity.com/my/wishlist/&quot;&gt;Wishlist&lt;/a&gt;
    &lt;a class=&quot;submenuitem&quot; href=&quot;http://store.steampowered.com/stats/&quot;&gt;STATS&lt;/a&gt;
  ">
    STORE </a>
```

![](wat.jpg =400x266)

</div>
