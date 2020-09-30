---
layout: layouts/postWrap
postMod: is-no-padding-top
---

# Тач-слайдер Peppermint {.sr-only}

<link rel="stylesheet" href="/css/peppermint.suggested.css">

<style>
<%- include('peppermint-demo.css') %>
</style>

<div class="content-fullwidth stage peppermint" id="peppermint">
  <figure class="yellow">
    <h2 class="h2">Peppermint.js</h2>
    <p class="h3">Правильный тач-слайдер</p>
    <p>
      <a href="https://github.com/wilddeer/Peppermint" class="github">
        <%- include('/svg/github-alt-brands.svg') %>
        Форкни меня
      </a>
    </p>
  </figure>
  <figure class="red">
      <h2 class="h2">Быстрый, легкий, расширяемый</h2>
      <p>7,7 Кб, быстрый и плавный тач, <a href="#api">API</a> для расширений</p>
  </figure>
  <figure class="green">
      <h2 class="h2">Работает везде</h2>
      <p>Работает на <%- include('/svg/apple-brands.svg') %>&nbsp;айфонах, <%- include('/svg/android-brands.svg') %>&nbsp;андроидах, <%- include('/svg/windows-brands.svg') %>&nbsp;винфонах. Не зависит от сторонних библиотек. Работает в <%- include('/svg/internet-explorer-brands.svg') %>&nbsp;IE7+.</p>
  </figure>
  <figure class="blue">
    <p class="h2"><a href="/Слайдеры_и_кнопка_Tab/">Дружит</a> с кнопкой <kbd class="kbd">Tab</kbd></p>
  </figure>
</div>

<script src="/js/peppermint.min.js"></script>

<script>
  Peppermint(document.getElementById('peppermint'), {
    dots: true,
    slideshow: true,
    slideshowInterval: 7000,
    stopSlideshowAfterInteraction: true
  });
</script>

<div class="text">

