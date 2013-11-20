---
layout: post
title: "Links, please"
categories: en
lang: en
---

#Links, please

Однажды наступит тот день, когда [самые](//twitter.com) [продвинутые](//instagram.com) [IT-компании](//plus.google.com) научатся пользоваться ссылками. Тогда заживем.

Once the day will come when the [most](//twitter.com) [advanced](//instagram.com) [IT companies](//plus.google.com) finally learn to use links properly.

##Three rules of the links

###First

Если вам в `href` очень хочется положить `javascript: void(0);`, `#` или еще какую-нибудь фигню, успокойтесь, глубоко вздохните и замените ссылку на `button`.

If you desperately want to put `javascript: void(0);`, `#` or something similar in a `href` attribute, calm down, take a deep breath and use a `button`.

Кнопка воспринимает событие `click`, стили `:hover` и `:active` и попадает в общий _taborder_ точно так же, как и ссылка. Невероятно!

Button works with `click` events, `:hover` and `:active` styles and catches focus when <kbd>tab</kbd>&rsquo;bing just like a link do. Unbelievable!

<figure class="info"><div class="icon-umbrella" markdown="1">
Можно также использовать любой другой тег, например `span`, но он не попадет в *taborder*, а событие *click* не будет вызываться по нажатию энтера и пробела, что убивает все преимущества кнопки в плане _accessibility_.

You can use any other tag, `span` for instance, but it won't be <kbd>tab</kbd>&rsquo;bable, and click event won't trigger on <kbd>enter</kbd> key press, which is terrible for accessibility.

Можно добавить спану аттрибут `tabindex="0"` и повесить обработчики на нажатие пробела и энтера, а можно не париться и сделать `button`, который еще и семантически более уместен.

You can set `tabindex="0"` to make it <kbd>tab</kbd>&rsquo;bable and add a `keypress` event listener, or you can just use a `button`, which is also semantically more appropriate.
</div></figure>

###Second

Если вам очень хочется запихнуть в ваш элемент `onclick="location.href='...'"`, остановитесь, вздохните еще раз и сделайте ссылку. Теперь вашу ссылку можно открыть в новой вкладке, вызвать контекстное меню браузера с кучей функций, а адрес ссылки будет виден при наведении мыши. Поразительно!

If you really want to put `onclick="location.href='...'"` in your element, stop, take a breath one more time and make a link. Now people can open your link in a new tab, use context menu functions, and even see the adress the link points to just by hovering the mouse. Astonishing!

###Third

Единственный случай, когда можно (и нужно) вешать обработчик на ссылку --- если есть что показать по ссылке. При этом важно, чтобы обработчик срабатывал только при нажатии левой кнопки мыши без кнопок-модификаторов.

The only case when you can (and should) bind a js handler to a link -- if a link actually leads somewhere. In this case, the handler should only trigger for left mouse button clicks without modifier keys.

Классический пример --- превьюшки фоток. При нажатии на превьюшку показывается большая фотка поверх текущего контента. При клике колесом или <kbd>ctrl</kbd>-клике фотка открывается в новой вкладке. Контекстное меню тоже работает. Юзеры с отключенным&nbsp;/ сломанным яваскриптом получают рабочую ссылку на фотку. Все довольны:

Classic example: photo thumbnails. When you click on a thumbnail -- large photo is shown on top of the content. If you click with a mouse wheel or <kbd>ctrl</kbd>-click it -- new tab with a photo is opened. Context menu also works just fine. Users with disabled&nbsp;/ broken js get a working link on a photo. Everybody is happy:

HTML:

{% highlight html cssclass=codewrap %}
{% include snippets/proper-link.htm %}
{% endhighlight %}

JS + jQuery:

{% highlight js cssclass=codewrap %}
{% include snippets/proper-link.js %}
{% endhighlight %}

Result:

<figure>
	{% include snippets/proper-link.htm %}
</figure>

<script>
dzDelayed.push(function() {
	{% include snippets/proper-link.js %}
});
</script>

ИЕ версии 8 и ниже в событие `click` всегда возвращает `button` равный нулю. В результате клик колесом также приведет к выполнению функции, но все остальное будет работать корректно. Я бы с этим не заморачивался, но если очень хочется, [можно заморочиться](http://unixpapa.com/js/mouse.html).

In IE8 and lower click event have `button` property always set to `0`. As a result, middle mouse button clicks also trigger the function, but everything else is working just fine. I wouldn't make a fuss over this, but if you really want to get it working as intended, [you may try](http://unixpapa.com/js/mouse.html).

##Good guys

Есть много других ситуаций, в которых также очень желательно оставлять функционал ссылки. Смотрите, как делают хорошие ребята:

There are much more cases where you should keep the functionality of the links. Here are some good examples:

###Pagination

[Пагинатор комментариев на vk.com](http://vk.com/wall-35502680_11833) переключает страницы без перезагрузки, но оставляет возможность открыть страницу в новой вкладке.

[Vk.com paginator](http://vk.com/wall-35502680_11833) switches the pages asynchronously, but still allows you to open a specific page in a new tab.

###Login / registration forms

На [реддите](//reddit.com) форма логина и регистрации открывается в попапе поверх текущей странице, если кликнуть левой кнопкой мыши, и на новой вкладке, если нажать колесом. Правда, они не учли кнопок-модификаторов.

[Reddit](//reddit.com)'s login / registration form is opened in a popup on top of the current page when clicked with left mosue button, and in a new tab when clicked with a wheel. Unfortunately, they don't check for modifier keys.

###Extended functionality

Случайно наткнулся на этот пример, когда на [метакритике](http://www.metacritic.com/game/pc/limbo) отказались загружаться скрипты. Кнопка *Expand* под пользовательскими отзывами --- ссылка на ту же страницу с GET-параметром, например `?user_review_id=1713311`. При отключенном или сломанном (как в моем случае) яваскрипте сервер отдаст вам страницу с раскрытым отзывом пользователя. Отличный фоллбек, сохранивший функционал сайта при упавшем CDN-сервере.

I accidentally came across this one when [metacritic](http://www.metacritic.com/game/pc/limbo)'s scripts refused to load for me. *Expand* button under user reviews is, in fact, a link with a GET parameter, e.&nbsp;g. `?user_review_id=1713311`. If javascript is disabled or (in my case) broken, the server will serve you the same page with an expanded review. This is a great example of [unobtrusive js](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript) at work, saving site's functionality while CDN server is down.

##Bad guys

###Twitter

Твиттер встал на путь истины и стал потихоньку исправлять свои косяки. Профиль юзера можно открыть в новой вкладке --- гут. Кнопочка *refresh* в сайдбаре и кнопка нового твита используют `button` --- тоже гут (а можно было и ссылку на форму нового твита сделать).

Twitter resolved to follow the straight and narrow and began to gradually correct their rubbish. We can finally open user profile in a new tab -- good. *Refresh* button in the sidebar and *compose new tweet* button are both using `button` element -- also good (would be actually better if it was a link leading to a separate page with a form to compose a new tweet).

Тем не менее, постоянно попадаются `<a href="#">`. Ссылки *reply*, *retweet* и *favourite* никуда не ведут, [а](https://twitter.com/intent/tweet?in_reply_to=386573856179113985) [могли](https://twitter.com/intent/retweet?tweet_id=386573856179113985) [бы](https://twitter.com/intent/favorite?tweet_id=386573856179113985).

Nonetheless, there are still lots of `<a href="#">` nonsense. *Reply*, *retweet* and *favourite* links aren't pointing anywhere, while [they](https://twitter.com/intent/tweet?in_reply_to=386573856179113985) [definitely](https://twitter.com/intent/retweet?tweet_id=386573856179113985) [could](https://twitter.com/intent/favorite?tweet_id=386573856179113985).

###Google+ {#google-plus}

Та же ситуация, что и с Твиттером. В целом, ребята исправляются (раньше все было очень плохо), тем не менее на главной странице менюшка переключения кругов по-прежнему использует `data-dest="stream/circles/p4765f1c30e7d2c98"` вместо нормальной ссылки, а аватарка в верхнем правом углу завернута в ссылку с моим любимым `javascript:void(0)`.

Same situation here. It's not the same mess it used to be a while ago, but there're still things to fix. The menu with your cycles still uses `data-dest="stream/circles/p4765f1c30e7d2c98"` nonsense istead of normal links, and the userpic in the upper right corner is a link with my favourite `javascript:void(0)`.

###Instagram

Все плохо. `javascript:;` в кнопках, ни одна ссылка не открывается в новой вкладке. Ребята запилили навигацию через хистори стейты, но о вкладках не особо слышали.

It's dreadful. `javascript:;` in `href`s, none of the links can be opened in a new tab. They made the navigation working on history states (and it's buggy, buy the way), but, it seems, they never heard of tabs. It's fiiiine, one tab is more then enough for an average hipster, right?

##TL;DR

Используйте `button` для действий на странице, `a` для ссылок и для действий с фоллбеком, доступным по ссылке.

Use `button` for actions on a page, `a` for links and actions, that have a fallback URL.

Несмотря на то, что сейчас сложно найти устройство без яваскрипта, ситуации, когда скрипт по той или иной причине не загружается или выполняется с ошибкой, происходят довольно часто. В таких случаях грамотные фоллбеки помогут сохранить функционал сайта.

Despite the fact that nowadays it's nearly impossible to find a device without javascript, there is still a chance that javascript either executes with errors, or just doesn't load. In this case good [unobtrusive js](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript) and proper fallbacks will save the day and the functionality of your site.

##Related links

- <a class="iconlink" href="http://adactio.com/journal/6022/">"<span>When is a link not a link?</span>"</a>, *Jeremy Keith*
- [The Missing Link](http://shaundunne.com/the-missing-link/), *Shaun Dunne*
- [Javascript Madness: Mouse Events](http://unixpapa.com/js/mouse.html), *Jan Wolter*