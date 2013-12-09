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
    padding: 3em 4%;
    font-family: Arial, Helvetica, sans-serif;
    color: #f5f5f5;
    margin-bottom: 1.5em;
  }

  .steam-demo.white {
    padding-top: 1.5em;
    padding-bottom: 1.5em;
    background: transparent;
  }

  .steam-demo.fullwidth {
    padding-left: 0;
    padding-right: 0;
  }

  @media all and (min-width: 40em) {
    .steam-demo {
      width: 92%;
      padding-left: 1.5em;
      padding-right: 1.5em;
    }
  }

  .steam-demo a,
  .steam-demo a:visited {
    color: #1f98df;
  }

  .steam-demo a:hover {
    background: transparent;
    color: #2ac6ed;
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

  .steam-demo .user:visited {
    color: #aaa;
  }

  .steam-demo .user.user-online:visited {
    color: #7cb8e4;
  }

  .steam-demo .user.user-ingame:visited {
    color: #94de35;
  }

  .steam-demo .thumbs ul li {
    padding-left: 0;
  }

  .steam-demo .thumbs ul li:before {
    content: '';
    display: none;
  }

  .steam-demo .peppermint.active {
    margin-bottom: 0;
  }

  .no-js .js-controls {
    display: none;
  }

  .js-controls {
    text-align: center;
  }
</style>

#Чиним Steam {#header}

Стим всем хорош, но сайт у них ужасный. Все классные идеи чуваков из валва получают то или иное воплощение на сайте, но реализация фронтэнда страдает. По полочкам:

###Мобильная версия сосет

Отдельная версия сайта для мобильный устройств не распознает половину мобильных девайсов и не обладает и половиной функционала полной версии. Например, недавно добавленные пользовательские обзоры игр полностью отсутствуют в мобильной версии.

Между тем обрезанный функционально мобильный сайт ни к чему хорошему не приводит. Есть [очень хорошая и короткая книжка](http://www.abookapart.com/products/mobile-first) по этому поводу.

Решение: сделать адаптивный сайт. Время разработки увеличится, сложность возрастет, но зато весь функционал будет доступен сразу на любом устройстве, а поддержка и добавление фич упростится.

В особо сложных ситуациях можно использовать комбинированный подход: генерировать на сервере часть страницы по-разному в зависимости от устройства. В частности, это актуально для размера картинок.

Возьмем для издевательств [страницу игры](http://store.steampowered.com/app/212894/) в магазине. Слайдер со скриншотами должен работать на всех устройствах, меняем его на [Peppermint](/scripts/peppermint/), добавляем превьюшки, дописываем скроллер превьюшек, взяв за основу код работы с событиями из пепперминта (который я, кстати, выделил в [отдельный скрипт](https://github.com/wilddeer/Event-Burrito)). Теперь и скришноты, и превьюшки можно проматывать как мышкой, так и тачем. Связываем слайдер и превьюшки, добавляем стрелочки:

{% highlight js cssclass=codewrap %}
{% include snippets/steam-gallery.js %}
{% endhighlight %}

<style>
{% include snippets/steam-gallery.css %}
</style>

<script>
dzDelayed.push(function() {
  {% include snippets/steam-gallery.js %}
  $('.js-steam-peppermint').steamGallery();
});
</script>

<div class="steam-demo fullwidth">
{% include snippets/steam-gallery.htm %}
</div>

После загрузки страницы следим за движением мышки. Если случается `mousemove`, переключаем класс, чтобы стрелки показывались по наведению мыши, и перестаем следить. Если `touchstart`, оставляем стрелки видимыми и тоже перестаем следить. Для тачэвентов своя логика: просто смотрим, какой тип указателя использует юзер.

Весь этот огород ради одной простой вещи: юзер может использовать мышь на тач-устройстве (с появлением нетбуков на андроиде и 8 винде это особенно акутально), поэтому определить наличие тача недостаточно. А еще графический планшет часто включает тач-эвенты в браузерах.

На маленьких экранах меняем превьюшки на точки (на точки можно посмотреть, если сжать окно браузера).

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

Проблема с недостаточно гибким дизайном не заканчивается одним блоком. Долгое время блоки с ценами, рассчитанные на доллары, разваливались в русском магазине. Сейчас проблема по большей части решена, но блоки с фиксированной шириной все еще попадаются:

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
    $5.99
  </span>
</div>
{% endhighlight %}

И все работает.

<div class="steam-demo white">
  <div class="price-area" style="font-size: 1.5em;">
    <span class="price">
      ¥ 999
    </span>
  </div>

  <div class="price-area" style="font-size: 1.2em;">
    <span class="price">
      599 руб.
    </span>
  </div>

  <div class="price-area">
    <span class="price">
      $5.99
    </span>
  </div>
</div>

Та же история с любыми повторяющимися блоками. Например, блок с юзерпиком и именем пользователя:

<style>
{% include snippets/steam-user.css %}
</style>

<div class="steam-demo">
  <p>
    <a href="#" class="user" style="font-size: 0.6em;">
      <span class="userpic"><img src="/steam/i/userpic4.jpg"></span><span class="username">Username</span>
    </a>

    <a href="#" class="user user-online">
      <span class="userpic"><img src="/steam/i/userpic4.jpg"></span><span class="username">Username</span>
    </a>

    <a href="#" class="user user-ingame" style="font-size: 1.4em;">
      <span class="userpic"><img src="/steam/i/userpic4.jpg"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user" style="font-size: 0.6em;">
      <span class="userpic"><img src="/steam/i/userpic4.jpg" width="16" height="16"></span><span class="username">Username</span>
    </a>

    <a href="#" class="user user-online">
      <span class="userpic"><img src="/steam/i/userpic4.jpg"></span><span class="username">Username</span>
    </a>

    <a href="#" class="user user-ingame" style="font-size: 1.4em;">
      <span class="userpic"><img src="/steam/i/userpic4.jpg" width="64" height="64"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    Square
    <a href="#" class="user user-online user-square">
      <span class="userpic"><img src="/steam/i/userpic4.jpg"></span><span class="username">Username</span>
    </a>,

    just userpic
    <a href="#" class="user user-online">
      <span class="userpic"><img src="/steam/i/userpic4.jpg"></span>
    </a>

    or just
    <a href="#" class="user user-ingame">
      <span class="username">name</span>
    </a>
  </p>
</div>

###Ссылки и кнопки

Присутствуют все классический ошибки, собранные мной в [посте про ссылки](/links-please/). Вот ссылка "View all screenshots":

{% highlight html cssclass=codewrap %}
<a class="linkbar" href="javascript:screenshot_popup('http://store.steampowered.com/screenshot/view/205100/0?snr=1_5_9__400', 800, 635, 0, 0);">...</a>
{% endhighlight %}

А вот кнопка предыдущего спотлайта на главной:

{% highlight html cssclass=codewrap %}
<a href="javascript:PrevSpotlight( 2 );"><img src="http://cdn4.store.steampowered.com/public/images/v5/ico_navArrow_left.gif"> Prev</a>
{% endhighlight %}

А вот такие посты в центре сообщества:

{% include pic.htm src='hub-post.png' a='Пост в центре сообщества игры' %}

выглядят в коде вот так:

{% highlight html cssclass=codewrap %}
<div class="apphub_Card interactable" style="float: left; width: 468px; height: 345px;" onclick="ShowModalContent( 'http://steamcommunity.com/app/205100/discussions/0/648813728349716360/?insideModal=1', 'Read at http://steamcommunity.com/app/205100/discussions/0/648813728349716360/', 'http://steamcommunity.com/app/205100/discussions/0/648813728349716360/' );">

  ...

</div>
{% endhighlight %}

Мало того, что эти посты открываются в ужасных модальных окнах (их, кстати, придумали люди, которые ненавидят вкладки), так еще их совсем никак нельзя открыть по-нормальному, ведь это не ссылка. А еще там инлайновые стили и жирный инлайновый вызов функции.

А можно было сделать весь блок ссылкой и открывать попап (если ну прям очень хочется попап) только по нажатию левой кнопки.

###Доступность использования

Многие элементы управления не фокусируются, а это значит, что на них нельзя попасть <kbd>Tab</kbd>-ом, о них не узнают штуки для голосового управления и скринридеры.

А еще, [как я уже писал](/internet-maintenance/js-sliders-and-the-tab-key/), слайдер разваливается при использовании кнопки <kbd>Tab</kbd>.

###Отказоустойчивость {#fault_tolerance}

###Интерфейс и навигация

С навигацией все довольно плохо, много нелогичных и непоследовательных моментов. Сайту нужен хороший UI-дизайнер, чтобы перетрясти всю навигацию и продумать интерфейсы.

Так как я на дизайнера интерфейсов слабо похож, останавливаться на этом моменте не буду.