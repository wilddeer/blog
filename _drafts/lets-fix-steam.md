---
layout: post
title: "Чиним Steam"
categories: internet-maintenance
lang: ru
---

<style>
  .steam-demo {
    width: 100%;
    font-size: 16px;
    color: white;
    background: #222;
    padding: 1.5em 1em;
    font-family: Arial, Helvetica, sans-serif;
    color: #f5f5f5;
    margin-bottom: 1.5em;
  }

  .steam-demo.white {
    background: transparent;
  }

  @media all and (min-width: 40em) {
    .steam-demo {
      width: 92%;
      padding: 1.5em;
    }
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

  .js-controls {
    text-align: center;
  }
</style>

#Чиним Steam {#header}

Стим всем хорош, но сайт у них ужасный. Все классные идеи чуваков из валва получают то или иное воплощение на сайте, но реализация фронтэнда страдает. По полочкам:

###Мобильная версия сосет

Отдельная версия сайта для мобильный устройств не распознает половину мобильных девайсов и не обладает и половиной функционала полной версии. Например, недавно добавленные пользовательский обзоры игр полностью отсутствуют в мобильной версии.

Между тем обрезанный функционально мобильный сайт ни к чему хорошему не приводит. Есть [очень хорошая и короткая книжка](http://www.abookapart.com/products/mobile-first) по этому поводу.

###Контент подчиняется дизайну

Вот, например, блок про DLC:

{% include pic.htm src='dlc-block.png' a='Блок про DLC' %}

Что будет, если фраза удлинится в 2 раза? Что получится, если потом перевести эту фразу на язык, в котором она станет еще длиннее? Вот что:

{% include pic.htm src='dlc-block-overflowed.png' c='Блок про DLC развалился :-(' %}

У блока фиксированная высота и ширина (ширина непонятно зачем, ведь у родительского блока точно такая же ширина), а на фоне [картинка](http://cdn4.store.steampowered.com/public/images/v5/game_area_dlc.png). Даже в то время, когда не было классных CSS3-свойств, можно было сделать подобный блок резиновым. С костылями, но без особых проблем.

Подчиняем дизайн контенту:
<style>
{% include snippets/steam-dlc.css %}
</style>

<div class="steam-demo">
{% include snippets/steam-dlc.htm %}
</div>

<p class="js-controls"><button id="fill-it">наполни меня</button></p>

<script>
dzDelayed.push(function() {
  var i = 0;

  $('#fill-it').click(function() {
    $('.game-dlc-notice').append('<p class="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris laoreet nulla non est malesuada, vitae dapibus libero congue. Integer cursus magna ut neque commodo fermentum sed a enim. Ut pharetra urna facilisis laoreet iaculis. Sed sapien nulla, venenatis sit amet magna eu, ultrices aliquam nibh.</p>');

    if (i++ > 3) {
      $(this).text('ну прекрати!').attr('disabled','disabled');
    }
  });
});
</script>

Все удовольствие одним блоком. Заголовок, параграф и пачка стилей:

{% highlight html cssclass=codewrap %}
{% include snippets/steam-dlc.htm %}
{% endhighlight %}

{% highlight css cssclass=codewrap %}
{% include snippets/steam-dlc.css %}
{% endhighlight %}

Старые браузеры получат блок без градиента и круглых уголков, не велика беда.

Проблема с недостаточно гибким дизайном не заканчивается одним блоком. Долгое время блоки с ценами, рассчитанные на доллары, разваливались в русском магазине. Сейчас проблема решена, но блоки с фиксированной шириной все еще попадаются:

{% include pic.htm src='price-overflowed.png' a='Переполненный блок с ценой' c="Стим не выдержит еще одного обвала рубля :-)" %}

По соседству живет другой такой же по виду блок, который, однако, прекрасно чувствует себя в нестандартных условиях:

{% include pic.htm src='proper-price-block.png' a='Правильный блок с ценой'%}

Это наталкивает нас на еще одну проблему:

###Неуниверсальный код

Два одинаковых по виду блока используют совершенно разную верстку, хотя, по сути, должны быть идентичны. Исправляем:

<style>
{% include snippets/price-area.css %}
</style>

<div class="steam-demo white">
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

Для изменения размера блока достаточно изменить размер шрифта. Все метрики выставлены в `em`’ах и изменяются пропорционально шрифту. Значения завернуты в дополнительные спаны, чтобы можно было выставить для них размер шрифта не побив метрики родительского блока:

{% highlight html cssclass=codewrap %}
{% include snippets/price-area.htm %}
{% endhighlight %}

{% highlight css cssclass=codewrap %}
{% include snippets/price-area.css %}
{% endhighlight %}

Кончились скидки? Выставляем цену без скидок. Убираем все лишнее из верстки:

{% highlight html cssclass=codewrap %}
<div class="price-area">
  <span class="price">
    <span>$5.99</span>
  </span>
</div>
{% endhighlight %}

И все работает.

<div class="steam-demo white">
  <div class="price-area" style="font-size: 1.5em;">
    <span class="price">
      <span>¥ 999</span>
    </span>
  </div>

  <div class="price-area" style="font-size: 1.2em;">
    <span class="price">
      <span>599 руб.</span>
    </span>
  </div>

  <div class="price-area">
    <span class="price">
      <span>$5.99</span>
    </span>
  </div>
</div>



