---
description: 'Как убрать бесящие аутлайны не убивая доступность.'
image: cover.webp
langLink: 'about_outlines'
---

<style>
.outline-demo {
    outline: 1px dotted #666;
}
</style>

# Про аутлайны

Есть такая банальная проблема дефолтных аутлайнов: кликаешь на ссылку или кнопку, появляется <span class="outline-demo js-outline-demo">аутлайн</span>. Начинающих разработчиков он бесит, и они его радостно убивают с помощью какого-нибудь `*:focus {outline: none}`. Прошаренные разработчики знают, что аутлайн убивать нельзя, потому что он помогает ориентироваться при навигации с клавиатуры и со вспомогательных устройств.

<script>
    const focusedElement = document.querySelector(':focus');
    const testElement = document.createElement('span');
    testElement.setAttribute('tabindex', '0');
    Object.assign(testElement.style, {
        position: 'absolute',
        left: 0,
        top: document.body.scrollTop + 'px',
        opacity: 0
    });
    document.body.appendChild(testElement);
    testElement.focus();
    const computedStyle = getComputedStyle(testElement);
    const outlineStyle = computedStyle.outline;
    const demoElement = document.querySelector('.js-outline-demo');

    if (
        outlineStyle &&
        computedStyle.outlineStyle !== 'none'
    ) {
        demoElement.style.outline = outlineStyle;
    }

    testElement.blur();
    testElement.remove();
    if (focusedElement) {
        focusedElement.focus();
    }
</script>

Однако аутлайн от этого при использовании мыши бесить не перестает. И в этом есть вина разработчиков браузеров: если бы дефолтные аутлайны вокруг ссылок и кнопок появлялись только при навигации с клавиатуры, ребят, отключающих аутлайны, было бы в разы меньше, и доступность сайтов в среднем по интернету была бы выше.

Сейчас браузеры потихоньку исправляются и вводят специальное состояние фокуса для мышиных кликов, у которого отключен дефолтный аутлайн. Исправляются, правда, не все, а если захочется кастомный стиль для клавиатурного фокуса, без костылей и яваскрипта ничего не получится.

Ситуация отличается не только между браузерами, но и у различных фокусируемых элементов внутри одного браузера. Три вида фокусируемых «нажимабельных» элементов — кнопка, ссылка и элемент с `tabindex="0"`:

<figure>
    <iframe class="demo-frame js-demo-frame" width="100%" src="/demos/outline-demo/ru.html" frameborder="0"></iframe>
    <figcaption>
        Для чистоты эксперимента элементы сидят в айфрейме
    </figcaption>
</figure>

А теперь по браузерам — есть ли аутлайн после клика:

<table>
    <thead>
        <tr>
            <th>Браузер</th>
            <th>Кнопка</th>
            <th>Ссылка</th>
            <th>Спан</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Chrome 39</td>
            <td class="is-false">Да</td>
            <td class="is-true">Нет</td>
            <td class="is-false">Да</td>
        </tr>
        <tr>
            <td>Firefox 34 Win </td>
            <td class="is-true">Нет</td>
            <td class="is-true">Нет</td>
            <td class="is-true">Нет</td>
        </tr>
        <tr>
            <td>Firefox 34 Mac </td>
            <td class="is-true">Нет</td>
            <td class="is-true">Нет</td>
            <td class="is-false">Да</td>
        </tr>
        <tr>
            <td>Safari 8</td>
            <td class="is-true">Нет</td>
            <td class="is-true">Нет</td>
            <td class="is-false">Да</td>
        </tr>
        <tr>
            <td>Opera 12</td>
            <td class="is-true">Нет</td>
            <td class="is-true">Нет</td>
            <td class="is-true">Нет</td>
        </tr>
        <tr>
            <td>IE 10, 11</td>
            <td class="is-true">Нет</td>
            <td class="is-true">Нет</td>
            <td class="is-true">Нет</td>
        </tr>
        <tr>
            <td>IE 7—9</td>
            <td class="is-false">Да</td>
            <td class="is-false">Да</td>
            <td class="is-false">Да</td>
        </tr>
    </tbody>
</table>

Старая Опера избавилась от всех «мышиных» аутлайнов раньше всех, но умерла, ИЕ подтянулся в 10 версии, Фаерфокс тоже почти молодец.

Со ссылками ситуация хорошая уже сейчас, поэтому, если придумать стиль фокуса кнопок, который не будет бесить, с аутлайнами даже напрягаться не надо.

Кроме отсутствия дефолтных мышиных аутлайнов хотелось бы еще иметь разные псевдоклассы для фокуса клавиатурного и мышиного. Пока этого всего нет, я сделал специальный костыль, который следит за `mousedown` и вешает на сфокусированный элемент класс, с помощью которого можно по-разному стилизовать клавиатурный и мышиный фокусы:

JS + jQuery:

```js
(function() {
    var mouseFocusedClass = 'is-mouse-focused';

    $(document.body).on('mousedown', function() {
        // wait for `document.activeElement` to change
        setTimeout(function() {
            // find focused element
            var activeElement = document.activeElement,
                $activeElement = $(activeElement);

            // if found and it’s not body...
            if (activeElement && activeElement !== document.body) {
                // add special class, remove it after `blur`
                $activeElement
                    .addClass(mouseFocusedClass)
                    .one('blur', function() {
                        $activeElement.removeClass(mouseFocusedClass);
                    });
            }
        }, 0);
    });
})();
```

Vanilla JS (не будет работать в IE8, потому что `addEventListener`):

```js
(function() {
    var mouseFocusedClass = 'is-mouse-focused';

    document.body.addEventListener('mousedown', function() {
        // wait for `document.activeElement` to change
        setTimeout(function() {
            // find focused element
            var activeElement = document.activeElement;

            // if found and it’s not body...
            if (activeElement && activeElement !== document.body) {
                // add special class, remove it after `blur`
                activeElement.className += ' ' + mouseFocusedClass;
                activeElement.addEventListener('blur', function(e) {
                    e.target.removeEventListener(e.type, arguments.callee);

                    activeElement.className = activeElement.className
                        .replace(
                            new RegExp(
                                '(\\s+|^)' +
                                mouseFocusedClass +
                                '(\\s+|$)', 'g'
                            ),
                            ' '
                        )
                        .replace(/^\s+|\s+$/g, '');
                });
            }
        }, 0);
    });
})();
```

Легким движением руки отключаем ненавистные аутлайны, не попортив доступности:

```css
/* keyboard custom focus style */
:focus {
    outline: 1px solid blue;
}

/* mouse/touch focus style */
:active,
.is-mouse-focused:focus {
    outline: none;
}
```

Костыль ставит класс через `setTimeout()` (иначе `document.activeElement` не успевает переключиться), поэтому в селектор добавлен `:active` (который срабатывает только с мышкой, кстати), чтобы элемент не мигал в момент переключения класса. Если у вас есть более элегантное решение, поправьте код [на гитхабе](https://github.com/wilddeer/focus-fix) или киньте ссылочку в [твиттер](https://twitter.com/wildir).

Пользуйтесь и не убивайте аутлайны полностью, пожалуйста.
