---
layout: post
title: "Тач-слайдер Peppermint.js"
categories: scripts
lang: ru
---

<style>
  .stage.peppermint {
    position: relative;
    padding-left: 0;
    padding-right: 0;
    margin-top: -1em;
    margin-bottom: 24px;
    margin-bottom: 1.5rem;
    background: #f0f0f0;
  }

  .stage.peppermint .slides {
    padding: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: stretch;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
  }

  html.blackberry .stage.peppermint .slides {
    min-height: 16em;
  }

  html.no-flexbox.no-flexboxlegacy .stage.peppermint .slides {
    height: 20em;
  }

  .stage.peppermint figure {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
    margin-bottom: 0;
  }

  .stage.peppermint.active figure {
    padding-bottom: 3em;
  }

  html.no-flexbox.no-flexboxlegacy .stage.peppermint figure {
    height: 100%;
  }

  .stage.peppermint figure:last-child {
    margin-bottom: 0;
  }

  .stage.peppermint figure img {
    box-shadow: none;
  }

  .stage.peppermint figure figcaption {
    font-size: 0.7em;
    color: #fff;
  }

  .stage.peppermint ul.dots {
    position: absolute;
    bottom: 1.5em;
    left: 0;
    right: 0;
  }

  .stage.peppermint ul.dots li span {
    background: #fff;
  }

  .stage.peppermint ul.dots li.active span {
    background: transparent;
    border-color: #fff;
  }

  .stage.peppermint code {
    border-color: #fff;
  }

  .stage.peppermint a,
  .stage.peppermint a:hover,
  .stage.peppermint a:active {
    background: transparent;
    color: #fff;
  }

  .stage.peppermint .yellow {
    background: #fdeb75;
    color: #333;
  }

  .stage.peppermint .yellow h1 {
    margin-bottom: 0;
  }

  .stage.peppermint .yellow h3 {
    margin-bottom: 2em;
  }

  .stage.peppermint .yellow a.github {
    color: #3fa0b5;
    text-decoration: none;
    padding: 0.5em 1em;
    border: 1px solid;
    border-color: #bfa451;
    border-color: rgba(50,0,0,0.2) rgba(50,0,0,0.3) rgba(50,0,0,0.4) rgba(50,0,0,0.3);
    border-radius: 0.5em;
    box-shadow: inset 0 1px 0 2px rgba(255,255,255,0.3),
                0 2px 0 0 rgba(30,0,0,0.1);
    text-shadow: 1px 1px 0 rgba(255,255,255,0.3);
  }

  .stage.peppermint .yellow a.github:hover {
    background: rgba(255,50,50,0.05);
  }

  .stage.peppermint .red {
    color: #fff;
    background: #ca5d40 url("/pics/peppermint/red.jpg") 50% 50% no-repeat;
    background-size: auto 100%;
    -moz-background-size: cover;
    background-size: cover;
  }

  .stage.peppermint .green {
    color: #fff;
    text-shadow: 1px 1px 2px rgba(150,214,73,0.4);
    background-image: linear-gradient(90deg, rgba(255,255,255,.08) 50%, transparent 50%),
                      linear-gradient(90deg, rgba(255,255,255,.14) 50%, transparent 50%),
                      linear-gradient(90deg, transparent 50%, rgba(255,255,255,.18) 50%),
                      linear-gradient(90deg, transparent 50%, rgba(255,255,255,.2) 50%);
    background-size: 13px, 29px, 37px, 53px;
    background-color: #8bcc3c;
  }

  .stage.peppermint .blue {
    color: #fff;
    text-shadow: 1px 1px 2px rgba(89,135,198,0.6);
    background: #5988c6 url("/pics/peppermint/blue.jpg") 50% 50% no-repeat;
    background-size: auto 100%;
    -moz-background-size: cover;
    background-size: cover;
  }

  .stage.peppermint .blue h1 {
    line-height: 1.6;
  }

  .stage.peppermint .blue p a,
  .stage.peppermint .blue p a:hover,
  .stage.peppermint .red p a,
  .stage.peppermint .red p a:hover {
    color: #fff;
    text-decoration: underline;
  }

  html.winphone .stage.peppermint .blue,
  html.winphone .stage.peppermint .green {
    text-shadow: none;
  }

  .stage.peppermint kbd {
    color: #333;
    text-shadow: none;
  }

  @media all and (min-width: 40em) {
    .stage.peppermint h1 {
      font-size: 4em;
    }

    .stage.peppermint a.github {
      font-size: 1.5em;
    }
  }

  @media all and (min-width: 65em) {
    .stage.peppermint .slides {
      height: 25em;
    }

    .stage.peppermint h1 {
      font-size: 5em;
    }
  }
</style>

<script>
  dzDelayed.push(function() {
    $('#peppermint').Peppermint({
      mouseDrag: true,
      dots: true,
      slideshow: true,
      slideshowInterval: 7000,
      stopSlideshowAfterInteraction: true
    });
  });
</script>

<div class="stage peppermint" id="peppermint">
  <figure class="yellow">
    <h1>Peppermint.js</h1>
    <h3>Правильный тач-слайдер</h3>
    <p><a href="https://github.com/wilddeer/Peppermint" class="github"><i class="icon-github">&nbsp;</i>Забрать с ГитХаба</a></p>
  </figure>

  <figure class="red">
      <h1>Быстрый, легкий, расширяемый</h1>
      <p>7,5 Кб, быстрый и плавный тач, <a href="#api">API</a> для расширений</p>
  </figure>

  <figure class="green">
      <h1>Работает везде</h1>
      <p>Работает на <i class="icon-apple">&nbsp;</i>айфонах, <i class="icon-android">&nbsp;</i>андроидах, <i class="icon-windows">&nbsp;</i>винфонах. Не зависит от сторонних библиотек. Работает в <i class="icon-IE">&nbsp;</i>IE7+.</p>
  </figure>

  <figure class="blue">
    <h1><a href="/internet-maintenance/js-sliders-and-the-tab-key/">Дружит</a> с кнопкой <kbd>Tab</kbd></h1>
    
  </figure>
