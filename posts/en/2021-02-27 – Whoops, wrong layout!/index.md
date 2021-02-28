---
description: 'A tiny library that fixes incorrectly selected layout if a field the user types to only accepts English letters, e.g. cardholder name field.'
tags:
    - draft
---

# Whoops, wrong layout!

[A tiny library](https://github.com/wilddeer/whoops-wrong-layout) that fixes incorrectly selected layout if a field the user types to only accepts English letters, e.g. cardholder name field:

<style>
    .post_inputWrap {
        text-align: center;
        margin-top: 3em;
        margin-bottom: 3em;
    }

    .post_input {
        text-align: center;
        max-width: 100%;
        width: 500px;
        margin: 0 auto;
    }
</style>

::: .post_inputWrap
<input class="input post_input js-name-input" type="text" placeholder="Cardholder name" autofocus>
:::

<script>
    (function () {
        function whoopsWrongLayout (input) {
            /*
             * `keydown` only works with real physical keys (as far as I know anyway). It won’t
             * trigger when typing on a mobile device, which is great for this use case: you can’t
             * go wrong with the layout on a phone, it literally changes the whole keyboard.
             */
            input.addEventListener('keydown', function (event) {
                /*
                 * 1. Skip the event if a modifier key is pressed (except for shift)
                 */
                if (event.altKey || event.ctrlKey || event.metaKey) {
                    return;
                }


                /*
                 * 2. Skip the event if the letter that is being typed is in the English alphabet.
                 *
                 *    We don’t care whether it was triggered with the matching key on the keyboard
                 *    or not: we don’t want to break non-QWERTY layouts that also have English
                 *    letters in them, e.g. Dvorak or German.
                 */
                if (/^[a-z]$/i.test(event.key)) {
                    return;
                }


                /*
                 * 3. Skip the event if the key is not one of the Key(A-Z) QWERTY keys.
                 *
                 *    This also gracefully excludes IE as it doesn’t support `event.code` property.
                 */
                if (!/^Key[A-Z]$/.test(event.code)) {
                    return;
                }


                /*
                 * 4. Prevent the input
                 */
                event.preventDefault();


                /*
                 * 5. Get the matching English letter.
                 *
                 *    The letter that we need is the last letter of the key code, so we just grab
                 *    the last letter ¯\_(ツ)_/¯
                 *
                 *    We also convert it to the lowercase if the shift key isn’t pressed.
                 */
                var char = event.code[event.code.length - 1];
                if (!event.shiftKey) {
                    char = char.toLowerCase();
                }


                /*
                 * 6. Emulate `beforeinput` event if it’s supported.
                 *
                 *    `document.execCommand` currently doesn’t trigger it and probably won’t until
                 *    these guys https://github.com/w3c/editing/issues/200 make up their mind.
                 *
                 *    Even if `document.execCommand` starts to trigger it, it’s better to trigger
                 *    it twice than not trigger at all.
                 *
                 *    And in case of `setRangeText` we have to emulate it anyways.
                 */
                if (
                    typeof InputEvent === 'function' &&
                    typeof InputEvent.prototype.getTargetRanges === "function"
                ) {
                    var beforeInputEvent = new InputEvent('beforeinput', {
                        inputType: 'insertText',
                        data: char,
                        cancelable: true,
                        bubbles: true,
                        composed: true
                    });

                    var beforeInputCancelled = !input.dispatchEvent(beforeInputEvent);
                    if (beforeInputCancelled) {
                        return;
                    }
                }


                /*
                 * 7. Try inserting the letter with `document.execCommand`.
                 *
                 *    It’s a preferred method as it adds the action to the undo stack (i.e. doesn’t break
                 *    Ctrl+Z). It also fires an `input` event.
                 *
                 *    But it kidna doesn’t work in Firefox in some cases:
                 *    https://bugzilla.mozilla.org/show_bug.cgi?id=1220696
                 *
                 *    Oh, and it’s also depricated:
                 *    https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
                 *
                 *    At least it returns `false` if the command fails for any reason.
                 */
                var inserted = document.execCommand('insertText', false, char);


                /*
                 * 8. If `execCommand` failed, insert the letter using `setRangeText` and emulate
                 *    the `input` event, if possible.
                 */
                if (!inserted) {
                    input.setRangeText(char, input.selectionStart, input.selectionEnd, 'end');

                    if (typeof InputEvent === 'function') {
                        var inputEvent = new InputEvent('input', {
                            inputType: 'insertText',
                            data: char,
                            bubbles: true,
                            composed: true
                        });
                        input.dispatchEvent(inputEvent);
                    }
                }
            });
        }

        var input = document.querySelector('.js-name-input');
        whoopsWrongLayout(input);
    })();
</script>

(You’ll need a non-latin keyboard layout in order to test it though.)
