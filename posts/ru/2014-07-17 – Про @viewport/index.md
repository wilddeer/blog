---
tags:
    - archive
---

<%-
    include('/modules/depricationWarning', {
        lang: $.lang
    })
%>

# Про `@viewport`

Однажды чуваки из Оперы предложили вместо мета-тега `<meta name="viewport" ...>` использовать цсс-ный `@viewport { ... }`. Как, зачем и почему, [послушайте у ппк](https://vimeo.com/100523275), а я расскажу, зачем его стоит начать использовать прямо сейчас.

## 1. Правильный вьюпорт для винфонов

Давно заметил, что на винфоне в ландшафтном режиме мобильные сайты получаются какие-то конские, но не придавал этому значения.

В портретном режиме разницы между айосью и винфоном не видно:

<%-
    include('/modules/pics', {
        pics: [
            {
                src: 'before-portrait.png',
                hasPreview: true,
                alt: 'Скриншот с винфона в портретном режиме до исправдения',
                caption: 'Windows Phone 8.1'
            },
            {
                src: 'ipod-portrait.png',
                hasPreview: true,
                alt: 'Скриншот с айпода в портретном режиме для сравнения',
                caption: 'iOS 7'
            }
        ]
    })
%>

В ландшафтном очевидна конскость на винфоне:

<%-
    include('/modules/pics', {
        pics: [
            {
                src: 'before-landscape.png',
                hasPreview: true,
                alt: 'Скриншот с винфона в ландшафтном режиме до исправдения',
                caption: 'Windows Phone 8.1'
            },
            {
                src: 'ipod-landscape.png',
                hasPreview: true,
                alt: 'Скриншот с айпода в ландшафтном режиме для сравнения',
                caption: 'iOS 7'
            }
        ]
    })
%>

Оказалось, традиционный мета-тег `<meta name="viewport" content="width=device-width, initial-scale=1">` воспринимается винфоном как указание сделать вьюпорт шириной 320 (логических) пикселей не зависимо от разрешения девайса (потому что айфон).

Зато свежий сочный `@viewport {width: device-width;}`, который и поддерживается-то сейчас только в ИЕ 10 и 11 с префиксом, не только оверрайдит значение мета-тега, но и говорит винфону пользоваться его родным вьюпортом.

Теперь все как и должно быть:

<%-
    include('/modules/pics', {
        pics: [
            {
                src: 'before-landscape.png',
                hasPreview: true,
                alt: 'Скриншот с винфона в ландшафтном режиме до исправдения',
                caption: 'Было'
            },
            {
                src: 'after-landscape.png',
                hasPreview: true,
                alt: 'Скриншот с винфона в ландшафтном режиме после исправдения',
                caption: 'Стало'
            }
        ]
    })
%>

В портретном режиме тоже видны небольшие изменения (у HTC 8x больше разрешение, чем у айпода, ретинистость у обоих одинаковая, значит, вьюпорт на HTC должен быть немного шире 320 пикселей):

<%-
    include('/modules/pics', {
        pics: [
            {
                src: 'before-portrait.png',
                hasPreview: true,
                alt: 'Скриншот с винфона в портретном режиме до исправдения',
                caption: 'Было'
            },
            {
                src: 'after-portrait.png',
                hasPreview: true,
                alt: 'Скриншот с винфона в портретном режиме после исправдения',
                caption: 'Стало'
            }
        ]
    })
%>

На WP 8 до третьего обновления `@-ms-viewport` был забагованный, потому как смотрел не на логические пиксели, а на реальные, что приводило к слишком большому размеру вьюпорта (и слишком мелкому сайту) на ретинистых винфонах.

Третье обновление вышло давно (осень 2013, вроде), все уже должны были давно обновиться (уже обновляются на WP 8.1, на самом деле), старье на WP 7 баг не затрагивает, поэтому сейчас на баг можно смело забить.

## 2. Респонсивность на девайсах с 8 виндой

Еще, [как выяснилось](http://timkadlec.com/2013/01/windows-phone-8-and-device-width/), ИЕ в 8 винде в метро-режиме совсем не смотрит на мета-тег, зато прекрасно понимают `@-ms-viewport`. Вот пара поясняющих гифок:

<%-
    include('/modules/pic', {
        src: 'win8-before.gif',
        alt: 'Демонстрация того, как винда не воспринимает мета-тег',
        caption: 'С мета-тегом сайт зумится'
    })
%>

<%-
    include('/modules/pic', {
        src: 'win8-after.gif',
        alt: 'Демонстрация того, как винда радуется наличию @viewport',
        caption: 'С <code>@-ms-viwport</code> сайт адаптируется'
    })
%>

В первом случае получаем поведение неоптимизированного сайта --- не кайф. Во втором получается мобильная версия, закрепленная у края экрана. Кайф.

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
- Фьючур пруф!

Минус:

- Ломается вьюпорт на винфонах без третьего обновления

## Ссылки по теме

- [CSS Device Adaptation](http://dev.w3.org/csswg/css-device-adapt/), *W3C*
- [@-ms-viewport rule](http://msdn.microsoft.com/en-us/library/ie/hh869615%28v%3Dvs.85%29.aspx), *MSDN*
- [The Mobile Viewports](https://vimeo.com/100523275), *Peter Paul Koch*
- [IE10 Snap Mode and Responsive Design](http://timkadlec.com/2012/10/ie10-snap-mode-and-responsive-design/), *Tim Kadlec*
- [Windows Phone 8 and Device-Width](http://timkadlec.com/2013/01/windows-phone-8-and-device-width/), *Tim Kadlec*