</div>

[Peppermint.js](https://github.com/wilddeer/Peppermint) --- еще один тач-слайдер. Только круче.

- Работает с мышью, [тачэвентами](http://www.w3.org/TR/touch-events/), [поинтерэвентами](http://www.w3.org/TR/pointerevents/), старыми [поинтерэвентами из IE10](http://msdn.microsoft.com/en-us/library/ie/hh673557(v=vs.85).aspx)
- Работает на андроидах, айфонах, винфонах, блекберри и на девайсах с 8 виндой
- Работает в IE7+
- Не зависит от сторонних библиотек. Если находит jQuery, регистрирует себя в качестве плагина.
- Использует CSS3 трансформы и транзишены с фоллбеком на анимации по таймеру
- 7,5 Кб кода
- Оптимизированные на скорость выполнения `touch`-функции
- [API](#api) и callback-функции для расширений
- Работает с клавиатурой, [не ломается](/internet-maintenance/js-sliders-and-the-tab-key/) от кнопки <kbd>Tab</kbd>

##Комплект {#kit}

{:.nopadding}
- <a href="https://raw.github.com/wilddeer/Peppermint/master/peppermint.min.js" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.min.js</span></a> --- минифицированный скрипт для продакшена
- <a href="https://raw.github.com/wilddeer/Peppermint/master/peppermint.required.css" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.required.css</span></a> --- обязательный набор стилей для корректной работы слайдера
- <a href="https://raw.github.com/wilddeer/Peppermint/master/peppermint.suggested.css" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.suggested.css</span></a> --- дефолтный набор стилей, чтобы было с чего начать (не включает обязательные стили!)

##Запуск {#usage}

HTML разметка:

{% highlight html cssclass=codewrap %}
<div class="peppermint inactive" id="peppermint">
  <figure> ... </figure>

  <figure> ... </figure>

  <figure> ... </figure>
</div>
{% endhighlight %}

Javascript:

{% highlight js cssclass=codewrap %}
var slider = Peppermint(document.getElementById('peppermint'));
{% endhighlight %}

Или javascript + jQuery:

{% highlight js cssclass=codewrap %}
$('.peppermint').Peppermint();
{% endhighlight %}

Класс `inactive` не обязателен. Он заменяется на `active` во время установки.

Вместо `figure` можно использовать любой другой тег. Если используете `figure`, не забудьте подключить [html5shiv](https://github.com/aFarkas/html5shiv), чтобы старые IE не удивлялись HTML5-тегам.

Внутрь каждого слайда можно положить все что захочется.

##Настройки {#settings}

В качестве второго параметра (первого в случае использования jQuery) в Peppermint можно передать объект с настройками. Настройки по умолчанию:

{% highlight js cssclass=codewrap %}
{
  //скорость перехода между слайдами, мс
  speed: 300,

  //скорость перехода между слайдами после тача, мс
  touchSpeed: 300,

  //включить слайдшоу
  slideshow: false,

  //интервал переключения слайдов, мс
  slideshowInterval: 4000,

  //останавливать слайдшоу после переключения слайда пользователем
  stopSlideshowAfterInteraction: false,

  //начальный слайд
  startSlide: 0,

  //показывать точки
  dots: false,

  //точки перед слайдами
  dotsFirst: false,

  //разрешить перетаскивать слайды мышкой
  mouseDrag: false,

  //Префикс для служебных классов слайдера,
  //таких как `inactive`, `active`, `mouse` и `drag`.
  //Не забудьте поменять стили соответствующим образом!
  cssPrefix: '',

  //Callback-функция, вызывается при смене слайда.
  //В качестве параметра получает номер слайда.
  onSlideChange: undefined,

  //Callback-функция, вызывается пойсле завершения установки.
  //В качестве параметра получает количество слайдов.
  onSetup: undefined
}
{% endhighlight %}

Пример использования:

{% highlight js cssclass=codewrap %}
var slider = Peppermint(document.getElementById('peppermint'), {
  dots: true,
  slideshow: true,
  speed: 500,
  slideshowInterval: 5000,
  stopSlideshowAfterInteraction: true,
  onSetup: function(n) {
    console.log('Peppermint setup done. Slides found: ' + n);
  }
});
{% endhighlight %}

##API {#api}

При инициализации Peppermint возвращает объект с функциями, которые можно использовать для управления слайдером и расширения функционала:

`slideTo(n)` --- перейти к слайду `n`;

`next()` --- следующий слайд;

`prev()` --- предыдущий слайд;

`start()` --- запустить слайдшоу;

`stop()` --- остановить слайдшоу;

`pause()` --- приостановить слайдшоу до следующей смены слайда;

`getCurrentPos()` --- получить номер текущего слайда;

`getSlidesNumber()` --- получить общее количество слайдов;

`recalcWidth()` --- пересчитать ширину слайдера и слайдов. Полезно при изменении ширины контейнера. При ресайзе окна и смене ориентации девайса пересчет ширины запустится сам.

Пример использования:

{% highlight js cssclass=codewrap %}
var slider = Peppermint(document.getElementById('peppermint')),
    rightArr = document.getElementById('right-arr'),
    leftArr = document.getElementById('left-arr');

rightArr.addEventListener('click', slider.next, false);
leftArr.addEventListener('click', slider.prev, false);
{% endhighlight %}

##Лицензия {#license}

[MIT license](http://opensource.org/licenses/MIT).