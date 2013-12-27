---
layout: post
title: "Responsive website testing"
categories: en
lang: en
---
#Responsive website testing

{% include pic.htm src='whiteboard.jpg' a='Доска с результатами теста сайта в различных браузерах' %}

As many good fellows have noticed, it's not enought to test your responsive creation on an iPhone. You should at least bother to check it on several major platforms: iOS, Android (which has a swarm of different browsers), Windows Phone, Blackberry.

If you are tough enough, all the above is your absolute minimum, which you happily extend with everything that comes to hand.

Как правильно замечают [многие](http://www.quirksmode.org/blog/archives/2010/02/the_iphone_obse.html) [хорошие ребята](http://bradfrostweb.com/blog/mobile/support-vs-optimization/), проверить работоспособность вашего адаптивного творения на айфончике недостаточно. Как минимум, стоит озаботиться несколькими основными платформами: iOS, Android (а там свой зоопарк браузеров), Windows Phone,
Blackberry.

Если вы Лев Толстой не только на словах, то все перечисленное --- ваш обязательный
минимум, который вы радостно расширяете любыми попадающимися под руку железками и эмуляторами.

<figure class="info icon-comment-alt" markdown="1">
The more you use the principle of [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement), [proper fallbacks](https://en.wikipedia.org/wiki/Fault_tolerance) and [unobtrusive javascript](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript), the easier it is to test and fix the site on different devices, and the better the site will look on the devices you didn't event think to test on.

Чем больше вы используете [принцип прогрессивного улучшения](https://en.wikipedia.org/wiki/Progressive_enhancement), [грамотные фоллбеки](https://en.wikipedia.org/wiki/Fault_tolerance) и [ненавязчивый javascript](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript), тем проще тестировать и исправлять сайт на всем зоопарке железок, и тем лучше сайт будет выглядеть там, где вы его даже не задумывались протестировать.
</figure>

##Briefly about desktop browsers

###Windows

First things first, latest stable versions of Firefox, Chrome, Opera, Safari, IE, plus Opera 12 (on Presto), that's all clear. After a year or so Presto engine will be gone for good :-(

Первым делом --- последние стабильные версии Firefox, Chrome, Opera, Safari, IE, плюс Opera 12, с этим все ясно. Через годик-полтора о 12 Опере и движке Presto можно будет забыть насовсем :-(

The main problem, as usual, comes with IE. IE users are distributed almost evenly between three version of the browser. You can't install several version of IE on one system, different "IE testers" are all crap. Even if they work, they still don't show the native XP font rendering and form elements.

Основной затык, как всегда, с IE. Юзеры почти равномерно размазаны по трем версиям браузера. Несколько версий IE держать в системе нельзя, всякие ИЕ-тестеры --- лажа. Даже если заработают, родной икспишный рендеринг шрифтов с их помощью увидеть не получится.

The solution is to have a bunch of virtual machines. Grab the [VirtualBox](https://www.virtualbox.org/wiki/Downloads), clone two winXP machines, give ’em 196 Mb of RAM and install latest IE7 and IE8. It's, actually, a good time to send IE7 to the dump, but I keep it for rare ocasions, since some of my scripts support it and I need to test new builds once in a while.

Clone another two machines running Win 7 (give ’em 512 Mb of RAM) and install IE9 and IE10. All this stuff works simultaneously pretty effortlessly:

Выход --- ставим VirtualBox, клонируем три виртуалки с winXP, отдаем
им по 192 Mb оперативки и ставим,
соответственно, 6, 7 и 8 осликов. IE6 я лично держу для всяких редких случаев. На его полноценную поддержку я давно забил.

IE7 тоже пора отправлять на свалку, но обычно вся его поддержка заканчивается пятью правилами в стилях и подключением фоллбека для иконочных шрифтов. Все остальные фоллбеки применяются и к IE8, который все еще приходится поддерживать.

Делаем еще одну виртуалку на Win 7 (512 Mb оперативки) и ставим туда IE9. Все это хозяйство замечательно летает
параллельно:

{% include pic.htm src='virtual_machines.jpg' c='Whe-e-e-e!' %}

I still hope the IE's autoupdate (it was added in IE10) will make the difference some day and we won't need to keep all this VMs. It's not the case as of now.

<del>Надеюсь, автообновление IE10 избавит меня от еще одной виртуалки, когда выйдет IE11.</del> Пока что не избавило.

По желанию можно поставить какой-нибудь Firefox 3.6. Часто помогает отловить простые баги, связанные с использованием новых свойств CSS. Обычно легко фиксится фоллбеком на старые свойства. Этакая проверка на Graceful Degradation.

###Linux & Mac

It's also worth having a VM with some distributive and, if possible, a Mac would also be good. Same browsers have significant differences when it comes to rendering system specific stuff, such as font smoothing, form elements and cursors.

Стоит также иметь виртуалку с каким-нибудь дистрибутивом Линукса, и, если есть возможность, ухватить железку с OS X. Отличия рендеринга в одних и тех же браузерах в разных системах незначительны, пока дело не доходит до системных компонентов. Например, значительно отличается поведение элементов форм, рендеринг шрифтов и внешний вид курсоров.

##Mobile devices

The main rule: if it's possible to test on a real device -- test on a device. Here's a couple of reasons:

Первое правило: есть возможность тестировать на железке, а не на эмуляторе, --- тестируйте на железке. Вот пара причин:

- You can't touch the emulator. Text size, size of the UI elements, touch responsiveness, etc. -- all of this things can be adequately tested only on a real device.
- Emulator's performance often differs from the performance of a real device. You won't see the lags and memory overflows, animation speed and script performance will differ.
- Lots of buggy and inconvenient emulators.
- Lack of emulators for rare devices.

- Эмулятор не потрогать. Размер текста, ссылок, кнопок, работу тача в целом можно адекватно оценить только на устройстве.
- Производительность эмулятора часто не соответствует производительности железки. Не получится увидеть тормоза и переполнение памяти на слабых устройствах, не оценить скорость отрисовки анимаций и работы скриптов.
- Много глючных и неудобных эмуляторов.
- Отсутствие эмуляторов редких устройств.

My initial idea to buy a device working on each of the popular operating systems (iOS, Android, Windows Phone) realized and turned into gathering of rare devices with a browser on board.

Моя первоначальная идея купить по устройству на каждой из популярных операционных систем (iOS, Android, Windows Phone) осуществилась и переросла в собирательство редких девайсов с браузером на борту.

My collection now contains Kindle Keyboard and Kindle Paperwhite with their grayscale webkits, Nokia Asha 501 (a phone on modified S40 with horrible Ovi browser and not so horrible Opera Mini working on Java), Nintendo DSi bought after reading [this article](http://maban.co.uk/73), Nintendo 3DS, PS Vita and lots of other rare and not so rare stuff.

Так в коллекции появились Kindle Keyboard и Kindle Paperwhite со своими черно-белыми вебкитами, Nokia Asha 501 (мобилка на модифицированной S40 с ужасным Ovi браузером и не такой ужасной Оперой мини на JAVA), Nintendo DSi, купленная после прочтения [вот этой статьи](http://maban.co.uk/73), и много других железок.

{% include pic.htm src='zoo.jpg' c='The swarm' %}

It's important to note, though, that any large project can't be properly tested on all of them. The main goal here is not to support each and every device, but to properly optimize the site, make it adaptive in a flexible way. The site shouldn't necessarily work equally on each device, but it's important to ensure the availability of content and get rid of the nastiest bugs, possibly avoiding sniffing (although it's hard at times).

Тут важно отметить, что любой крупный проект будет практически нереально протестировать на всем этом зверинце. Основная цель --- не поддержка каждого устройства с его набором багов в отдельности, а грамотная оптимизация сайта. При этом сайт вовсе не обязательно должен работать на всех устройствах одинаково. Достаточно обеспечить доступность контента и избавиться от самых противных багов, по возможности избегая сниффинга (хотя это и не всегда возможно).

The possibility to touch and test your project on different devices gives a valuable information on the adequacy of the UI, availability of necessary fallbacks, typical bugs encountered on different devices, etc. All this allows you to develop good universal development patterns and apply them in the future, reducing the need for testing to a minimum.

Возможность потрогать и потестировать свои проекты на разных девайсах позволяет увидеть, где не хватает того или иного фоллбека в функционале или оформлении, какие типичные баги можно легко пофиксить и т. п. Все это позволяет выработать хорошие и универсальные паттерны разработки и применять их в дальнейшем, сводя необходимость тестирования к минимуму.

Покупайте девайсы, отбирайте старье у друзей, заказывайте редкие штуки на [dx.com](//dx.com) и [ебее](//ebay.com). Разводите свой зоопарк.

###Where to test

Mandatory:

- **iOS** --- Safari and Opera Mini
- **Android** --- default browser on 2.x and on 4.x, Chrome, Firefox, Opera Classic, Opera, Opera Mini
- Windows Phone 8
- Blackberry 10

Bonus pack in order of subjective importance:

- Opera Mini Java app
- Windows Phone 7.8
- Older versions of iOS
- Older versions of Blackberry
- Nokia Browser

For fun:

- Kindle Keyboard, Touch & Paperwhite
- Sony PSP, PS Vita
- Nintendo DSi, 3DS
- Ovi browser (Nokia Xpress)
- Steam Big Picture browser
- Smart TVs, refrigerators, any other hardware and emulators at your hands.

###Emulators

{% include stuff/emulators-en.md %}

##Debugging on mobile devices

###Android

In the **stock browser**, type `about:debug` in the adress bar. This will lead to a new debug section appearing in the browser's settings with a bunch of dev options in it, including concole.

В **стоковом браузере** набираем в адресную строку `about:debug`. После этого в настройках браузера появляется пункт "Отладка" с разными опциями, в том числе возможностью включить консоль.

<div class="gallery">
{% include pic.htm src='android_browser_dev_options.png' c='Developer options' p=true %}
{% include pic.htm src='android_browser_console.png' c='Console' p=true %}
</div>

In **Android Chrome**, you can use [remote debugging](https://developers.google.com/chrome-developer-tools/docs/remote-debugging):

- Install [the desktop Chrome plugin](https://chrome.google.com/webstore/detail/adb/dpngiggdglpdnjdoaefidgiigpemgage)
- Enable USB debugging in device's settings
- Connect the device via USB
- Profit

В **Хроме под Андроидом** можно воспользоваться [отладкой через десктопный хром](https://developers.google.com/chrome-developer-tools/docs/remote-debugging):

- Ставим [плагин](https://chrome.google.com/webstore/detail/adb/dpngiggdglpdnjdoaefidgiigpemgage) на десктопный Хром
- Включаем USB debugging в настройках девайса
- Подключаем девайс шнурком
- Профит

Now you have full webkit devtools at your disposal. All the interactions are displayed on the device in real-time:

Получаем полный набор вебкитовских инструментов. Все изменения в реалтайме отображаются на девайсе:

{% include pic.htm src='chrome-debug.png' a='Changes are displayed in real-time' p=true %}

###iOS

If you happen to have a Mac, you can debug an iOS device remotely via Safari's web inspector:

Если вам повезло иметь под рукой Мак, можно подебажить устройство на айОси через веб-инспектор Маковского Сафари:

- Go to device's settings > Safari > Advanced, turn on the Web Inspector
- Connect the device to your Mac
- Go to Develop menu in your Mac's Safari. You shoud see your device with a list of opened pages.

Just like on Android, full devtools are available.

- Заходим на девайсе в настройки > Safari > Advanced, включаем Web Inspector
- Подключаем девайс шнурком
- В меню Develop Макосвкого Сафари видим свой девайс со списком открытых страниц

Так же как и на Андроиде, доступен полный набор вебкитовских инструментов.

###Blackberry

Blackberry has [remote debugging via web-based webkit devtools](https://developer.blackberry.com/html5/documentation/web_inspector_overview_1553586_11.html):

- Connect the device via USB or connect it to your computer's network via WiFi.
- Turn on web inspector in the device browser setting. You'll also see the IP adress and port there. If you're using emulator, the IP adress won't appear, but you can see it in the emulator's controlles, in the bottom of the window (the controller comes with the emulator as a separate program). Port in this case will be 1337.
- Go to `IP:Port` from a desktop browser. You should recieve a page with webkit devtools.

На блекберри есть [удаленная отладка через веб-версию вебкитовских девтулзов](https://developer.blackberry.com/html5/documentation/web_inspector_overview_1553586_11.html):

- Подключаем девайс по USB, либо вешаем его на один вай-фай с компьютером.
- В настройках браузера на девайсе включаем веб-инспектор. Там же появится IP и порт. В эмуляторе IP не появится, но его можно посмотреть в контроллере эмулятора, в нижней части окна (контроллер идет вместе с эмулятором как отдельная программа). Порт при этом будет 1337.
- Заходим по адресу `IP:Port` с десктопного браузера, получаем вебкитовскую девпанель в виде веб-страницы.

Web-based webkit devtools work properly only in webkit-based browsers.

Как это не смешно, но панель у меня согласилась нормально работать только в Опере 15:

{% include pic.htm src='blackberry-debugging.png' c='Blackberry browser remote debugging' %}

###[Jsconsole.com](http://jsconsole.com/)

Great tool allowing you to remotely debug almost any device. All you need to do is to insert a script containing a unique ID (preferably before the rest of the scripts, so you won't miss the logs and errors), and you got yourself a console, with error output and remote command execution. Don't forget to remove the script from production!

Read [detailed official docs](http://jsconsole.com/remote-debugging.html).

Отличный инструмент для дебаггинга практически любого девайса. Вставляем на свой сайт скрипт с уникальным айдишником (желательно до запуска остальных скриптов, чтобы не пропустить логи и ошибки), получаем удаленную консоль с выводом ошибок и возможностью выполнять команды. Главное --- не забудьте убрать скрипт из продакшена.

Можно почитать [подробнее об использовании](http://jsconsole.com/remote-debugging.html).

###Your own console

If using *jsconsole* is inconvenient for some reason, you can always write your own console. Just redefine `console.log`, `console.warn`, `console.error`, `window.onerror` and something else to your taste. You'll get a fairly simple tool which is sufficient in most cases.

Если *jsconsole* использовать по какой-то причине неудобно, всегда можно написать свою консоль, заредефайнив `console.log`, `console.warn`, `console.error`, `window.onerror` и еще что-то по вкусу. Получится довольно простой инструмент, которого достаточно в большинстве случаев.

Here's a simple example:

Очень примитивный пример:

{% highlight js cssclass=codewrap %}
var customConsole = {
    log: function(message) {
        this.add(message, 'info');
    },
    warn: function(message) {
        this.add(message, 'warning');
    },
    error: function(message, source, file) {
        this.add([message, source, file].join('<br>'), 'error');
    },
    add: function(message, type) {
        if (typeof message !== 'string') message = '<i>' + message + '</i>';
        document.getElementById('console').innerHTML += '<p class=' + type + '>' + message + '</p>';
    }
}

if (dev_console) {
    window.console = customConsole;
    window.onerror = function(message, source, file) {
        console.error(message, source, file);
    };
}
{% endhighlight %}

Modify it to your own taste and needs.

Допиливайте по вкусу и потребностям.

##Тестирование сайта, запущенного на локальном веб-сервере

##Testing a website running on a local web server on mobile devices

The easiest way is to connect everithing to the same WiFi router. You should also set fixed IP adress for your computer, since it hafe a tendency to change unexpectadly and make all of your mobile bookmarks useless. Put this very IP to your web server config, r.&nbsp;g. enginx:

Все просто. Для начала понадобится wi-fi роутер. Подключаем все устройства и компьютер с веб-сервером к роутеру, получаем подсеть. В настройках сети на компьютере можно для удобства выставить руками фиксированный IP, так как автоматический имеет тенденцию внезапно поменяться, после чего приходится заново вбивать закладки на всех устройствах. Этот же IP прописываем в конфиге вебсервера, например для энжинкса:

{% highlight text cssclass=codewrap %}
server {
    ...

    listen   192.168.1.5:4000;
    listen   127.0.0.1:4000;

    ...
}
{% endhighlight %}

That's it, check out the site from your mobile devices.

Все, можно заходить с железок.

If the web server is running on a virtual machine, make a bridge connection (in the VM's settings). VM will get an IP in routers subnet, use it to access the site both from mobile devices and host OS.

Если сервер запущен на виртуальной машине, выдаем ей сетевой мост (из настроек программы виртуализации). Машинка получает IP в подсети роутера, используем его для доступа к сайту как с железок, так и из хост-системы.

##Testing in proxy browsers

##Тестирование в браузерах с серверсайд-рендерингом

That is Opera Mini. And Ovi, if you are desperate enough.

То есть в Опере Мини. Ну и в таком треше, как Ови, если у кого руки дойдут.

The problem with proxy browser is that you can't test your site on a local server, since it should be visible on the internet.

Проблема здесь в том, что с локального сервера сайт, конечно, загрузить не получится. Сайт должен быть виден из интернета.

My approach is to create a test subdomain with http authentication on the hosting server and pull current version of the site using git once in a while. The site will be accessible by proxy browsers and remain password protected at the same time. An example config for http authentication (for apache this time):

Мой выход --- сделать на хостинг-сервере тестовый поддомен с http-авторизацией и периодически пуллить туда актуальную версию сайта гитом. Сайт останется доступен извне, при этом под паролем. Пример конфига http-авторизации (на этот раз для апача):

{% highlight text cssclass=codewrap %}
<VirtualHost *:80>
    ...

    <Location />
        Deny from all
        Allow from #YOUR IP HERE
        AuthUserFile /etc/apache2/users
        AuthName testdomain
        AuthType Basic
        Satisfy Any
        require valid-user
    </Location>

    ...
</VirtualHost>
{% endhighlight %}

You can put your IP after `Allow from` to simplify the access to the domain from regular browsers.

После `Allow from` можно указать свой IP, чтобы упростить доступ к домену из обычных браузеров.

You can read apache docs on adding user/password pairs to the http auth. Long story short, `htpasswd -cm /etc/apache2/users username` will ask you for the password, then create a file at the specified path and add a user `username` with MD5-encrypted password. Be careful, as the `-c` flag rewrites the existing file.

О добавлении пар юзер/пароль можно почитать в [документации апача](http://httpd.apache.org/docs/2.2/programs/htpasswd.html). Если коротко, `htpasswd -cm /etc/apache2/users username` спросит у вас пароль, после чего сделает файл по указанному пути и создаст там юзера `username` с зашифрованным в MD5 паролем. Будьте осторожны, флаг `-c` перезаписывает существующий файл.

##TL;DR

Test your sites on a maximum number of available devices and emulators. Use new HTML5 features and specific device capabilities, but don't forget about proper fallbacks and broad content availability.

Тестируйте ваши сайты на максимальном количестве доступных железок и эмуляторов. Используйте новые фишки HTML5 и возможности конкретных устройств, но не забывайте о грамотных фоллбеках.

##Related links

- [The iPhone obsession](http://www.quirksmode.org/blog/archives/2010/02/the_iphone_obse.html), *Peter-Paul Koch*
- [Support Vs Optimization](http://bradfrostweb.com/blog/mobile/support-vs-optimization/), *Brad Frost*
- [Unobtrusive JavaScript](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript), *Wikipedia*
- [Progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement), *Wikipedia*