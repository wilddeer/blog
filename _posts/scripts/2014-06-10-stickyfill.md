---
layout: post
title: "Stickyfill — полифилл для «position: sticky»"
categories: scripts
lang: ru
---

<style>
{% include snippets/stickyfill-demo.css %}
</style>

<script>
{% include snippets/stickyfill-demo.js %}
</script>

<section style="height: 120em;" markdown="1">
  <hgroup class="sticky-1 sticky">
    <h1 class="article-title"><a href="https://github.com/wilddeer/stickyfill">Stickyfill</a></h1>

    <h2 class="tagline">Полифилл для <code>position:&nbsp;sticky</code></h2>
  </hgroup>

  <p class="sticky sticky-1-2" style="text-align: center; opacity: 0.3; margin-bottom: 60em; top: 8em; ">
    <i class="icon-chevron-down scroll-me"></i>
  </p>
</section>

<section style="height: 60em;" markdown="1">
  <p class="sticky-2 sticky" style="top: 3em; font-size: 1.2em; margin-top: 2em;">
    Стика — это такой блок, который прилипает к краю экрана, когда доскролливаешь до него. А когда доезжает до конца родительского блока — уезжает вместе с ним. Вот прям как этот параграф.
  </p>
</section>

<section style="height: 100em;" markdown="1">
  <div class="sticky-3 sticky" style="top: 3em; margin-bottom: 2.7em;">
    <p>
      Код очень простой:
    </p>

    <pre><code>.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}</code></pre>

  </div>

  <p class="sticky-4 sticky" style="top: 16em; margin-top: 40em; margin-bottom: 0;">
    <small><code>top</code> меняет отступ стики от края окна. Еще можно указать <code>margin-bottom</code>, чтобы стика останавливалась чуть раньше, чем обычно.</small>
  </p>
</section>

<section style="min-height: 160em;" markdown="1">
  <div class="sticky-5 sticky" style="top: 3em; margin-top: 30em; font-size: 1.2em; margin-bottom: 5em;">
    <p>
      Проблема в том, что на данный момент стики <a href="http://caniuse.com/#feat=css-sticky">поддерживаются</a> только в Safari на Маках и на айОси.
    </p>
  </div>

  <div class="sticky-6 sticky" style="top: 8em; margin-top: 50em; font-size: 1.2em;">
    <p>
      Поэтому я написал <a href="https://github.com/wilddeer/stickyfill">Stickyfill</a>. Он эмулирует стики там, где они не поддерживаются нативно.
    </p>
  </div>
</section>

<section style="min-height: 90em;" markdown="1">
  <div class="sticky-7 sticky" style="top: 5em; margin-top: 10em;">
    <h3>Что умеет:</h3>

    <ul>
      <li>Работает со стиками, прилипающими к верхнему краю</li>
      <li><del>Работает c ячейками таблицы</del> Отключил, пока Фаерфокс <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=975644">не реализует это нативно</a></li>
      <li>Работает в IE9+</li>
      <li>Отключается в старых браузерах и в браузерах с нативной поддержкой стик</li>
      <li>Эмулирует нативное поведение стик (там, где умеет)</li>
      <li>Учитывает <a href="http://wilddeer.github.io/stickyfill/test/">кучу разных кейсов</a></li>
    </ul>
  </div>
</section>

<section style="min-height: 80em;" markdown="1">
  <div class="sticky-8 sticky" style="top: 5em; margin-top: 5em;">
    <h3>Что не умеет:</h3>

    <ul>
      <li>Не умеет левые, правые, нижние и комбинированные стики</li>
      <li>Не «стыкует» табличные стики</li>
      <li>Не работает во внутренних блоках со скроллом</li>
      <li>Не парсит CSS (включается ручками)</li>
    </ul>
  </div>
</section>

<section style="min-height: 160em;" markdown="1">
  <p class="sticky-9 sticky" style="top: 5em; margin-top: 50em; font-size: 1.2em; text-align: center;">
    <a href="https://github.com/wilddeer/stickyfill" class="big-fucking-button"><i class="icon-github">&nbsp;</i>Забрать с ГитХаба</a>
  </p>
</section>


<figure class="info icon-heart-empty" style="margin-top: 30em;" markdown="1">
За четыре дня погружения в ад блоковых моделей браузеров я узнал, чем отличаются `window.pageYOffset`, `document.documentElement.scrollTop`, `window.scrollY` и `document.body.scrollTop`, в чем расхождения `offsetWidth` у блока с `box-sizing: border-box` в разных браузерах, какая разница между `element.offsetWidth` и `node.getBoundingClientRect().width`, в чем разница между `getComputedStyle(element)` и реальными значениями, как посчитать ширину вьюпорта без ширины скролла и как ошибки округления любят накопиться в самый неподходящий момент.
</figure>

