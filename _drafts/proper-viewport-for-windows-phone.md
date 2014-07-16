---
layout: post
title: "Правильный вьюпорт для винфонов"
categories: internet-maintenance
lang: ru
---

#Правильный вьюпорт для винфонов

Давно заметил, что на винфоне в ландшафтном режиме мобильные сайты получаются какие-то конские, но не придавал этому значения.

В портретном режиме разницы между айосью и винфоном не видно:

<div class="gallery">
{% include pic.htm src='before-portrait.png' p=true c='Windows Phone 8.1' a='Скриншот с винфона в портретном режиме до исправдения' %}
{% include pic.htm src='ipod-portrait.png' p=true c='iOS 7' a='Скриншот с айпода в портретном режиме для сравнения' %}
</div>

В ландшафтном очевидна конскость на винфоне:

<div class="gallery">
{% include pic.htm src='before-landscape.png' p=true c='Windows Phone 8.1' a='Скриншот с винфона в ландшафтном режиме до исправдения' %}
{% include pic.htm src='ipod-landscape.png' p=true c='iOS 7' a='Скриншот с айпода в ландшафтном режиме для сравнения' %}
</div>

Оказалось ([ппк рассказал](https://vimeo.com/100523275)), традиционный мета-тег `<meta name="viewport" content="width=device-width, initial-scale=1">` воспринимается винфоном как указание сделать вьюпорт шириной 320 пикселей не зависимо от разрешения девайса (потому что айфон).

Зато свежий сочный `@viewport {width: device-width;}`, который и поддерживается-то сейчас только винфоном, не только оверрайдит значение мета-тега, но и говорит винфону пользоваться его родным вьюпортом.

Теперь все как и должно быть:

<div class="gallery">
{% include pic.htm src='before-landscape.png' p=true c='Было' a='Скриншот с винфона в ландшафтном режиме до исправдения' %}
{% include pic.htm src='ipod-landscape.png' p=true c='Стало' a='Скриншот с айпода в ландшафтном режиме для сравнения' %}
</div>

В портретном режиме тоже видны небольшие изменения (у HTC 8x больше разрешение, чем у айпода, ретинистость у обоих одинаковая, значит, вьюпорт на HTC должен быть немного шире 320 пикселей):

<div class="gallery">
{% include pic.htm src='before-portrait.png' p=true c='Было' a='Скриншот с винфона в портретном режиме до исправдения' %}
{% include pic.htm src='after-portrait.png' p=true c='Стало' a='Скриншот с винфона в портретном режиме после исправдения' %}
</div>

##Респонсивность на 8 винде

Еще, оказывается,

{% include pic.htm src='after-portrait.png' p=true c='Стало' a='Скриншот с винфона в портретном режиме после исправдения' %}

Все правильные чуваки теперь делают так:

{% highlight html cssclass=codewrap %}
<head>
    ...
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ...
</head>
{% endhighlight %}

и добавляют цсс:

{% highlight css cssclass=codewrap %}
/* с префиксом для ИЕ10 */
@-ms-viewport {
    width: device-width;
}

@viewport {
    width: device-width;
}
{% endhighlight %}

##Ссылки по теме

- [The Mobile Viewports](https://vimeo.com/100523275), *Peter Paul Koch*
- http://timkadlec.com/2013/01/windows-phone-8-and-device-width/
