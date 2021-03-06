---
description: 'Невероятная детективная история. Кто же окажется злодеем? Никогда, блядь, не догадаетесь!'
image: cover.jpg
---

# Браузер без головы:<div class="small">как Фейсбук спасал свой трекинг</div>

## Предыстория

[Чатра](https://chatra.com) умеет показывать посетителей, которые находятся на вашем сайте. Выглядит это примерно так:

![](realtime-visitors.png =1907x592)

В какой-то момент клиенты стали жаловаться, что в этом списке появляются странные посетители, похожие на ботов. Приходят откуда-то из Ирландии, смотрят на случайную страницу 15 секунд и уходят.

Посетители ничем особенным не выделялись, user agent от свежего Хрома на Маке, айпи разные, но все определялись геосервисом как ирландские. Зато в конце всех айпи-адресов нашелся интересный паттерн: <code>2a03:2880:30ff:c::**face:b00c**</code>. Окей, фейсбук, это еще что за херня?

[На официаньной странице про фейсбучного ползуна](https://developers.facebook.com/docs/sharing/webmasters/crawler/) ничего подобного нет. Нас [убеждают](https://developers.facebook.com/docs/sharing/webmasters/crawler/#identify), что фейсбучных ботов обязательно видно по юзер-агенту. Других официальных ресурсов о ботах фейсбука я не нашел, гугление по **face:b00c** и запросам типа **facebook headless crawler** не дало практически никаких результатов. Единственное, что удалось понять, — айпи действительно принадлежат фейсбуку.

Но что за фигня тогда к нам приходит? Может, это какой-то встроенный в фейсбук прокси, через который пропускаются открытые в вебвью ссылки из фейсбука? Тогда это реальные посетители, и их нельзя фильтровать из списка. Или это новый, навороченный анализатор ссылок, пришедший взамен старого, который просто искал опенграф-теги в сорсе страницы? Или штука, которая скриншотит страницы для превью?

## Охота на браузер без головы

Если это бот, скорее всего, он зачем-то ходит по ссылкам, оставленным пользователями. То есть его можно попробовать поймать, заставив пройти по своей ссылке.

Я сделал локальную ловушку, запроксировал её в интернет [нгроком](https://ngrok.com/) и засунул ссылку себе в профиль инстаграма. Ничего не произошло. Но потом я нажал на ссылку, в онлайн-посетителях появился мой браузер, а секунд через 10 пришла и фейсбучная безголовая вонючка.

Вонючку я потыкал палочкой со всех сторон. Выяснились интересные подробности, которые вполне можно использовать для идентификации и фильтрации, но о них я вам тут не расскажу, потому что *АЗАЗА КОММЕРЧЕСКАЯ ТАЙНА*, но также я заметил деталь, которую упустил с самого начала: бот пришел на страницу с добавленным параметром `?fbclid=xxxx...`{.nowrap}. И вот по этому параметру уже гуглится кое-что интересное.

Далее будет таймлайн, который я собрал по обрывочным данным в интернете, своим и чужим предположениям и домыслам. То есть **нихрена не достоверная информация**.

## Счастливые доисторические времена {.arrow-header}

Фейсбук ставит куки всем своим пользователям, а потом следит за ними на других сайтах через кнопки лайка, рекламу, всякие аналитические пиксели и чего там еще у них есть, что владельцы сайтов радостно встраивают на свои страницы.

Заодно эти же встроенные скрипты собирают информацию о странице, после чего фейсбук метчит ее с пользователем и использует для составления его таргетингового профиля и других совершенно не криповых штук.

![](https://media.giphy.com/media/yShptLEDpeNz2/giphy.gif =367x212)

## Тёмный 2018 {.arrow-header}

Что-то ломает идиллию фейсбука. По разным предположениям, это может быть [GDPR](https://gdprinfo.eu/), или усложнение работы со сторонними куками в новом сафари, или что-то другое, или всё вместе!

Чтобы трекать *хоть что-то*, фейсбук начинает добавлять ко всем ссылкам (и рекламным, и просто ссылкам из постов) параметр `fbclid`, никак это не комментируя. Но всем и так понятно, что это *Facebook click ID*, который позволяет связать информацию на просмотренной странице с кликнувшим на ссылку пользователем.

## Чуть позже {.arrow-header}

Выясняется, что решая свою проблему, фейсбук поднасрал всем вокруг. Кто бы мог подумать, никогда такого не было!

Сайты со *странненьким* парсингом гет-параметров перестают открываться из-за лишнего параметра. Кешы всех уровней *промахиваются*, потому что в каждом переходе на сайт теперь есть уникальный параметр. Разные системы аналитики воспринимают наличие параметра как переход на уникальную страницу, что портит всю статистику. Но зато фейсбук может последить за нами чуть лучше.

## Еще немного позже {.arrow-header}

Опять кто-то портит планы фейсбука. Вероятно, мерзкие борцы со слежкой опять пропихнули какой-то закон. Так или иначе, параметр к ссылке теперь добавлять нельзя. Но... погодите... что если...

![](https://media.giphy.com/media/26gR0YFZxWbnUPtMA/giphy-downsized.gif =480x270)

Что если сразу за пользователем по этой же ссылке пойдет наш бот, но уже с параметром? А? Ааааа?!

Как дополнительный бонус, даже если на странице нет скриптов, передающих данные в фейсбук, бот может сам же их добавить и запустить.

«Так, стоп», — скажете вы, — «но зачем бот идет с параметром, ведь он знает, за каким пользователем следит, он может пройти по ссылке без параметра и собрать всю нужную информацию о странице». Ответ очень простой: никто не хочет переписывать скрипты, которые уже собирают всю нужную информацию и отправляют в фейсбук. То, что это портит кому-то кеширование и статистику, фейсбук, разумеется, не волнует.

Ах да, ни в коем случае нельзя показывать в юзер-агенте, что это бот, а то хейтеры заблочат!

## Конклюжон

Тысячи серверов с безголовыми хромами для более лучшего слежения, которые засрут ваш кеш и испортят статистику, — ну, в общем-то, ничего другого от фейсбука я не ожидал.

![](https://media.giphy.com/media/eLgL5KGf6pTsA/giphy.gif =320x178)
