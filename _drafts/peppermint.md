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
    background: #333;
    /*background-image: -webkit-linear-gradient(-90deg, #121212, #303030);
    background-image: -moz-linear-gradient(-90deg, #121212, #303030);
    background-image: linear-gradient(180deg, #121212, #303030);*/
    box-shadow: inset 0 0 1.5em rgba(0,0,0,0.2),
                inset 0 0.3em 0.3em rgba(0,0,0,0.2);
  }

  .stage.peppermint figure > a {
    display: inline-block;
    border-radius: 0.3em;
    box-shadow: inset 0 0 3px red;
  }

  .stage.peppermint figure img {
    border-radius: 0.3em;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
  }
</style>

<div class="stage peppermint js-peppermint" id="peppermint">
  <figure>
    <a href="i/1.jpg" target="_blank"><img src="i/p1.jpg" alt="Кот!"></a>

    <figcaption>Кот!</figcaption>
  </figure>

  <figure>
    <a href="i/2.jpg" target="_blank"><img src="i/p2.jpg" alt="Еще кот!"></a>

    <figcaption>Еще кот!</figcaption>
  </figure>

  <figure>
    <a href="i/3.jpg" target="_blank"><img src="i/p3.jpg" alt="Опять кот!"></a>

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