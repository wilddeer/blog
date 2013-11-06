---
layout: post
title: "Тач-слайдер Peppermint.js"
categories: scripts
lang: ru
---

<style>
  .stage.peppermint {
    margin-top: -1em;
    padding: 1.5em 0 1em 0;
    background: #252525;
    margin-bottom: 24px;
    margin-bottom: 1.5rem;
  }

  .stage.peppermint figure:last-child {
    margin-bottom: 0;
  }

  .stage.peppermint figure figcaption {
    font-size: 0.7em;
    color: #fff;
  }

  .stage.peppermint ul.dots li span {
    background: #fff;
  }

  .stage.peppermint ul.dots li.active span {
    background: transparent;
    border-color: #fff;
  }
</style>

<script>
  dzDelayed.push(function() {
    $('#peppermint').Peppermint({
      dots: true,
      slideshow: true
    });
  });
</script>

<div class="stage peppermint" id="peppermint">
  <figure>
    <a href="/pics/peppermint/1.jpg" target="_blank"><img src="/pics/peppermint/p1.jpg" alt="Кот!"></a>

    <figcaption>Кот!</figcaption>
  </figure>

  <figure>
    <a href="/pics/peppermint/2.jpg" target="_blank"><img src="/pics/peppermint/p2.jpg" alt="Еще кот!"></a>

    <figcaption>Еще кот!</figcaption>
  </figure>

  <figure>
    <a href="/pics/peppermint/3.jpg" target="_blank"><img src="/pics/peppermint/p3.jpg" alt="Опять кот!"></a>

    <figcaption>Опять кот!</figcaption>
  </figure>
</div>

#[Peppermint.js](https://github.com/wilddeer/Peppermint) {#header}

##Peppermint.js --- тач-слайдер {#subheader}



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