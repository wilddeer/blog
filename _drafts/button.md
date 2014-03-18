---
layout: post
title: "Кнопка"
categories: experiments
lang: ru
---

<div style="font-size: 32px;">
    <input type="checkbox" id="fancy_switch">
    <label class="fancy-switch" for="fancy_switch">

    </label>
</div>

<style>
    .fancy-switch {
        position: relative;
        display: inline-block;
        width: 2.25em;
        height: 1em;
        background: white;
        box-shadow: inset 0 0 0 0.0625em rgba(0,0,0,0.1);
        border-radius: 0.5em;
        transition: all 0.2s linear;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        tap-highlight-color: transparent;
    }

    .fancy-switch:active {
        box-shadow: inset 0 0 0 1em rgba(0,0,0,0.1);
    }

    .fancy-switch:after {
        position: absolute;
        display: block;
        content: '';
        width: 0.875em;
        height: 0.875em;
        border-radius: 0.4375em;
        top: 0.0625em;
        left: 0.0625em;
        background: white;
        box-shadow: inset 0 0 0 0.03em rgba(0,0,0,0.1),
                    0 0 0.05em rgba(0,0,0,0.05),
                    0 0.1em 0.2em rgba(0,0,0,0.2);
        transition: all 0.2s linear;
    }

    .fancy-switch:active:after {
        width: 1.25em;
    }

    input:checked + .fancy-switch {
        box-shadow: inset 0 0 0 1em #4cd964;
    }

    input:checked + .fancy-switch:after {
        left: 1.3125em;
    }

    input:checked + .fancy-switch:active:after {
        left: 0.9375em;
    }
</style>

<script>
dzDelayed.push(function() {
    
});
</script>