---
description: 'How to remove annoying outlines without killing accessibility.'
image: cover.webp
langLink: 'про_аутлайны'
---

<style>
.outline-demo {
    outline: 1px dotted #666;
}
</style>

# About outlines

There’s a banal problem with default outlines: you click on a link or a button, and an <span class="outline-demo js-outline-demo">outline</span> appears. This annoys novice developers, and they joyfully kill it using something like `*:focus {outline: none}`. Experienced developers know that you can’t kill the outline because it helps with navigation using a keyboard and assistive devices.

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

However, the outline continues to be annoying when using a mouse. This issue is partly due to the approach taken by browser developers: if default outlines around links and buttons were only displayed during keyboard navigation, there would be far fewer developers disabling outlines, and overall web accessibility would be higher.

Now browsers are slowly improving and introducing a special focus state for mouse clicks, where the default outline is disabled. However, not all are updating, and if you want a custom style for keyboard focus, nothing can be achieved without hacks and JavaScript.

The situation varies not only between browsers but also among different focusable elements within a single browser. Three types of focusable “clickable” elements—button, link, and element with `tabindex="0"`:

<figure>
    <iframe class="demo-frame js-demo-frame" width="100%" src="/demos/outline-demo/en.html" frameborder="0"></iframe>
    <figcaption>
        For the purity of the experiment, the elements are within an iframe
    </figcaption>
</figure>

And now by browser—whether there is an outline after clicking:

<table>
    <thead>
        <tr>
            <th>Browser</th>
            <th>Button</th>
            <th>Link</th>
            <th>Span</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Chrome 39</td>
            <td class="is-false">Yes</td>
            <td class="is-true">No</td>
            <td class="is-false">Yes</td>
        </tr>
        <tr>
            <td>Firefox 34 Win </td>
            <td class="is-true">No</td>
            <td class="is-true">No</td>
            <td class="is-true">No</td>
        </tr>
        <tr>
            <td>Firefox 34 Mac </td>
            <td class="is-true">No</td>
            <td class="is-true">No</td>
            <td class="is-false">Yes</td>
        </tr>
        <tr>
            <td>Safari 8</td>
            <td class="is-true">No</td>
            <td class="is-true">No</td>
            <td class="is-false">Yes</td>
        </tr>
        <tr>
            <td>Opera 12</td>
            <td class="is-true">No</td>
            <td class="is-true">No</td>
            <td class="is-true">No</td>
        </tr>
        <tr>
            <td>IE 10, 11</td>
            <td class="is-true">No</td>
            <td class="is-true">No</td>
            <td class="is-true">No</td>
        </tr>
        <tr>
            <td>IE 7—9</td>
            <td class="is-false">Yes</td>
            <td class="is-false">Yes</td>
            <td class="is-false">Yes</td>
        </tr>
    </tbody>
</table>

Old Opera got rid of all “mouse” outlines first, but died, IE caught up in version 10, Firefox is almost getting it right too.

For links, things are already in a good place, so if you can devise a focus style for buttons that isn’t annoying, you don’t even have to strain about outlines.

Along with the elimination of default “mouse” outlines, it would also be nice to have different pseudo-classes for keyboard- and mouse-initiated focus. Until all this is available, I’ve made a special hack that monitors `mousedown` and attaches a class to the focused element, allowing you to style keyboard and mouse focuses differently:

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

Vanilla JS (won’t work in IE8 ’cause `addEventListener`):

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

With a simple flick of the wrist, we disable the hated outlines without compromising accessibility:

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

The hack uses `setTimeout()` (otherwise `document.activeElement` doesn’t have time to switch), so `:active` (which only triggers with a mouse, by the way) is added to the selector to prevent the element from flickering during the class switch. If you have a more elegant solution, correct the code [on GitHub](https://github.com/wilddeer/focus-fix) or send a link in [Twitter](https://twitter.com/wildir).

Use it and please don’t kill outlines completely.
