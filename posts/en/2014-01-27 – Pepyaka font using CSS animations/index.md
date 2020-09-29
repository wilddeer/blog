<style>
    .pep-holder {
        text-align: center;
        padding: 3em 1em;
        margin-left: 0;
        margin-right: 0;
        width: 100%;
        max-width: 100%;
        margin-bottom: 0.5em;
        box-shadow: inset 0 0 1.5em rgba(15,15,0,0.2),
                    inset 0 0.3em 0.3em rgba(15,15,0,0.2);
        background-size: 2.8em 2.8em;
        background-color: #ebe7d7;
        background-image: -webkit-linear-gradient(0deg, rgba(0,0,0,.05) 50%, transparent 50%, transparent);
        background-image: -moz-linear-gradient(0deg, rgba(0,0,0,.05) 50%, transparent 50%, transparent);
        background-image: linear-gradient(90deg, rgba(0,0,0,.05) 50%, transparent 50%, transparent);
    }

    .pep-holder > p {
        margin: 0;
    }

    .pep-input-holder {
        margin-top: 1em;
        margin-bottom: 2em;
    }

    #pep_input {
        width: 100%;
    }

    .pep-constols-holder {
        text-align: center;
    }

    .pep-constols-holder label {
        display: inline-block;
        margin: 0.2em 0.5em 0 0.5em;
    }

    html.no-js .pep-input-holder,
    html.no-js .pep-constols-holder {
        display: none;
    }
</style>

<script>
dzDelayed.push(function() {
    if (!Modernizr.textshadow || !Modernizr.cssanimations || !Modernizr.csstransforms) {
        $('.pep-holder').html('<p><i class="icon-bug"></i> Ooops! Your browser <i>cannot into animations</i>!</p>');
        return;
    }

    var pepBox = $('.pepyaka'),
        pepInput = $('#pep_input'),
        asyncInput = $('#async'),
        sharpInput = $('#sharp'),
        canExecEvent = true,
        val = pepInput[0].value,
        oldRand;

    function redraw() {
        var result = '';

        val = pepInput[0].value;

        for (var i = 0; i < val.length; i++) {
            var rand = antiJekpotRandom(0, 7, oldRand);

            oldRand = rand;

            result += '<span class="pep'+rand+'">' + (val[i]==' '?'&nbsp;':val[i]) + '</span>';
        }

        if (!result) result = '<i class="icon-bug"></i>';

        pepBox.html(result);

        canExecEvent = false;
        setTimeout(function() {
            canExecEvent = true;
        }, 50);
    }

    pepInput.on('change input keyup blur', function() {
        if (canExecEvent && val != pepInput[0].value) redraw();
    })

    asyncInput.on('change', function() {
        pepBox.toggleClass('async');
        redraw();
    });

    sharpInput.on('change', function() {
        pepBox.toggleClass('smooth');
        redraw();
    });

    moveCursorToEnd(pepInput[0]);
});
</script>

<p class="pep-input-holder">
    <input type="text" value="Yarrr!" id="pep_input" class="big" placeholder="Type something">
</p>

<div class="pep-holder">
    <p class="pepyaka async">
        <span class="pep1">Y</span><span class="pep6">a</span><span class="pep2">r</span><span class="pep0">r</span><span class="pep4">r</span><span class="pep7">!</span>
    </p>
</div>

<p class="pep-constols-holder">
    <label><input type="checkbox" id="async" checked> Async</label>
    <label><input type="checkbox" id="sharp"> Smooth transitions</label>
</p>

My old epileptic font from [Pepyaka](http://pepyaka.su), remastered using CSS3 animations.

Had to use an obscene amount of styles. Unlike `box-shadow`, `text-shadow` doesn’t have `spread` parameter, so I had to emulate the stroke using eight shadows. Moreover, you can’t just change the color of the shadows, so I also had to redefine all eight shadows in each keyframe.

On the bright side, latest Presto-based Opera and latest Firefox don’t require prefixes for animations, and IE10 had always worked without them, so I dropped every prefix but `-webkit`.

To make characters wobble asynchronously I give &rsquo;em random classes. A total of eight classes (one per animation keyframe), each having `animation-delay` equal to the length of the animation step, multiplied by the number of the class.

Animation smoothness is tweaked by the number of steps between animation keyframes. The more steps there are, the smoother the animation:

```css
-webkit-animation-timing-function: steps(1);
animation-timing-function: steps(1);
```

For continuous animation replace `steps()` with `linear` (or just remove `animation-timing-function` completely, as `linear` is used by default).

<del>"Wobbling" strength vary a bit between browsers. I used Chrome to tweak it, it seem to wobble a bit quieter in the others.</del> After yet another update Chrome is wobbling just like the others. That’s great.

IE10 on winphone wins the "Tough guy" nomination among the mobile devices. Animates like a boss. Weak mobile webkits constantly loose desync and deliver pretty weak framerate overall. The weakest is Opera Classic on Android (as well as on desktop, btw).

HTML:

```html
<div class="pepyaka async">
    <span class="pep1">Y</span><span class="pep6">a</span><span class="pep2">r</span><span class="pep0">r</span><span class="pep4">r</span><span class="pep7">!</span>
</div>
```

CSS:

```css
{% include snippets/pepyaka-font.css %}
```

<style>
{% include snippets/pepyaka-font.css %}
</style>
