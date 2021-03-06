---
description: 'Имитация переключателя из iOS 7 на HTML + CSS.'
image: cover.png
langLink: 'ios_7_style_switch'
---

# Переключатель в стиле iOS 7 {.sr-only}

<style>
    /* demo styles */
    .button-demo .button-smaple {
        margin-bottom: 1.2em;
        line-height: 1em;
    }

    .button-demo .button-smaple label {
        vertical-align: middle;
        margin: 8px 16px; /* fallback */
        margin: 0.5rem 1rem;
    }

    .button-demo .ios7-switch.line-sample {
        display: block;
        font-size: 1.2em;
        text-align: left;
        max-width: 25em;
        line-height: 1.5em;
        margin: 0 auto;
        border: solid #eee;
        border-width: 1px 0 1px 0;
        padding: 0.5em 1em;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .button-demo .line-sample span {
        float: right;
        font-size: 1.5em;
    }

    <%- include('ios7-switch.css') %>
</style>

<figure class="button-demo">
    <div class="button-smaple">
        <label class="ios7-switch" style="font-size: 128px;">
            <input type="checkbox" checked>
            <span></span>
        </label>
    </div>
    <div class="button-smaple">
        <label class="ios7-switch" style="font-size: 32px;">
            <input type="checkbox">
            <span></span>
        </label>
        <label class="ios7-switch" style="font-size: 48px;">
            <input type="checkbox">
            <span></span>
        </label>
        <label class="ios7-switch" style="font-size: 64px;">
            <input type="checkbox">
            <span></span>
        </label>
    </div>
    <label class="ios7-switch line-sample">
        Покормить кота
        <input type="checkbox" checked>
        <span></span>
    </label>
</figure>

Имитация переключателя из iOS 7. Переключатель планировалось использовать на новой [Пепяке](http://pepyaka.su), но в результате я забил на него. Пусть тут полежит. Фичи:

- никаких дурацких скриптов, чистый CSS,
- наиболее точное воспроизведение поведения переключателя из айОси, включает стили для состояния `:active` (чего я не нашел ни в одной другой имитации),
- все размеры в `em`-ах, размер переключателя зависит от размера текста,
- доступен с клавиатуры.

[<%- include('/svg/code-branch.svg') %>Форк ми, бейби](https://github.com/wilddeer/ios7-switch)

## Разметка

```html
<label class="ios7-switch">
    <input type="checkbox" checked>
    <span></span>
</label>
```

или

```html
<label class="ios7-switch">
    <input type="checkbox" checked>
    <span></span>
    Mah shitty option!
</label>
```

или что-то другое в этом роде, идея понятна.

## CSS

```css
<%- include('ios7-switch.css') %>
```

## Проблемы

<del class="deleted-block">

Не работает в браузерах, не поддерживающих `box-shadow` (ИЕ8 и ниже, Андроид 3.x и ниже). Можно сделать фоллбек на обычный чекбокс, например, с помощью [Модернайзера](http://modernizr.com). Пишем тест:

```js
Modernizr.addTest(
    'unprefixed-boxshadow',
    Modernizr.testProp('boxShadow', '1px 1px', true)
);
```

и используем модифицированный CSS — <a href="https://raw.githubusercontent.com/wilddeer/ios7-switch/master/ios7-switch.modernizr.css" class="iconlink"><i class="icon-cloud-download"> </i><span>ios7-switch.modernizr.css</span></a>.

</del>

<%- include('/svg/history-solid.svg') %> В 2020 это не проблемы :—)
{.notice .is-success}

Есть проблемы с ошибками округления в некоторых браузерах при определенных размерах шрифта. Обходятся небольшими твиками размера шрифта.

## По теме

- [Модный переключатель](http://pepelsbey.net/2012/08/stylish-switch/), *Вадим Макеев*
- [iOS 6 switch style checkboxes with pure CSS](http://lea.verou.me/2013/03/ios-6-switch-style-checkboxes-with-pure-css/), *Lea Verou*
