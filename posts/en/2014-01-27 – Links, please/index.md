---
description: 'There will come a day when the most advanced IT companies will finally learn to use links. Those will be good times.'
image: cover.png
---

# Links, please

<%- include('/svg/history-solid.svg') %>The examples referenced in the post are long outdated, but the meaning of the post is still relevant.
{.notice .is-with-icon .is-info .block .is-mb-big}

There will come a day when the [most](//twitter.com) [advanced](//instagram.com) [IT companies](//plus.google.com) will finally learn to use links. Those will be good times.

## Three rules of the links

### First

If you desperately want to put `javascript: void(0);`, `#` or something similar in a `href` attribute, calm down, take a deep breath and use a `button`.

Buttons work with `click` events, `:hover` and `:active` styles and catch focus when <kbd>tab</kbd>&rsquo;bing just like links do. Unbelievable!

<div class="text-container notice is-with-big-icon font-size is-smaller block is-mb">

<%- include('/svg/umbrella-solid.svg') %>You can use any other element, e.&nbsp;g. `span`, but it won’t be focusable, and <kbd>enter</kbd> won’t trigger `click` event handlers, which is far from ideal for accessibility reasons.

You can set `tabindex="0"` to make it focusable and add a `keypress` event listener, or you can just use a `button`, which is also semantically more appropriate.

</div>

### Second

If you really want to put `onclick="location.href='...'"` in your element, stop, take a breath one more time and make a link. Now people can open your link in a new tab, use context menu functions, and even see the adress it points to just by hovering the mouse. Astonishing!

### Third

The only case when you can (and should) bind a js handler to a link – if a link actually leads somewhere. In this case, the handler should only trigger for left mouse button clicks without modifier keys.

Classic example: photo thumbnails. When you click on a thumbnail – large photo is shown on top of the content. If you click it with the mouse wheel or <kbd>ctrl</kbd>-click it – new tab with large photo is opened. Context menu also works just fine. Users with disabled&nbsp;/ broken js get a working link on a photo. Everybody is happy:

HTML:

```html
<%- include('proper-link.html') %>
```

JS + jQuery:

```js
<%- include('proper-link.js') %>
```

Result:

<figure>
    <%- include('proper-link.html') %>
</figure>

<script src="/js/jquery-3.5.1.slim.min.js"></script>
<script>
<%- include('proper-link.js') %>
</script>

In IE8 and lower, click events have `button` property always set to `0`. As a result, middle mouse button clicks also pass the check, but everything else is working just fine. <del>I wouldn’t make a fuss over this, but if you really want to get it working as intended, [you may try](http://unixpapa.com/js/mouse.html).</del> <span class="notice is-info is-inline"><%- include('/svg/history-solid.svg') %> No need, IE8 is long dead.</span>

## Good guys

There are many more cases where you should keep the functionality of a link. Here are some good examples:

### Pagination

[VK’s paginator](http://vk.com/wall-35502680_11833) switches pages asynchronously, but still allows you to open a specific page in a new tab.

### Login / registration forms

[Reddit](//reddit.com)'s login &amp; registration form opens in a popup on top of the current page when clicked with left mosue button, and in a new tab when clicked with the mouse wheel. Unfortunately, they don’t check for modifier keys.

### Extended functionality

I accidentally came across this one when [metacritic](http://www.metacritic.com/game/pc/limbo)'s scripts refused to load for me. *Expand* button under user reviews is, in fact, a link with a GET parameter, e.&nbsp;g. `?user_review_id=1713311`. If javascript is disabled or (in my case) broken, the server will serve you the same page with an expanded review. This is a great example of [unobtrusive js](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript) at work, saving website’s functionality while CDN server is down.

## Bad guys

### Twitter

Twitter resolved to follow the straight and narrow and began to gradually correct their rubbish. We can finally open user profiles in a new tab – good. *Refresh* button in the sidebar and *compose new tweet* button are both using `button` element – also good (would be actually better if the last one was a link leading to a separate page with a form to compose a new tweet).

Nonetheless, there are still lots of `<a href="#">` nonsense. *Reply*, *retweet* and *favourite* links aren’t pointing anywhere, while [they](https://twitter.com/intent/tweet?in_reply_to=386573856179113985) [definitely](https://twitter.com/intent/retweet?tweet_id=386573856179113985) [could](https://twitter.com/intent/favorite?tweet_id=386573856179113985).

### Google+ {#google-plus}

Same situation here. It’s not the same mess it used to be a while ago, but there’re still things to fix. Cycles menu on top of the home page still uses `data-dest="stream/circles/p4765f1c30e7d2c98"` nonsense istead of normal links, and the userpic in the upper right corner is a link with my favourite `javascript:void(0)`.

### Instagram

It’s dreadful. `javascript:;` in `href`s, none of the links can be opened in a new tab. They made async navigation via history states, but, it seems, they never heard of the tabs. It’s fiiiine, one tab is more then enough for an average hipster, right?

## TL;DR

Use `button` for actions within the page, `a` for links and actions that have a fallback URL.

Despite the fact that nowadays it’s nearly impossible to find a device without javascript, there still is a good chance that javascript either executes with errors, or just doesn’t load. In this case good [unobtrusive js](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript) and proper fallbacks will save the day and the functionality of your site.

## Related links

- [“When is a link not a link?”](http://adactio.com/journal/6022/), *Jeremy Keith*
- [Javascript Madness: Mouse Events](http://unixpapa.com/js/mouse.html), *Jan Wolter*
