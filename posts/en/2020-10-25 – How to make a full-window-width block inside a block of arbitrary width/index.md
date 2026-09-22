---
description: 'While rebuilding the blog I wanted to be able to barge into the middle of a post with some block spanning the full width of the window.'
image: cover.jpg?v=2
langLink: 'как_заверстать_блок_во_всю_ширину_окна_внутри_блока_с_произвольной_шириной'
---

<%
    const title = 'How to make a full-window-width block inside a block of arbitrary width';
    const pic = 'wil-stewart-RpDA3uYkJWM-unsplash.jpg';
%>

# <%= title %> {.sr-only}

While rebuilding the blog I wanted to be able to barge into the middle of a post with some block spanning the full width of the window. Like this:

<figure class="is-demo is-arbitrary" style="background: #011126 no-repeat center/cover url(<%= pic %>); padding-top: 6em; padding-bottom: 6em; text-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);">
    <div class="content-box text-container" style="color: rgba(255, 255, 255, 0.9); text-align: center;" aria-hidden="true">
        <h1 class="is-smaller"><%= title %></h1>
    </div>
    <img class="sr-only" src="<%= pic %>" alt="Just a random space photo from Unsplash. Pretty.">
    <figcaption>
        Photo by <a class="is-colored-bg" href="https://unsplash.com/@wilstewart3?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Wil Stewart</a> on <a class="is-colored-bg" href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
    </figcaption>
</figure>

The width of the main content column is completely arbitrary and may change depending on the window size, the browser’s mood and the phase of the moon. The only thing we know about it for sure is that it’s centered:

![](demo.png =800x563)
{.is-ootb}

The most obvious way is to interrupt the content block, put in a block without margins, then continue the content:

![](block-break.png =800x563)
{.is-ootb}

The problem is that posts are convenient to write in markdown, and in markdown this approach turns into a hellish mess that’s hard to keep track of:

```markdown
<div class="text-content">

# Post!

Blah blah blah-blah blah. Blah blah? Blah blah-blah...

...blah blahblah:

</div>

<div class="fullwidth">
    <!-- some demo -->
</div>

<div class="text-content">

Blah blaaah blah blah-blah...

<!-- ...one eternity later -->

</div>
```

What I want is this:

```markdown
# Post!

Blah blah blah-blah blah. Blah blah? Blah blah-blah...

...blah blahblah:

<div class="fullwidth">
    <!-- some demo -->
</div>

Blah blaaah blah blah-blah...
```

Okay, we put the block into the content and give it `width: 100vw`:

![](step1.png =800x563)
{.is-ootb}

Now it has to be shifted to the left edge of the window. The distance is unknown, but we do have the width of the content block (`100%`) and the width of the window (`100vw`). First we push the block to the right with `margin-left: 50%`:

![](step2.png =800x563)
{.is-ootb}

Now the block starts right at the middle of the window. Subtract `50vw` so the block goes off to the left edge. That gives `margin-left: calc(50% - 50vw)`, and the block lands where it should:

![](step3.png =800x563)
{.is-ootb}

The block’s style looks like this:

```css
.fullwidth {
    width: 100vw;
    margin-left: calc(50% - 50vw);
}
```

Neat, just what we need.

...or is it? What the hell is that?

![](fuuuuuuuuu.png?v=2 =533x263)

A horizontal scrollbar, where the hell did it come from?

Turns out the width of the vertical scrollbar is included in the viewport width, so `100vw` is more than we need, hence the horizontal scroll. I have no idea why it was made this way, I can’t think of a single case where it would be useful.

<del class="deleted-block">

Happiness was so close. Okay, hack time. Googling turns up one acceptable hack: put a script into `<head>` that stores a sane `1vw` (that is, without the scrollbar width) in a CSS variable and recalculates it on resize:

```html
<script>
(function () {
    function setVw() {
        const vw = document.documentElement.clientWidth / 100;
        document.documentElement.style.setProperty('--vw', `${vw}px`);
    }

    setVw();
    window.addEventListener('resize', setVw);
}());
</script>
```

Now we have a `var(--vw)` variable holding the number of pixels we need. But following [the old tradition](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation) it’s better to use it with a fallback to a regular `1vw`, like this: `var(--vw, 1vw)`{.whitespace-nowrap}.

As a result, the block’s style turns into...

```css
.fullwidth {
    width: calc(100 * var(--vw, 1vw));
    margin-left: calc(50% - 50 * var(--vw, 1vw));
}
```

Meh.

Preprocessors smooth this horror out a bit. I made myself a `$vw: var(--vw, 1vw)`{.whitespace-nowrap} variable, and my style now looks something like this:

```css
.fullwidth
    width: calc(100 * $vw)
    margin-left: calc(50% - (50 * $vw))
```

Livable.

</del>

<%- include('/svg/history-solid.svg') %>The hack is no longer needed: make `body` a size container (`container-type: inline-size`), and `100cqw` gives you the window width without the scrollbar. This very blog is built that way.
{.notice .is-warning .is-with-icon}

## P.S. Scrollbars on the Mac

If you do your layout on a Mac, I recommend turning on “always show scrollbars” in the system settings: problems with horizontal (and sometimes vertical) scroll become visible right away.

The vast majority of your users are on Windows, where scrollbars are always visible. Be a bit closer to them.
