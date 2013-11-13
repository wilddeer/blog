---
layout: post
title: "Слайдеры и кнопка Tab"
categories: internet-maintenance
lang: ru
---

#Слайдеры и кнопка <kbd>Tab</kbd> {#header}

Все js-слайдеры подвержены одному смешному багу: они ломаются при использовании кнопки <kbd>Tab</kbd>. Если на каком-то слайде есть ссылка, слайдер обязательно сломается при переходе на нее табом. Несколько примеров на [слайдере, который не ломается](/scripts/peppermint/) (oh, the irony):

<div class="peppermint js-peppermint">
  {% include pic.htm src='apple.jpg' p=true a='Сломанный слайдер на apple.com' c='Сломанный слайдер на <a href="http://apple.com">apple.com</a>' %}
  {% include pic.htm src='swipejs.jpg' p=true a='Сломанный слайдер Swipe' c='Сломанный слайдер <a href="http://swipejs.com">Swipe</a>' %}
  {% include pic.htm src='steam.jpg' p=true a='Сломанный слайдер Стима' c='Сломанный слайдер <a href="http://store.steampowered.com">Стима</a>' %}
</div>

Дело в том, что при фокусировании ссылки, скрытой за `overflow: hidden`, браузер заботлибо промотает вам содержимое блока, чтобы ссылка оказалась в поле зрения. Да, у блоков с `overflow: hidden` тоже есть `scrollLeft`, и он работает так же, как и в случае с `overflow: auto`.

Решение: собираем ссылки из каждого слайда и вешаем на каждую событие `focus`. Когда событие случается, переключаем слайд на тот, в котором найдена ссылка и сбрасываем `scrollLeft` контейнера слайдов:

{% highlight js cssclass=codewrap %}
for (var j = links.length - 1; j >= 0; j--) {
  addEvent(links[j], 'focus', function(x) {
    return function() {
      _this.scrollLeft = 0;
      //В вебките скролл выставляется позже события. Решается нулевым таймаутом.
      setTimeout(function() {
        _this.scrollLeft = 0;
      }, 0);
      changeActiveSlide(x);
    }
  }(i), false); //i -- номер слайда
};
{% endhighlight %}

"Точки" под слайдером тоже должны дружить с клавиатурой. Чтобы не городить огород, достаточно просто сделать их доступными для табуляции (для этого выставляем им аттрибут `tabindex="0"`) и включать нужный слайд по нажатию энтера.

Естественно, при этом нельзя отключать `outline` вокруг выделенной точки. Чтобы обводка вокруг точки работала при навигации с клавиатуры, но не мешалась при использовании мыши, существует два приема. Первый --- убрать `outline` для псевдокласса `:active`, чтобы обводки не было во время нажатой кнопки мыши:

{% highlight css cssclass=codewrap %}
.peppermint.active > ul.dots > li:active {
  outline: none;
}
{% endhighlight %}

Второй --- снимать фокус после клика мышью:

{% highlight js cssclass=codewrap %}
addEvent(dot, 'click', (function(x, b) {
  return function() {
    b.blur(); //снимаем фокус с точки
    changeActiveSlide(x); //переключаем слайд
    
    ...

  };
})(i, dot), false);
{% endhighlight %}

Теперь слайдер адекватно работает с клавиатурой и исполняет (вроде бы) необходимый минимум <a href="http://www.w3.org/Translations/WCAG20-ru/" class="iconlink">"<span>Руководства по обеспечению доступности веб-контента</span>"</a>. Такие дела.
