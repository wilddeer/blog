---
description: 'Все js-слайдеры подвержены одному смешному багу: они ломаются при использовании кнопки Tab.'
image: cover.png
layout: layouts/postWrap
---

<link rel="stylesheet" href="/css/peppermint.suggested.css">

<div class="text">

# Слайдеры и кнопка <kbd>Tab</kbd>

Все js-слайдеры подвержены одному смешному багу: они ломаются при использовании кнопки <kbd>Tab</kbd>. Если на каком-то слайде есть ссылка, слайдер обязательно сломается при переходе на нее табом. Несколько примеров на [слайдере, который не ломается](/Тач-слайдер_Peppermint.js/) (oh, the irony):

</div>

<div class="demo is-fullwidth is-light is-small-padding">
  <div class="text peppermint js-peppermint">

![Сломанный слайдер на [apple.com](https://apple.com)](p_apple.jpg =777x500)
{.is-phone-fullwidth}

![Сломанный слайдер [Swipe](http://swipejs.com)](p_swipejs.jpg =777x500)
{.is-phone-fullwidth}

![Сломанный слайдер [Стима](https://store.steampowered.com)](p_steam.jpg =777x500)
{.is-phone-fullwidth}

  </div>
  <div class="js-dots">
  </div>
</div>

<script src="/js/peppermint.min.js"></script>

<script>
  Peppermint(document.querySelector('.js-peppermint'), {
    dots: true,
    slideshow: true,
    slideshowInterval: 7000,
    stopSlideshowAfterInteraction: true,
    dotsContainer: document.querySelector('.js-dots')
  });
</script>

<div class="text">

Дело в том, что при фокусировании ссылки, скрытой за `overflow: hidden`, браузер заботлибо промотает вам содержимое блока, чтобы ссылка оказалась в поле зрения. Да, у блоков с `overflow: hidden` тоже есть `scrollLeft`, и он работает так же, как и в случае с `overflow: auto`.

Решение: ловим событие `focus` внутри слайдов. Когда событие случается, переключаем слайд на тот, в котором произошло событие, и сбрасываем `scrollLeft` контейнера слайдов. Событие `focus` не бабблится, поэтому используем капчуринг, чтобы поймать его на уровне слайдов ([почитать про бабблинг и капчуринг](http://www.quirksmode.org/js/events_order.html)). Для старых IE используем фоллбек в виде события `focusin`, которое бабблится.

Выполняем для каждого слайда:

```js
// Сначала фоллбек для старых IE
slide.onfocusin = function() {
  // Сбрасываем скролл
  _this.scrollLeft = 0;
  // И еще раз с нулевым таймаутом, потому что в вебките скролл
  // выставляется позже события. Первый ресет оставляем, чтобы
  // в других браузерах не дергалось.
  setTimeout(function() {
    _this.scrollLeft = 0;
  }, 0);

  // Переключаем на слайд, к которому привязано событие
  changeActiveSlide(i);
};

// Используем привязанную к `onfocusin` функцию уже
// в нормальном `addEventListener`
if (slide.addEventListener) {
  // `true` включает капчуринг
  slide.addEventListener('focus', slide.onfocusin, true);
}
```

Можно было бы обойтись событием `focusin`, но Firefox до сих пор [не поддерживает его](https://bugzilla.mozilla.org/show_bug.cgi?id=687787) >:(

«Точки» под слайдером тоже должны дружить с клавиатурой. Чтобы не городить огород, достаточно просто сделать их доступными для табуляции (для этого выставляем им аттрибут `tabindex="0"`) и включать нужный слайд по нажатию энтера.

Естественно, при этом нельзя отключать `outline` вокруг выделенной точки. Чтобы обводка вокруг точки работала при навигации с клавиатуры, но не мешалась при использовании мыши, существует два приема. Первый — убрать `outline` для псевдокласса `:active`, чтобы обводки не было во время нажатой кнопки мыши:

```css
.peppermint.active > ul.dots > li:active {
  outline: none;
}
```

<del class="deleted-block">

Второй — снимать фокус после клика мышью:

```js
addEvent(dot, 'click', (function(x, d) {
  return function() {
    d.blur(); //снимаем фокус с точки
    changeActiveSlide(x); //переключаем слайд

    ...

  };
})(i, dot), false);
```

<div class="text-container notice is-with-big-icon font-size is-smaller block is-mb">

<%- include('/svg/code-solid.svg') %>Выше используется простая универсальная функция `addEvent`{.is-colored-bg}:

```js
function addEvent(el, event, func, bool) {
  el.addEventListener ?
    el.addEventListener(event, func, !!bool) :
    el.attachEvent('on'+event, func);
}
```

</div>
</del>

<%- include('/svg/history-solid.svg') %>Хреновый способ убрать аутлайн, не стоит сбрасывать позицию фокуса. Лучше [воспользуйтесь этим](/Про_аутлайны/){.is-colored-bg} методом.
{.notice .is-warning .is-with-icon}

Теперь слайдер адекватно работает с клавиатурой и исполняет (вроде бы) необходимый минимум [«Руководства по обеспечению доступности веб-контента»](http://www.w3.org/Translations/WCAG20-ru/). Такие дела.

</div>
