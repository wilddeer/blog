---
layout: post
title: "Пепякошрифт средствами css-анимаций"
categories: experiments
lang: ru
---

<style>
    .pep-holder {
        text-align: center;
        padding: 3em 1em;
        margin-left: 0;
        margin-right: 0;
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
        margin-top: 1em;
        margin-bottom: 2em;
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
</style>

<script>
dzDelayed.push(function() {
    if (!Modernizr.textshadow || !Modernizr.cssanimations || !Modernizr.csstransforms) {
        $('.pep-holder').html('<p><i class="icon-bug"></i> Упс! Ваш браузер <i>не умеет в анимации</i>!</p>');
        return;
    }

    var pepBox = $('.pepyaka'),
        pepInput = $('#pep_input'),
        asyncInput = $('#async'),
        sharpInput = $('#sharp'),
        canExecEvent = true,
        oldVal,
        oldRand;

    function redraw(force) {
        var result = '',
            val = pepInput[0].value;

        if (!force && (!canExecEvent || oldVal == val)) return;

        oldVal = val;

        for (var i = 0; i < val.length; i++) {
            var rand = antiJekpotRandom(0, 7, oldRand);

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
        redraw();
    })
    asyncInput.on('change', function() {
        pepBox.toggleClass('async');
        redraw(true);
    });

    sharpInput.on('change', function() {
        pepBox.toggleClass('smooth');
        redraw(true);
    });

    moveCursorToEnd(pepInput[0]);
    redraw();
});
</script>

<p class="pep-input-holder">
    <input type="text" value="Яррр!" id="pep_input" class="big" placeholder="Запепячить">
</p>

<div class="pep-holder">
    <p class="pepyaka async">
    </p>
</div>

<p class="pep-constols-holder">
    <label><input type="checkbox" id="async" checked> Асинхронно</label>
    <label><input type="checkbox" id="sharp"> Плавная анимация</label>
</p>

Мой старый эпилептичный шрифт с [Пепяки](//pepyaka.su), воссозданный средствами CSS3.

Стилей неприлично много. Основная проблема --- у `text-shadow`, в отличии от `box-shadow`, отсутствует параметр `spread`, позволяющий с помощью тени сделать обводку. Приходится имитировать обводку восьмью тенями.

Кроме того, нельзя задать отдельно только цвет тени, поэтому каждый блок из восьми теней приходится повторять в каждом ключевом кадре анимации.

Одно хорошо: последняя Опера на Presto и последний Фаерфокс понимают анимации без префиксов, а ИЕ10 изначально не нуждался в префиксе. Остается только префикс `-webkit`.

Чтобы буквы дребезжали вразнобой, каждой букве выдан рандомный класс. Всего 8 классов (по одному на каждый шаг анимации), каждый с `animation-delay` равным длине шага анимации, умноженной на номер класса.

Сила "дребезжания" букв немного варьируется от браузера к браузеру. Я настраивал по Хрому, в других на глаз дребезжит потише.

В номинации "четкий, дерзкий" среди мобилок побеждает IE10 на винфоне. Анимирует что надо. На слабеньких мобильных вебкитах постоянно сбивается рассинхронизация и фреймрейт в целом весьма тосклив. Самая жесть в Опере Классик на Андроиде (как, впрочем, и на десктопе).

HTML:

{% highlight html cssclass=codewrap %}
<div class="pepyaka async">
    <span class="pep5">Я</span><span class="pep2">р</span><span class="pep7">р</span><span class="pep3">р</span><span class="pep0">!</span>
</div>
{% endhighlight %}

CSS:

{% highlight css cssclass=codewrap %}
{% include snippets/pepyaka-font.css %}
{% endhighlight %}

<style>
{% include snippets/pepyaka-font.css %}
</style>