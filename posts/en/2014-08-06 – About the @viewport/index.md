---
tags:
    - archive
---

<%-
    include('/modules/depricationWarning', {
        lang: _.lang
    })
%>

<small>Originally translated by [Varya Stepanova](http://varya.me/) and posted on [Frontend Babel](http://frontendbabel.info/articles/about-viewport/).</small>

# About the `@viewport`

Once Opera's guys proposed to use `@viewport { ... }` in CSS instead of `<meta name="viewport" ...>` tag. Regarding the reasons [you'd better watch and listen to @ppk](http://vimeo.com/100523275) and I will explain why you should use this right now.

## 1. Proper viewport for Windows Phones

I've noticed long ago that websites on Windows Phone look bulky in landscape mode but never deeply thought about the fact.

You might overlook the difference between iOS and Windows Phone views in portrait mode:

<div class="gallery">
{% include pic.htm src='before-portrait.png' p=true c='Windows Phone 8.1' a='Windows Phone 8.1 screenshot in portrait mode' %}
{% include pic.htm src='ipod-portrait.png' p=true c='iOS 7' a='iOS 7 screenshot in portrait mode' %}
</div>

However in the landscape mode the enourmousness of Windows Phone view becomes clear:

<div class="gallery">
{% include pic.htm src='before-landscape.png' p=true c='Windows Phone 8.1' a='Windows Phone 8.1 screenshot in landscape mode' %}
{% include pic.htm src='ipod-landscape.png' p=true c='iOS 7' a='iOS 7 screenshot in landscape mode' %}
</div>

It turned out that Windows Phone considers usual `<meta name="viewport" content="width=device-width, initial-scale=1">` as a designation to make the viewport 320 logical pixels wide, no matter what real device resolution is (because iPhone).

Instead, fresh and lush `@viewport {width: device-width;}`, which is currently supported only by IE 10 and 11 with prefix, overrides this meta tag's value; and moreover -- instructs a Windows Phone to use its native viewport resolution.

This is how it should work:

<div class="gallery">
{% include pic.htm src='before-landscape.png' p=true c='Before' a='Windows Phone 8.1 landscape screenshot before the change' %}
{% include pic.htm src='after-landscape.png' p=true c='After' a='Windows Phone 8.1 landscape screenshot after the change' %}
</div>

The portrait mode also undergoes a change. HTC 8x has higher resolution then iPod and same pixel density, so its viewport should be a little bit wider than 320 pixels:

<div class="gallery">
{% include pic.htm src='before-portrait.png' p=true c='Before' a='Windows Phone 8.1 portrait screenshot before the change' %}
{% include pic.htm src='after-portrait.png' p=true c='After' a='Windows Phone 8.1 portrait screenshot after the change' %}
</div>

`@-ms-viewport` was buggy on Windows Phone 8 before its third update -- it operated with real pixels and not with logical ones. This caused too large viewport size (and so too small website view) on phones with hight density screens.

Third update came out a while ago, older phones running WP7 are not affected by the bug, so now this bug can be safely ignored.

## 2. Responsiveness on Windows 8 devices

Furthermore, [it turns out](http://timkadlec.com/2013/01/windows-phone-8-and-device-width/) that IE in Windows 8 ignores the meta tag in metro mode but correctly interprets `@-ms-viewport`. Here's a couple of explanatory GIFs:

{% include pic.htm src='win8-before.gif' c='The web site is zoomed when using meta tag' a='Windows ain’t happy about meta tag' %}

{% include pic.htm src='win8-after.gif' c='The website adapts when using <code>@-ms-viwport</code>' a='Windows is happy about @viewport' %}

In the first case we get a non-adaptive web site. Bad. The second approach gives a mobile version snapped to the edge of the screen. Splendid!

## What do we do?

All the real guys are now combining the meta tag:

```html
<head>
    ...
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ...
</head>
```

with CSS `@viewport` declaration:

```css
@-ms-viewport {
    width: device-width;
}

@viewport {
    width: device-width;
}
```

Advantages:

- Responsiveness in IE on Windows 8
- Native viewport in IE on Windows Phones
- Future-proof!

Drawbacks:

- Viewport is broken on Windows Phone without third update

## Related links

- [CSS Device Adaptation](http://dev.w3.org/csswg/css-device-adapt/), *W3C*
- [@-ms-viewport rule](http://msdn.microsoft.com/en-us/library/ie/hh869615%28v%3Dvs.85%29.aspx), *MSDN*
- [The Mobile Viewports](https://vimeo.com/100523275), *Peter Paul Koch*
- [IE10 Snap Mode and Responsive Design](http://timkadlec.com/2012/10/ie10-snap-mode-and-responsive-design/), *Tim Kadlec*
- [Windows Phone 8 and Device-Width](http://timkadlec.com/2013/01/windows-phone-8-and-device-width/), *Tim Kadlec*
