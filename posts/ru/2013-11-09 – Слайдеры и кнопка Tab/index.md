# Слайдеры и кнопка <kbd>Tab</kbd> {#header}

Все js-слайдеры подвержены одному смешному багу: они ломаются при использовании кнопки <kbd>Tab</kbd>. Если на каком-то слайде есть ссылка, слайдер обязательно сломается при переходе на нее табом. Несколько примеров на [слайдере, который не ломается](/scripts/peppermint/) (oh, the irony):

<div class="peppermint js-peppermint">
  {% include pic.htm src='apple.jpg' p=true a='Сломанный слайдер на apple.com' c='Сломанный слайдер на <a href="http://apple.com">apple.com</a>' %}
  {% include pic.htm src='swipejs.jpg' p=true a='Сломанный слайдер Swipe' c='Сломанный слайдер <a href="http://swipejs.com">Swipe</a>' %}
  {% include pic.htm src='steam.jpg' p=true a='Сломанный слайдер Стима' c='Сломанный слайдер <a href="http://store.steampowered.com">Стима</a>' %}
</div>

Дело в том, что при фокусировании ссылки, скрытой за `overflow: hidden`, браузер заботлибо промотает вам содержимое блока, чтобы ссылка оказалась в поле зрения. Да, у блоков с `overflow: hidden` тоже есть `scrollLeft`, и он работает так же, как и в случае с `overflow: auto`.

Решение: ловим событие `focus` внутри слайдов. Когда событие случается, переключаем слайд на тот, в котором произошло событие, и сбрасываем `scrollLeft` контейнера слайдов. Событие `focus` не бабблится, поэтому используем капчуринг, чтобы поймать его на уровне слайдов ([почитать про бабблинг и капчуринг](http://www.quirksmode.org/js/events_order.html)). Для старых IE используем фоллбек в виде события `focusin`, которое бабблится.

Выполняем для каждого слайда:

```js
//Сначала фоллбек для старых IE
slide.onfocusin = function() {
  //Сбрасываем скролл
  _this.scrollLeft = 0;
  //И еще раз с нулевым таймаутом, потому что в вебките скролл выставляется позже события.
  //Первый ресет оставляем, чтобы в других браузерах не дергалось.
  setTimeout(function() {
    _this.scrollLeft = 0;
  }, 0);

  //Переключаем на слайд, к которому привязано событие
  changeActiveSlide(i);
};

//Используем привязанную к `onfocusin` функцию уже в нормальном `addEventListener`
if (slide.addEventListener) slide.addEventListener('focus', slide.onfocusin, true); //`true` включает капчуринг
```

Можно было бы обойтись событием `focusin`, но Firefox до сих пор [не поддерживает его](https://bugzilla.mozilla.org/show_bug.cgi?id=687787) >:(

"Точки" под слайдером тоже должны дружить с клавиатурой. Чтобы не городить огород, достаточно просто сделать их доступными для табуляции (для этого выставляем им аттрибут `tabindex="0"`) и включать нужный слайд по нажатию энтера.

Естественно, при этом нельзя отключать `outline` вокруг выделенной точки. Чтобы обводка вокруг точки работала при навигации с клавиатуры, но не мешалась при использовании мыши, существует два приема. Первый --- убрать `outline` для псевдокласса `:active`, чтобы обводки не было во время нажатой кнопки мыши:

```css
.peppermint.active > ul.dots > li:active {
  outline: none;
}
```

Второй --- снимать фокус после клика мышью:

```js
addEvent(dot, 'click', (function(x, d) {
  return function() {
    d.blur(); //снимаем фокус с точки
    changeActiveSlide(x); //переключаем слайд

    ...

  };
})(i, dot), false);
```

<figure class="info icon-code" markdown="1">
Выше используется простая универсальная функция `addEvent`:

```js
function addEvent(el, event, func, bool) {
  el.addEventListener? el.addEventListener(event, func, !!bool): el.attachEvent('on'+event, func);
}
```
</figure>

Теперь слайдер адекватно работает с клавиатурой и исполняет (вроде бы) необходимый минимум <a href="http://www.w3.org/Translations/WCAG20-ru/" class="iconlink">"<span>Руководства по обеспечению доступности веб-контента</span>"</a>. Такие дела.
