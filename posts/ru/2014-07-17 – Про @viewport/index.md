---
description: 'Альтернатива <meta name="viewport" ...> в CSS.'
image: cover.png
langLink: 'about_the_@viewport'
tags:
    - archive
---

# Про `@viewport`

<%- include('/svg/history-solid.svg') %>**Устаревшая фигня!** За прошедшие годы винфон и ИЕ умерли, а остальные браузеры не стали поддерживать `@viewport`{.is-colored-bg}.
{.notice .is-with-icon .is-warning .block .is-mb-big}

Однажды чуваки из Оперы предложили вместо мета-тега `<meta name="viewport" ...>` использовать цсс-ный `@viewport { ... }`. Как, зачем и почему, [послушайте у ппк](https://vimeo.com/100523275), а я расскажу, зачем его стоит начать использовать прямо сейчас.

## 1. Правильный вьюпорт для винфонов

Давно заметил, что на винфоне в ландшафтном режиме мобильные сайты получаются какие-то конские, но не придавал этому значения.

В портретном режиме разницы между айосью и винфоном не видно:

::: .pics
![Windows Phone 8.1](before-portrait.png =360x640)

![iOS 7](ipod-portrait.png =360x640)
:::

В ландшафтном очевидна конскость на винфоне:

![Windows Phone 8.1](before-landscape.png =640x360)
{.is-phone-fullwidth}

![iOS 7](ipod-landscape.png =640x360)
{.is-phone-fullwidth}

Оказалось, традиционный мета-тег `<meta name="viewport" content="width=device-width, initial-scale=1">` воспринимается винфоном как указание сделать вьюпорт шириной 320 (логических) пикселей не зависимо от разрешения девайса (потому что айфон).

Зато свежий сочный `@viewport {width: device-width;}`, который и поддерживается-то сейчас только в ИЕ 10 и 11 с префиксом, не только оверрайдит значение мета-тега, но и говорит винфону пользоваться его родным вьюпортом.

Теперь все как и должно быть:

![Было](before-landscape.png =640x360)
{.is-phone-fullwidth}

![Стало](after-landscape.png =640x360)
{.is-phone-fullwidth}

В портретном режиме тоже видны небольшие изменения (у HTC 8x больше разрешение, чем у айпода, ретинистость у обоих одинаковая, значит, вьюпорт на HTC должен быть немного шире 320 пикселей):

::: .pics
![Было](before-portrait.png =360x640)

![Стало](after-portrait.png =360x640)
:::

На WP 8 до третьего обновления `@-ms-viewport` был забагованный, потому как смотрел не на логические пиксели, а на реальные, что приводило к слишком большому размеру вьюпорта (и слишком мелкому сайту) на ретинистых винфонах.

Третье обновление вышло давно (осень 2013, вроде), все уже должны были давно обновиться (уже обновляются на WP 8.1, на самом деле), старье на WP 7 баг не затрагивает, поэтому сейчас на баг можно смело забить.

## 2. Респонсивность на девайсах с 8 виндой

Еще, [как выяснилось](http://timkadlec.com/2013/01/windows-phone-8-and-device-width/), ИЕ в 8 винде в метро-режиме совсем не смотрит на мета-тег, зато прекрасно понимают `@-ms-viewport`. Вот пара поясняющих гифок:

![С мета-тегом сайт зумится](win8-before.gif =640x427)
{.is-phone-fullwidth}

![С <code>@-ms-viwport</code> сайт адаптируется](win8-after.gif =640x427)
{.is-phone-fullwidth}

В первом случае получаем поведение неоптимизированного сайта — не кайф. Во втором получается мобильная версия, закрепленная у края экрана. Кайф.

## Как быть

Все правильные чуваки теперь делают так:

```html
<head>
    ...
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ...
</head>
```

и добавляют цсс:

```css
@-ms-viewport {
    width: device-width;
}

@viewport {
    width: device-width;
}
```

Плюсы:

- Респонсивность в ИЕ на вин8
- Родной вьюпорт на винфонах
- <del>Фьючур пруф!</del> <span class="notice is-info is-inline"><%- include('/svg/history-solid.svg') %> Ноуп.</span>

Минус:

- Ломается вьюпорт на винфонах без третьего обновления

## Ссылки по теме

- [CSS Device Adaptation](http://dev.w3.org/csswg/css-device-adapt/), *W3C*
- [@-ms-viewport rule](http://msdn.microsoft.com/en-us/library/ie/hh869615%28v%3Dvs.85%29.aspx), *MSDN*
- [The Mobile Viewports](https://vimeo.com/100523275), *Peter Paul Koch*
- [IE10 Snap Mode and Responsive Design](http://timkadlec.com/2012/10/ie10-snap-mode-and-responsive-design/), *Tim Kadlec*
- [Windows Phone 8 and Device-Width](http://timkadlec.com/2013/01/windows-phone-8-and-device-width/), *Tim Kadlec*
