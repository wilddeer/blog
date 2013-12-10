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

  .steam-demo .user:visited:hover {
    color: #c0c0c0;
  }

  .steam-demo .user.user-online:visited:hover {
    color: #92cdf8;
  }

  .steam-demo .user.user-ingame:visited:hover {
    color: #aef651;
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

  .steam-demo .steam-demo-peppermint.active .dots {
    display: block;
  }

  .steam-demo .peppermint.active figure {
    padding: 0;
  }

  .no-js .js-controls {
    display: none;
  }

  .js-controls {
    text-align: center;
  }
</style>

#Чиним Steam {#header}

[Стим](http://store.steampowered.com/) всем хорош, но сайт у них ужасный. Все классные идеи чуваков из Валва получают то или иное воплощение на сайте, но реализация фронтэнда страдает.

Пришло время сделать свой стим, с преферансом и блудницами. Я взял для издевательств [страницу игры](http://store.steampowered.com/app/212894/) в магазине, отрезал шапку и футер стима (было лень заморачиваться) и переделал серединку. В плане дизайна сделал как смог, я же и не дизайнер совсем. В общем, вот что вышло:

<p style="text-align: center; font-size: 2.5em;"><a href="/steam/">Бдыщ</a></p>

А теперь про проблемы сайта Стима и как их решить, по полочкам:

##Урезанная мобильная версия

Мобильная версия сайта стима не распознает половину мобильных девайсов и не обладает и половиной функционала полной версии. Например, недавно добавленные пользовательские обзоры игр полностью отсутствуют в мобильной версии.

Между тем обрезанный функционально мобильный сайт ни к чему хорошему не приводит. Есть [очень хорошая и короткая книжка](http://www.abookapart.com/products/mobile-first) по этому поводу.

Решение: сделать адаптивный сайт. Это увеличит время и сложность разработки, зато весь функционал будет доступен сразу на любом устройстве, а поддержка и добавление фич упростится.

В особо сложных ситуациях можно использовать комбинированный подход: генерировать на сервере часть страницы по-разному в зависимости от устройства. В частности, это актуально для размера картинок.

Я сверстал страницу по принципу mobile first, то есть базовые стили для маленьких экранов, на которые с ростом размера экрана постепенно наращиваются дополнительные стили. Пара интересных моментов:

###"Адаптируем" галерею

Галерея со скриншотами должна работать на любых устройствах, с любым типом тач-эвентов. Меняем ее на [Peppermint](/scripts/peppermint/), добавляем превьюшки, дописываем скроллер превьюшек, взяв за основу код работы с событиями из пепперминта (который я, кстати, выделил в [отдельный скрипт](https://github.com/wilddeer/Event-Burrito)). Теперь и скришноты, и превьюшки можно проматывать как мышкой, так и тачем. Связываем слайдер и превьюшки, добавляем стрелочки:

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

На маленьких экранах меняем превьюшки на точки (на точки можно посмотреть, если сжать окно браузера).

После загрузки страницы следим за движением мышки. Если случается `mousemove`, переключаем класс, чтобы стрелки показывались по наведению мыши, и перестаем следить. Если `touchstart`, оставляем стрелки видимыми и тоже перестаем следить. Для тачэвентов своя логика: просто смотрим, какой тип указателя использует юзер.

Весь этот огород ради одной простой вещи: юзер может использовать мышь на тач-устройстве (с появлением нетбуков на андроиде и 8 винде это особенно акутально), поэтому определить наличие тача недостаточно. А еще графический планшет часто включает тач-эвенты в браузерах.

Оформляем все в виде jQuery-плагина:

{% highlight js cssclass=codewrap_maxheight %}
{% include snippets/steam-gallery.js %}
{% endhighlight %}

###Фон

Делаем фон на всю страницу. Чтобы мобильные устройства не расстраивались от большого полупрозрачного блока, применяем хитрость: заменяем для них фон на другой, маленький и затемненный (его несложно сгенерировать на сервере из большого), а фон у блока с контентом отключаем. Сравните [полный](/steam/i/page.bg.jpg) и [мобильный](/steam/i/page.bg.mob.jpg) варианты фона.

Так как у каждой страницы в магазине фон разный, кладем стиль прямо в шапку страницы, не забыв учесть старые ИЕ, не понимающие media queries:

{% highlight html cssclass=codewrap %}
<!--[if lt IE 9]>
<style>
  body {
    background-color: #1e231f;
    background-image: url(i/page.bg.jpg);
  }
</style>
<![endif]-->
<!--[if gt IE 8]><!-->
<style>
  body {
    background-image: url(i/page.bg.mob.jpg);
  }
  @media all and (min-width: 75em) {
    body {
      background-color: #1e231f;
      background-image: url(i/page.bg.jpg);
    }
  }
</style>
<!--<![endif]-->
{% endhighlight %}

Чтобы мобильники еще больше нас любили, убираем для них почти все тени, полупрозрачные фоны заменяем на непрозрачные.

##Контент подчиняется дизайну

Вот так, например, сейчас выглядит блок про DLC на сайте Стима:

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

##Неуниверсальный код

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

<div class="steam-demo" style="text-align: center;">
  <p>
    <a href="#" class="user" style="font-size: 0.66em;">
      <span class="userpic"><img src="/steam/i/userpic1.jpg" width="22" height="22"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-online">
      <span class="userpic"><img src="/steam/i/userpic4.jpg" width="32" height="32"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-ingame" style="font-size: 1.5em;">
      <span class="userpic"><img src="/steam/i/userpic-med.jpg" width="48" height="48"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-online" style="font-size: 2.25em;">
      <span class="userpic"><img src="/steam/i/userpic-big.jpg" width="72" height="72"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-ingame user-square" style="font-size: 2.25em;">
      <span class="userpic"><img src="/steam/i/userpic-big2.jpg" width="72" height="72"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-online user-square" style="font-size: 1.5em;">
      <span class="userpic"><img src="/steam/i/userpic-med2.jpg" width="48" height="48"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-square">
      <span class="userpic"><img src="/steam/i/userpic3.jpg" width="32" height="32"></span><span class="username">Username</span>
    </a>
  </p>

  <p>
    <a href="#" class="user user-ingame user-square" style="font-size: 0.66em;">
      <span class="userpic"><img src="/steam/i/userpic6.jpg" width="22" height="22"></span><span class="username">Username</span>
    </a>
  </p>
</div>

Чтобы придерживаться принципа универсального кода, важно грамотно структурировать стили и понять, какая часть стилей за что отвечает. Я для себя вывел такую систему:

- **Базовые стили** --- основной шрифт, стили базовых элементов, базовые отступы и размеры шрифтов в параграфах, заголовках, списках и т. п.
- **Вспомогательные классы** --- модификаторы размера кегля (побольше, поменьше), цвет информационных сообщений, ошибок, предупреждений, другие универсальные утилитарные классы.
- **Разметка** --- базовые блоки (лэйаут) страницы.
- **Сетка (грид)**. Я не люблю строгие сетки. В демке сетка используется как вспомогательный набор классов, чтобы не повторять одно и то же много раз. В любой момент можно забить на сетку и написать кастомных стилей для блока, чем я и пользуюсь.
- **Модули** --- это как раз отдельные повторяющиеся блоки, базовые стили которых не должны зависеть от контекста (но могут быть изменены стилями контекста, см. далее). Модули могут вкладываться друг в друга.
- **Стили страницы** --- стили специфичных для страницы блоков. Это как раз то место, где можно модифицировать стили модулей, расположенных в конкретных блоках страницы.

##"Навязчивый" яваскрипт

Присутствуют все классический ошибки, собранные мной в [посте про ссылки](/links-please/). Вот ссылка "View all screenshots", которая и не ссылка вовсе, так как никуда не ведет:

{% highlight html cssclass=codewrap %}
<a class="linkbar" href="javascript:screenshot_popup('http://store.steampowered.com/screenshot/view/205100/0?snr=1_5_9__400', 800, 635, 0, 0);">...</a>
{% endhighlight %}

А вот кнопка предыдущего спотлайта на главной:

{% highlight html cssclass=codewrap %}
<a href="javascript:PrevSpotlight( 2 );"><img src="http://cdn4.store.steampowered.com/public/images/v5/ico_navArrow_left.gif"> Prev</a>
{% endhighlight %}

А еще есть вот такие посты в центре сообщества:

{% include pic.htm src='hub-post.png' a='Пост в центре сообщества игры' %}

Их код выглядит так:

{% highlight html cssclass=codewrap %}
<div class="apphub_Card interactable" style="float: left; width: 468px; height: 345px;" onclick="ShowModalContent( 'http://steamcommunity.com/app/205100/discussions/0/648813728349716360/?insideModal=1', 'Read at http://steamcommunity.com/app/205100/discussions/0/648813728349716360/', 'http://steamcommunity.com/app/205100/discussions/0/648813728349716360/' );">

  ...

</div>
{% endhighlight %}

Мало того, что эти посты открываются в ужасных модальных окнах (их, кстати, придумали люди, которые ненавидят вкладки), так еще их совсем никак нельзя открыть по-нормальному, ведь это не ссылка. А еще там инлайновые стили и жирный инлайновый вызов функции.

А можно было сделать весь блок ссылкой и открывать попап (если ну прям очень хочется попап) только по нажатию левой кнопки.

##Доступность использования

Многие элементы управления не фокусируются, а это значит, что на них нельзя попасть <kbd>Tab</kbd>-ом, о них не узнают штуки для голосового управления и скринридеры.

А еще, [как я уже писал](/internet-maintenance/js-sliders-and-the-tab-key/), слайдер разваливается при использовании кнопки <kbd>Tab</kbd>.

##Отказоустойчивость {#fault_tolerance}

Что произойдет, если упадет CDN-сервер со скриптами? Если один из скриптов выполнится с ошибкой? Правильно, половина функционала сайта просто перестанет работать. А могла бы работать, хоть и не так хорошо, как со скриптами.

Галерея без яваскрипта превратилась в черный прямоугольник, превьюшки и скролл, естественно, ничего не делают:

{% include pic.htm src='gallery-nojs.jpg' a='Галерея при выключенном яваскрипте' %}

А можно было сделать блок с картинками из галереи с горизонтальным скроллом, который после инициализации превратится в нормальную галерею. Так как элементы управления без яваскрипта бесполезны, их не стоит показывать до инициализации:

<div class="steam-demo fullwidth">
  <section class="gallery peppermint steam-demo-peppermint inactive">
    <figure>
      <a href="/steam/i/1.jpg" target="_blank"><img src="/steam/i/m1.jpg"></a>
    </figure>

    <figure>
      <a href="/steam/i/2.jpg" target="_blank"><img src="/steam/i/m2.jpg"></a>
    </figure>

    <figure>
      <a href="/steam/i/3.jpg" target="_blank"><img src="/steam/i/m3.jpg"></a>
    </figure>
  </section>
</div>

<p class="js-controls"><button id="launch-it">Запусти меня</button></p>

<script>
dzDelayed.push(function() {
  $('#launch-it').click(function() {
    $('.steam-demo-peppermint').Peppermint({
      dots: true,
      mouseDrag: true
    });

    $(this).attr('disabled','disabled');
  });
});
</script>

Для реализации такого подхода достаточно выдать галерее класс `incative`, который сменится на `active` во время инициализации, и написать разных стилей для обоих состояний.

Та же история с кнопками голосования --- можно сделать их формой и перехватывать `submit` скриптом. Без скрипта будет отправляться форма, а сервер может редиректить пользователя обратно на страницу, на которой он нажал кнопку.

То же самое для всевозможных блоков, открывающих попапы, --- сделать их ссылками, и они будут прекрасно себя чувствовать без яваскрипта.

##Интерфейс и навигация

С навигацией все довольно плохо, много нелогичных и непоследовательных моментов. Сайту нужен хороший UI-дизайнер, чтобы перетрясти всю навигацию и продумать интерфейсы.

Так как я на дизайнера интерфейсов слабо похож, останавливаться на этом моменте не буду.

##Еще по мелочам

Если сжать страницу демки до мобильных размеров, можно заметить, что блок покупки и добавки в избранное исчезает из сайдбара и появляется новый, под галереей. Так как это два разных блока, выполняющих одну функцию, их состояние надо как-то синхронизировать. Для этого используется очень простой принцип событий.

Рассмотрим на примере. Сначала типичный для такого случая сценарий действий: юзер нажимает кнопку "Добавить в избранное", идет запрос на сервер, сервер возвращает `success`, мы меняем состояние блока. Как-то так:

{% highlight js cssclass=codewrap %}
addForm.steamAjaxForm({
  success: function() {
    _this.addClass(whishlistedClass);
  }
});

removeForm.steamAjaxForm({
  success: function() {
    _this.removeClass(whishlistedClass);
  }
});
{% endhighlight %}

Здесь нужно поменять две вещи: во-первых, вместо изменения класса блока мы будем генерировать специальные собития; во-вторых, надо подписаться на эти события и уже в обработчике события менять класс блока:

{% highlight js cssclass=codewrap %}
addForm.steamAjaxForm({
  success: function() {
    steamEvents.invoke('gameAddedToWishlist');
  }
});

removeForm.steamAjaxForm({
  success: function() {
    steamEvents.invoke('gameRemovedFromWishlist');
  }
});

steamEvents.subscribe('gameAddedToWishlist', function() {
  _this.addClass(whishlistedClass);
});

steamEvents.subscribe('gameRemovedFromWishlist', function() {
  _this.removeClass(whishlistedClass);
});
{% endhighlight %}

Все. Оба блока среагируют на событие и поменяют состояние. Код `steamEvents` до безобразия прост:

{% highlight js cssclass=codewrap %}
var steamEvents = {
  events: {

  },

  subscribe: function(eventName, handler) {
    if (!this.events[eventName]) this.events[eventName] = [];

    this.events[eventName].push(handler);
  },

  invoke: function(eventName) {
    if (!this.events[eventName]) return;

    for (var i = this.events[eventName].length - 1; i >= 0; i--) {
      this.events[eventName][i]();
    };
  }
}
{% endhighlight %}

Таким же образом можно реализовать взаимодействие многих элементов на странице. Это особенно удобно, если элементы никак не завязаны в коде.