[Peppermint.js](https://github.com/wilddeer/Peppermint) — еще один тач-слайдер. Только круче.

- Работает с мышью, [тачэвентами](http://www.w3.org/TR/touch-events/), [поинтерэвентами](http://www.w3.org/TR/pointerevents/), старыми [поинтерэвентами из IE10](http://msdn.microsoft.com/en-us/library/ie/hh673557(v=vs.85).aspx)
- Работает на андроидах, айфонах, винфонах, блекберри и на девайсах с 8 виндой
- Работает в IE7+
- Не зависит от сторонних библиотек. Если находит jQuery, регистрирует себя в качестве плагина.
- Использует CSS3 трансформы и транзишены с фоллбеком на анимации по таймеру
- 7,7 Кб кода
- Оптимизированные на скорость выполнения `touch`-функции
- [API](#api) и callback-функции для расширений
- Работает с клавиатурой, [не ломается](/Слайдеры_и_кнопка_Tab/) от кнопки <kbd>Tab</kbd>

## Комплект {#kit}

- <a href="https://raw.github.com/wilddeer/Peppermint/master/dist/peppermint.min.js" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.min.js</span></a> — минифицированный скрипт для продакшена
- <a href="https://raw.github.com/wilddeer/Peppermint/master/dist/peppermint.required.css" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.required.css</span></a> — обязательный набор стилей для корректной работы слайдера
- <a href="https://raw.github.com/wilddeer/Peppermint/master/dist/peppermint.suggested.css" class="iconlink"><i class="icon-cloud-download"> </i><span>peppermint.suggested.css</span></a> — дефолтный набор стилей, чтобы было с чего начать (включает обязательные стили)

## Запуск {#usage}

HTML разметка:

```html
<div class="peppermint peppermint-inactive" id="peppermint">
  <figure> ... </figure>

  <figure> ... </figure>

  <figure> ... </figure>
</div>
```

Javascript:

```js
var slider = Peppermint(document.getElementById('peppermint'));
```

Или javascript + jQuery:

```js
$('.peppermint').Peppermint();
```

Класс `peppermint-inactive` не обязателен. Он заменяется на `peppermint-active` во время установки.

Вместо `figure` можно использовать любой другой тег. Если используете `figure`, не забудьте подключить [html5shiv](https://github.com/aFarkas/html5shiv), чтобы старые IE не удивлялись HTML5-тегам.

Внутрь каждого слайда можно положить все что захочется.

## Настройки {#settings}

В качестве второго параметра (первого в случае использования jQuery) в Peppermint можно передать объект с настройками. Настройки по умолчанию:

```js
{
  // скорость перехода между слайдами, мс
  speed: 300,

  // скорость перехода между слайдами после тача, мс
  touchSpeed: 300,

  // включить слайдшоу
  slideshow: false,

  // интервал переключения слайдов, мс
  slideshowInterval: 4000,

  // останавливать слайдшоу после переключения слайда
  // пользователем
  stopSlideshowAfterInteraction: false,

  // начальный слайд
  startSlide: 0,

  // разрешить управление мышкой
  mouseDrag: true,

  // не включать Peppermint, если слайд один
  disableIfOneSlide: true,

  // Префикс для служебных классов слайдера,
  // таких как `inactive`, `active`, `mouse`, `drag` и т. д.
  // Не забудьте поменять стили соответствующим образом!
  cssPrefix: 'peppermint-',

  // показывать точки
  dots: false,

  // положить точки в начало блока `dotsContainer`
  // (по умолчанию кладутся в конец)
  dotsPrepend: false,

  // Элемент, в который положить точки. По умолчанию корневой
  // элемент слайдера. Может быть где угодно на странице.
  dotsContainer: undefined,

  // Элемент, содержащий слайды. По умолчанию корневой
  // элемент слайдера.
  slidesContainer: undefined,

  // Callback-функция, вызывается при смене слайда.
  // В качестве параметра получает номер слайда.
  onSlideChange: undefined,

  // Callback-функция, вызывается пойсле завершения установки.
  // В качестве параметра получает количество слайдов.
  onSetup: undefined
}
```

### Примеры использования

JS:

```js
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
```

JS + jQuery:

```js
$('.peppermint').Peppermint({
  dots: true,
  slideshow: true,
  speed: 500,
  slideshowInterval: 5000,
  stopSlideshowAfterInteraction: true,
  onSetup: function(n) {
    console.log('Peppermint setup done. Slides found: ' + n);
  }
});
```

## API {#api}

При инициализации Peppermint возвращает объект с функциями, которые можно использовать для управления слайдером и расширения функционала:

`slideTo(n)` — перейти к слайду `n`;

`next()` — следующий слайд;

`prev()` — предыдущий слайд;

`start()` — запустить слайдшоу;

`stop()` — остановить слайдшоу;

`pause()` — приостановить слайдшоу до следующей смены слайда;

`getCurrentPos()` — получить номер текущего слайда;

`getSlidesNumber()` — получить общее количество слайдов;

`recalcWidth()` — пересчитать ширину слайдера и слайдов. Полезно при изменении ширины контейнера. При ресайзе окна и смене ориентации девайса пересчет ширины запустится сам.

### Примеры использования

JS:

```js
// запустить Peppermint и сохранить API
var slider = Peppermint(document.getElementById('peppermint')),
    // сохранить ссылки на HTML-ноды
    rightArr = document.getElementById('right-arr'),
    leftArr = document.getElementById('left-arr'),
    getSlidesNumberButton = document.getElementById('getslidesnumber');

// клик по `#right-arr` переключит на следующий слайд
rightArr.addEventListener('click', slider.next, false);

// клик по `#left-arr` переключит на предыдущий слайд
leftArr.addEventListener('click', slider.prev, false);

// клик по `#getslidesnumber` покажет количество слайдов
getSlidesNumberButton.addEventListener('click', function() {
  alert('There are ' + slider.getSlidesNumber() + ' slides');
}, false);
```

JS + jQuery:

```js
// сохранить jQuery-ссылку на блок слайдера
var slider = $('#peppermint');

// запустить Peppermint
slider.Peppermint();

// клик по `#right-arr` переключит на следующий слайд
$('#right-arr').click(slider.data('Peppermint').next);

// клик по `#left-arr` переключит на предыдущий слайд
$('#left-arr').click(slider.data('Peppermint').prev);

// клик по `#getslidesnumber` покажет количество слайдов
$('#getslidesnumber').click(function() {
    alert('There are ' + slider.data('Peppermint').getSlidesNumber() + ' slides');
});
```

## Используете Peppermint?

Киньте ссылочку &rarr; [me@grumpy.blog](mailto:me@grumpy.blog).

## Лицензия {#license}

[MIT license](http://opensource.org/licenses/MIT).

</div>
