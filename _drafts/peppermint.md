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
    background: #dcdcdc;
  }

  .stage.peppermint .slides {
    padding: 0;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: stretch;
    -ms-flex-align: stretch;
  }

  html.no-flexbox .stage.peppermint .slides {
    height: 22em;
  }

  .stage.peppermint figure {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-top: 1.5em;
    padding-bottom: 3em;
  }

  html.no-flexbox .stage.peppermint figure {
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

  .stage.peppermint a,
  .stage.peppermint a:hover,
  .stage.peppermint a:active {
    color: #3fa0b5;
    background: transparent;
  }

  .stage.peppermint .slide1 {
    background: #fdeb75;
    color: #333;
  }

  .stage.peppermint .slide1 h1 {
    margin-bottom: 0;
  }

  .stage.peppermint .slide1 h3 {
    margin-bottom: 2em;
  }

  .stage.peppermint .slide1 a.github {
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

  .stage.peppermint .slide1 a.github:hover {
    background: rgba(255,50,50,0.05);
  }

  .stage.peppermint .slide2 {
    color: #fff;
    background: #ca5d40 url("/pics/peppermint/red.jpg") 50% 50%;
    background-size: auto 100%;
    -moz-background-size: cover;
    background-size: cover;
  }

  .stage.peppermint .slide3 {
    color: #fff;
    text-shadow: 1px 1px 2px rgba(89,135,198,0.5);
    background: #5988c6 url("/pics/peppermint/blue.jpg") 50% 50%;
    background-size: auto 100%;
    -moz-background-size: cover;
    background-size: cover;
  }

  .stage.peppermint .slide3 h1 {
    line-height: 1.6;
  }

  .stage.peppermint .slide3 a {
    color: #fff;
  }

  .stage.peppermint .slide3 kbd {
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
      dots: true,
      slideshow: false,
      slideshowInterval: 7000
    });
  });
</script>

<div class="stage peppermint" id="peppermint">
  <figure class="slide1">
    <h1>Peppermint.js</h1>
    <h3>Правильный тач-слайдер</h3>
    <p><a href="https://github.com/wilddeer/Peppermint" class="github"><i class="icon-github">&nbsp;</i>Забрать с ГитХаба</a></p>
  </figure>

  <figure class="slide2">
      <h1>Быстрый, легкий, расширяемый</h1>
      <p>Работает на <i class="icon-apple">&nbsp;</i>айфонах, <i class="icon-android">&nbsp;</i>андроидах, <i class="icon-windows">&nbsp;</i>винфонах. Не зависит от сторонних библиотек. Работает в <i class="icon-IE">&nbsp;</i>IE7+.</p>
  </figure>

  <figure class="slide3">
    <h1><a href="#accessibility">Дружит</a> с кнопкой <kbd>Tab</kbd></h1>
    
  </figure>
</div>

#[Peppermint.js](https://github.com/wilddeer/Peppermint) {#header}

##Peppermint.js --- тач-слайдер {#subheader}

##Доступность использования {#accessibility}



{% highlight js cssclass=codewrap %}
Sniffer = {
  browser: {
    name,
    engine,
    version
  },
  os: {
    name,
    version
  },
  features: {
    bw: true/undefined, /* black-and-white */
    mobile: true/undefined,
    serverside: true/undefined /* serverside js & rendering, a-la Opera Mini */
  }
}
{% endhighlight %}

<a href="https://github.com/wilddeer/Sniffer/blob/master/README.md" class="iconlink"><i class="icon-book"> </i><span>Последняя версия документации</span></a>