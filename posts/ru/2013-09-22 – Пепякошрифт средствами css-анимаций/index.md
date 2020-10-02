---
description: 'Мой старый эпилептичный шрифт с Пепяки, воссозданный средствами CSS3.'
image: cover.png
layout: layouts/postWrap
postMod: is-no-padding-top
---

# Пепякошрифт средствами css-анимаций {.sr-only}

<style>
    <%- include('pepyaka-font.css') %>

    .pep-holder {
        text-align: center;
        padding: 5em 1em;
        margin-left: 0;
        margin-right: 0;
        width: 100%;
        max-width: 100%;
        margin-bottom: 0.5em;
        box-shadow: inset 0 0 1.5em rgba(15,15,0,0.2),
                    inset 0 0.3em 0.3em rgba(15,15,0,0.2);
        background-size: 2.8em 2.8em;
        background-color: #ebe7d7;
        background-image: -webkit-linear-gradient(0deg, rgba(0,0,0,.05) 50%, transparent 50%, transparent);
        background-image: -moz-linear-gradient(0deg, rgba(0,0,0,.05) 50%, transparent 50%, transparent);
        background-image: linear-gradient(90deg, rgba(0,0,0,.05) 50%, transparent 50%, transparent);
    }

    .pep-holder > p {
        margin: 0;
    }

    .pep-input-holder {
        padding-top: 2em;
        padding-bottom: 2em;
    }

    #pep_input {
        width: 100%;
    }

    .pep-constols-holder {
        text-align: center;
    }

    .pep-constols-holder label {
        display: inline-block;
        margin: 0.2em 0.5em 0 0.5em;
    }

    html.no-js .pep-input-holder,
    html.no-js .pep-constols-holder {
        display: none;
    }
</style>


<p class="pep-input-holder">
    <input class="input" type="text" value="Яррр!" id="pep_input" placeholder="Запепячить">
</p>

<div class="content-fullwidth block is-mb-big">
    <div class="pep-holder">
        <p class="pepyaka async">
            <span class="pep5">Я</span><span class="pep2">р</span><span class="pep7">р</span><span class="pep3">р</span><span class="pep0">!</span>
        </p>
    </div>
    <p class="pep-constols-holder">
        <label><input type="checkbox" id="async" checked> Асинхронно</label>
        <label><input type="checkbox" id="sharp"> Плавная анимация</label>
    </p>
</div>

<div class="text">

Мой старый эпилептичный шрифт с [Пепяки](//pepyaka.su), воссозданный средствами CSS3.

Стилей неприлично много. Основная проблема — у `text-shadow`, в отличии от `box-shadow`, отсутствует параметр `spread`, позволяющий с помощью тени сделать обводку. Приходится имитировать обводку восьмью тенями.

Кроме того, нельзя задать отдельно только цвет тени, поэтому каждый блок из восьми теней приходится повторять в каждом ключевом кадре анимации.

Одно хорошо: последняя Опера на Presto и последний Фаерфокс понимают анимации без префиксов, а ИЕ10 изначально не нуждался в префиксе. Остается только префикс `-webkit`.

Чтобы буквы дребезжали вразнобой, каждой букве выдан рандомный класс. Всего 8 классов (по одному на каждый шаг анимации), каждый с `animation-delay` равным длине шага анимации, умноженной на номер класса.

Плавность анимации можно настроить количеством шагов анимации между ключевыми кадрами. Чем больше шагов, тем плавнее анимация:

```css
-webkit-animation-timing-function: steps(1);
animation-timing-function: steps(1);
```

Для непрерывной анимации `steps()` заменяем на `linear` (или просто стираем `animation-timing-function`, так как `linear` используется по умолчанию).

<del>Сила "дребезжания" букв немного варьируется от браузера к браузеру. Я настраивал по Хрому, в других на глаз дребезжит потише.</del> После очередного обновления у Хрома теперь как у всех. Вот и отлично.

В номинации «четкий, дерзкий» среди мобилок побеждает IE10 на винфоне. Анимирует что надо. На слабеньких мобильных вебкитах постоянно сбивается рассинхронизация и фреймрейт в целом весьма тосклив. Самая жесть в Опере Классик на Андроиде (как, впрочем, и на десктопе).

HTML:

```html
<div class="pepyaka async">
    <span class="pep5">Я</span><span class="pep2">р</span><span class="pep7">р</span><span class="pep3">р</span><span class="pep0">!</span>
</div>
```

CSS:

```css
<%- include('pepyaka-font.css') %>
```

</div>

<script src="/js/jquery-3.5.1.slim.min.js"></script>

<script>
(function() {
    function antiJackpotRandom(min, max, old) {
        var rand = Math.floor((Math.random()*(max-min+1))+min);

        /* sick recursion! */
        return (rand == old?antiJackpotRandom(min, max, old):rand);
    }

    var pepBox = $('.pepyaka'),
        pepInput = $('#pep_input'),
        asyncInput = $('#async'),
        sharpInput = $('#sharp'),
        canExecEvent = true,
        val = pepInput[0].value,
        oldRand;

    function redraw() {
        var result = '';

        val = pepInput[0].value;

        for (var i = 0; i < val.length; i++) {
            var rand = antiJackpotRandom(0, 7, oldRand);

            oldRand = rand;

            result += '<span class="pep'+rand+'">' + (val[i]==' '?'&nbsp;':val[i]) + '</span>';
        }

        if (!result) result = '<i class="icon-bug"></i>';

        pepBox.html(result);

        canExecEvent = false;
        setTimeout(function() {
            canExecEvent = true;
        }, 50);
    }

    pepInput.on('change input keyup blur', function() {
        if (canExecEvent && val != pepInput[0].value) redraw();
    })

    asyncInput.on('change', function() {
        pepBox.toggleClass('async');
        redraw();
    });

    sharpInput.on('change', function() {
        pepBox.toggleClass('smooth');
        redraw();
    });

    function moveCursorToEnd(el) {
        if (typeof el.selectionStart == "number") {
            el.focus();
            el.selectionStart = el.selectionEnd = el.value.length;
        }
        else if (typeof el.createTextRange != "undefined") {
            el.focus();
            var range = el.createTextRange();
            range.collapse(false);
            range.select();
        }
        else {
            el.focus();
        }
    }

    moveCursorToEnd(pepInput[0]);
}());
</script>
