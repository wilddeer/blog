---
description: 'An incredible detective story. Who will turn out to be the villain? You will never fucking guess!'
image: cover.jpg
langLink: 'браузер_без_головы__как_фейсбук_спасал_свой_трекинг'
---

# Headless browser:<div class="text-tiny">how Facebook saved its tracking</div>

## Backstory

[Chatra](https://chatra.com) can show the visitors who are currently on your website. It looks roughly like this:

![](realtime-visitors.png =1907x592)

At some point customers started complaining about weird bot-like visitors showing up in that list. They come from somewhere in Ireland, look at a random page for 15 seconds and leave.

Nothing about these visitors stood out: the user agent of a fresh Chrome on a Mac, different IPs, but the geo service placed all of them in Ireland. There was an interesting pattern at the end of all the IP addresses though: <code>2a03:2880:30ff:c::**face:b00c**</code>. Okay, Facebook, what the hell is this?

There’s nothing of the kind on [the official page about the Facebook crawler](https://developers.facebook.com/docs/sharing/webmasters/crawler/). We’re [assured](https://developers.facebook.com/docs/sharing/webmasters/crawler/#identify) that Facebook bots can always be told by their user agent. I couldn’t find any other official resources about Facebook’s bots, and googling **face:b00c** and things like **facebook headless crawler** gave practically nothing. The only thing I managed to figure out was that the IPs really do belong to Facebook.

So what the hell is coming to us then? Maybe it’s some proxy built into Facebook that links opened in its webview go through? Then these are real visitors, and they can’t be filtered out of the list. Or is it a new, fancy link analyzer that replaced the old one, which just looked for Open Graph tags in the page source? Or a thing that screenshots pages for previews?

## Hunting the headless browser

If it’s a bot, it most likely follows links left by users for some reason. So we can try to catch it by making it follow a link of our own.

I made a local trap, proxied it to the internet with [ngrok](https://ngrok.com/) and put the link into my Instagram profile. Nothing happened. But then I tapped the link: my browser showed up in the online visitors, and about 10 seconds later the headless Facebook stinker came along too.

I poked the stinker with a stick from every side. Interesting details came up that could well be used to identify and filter it, but I’m not going to tell you about them here because *EHEHE TRADE SECRET*. But I also noticed a detail I had missed from the very beginning: the bot came to the page with a `?fbclid=xxxx...`{.whitespace-nowrap} parameter added. And googling that parameter does turn up something interesting.

What follows is a timeline I pieced together from scraps of information on the internet, my own and other people’s assumptions and guesswork. That is, **not fucking reliable information at all**.

## The happy prehistoric times {.arrow-header}

Facebook sets cookies for all its users and then follows them around other websites via like buttons, ads, all sorts of analytics pixels and whatever else they have that website owners happily embed into their pages.

At the same time these embedded scripts collect information about the page, after which Facebook matches it to the user and uses it to build their targeting profile and other totally-not-creepy stuff.

![](https://media.giphy.com/media/yShptLEDpeNz2/giphy.gif =367x212)

## The dark year of 2018 {.arrow-header}

Something breaks Facebook’s idyll. According to various guesses, it could be [GDPR](https://gdprinfo.eu/), or third-party cookies getting harder to work with in the new Safari, or something else, or all of the above!

To track *at least something*, Facebook starts appending an `fbclid` parameter to all links (both ads and plain links from posts) without commenting on it in any way. But everyone gets it anyway: it’s a *Facebook click ID* that allows linking the information on the visited page to the user who clicked.

## A bit later {.arrow-header}

Turns out that while solving its own problem, Facebook shat on everyone around. Who could have thought, that never happens!

Websites with *quirky* query parameter parsing stop opening because of the extra parameter. Caches at every level *miss*, because every visit to the site now carries a unique parameter. Various analytics systems treat the presence of the parameter as a visit to a unique page, which ruins all the stats. But Facebook gets to spy on us a bit better.

## A bit later still {.arrow-header}

Someone ruins Facebook’s plans again. Probably those nasty anti-tracking activists pushed through some law again. One way or another, the parameter can no longer be added to the link. But... wait... what if...

![](https://media.giphy.com/media/26gR0YFZxWbnUPtMA/giphy-downsized.gif =480x270)

What if our bot follows the same link right behind the user, but with the parameter? Huh? Huuuh?!

As an extra bonus, even if the page has no scripts sending data to Facebook, the bot can add and run them itself.

“Hold on”, you’ll say, “why does the bot go with the parameter? It knows which user it’s following, it could follow the link without the parameter and collect all the information it needs about the page”. The answer is very simple: nobody wants to rewrite the scripts that already collect all the needed information and send it to Facebook. That it ruins someone’s caching and stats is, of course, of no concern to Facebook.

Oh, and the user agent must never ever reveal that it’s a bot, or the haters will block it!

## Conclusion

Thousands of servers with headless Chromes for better spying that crap all over your cache and ruin your stats – well, honestly, I didn’t expect anything else from Facebook.

![](https://media.giphy.com/media/eLgL5KGf6pTsA/giphy.gif =320x178)
