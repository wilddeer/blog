---
layout: post
title: "Пепякошрифт средствами css-анимаций"
h1: "Пепякошрифт средствами css-анимаций"
categories: experiments
lang: ru
---

<style>
    .pepyaka {
        text-align: center;
        padding: 3em 1em;
        margin-left: 0;
        margin-right: 0;
        max-width: 100%;
        margin-bottom: 2em;
        box-shadow: inset 0 0 1.5em rgba(15,15,0,0.2),
                    inset 0 0.3em 0.3em rgba(15,15,0,0.2);
        background-size: 2.8em 2.8em;
        background-color: #ebe7d7;
        background-image: -webkit-linear-gradient(0deg, rgba(0,0,0,.05) 50%, transparent 50%, transparent);
        background-image: -moz-linear-gradient(0deg, rgba(0,0,0,.05) 50%, transparent 50%, transparent);
        background-image: linear-gradient(90deg, rgba(0,0,0,.05) 50%, transparent 50%, transparent);
    }

    .pep-input-holder {
        margin-top: 1em;
        margin-bottom: 2em;
    }

    #pep_input {
        width: 100%;
    }
</style>

<script>
dzDelayed.push(function() {
    var pepBox = $('.pepyaka'),
        pepInput = $('#pep_input'),
        canExecEvent = true,
        oldVal = pepInput[0].value,
        oldRand;

    moveCursorToEnd(pepInput[0]);

    pepInput.on('change input keyup blur', function() {
        var result = '',
            val = this.value;

        if (!canExecEvent || oldVal == val) return;

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
    });
});
</script>

<p class="pep-input-holder"><input value="Яррр!" id="pep_input" placeholder="Запепячить"></p>

{% include snippets/pepyaka-font.htm %}

Мой старый эпилептичный шрифт с [Пепяки](//pepyaka.su), воссозданный средствами CSS3.

CSS-кода неприлично много. Основная проблема --- у `text-shadow`, в отличии от `box-shadow`, отсутствует параметр `spread`, позволяющий с помощью тени сделать обводку. Приходится имитировать обводку восьмью тенями.

Кроме того, нельзя задать отдельно только цвет тени, поэтому каждый блок из восьми теней приходится повторять в каждом ключевом кадре анимации.

Чтобы буквы дребезжали вразнобой, каждой букве выдан рандомный класс. Всего 8 классов (по одному на каждый шаг анимации), каждый с `animation-delay` равным длине шага анимации, умноженной на номер класса.

Сила "дребезжания" букв немного варьируется от браузера к браузеру. Я настраивал по Хрому, в других на глаз дребезжит потише.

Одно хорошо: последняя Опера на Presto и последний Фаерфокс понимают анимации без префиксов, а ИЕ10 изначально не нуждался в префиксе. Это избавляет от совсем уж неприличных размеров куска кода.

HTML:

{% highlight html cssclass=codewrap %}
{% include snippets/pepyaka-font.htm %}
{% endhighlight %}

CSS:

{% highlight css cssclass=codewrap %}
{% include snippets/pepyaka-font.css %}
{% endhighlight %}

<style>
{% include snippets/pepyaka-font.css %}
</style>