---
layout: post
title: "Stickyfill — полифилл для «position: sticky»"
categories: scripts
lang: ru
---

<style>
  body.post .content,
  body.post .content *,
  body.post .content *:before {
    color: white;
    background: transparent;
    border-color: white;
  }

  body.post .content {
    background: crimson;
    background: -webkit-linear-gradient(crimson, darkslategray 87%, #26403A);
    background: -moz-linear-gradient(crimson, darkslategray 87%, #26403A);
    background: -o-linear-gradient(crimson, darkslategray 87%, #26403A);
    background: linear-gradient(crimson, darkslategray 87%, #26403A);
  }

  @media all and (min-width: 60em) {
    body.post .content {
      font-size: 1.2em;
    }
  }

  body.post .content figure.info {
    border: 1px solid white;
    border: 1px solid rgba(255,255,255,0.5);
  }

  body.post .content a,
  body.post .content a:hover,
  body.post .content a *,
  body.post .content a:hover * {
    text-decoration: none;
  }

  body.post .content a {
    border-bottom: 1px solid white;
    border-bottom: 1px solid rgba(255,255,255,0.3);
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }

  body.post .content a:hover {
    border-bottom: 1px solid rgba(255,255,255,1);
    -webkit-transition: all 0.1s ease;
    transition: all 0.1s ease;
  }

  body.post .content h1,
  body.post .content h2,
  body.post .content h3,
  body.post .content h4 {
    text-align: center;
  }

  body.post .content .article-title {
    font-size: 4em;
    margin-bottom: 0.2em;
  }

  body.post .content .article-title a {
    border-bottom-width: 2px;
  }

  body.post .content .tagline {
    font-size: 1.5em;
  }

  body.post .content .scroll-me {
    font-size: 4em;
    opacity: 0.4;
    -webkit-animation-duration: 1.5s;
    -webkit-animation-name: heartbeat;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: ease-in;
    animation-duration: 1.5s;
    animation-name: heartbeat;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
  }

  body.post .content a.big-fucking-button {
    display: inline-block;
    font-size: 1.2em;
    text-decoration: none;
    padding: 0.5em 0.7em;
    border: 1px solid white;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 0.3em;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }

  body.post .content a.big-fucking-button:hover {
    text-decoration: none;
    border-color: deepskyblue;
    background: deepskyblue;
    -webkit-transition: all 0.1s ease;
    transition: all 0.1s ease;
  }

   @media all and (min-width: 60em) {
    body.post .content a.big-fucking-button {
      font-size: 1.5em;
    }
  }
</style>

<script>
  dzDelayed.push(function() {
    if (!window.getComputedStyle) return;

    $(window).on('resize orientationchange', function() {
      recalc();
    }).resize();

    function recalc() {
      Stickyfill.kill();
      
      $('.sticky-1').css({
        'margin-top': (window.innerHeight - $('.sticky-1').height() - $('.sticky-1-2').height())/2,
        'top': (window.innerHeight - $('.sticky-1').height() - $('.sticky-1-2').height())/2
      });

      $('.sticky-1-2').css({
        'top': parseFloat($('.sticky-1').css('margin-bottom')) + ($('.sticky-1').height() - $('.sticky-1-2').height())/2 + window.innerHeight/2
      });

      $('.sticky-3').css({
        'top': window.innerHeight/2 - ($('.sticky-3').height() + $('.sticky-4').height())/2,
        'margin-bottom': $('.sticky-4').height()
      });

      $('.sticky-4').css('top', window.innerHeight/2 - (-$('.sticky-3').height() + $('.sticky-4').height())/2);

      $('.sticky-5').css({
        'top': window.innerHeight/5 - ($('.sticky-5').height() + $('.sticky-6').height())/5,
        'margin-bottom': $('.sticky-6').height()
      });

      $('.sticky-6').css('top', window.innerHeight/5 - ($('.sticky-5').height() + $('.sticky-6').height())/5 + $('.sticky-5').height());

      $('.sticky-7').css({
        'top': window.innerHeight/5 - $('.sticky-7').height()/5,
      });

      $('.sticky-8').css({
        'top': window.innerHeight/5 - $('.sticky-8').height()/5,
      });

      $('.sticky-9').css({
        'top': window.innerHeight/2 - $('.sticky-9').height()/2,
        'margin-bottom': window.innerHeight/2 - $('.sticky-9').height()/2
      });

      $('.sticky').Stickyfill();
    }
  });
</script>

<section style="height: 110em;" markdown="1">
  <hgroup class="sticky-1 sticky">
    <h1 class="article-title"><a href="https://github.com/wilddeer/stickyfill">Stickyfill</a></h1>

    <h2 class="tagline">Полифилл для <code>position:&nbsp;sticky</code></h2>
  </hgroup>

  <p class="sticky sticky-1-2" style="text-align: center; opacity: 0.3; margin-bottom: 60em;">
    <i class="icon-chevron-down scroll-me"></i>
  </p>
</section>

<section style="height: 60em;" markdown="1">
  <p class="sticky-2 sticky" style="top: 3em; font-size: 1.2em; margin-top: 2em;">
    Стика — это такой блок, который прилипает к краю экрана, когда доскролливаешь до него. А когда доезжает до конца родительского блока — уезжает вместе с ним. Вот прям как этот параграф.
  </p>
</section>

<section style="height: 100em;" markdown="1">
  <div class="sticky-3 sticky" style="top: 3em;">
    <p>
      Код очень простой:
    </p>

    <pre><code>.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}</code></pre>

  </div>

  <p class="sticky-4 sticky" style="top: 5em; margin-top: 40em; margin-bottom: 0;">
    <small><code>top</code> меняет отступ стики от рая окна. Еще можно указать <code>margin-bottom</code>, чтобы стика останавливалась чуть раньше, чем обычно.</small>
  </p>
</section>

<section style="min-height: 90em;" markdown="1">
  <div class="sticky-5 sticky" style="top: 5em; margin-top: 30em; font-size: 1.2em;">
    <p>
      Проблема в том, что на данный момент стики <a href="http://caniuse.com/#feat=css-sticky">поддерживаются</a> только в Safari на Маках и на айОси.
    </p>
  </div>

  <div class="sticky-6 sticky" style="top: 5em; margin-top: 30em; font-size: 1.2em;">
    <p>
      Поэтому я написал Stickyfill. Он эмулирует стики там, где они не поддерживаются нативно.
    </p>
  </div>
</section>

<section style="min-height: 70em;" markdown="1">
  <div class="sticky-7 sticky" style="top: 5em; margin-top: 10em;">
    <h3>Что умеет:</h3>

    <ul>
      <li>Работает со стиками, прилипающими к верхнему краю</li>
      <li>Работает в IE9+</li>
      <li>Отключается в старых браузерах и в браузерах с нативной поддержкой стик</li>
      <li>Эмулирует нативное поведение стик (там, где умеет)</li>
      <li>Учитывает <a href="http://wilddeer.github.io/stickyfill/test/">кучу разных кейсов</a></li>
    </ul>
  </div>
</section>

<section style="min-height: 60em;" markdown="1">
  <div class="sticky-8 sticky" style="top: 5em; margin-top: 5em;">
    <h3>Что не умеет:</h3>

    <ul>
      <li>Не умеет левые, правые, нижние и комбинированные стики</li>
      <li>Не «стыкует» табличные стики</li>
      <li>Не работает во внутренних блоках со скроллом</li>
      <li>Не парсит CSS</li>
    </ul>
  </div>
</section>

<section style="min-height: 70em;" markdown="1">
  <p class="sticky-9 sticky" style="top: 5em; margin-top: 30em; font-size: 1.2em; text-align: center;">
    <a href="https://github.com/wilddeer/stickyfill" class="big-fucking-button"><i class="icon-github">&nbsp;</i>Забрать с ГитХаба</a>
  </p>
</section>

<section markdown="1">
  <figure class="info icon-heart-empty" markdown="1">
  За четыре дня погружения в ад блоковых моделей браузеров я узнал, чем отличаются `window.pageYOffset`, `document.documentElement.scrollTop`, `window.scrollY` и `document.body.scrollTop`, в чем расхождения `offsetWidth` у блока с `box-sizing: border-box` в разных браузерах, какая разница между `element.offsetWidth` и `node.getBoundingClientRect().width`, в чем разница между `getComputedStyle(element)` и реальными значениями, как посчитать ширину вьюпорта без ширины скролла и как ошибки округления любят накопиться в самый неподходящий момент.
  </figure>
</section>
