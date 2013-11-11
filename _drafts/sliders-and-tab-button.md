---
layout: post
title: "JS sliders and Tab button"
categories: en internet-maintenance
lang: en
---

#JS sliders and <kbd>Tab</kbd> button {#header}

Almost every JS slider got one particularly funny bug: <kbd>Tab</kbd> button breaks them. The slider will inevitably break when the link placed in one of the slides cathes focus. Some examples on a [slider that doesn't break](/en/scripts/peppermint/) (oh, the irony):

Все js-слайдеры подвержены одному смешному багу: они ломаются при использовании кнопки <kbd>Tab</kbd>. Если на каком-то слайде есть ссылка, слайдер обязательно сломается при переходе на нее табом. Несколько примеров на [слайдере, который не ломается](/scripts/peppermint/) (oh, the irony):

<div class="peppermint js-peppermint">
  {% include pic.htm src='apple.jpg' p=true a='Broken slider at apple.com' c='Broken slider at <a href="http://apple.com">apple.com</a>' %}
  {% include pic.htm src='swipejs.jpg' p=true a='Broken Swipe slider' c='Broken <a href="http://swipejs.com">Swipe</a> slider' %}
  {% include pic.htm src='steam.jpg' p=true a='Broken Steam&rsquo;s slider' c='Broken <a href="http://store.steampowered.com">Steam&rsquo;s</a> slider' %}
</div>

Here's the catch: when the link hidden by `overflow: hidden` catches focus, browser scrolls the content of the block, so that you can see the link. Yes, blocks with `overflow: hidden` have `scrollLeft` property, just like the blocks with `overflow: auto`.

Дело в том, что при фокусировании ссылки, скрытой за `overflow: hidden`, браузер заботлибо промотает вам содержимое блока, чтобы ссылка оказалась в поле зрения. Да, у блоков с `ovrflow: hidden` тоже есть `scrollLeft`, и он работает так же, как и в случае с `overflow: auto`.

Let's adress the problem. Firts, gather the links from each of the slides and bind `focus` event listener to each of them. When the event fires, switch active slide to one containing the link and reset `scrollLeft` of the container:

Решение: собираем ссылки из каждого слайда и вешаем на каждую событие `focus`. Когда событие случается, переключаем слайд на тот, в котором найдена ссылка, и сбрасываем `scrollLeft` контейнера слайдов:

{% highlight js cssclass=codewrap %}
for (var j = links.length - 1; j >= 0; j--) {
  addEvent(links[j], 'focus', function(x) {
    return function() {
      _this.scrollLeft = 0;
      //Zero timeout solves WebKit's issue where `scrollLeft` is set after the event
      setTimeout(function() {
        _this.scrollLeft = 0;
      }, 0);
      changeActiveSlide(x);
    }
  }(i), false); //i -- slide number
};
{% endhighlight %}

"Dots" under the slider should also be keyboard friendly. Not to make a fuss over the solution, it's enough to make them <kbd>Tab</kbd>&rsquo;bable (set attribute `tabindex="0"`) and switch to a particular slide when enter is pressed.

"Точки" под слайдером тоже должны быть доступны для управления с клавиатуры. Чтобы не городить огород, достаточно просто сделать их доступными для для табуляции (для этого выставляем им аттрибут `tabindex="0"`) и включать нужный слайд по нажатию энтера.

Also worth mentioning that it's, of course, unacceptable to turn off the `outline` for focused dots. But we still want to get rid of it when using mouse. I use two methods to deal with it: first, get rid of the `outline` for `:active` items. No more outline when mouse button is pressed:

Естественно, при этом нельзя отключать `outline` вокруг выделенной точки. Чтобы обводка вокруг точки работала при навигации с клавиатуры, но не мешалась при использовании мыши, существует два приема. Первый --- убрать `outline` для псевдокласса `:active`, чтобы обводки не было во время нажатой кнопки мыши:

{% highlight css cssclass=codewrap %}
.peppermint.active > ul.dots > li:active {
  outline: none;
}
{% endhighlight %}

Second, defocus the item after mouse click:

Второй --- снимать фокус после клика мышью:

{% highlight js cssclass=codewrap %}
addEvent(dot, 'click', (function(x, b) {
  return function() {
    b.blur(); //defocus the dot
    changeActiveSlide(x); //change the slide
    
    ...

  };
})(i, dot), false);
{% endhighlight %}

Now our slider properly works with keyboard and seems to meet the requirements of <a href="http://www.w3.org/TR/WCAG20/" class="iconlink">"<span>Web Content Accessibility Guidelines</span>"</a>. So it goes.

Теперь слайдер адекватно работает с клавиатурой и исполняет (вроде бы) необходимый минимум <a href="http://www.w3.org/Translations/WCAG20-ru/" class="iconlink">"<span>Руководства по обеспечению доступности веб-контента</span>"</a>. Такие дела.