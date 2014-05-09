---
layout: post
title: "iOS 7 style switch"
categories: en experiments
lang: en
---

<style>
    /* demo styles */
    .button-demo .button-smaple {
        margin-bottom: 1.2em;
        line-height: 1em;
    }

    .button-demo .button-smaple label {
        vertical-align: middle;
        margin: 8px 16px; /* fallback */
        margin: 0.5rem 1rem;
    }

    .button-demo .ios7-switch.line-sample {
        display: block;
        font-size: 1.2em;
        text-align: left;
        max-width: 25em;
        line-height: 1.5em;
        margin: 0 auto;
        border: solid #eee;
        border-width: 1px 0 1px 0;
        padding: 0.5em 1em;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .button-demo .line-sample span {
        float: right;
        font-size: 1.5em;
    }

{% include ios7-switch/ios7-switch.modernizr.css %}
</style>

<figure class="button-demo">
    <div class="button-smaple">
        <label class="ios7-switch" style="font-size: 128px;">
            <input type="checkbox" checked>
            <span></span>
        </label>
    </div>

    <div class="button-smaple">
        <label class="ios7-switch" style="font-size: 32px;">
            <input type="checkbox">
            <span></span>
        </label>

        <label class="ios7-switch" style="font-size: 48px;">
            <input type="checkbox">
            <span></span>
        </label>

        <label class="ios7-switch" style="font-size: 64px;">
            <input type="checkbox">
            <span></span>
        </label>
    </div>

    <label class="ios7-switch line-sample">
        Feed the cat
        <input type="checkbox" checked>
        <span></span>
    </label>
</figure>

iOS7 switch imitation. Made it initially for new [Pepyaka](http://pepyaka.su), didn't use it eventually. Features:

- no shitty scripts, pure CSS,
- the most accurate copy of iOS7 switch behavior, includes `:active` state styles (haven't seen those in any other implementation),
- made with `em`s, sizes approprietaly to the font size,
- keyboard accessible.

<a href="https://github.com/wilddeer/ios7-switch" class="iconlink"><i class="icon-github"> </i><span>Fork me, baby</span></a>

###Markup

{% highlight html cssclass=codewrap %}
<label class="ios7-switch">
    <input type="checkbox" checked>
    <span></span>
</label>
{% endhighlight %}

or

{% highlight html cssclass=codewrap %}
<label class="ios7-switch">
    <input type="checkbox" checked>
    <span></span>
    Mah shitty option!
</label>
{% endhighlight %}

or something similar, you get the idea.

###CSS

{% highlight css cssclass=codewrap %}
{% include ios7-switch/ios7-switch.css %}
{% endhighlight %}

###Issues

Doesn't work in older browsers with no `box-shadow` support (IE8 and lower, Android 3.x and lower). It's easy enough to make a fallback to a regular checkbox. For instance, using [Modernizr](http://modernizr.com) test:

{% highlight js cssclass=codewrap %}
Modernizr.addTest('unprefixed-boxshadow', Modernizr.testProp('boxShadow', '1px 1px', true));
{% endhighlight %}

and modified stylesheet -- <a href="https://github.com/wilddeer/ios7-switch/blob/master/ios7-switch.modernizr.css" class="iconlink"><i class="icon-cloud-download"> </i><span>ios7-switch.modernizr.css</span></a>.

Has some rounding error problems in some browsers at some font sizes. Tweak the font size a bit to get rid of those.

###Related links

- [iOS 6 switch style checkboxes with pure CSS](http://lea.verou.me/2013/03/ios-6-switch-style-checkboxes-with-pure-css/), *Lea Verou*