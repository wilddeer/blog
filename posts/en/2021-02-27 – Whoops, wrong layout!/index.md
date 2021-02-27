---
description: 'A tiny library that corrects wrong layout as you type – if a field you type to only accepts English letters, e.g. cardholder name field.'
tags:
    - draft
---

# Whoops, wrong layout!

[A tiny library](https://github.com/wilddeer/whoops-wrong-layout) that corrects wrong layout as you type – if a field you type to only accepts English letters, e.g. cardholder name field:

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
    (() => {
        function whoopsWrongLayout (input) {
            input.addEventListener('keydown', function (event) {
                if (
                    !event.altKey &&
                    !event.ctrlKey &&
                    !event.metaKey &&
                    !/^[a-z]$/i.test(event.key) &&
                    /^Key[A-Z]$/.test(event.code)
                ) {
                    event.preventDefault();

                    var char = event.code[event.code.length - 1];
                    if (!event.shiftKey) {
                        char = char.toLowerCase();
                    }

                    document.execCommand('insertText', false, char);
                }
            });
        }

        const input = document.querySelector('.js-name-input');
        whoopsWrongLayout(input);
    })();
</script>

(You’ll need a non-latin keyboard layout in order to test it though.)
