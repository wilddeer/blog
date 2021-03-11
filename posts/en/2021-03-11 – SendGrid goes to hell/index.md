---
description: 'Read the post to find out who’s the universal proto-scum'
image: cover.png
---

# SendGrid goes to hell

## The fuck is sendgrid?

Sendgrid is a <abbr title="Business-to-business" tabindex="-1">B2B</abbr> email service. All those “confirm your email address” and “news from our fucking startup” are usually sent through these guys. Other big ones are mailgan, mailchimp, postmark, amazon ses – you’ve probably heard of them.

Sendgrid was bought a year ago by Twilio, a multibillion-cap company. Serious business, you can rely on guys like that.

## And what about you?

[Chatra](https://chatra.com), in addition to “reset-your-password”, has several functions that are tightly tied to sending emails: in chat it’s sending unread support responses to the visitor’s email, a symmetrical thing – sending unread messages from the visitor to support’s email; in mail it is actually sending mail messages from support. All of this worked through sendgrid until recently.

Until one fine evening, at about 11 o’clock, our production tests checking the mail delivery fail. Let’s take this moment as the start of the incident.

## Start of the incident {.arrow-header}

It should be said that delivery of an email through sendgrid could often take a couple of minutes, and sometimes even longer. We had a three-minute pause in our tests before checking the inbox, but it didn’t always save us either. Quite often we had false test fails whenever the email took longer than that to go though.

If you think of it, it’s a terrible delivery speed, especially if you have to confirm the email after you sign up. But we don’t require email confirmation right away, so it wasn’t a bottleneck in our signup process.

Anyway, I take my phone to make sure it’s yet another false alarm. But no, the email still hasn’t arrived. I sign up for a new account in Chatra – nothing, signup emails don’t come. I refresh the inbox for about 5 minutes. Fuck.

I get up, scratch my butt and go to my computer, log in to sendgrid and see this:

![](fuck_you_too,_sendgrid.png =1788x390)
{.is-ootb}

What the fuck? These motherfuckers just blocked our emails? We send millions of messages a month, we pay these assholes shitloads of money, we have a 98% “everything is fucking great, you’re not spammers at all” rating in their own rating system, and they just block us from sending mail in production without a warning?

The question “what the fuck” (with more cultured epithets, since I’m not the one writing) immediately flies into their support chat, to which the support agent falters and responds with a boilerplate “your question is very important, I heave elevated your ticket priority”. Ticket priority remains somewhere in the region of “not fucking urgent”, support is blatantly bullshitting us. Any additional questions are met with more bullshit.

## 2 hours since the incident started {.arrow-header}

It’s becoming apparent that dudes at sendgrid are massaging their nipples over our butthurt, and nothing is going to be resolved anytime soon. We have to do something ourselves.

![](https://media.giphy.com/media/gaZ51cn7sUY4U/giphy-downsized-large.gif =480x267)

We remember that we happen to have one more sendgrid account for our side-projects. Changing the api key is enough to send all of our emails via that account, but there are two reasons why this can go sideways:

1.  We still don’t know why the fuck we got banned. We don’t want to get banned on a second account and lose any chance to quickly restore email delivery.
2.  Abruptly sending mail from new IP addresses can severely impact mail deliverability, because email services are used to receiving our mail from our dedicated IPs left in our main account.

    If you don’t know what’s all this about, welcome to the fucked up world of superlegacy technology overlaid with layers of scaffolding and patches: email.

The second point doesn’t really matter right now, because some deliverability is better than no deliverability at all. But it’s scary to get a second ban from a service that we are a paying <del>customer</del> hostage of.

Throughout the night, I gradually transfer email sending to the spare account. By morning all functionality is restored and the account is not banned. Fucking hooray. I can have some sleep now.

## 16 hours since the incident started {.arrow-header}

The account is still banned, the ticket is silent. It's amazing how much they just don’t give a fuck about paying customers. What the fuck is going on over there?

It is obvious that we have to urgently move to another service. While I was exploring alternatives, someone suggested to try [Postmark](https://postmarkapp.com/). After fiasco with Sendgrid, I studied literally everything about Postmark: what kind of company it is, who the founders are, how many clients they have, how much they earn, reviews, the whole site to the ground.

I was left with a pleasant impression that they actually give a fuck about what they do:

- they pride themselves on mail delivery speeds and show real-time data on delivery speeds right on the landing page,
- там же на ленде они показывают рейтинг саппорта и обещают отвечать в течение пары часов,
- они очень парятся за свою репутацию как отправителя, и поэтому строго разделяют транзакционные письма и почтовые рассылки (настолько строго, что до недавнего времени вообще не занимались почтовыми рассылками, а теперь шлют рассылки с отдельного пула айпи и очень рекомендуют использовать для них отдельный поддомен),
- они не пытаются развести на покупку выделенных айпи и прямо говорят, что в большинстве случаев выделенные айпи не нужны, а шейред айпи с хорошим рейтингом будут работать на доставляемость почты гораздо лучше.

И ещё то, что меня сильно зацепило: они прямо на ленде пишут, что они privately owned и profitable. И вот почему.

### Блядские черные дыры для инвестиций

<%- include('/svg/couch-solid.svg') %>**Осторожно:** диванная аналитика
{.notice .is-with-icon .is-warning}

Большинство кремниеводолинных компаний сейчас развиваются не ради пользователей, а ради инвесторов.

Кажется, что если развивать продукт для пользователей, пользователи кинут в вас деньгами, будет прибыль, инвесторы будут рады и тоже кинут в вас деньгами на дальнейшее развитие.

На практике сейчас все работает не так. Задача компании — показать инвесторам не прибыль, а потенциал прибыли. Инвесторы радостно это кушают и продолжают кидать деньгами в компанию, остающуюся убыточной десятилетиями.

Компания получает очередной раунд инвестиций, CEO покупает себе новый феррари, а на оставшиеся деньги максимально раздувается пользовательская база, чтобы можно было показать растущий потенциал инвесторам, чтобы они занесли ещё денег. Круг замыкается.

Чтобы раздуть пользовательскую базу, компания скупает рекламу ковровой бомбардировкой, и ей совершенно не важно, что цена привлечения пользователя в продукт может в разы превышать средний lifetime value привлечённого пользователя.

От этого страдают компании, которые живут на прибыль (ого, так бывает?), потому что они не могут соревноваться в цене за клик по рекламе с ковровыми бомбардировщиками. Но это уже другая история.

Как вы уже догадались, сендгрид — именно такая компания-мразь, существующая не для клиента, а для инвестора. Ей совершенно поебать на тебя, клиент ебаный. Твой энтерпрайз-тариф — копейки по сравнению с очередным раундом инвестиций.

В общем, переходим на Постмарк.

## 2 дня с начала инцидента {.arrow-header}

Вся почта переведена на Постмарк.

Саппорт Постмарка действительно отвечает очень быстро, и отвечает не очередной агент&nbsp;248. Отвечает человек, который разбирается в продукте и в почте в целом, у него есть все необходимые доступы ко всем внутренним инструментам, чтобы тебе помочь, и он прям берет и помогает. Не создает тебе тикет, не эскалирует его, а прям вот отвечает тебе сразу.

Выглядит это все, конечно, совсем не серьезно, недостаточно бюрократично и энтерпрайзно. Но у нас в Чатре вот прям такой же саппорт для людей, так что мы _как-нибудь переживем_.

А еще у Постмарка хороший приятный интерфейс. Им удобно и классно пользоваться. Он не идеален, но видно, что сделан с любовью и вниманием к деталям. Для сравнения, интерфейс сендгрида — типичный энтерпрайзный бездушный хуяк-хуяк. Его давно не вычесывали и лепят всё новое сверху как попало.

<hr>

На этом инцидент для Чатры, как продукта, завершен, но сендгрид так просто не отпускает: аккаунт все еще забанен, в тикете по-прежнему тишина.

Мы пытаемся даунгрейднуть тариф в сендгриде, но эта мразь не дает даунгрейднуться и отправляет нас в саппорт. Ахаха. Пишем очередной тикет в саппорт, чтобы нас даунгрейднули и дали рефанд.

## 3 дня с начала инцидента {.arrow-header}

Сендгрид списывает с нас бабла за новый месяц сервиса. На забаненном аккаунте.

![](https://media.giphy.com/media/Lopx9eUi34rbq/giphy.gif =346x236)

## 5 дней с начала инцидента {.arrow-header}

Оказывается, в забаненном аккаунте можно поменять привязанную банковскую карту! Ну, вдруг карточка вот-вот просрочится, а ты хочешь продолжить платить за забаненный аккаунт.

Создаем виртуальную карту, кормим ее сендгриду и тут же удаляем. Славься, российский банкинг!

## 6 дней с начала инцидента {.arrow-header}

Сендгрид присылает копипасту на тикет месячной давности!!1

![](valued_motherfucking_customer.png =691x303)

И в этом тикете наше последнее сообщения — «спасибо, мы сами разобрались, закройте тикет». В тикете про бан аккаунта по-прежнему тишина.

## 7 дней с начала инцидента {.arrow-header}

На тикет приходит ответ и сваливается в спам! Ааааа, как можно так часто и так эпично обсираться?

![](spamgrid.png =1021x191)
{.is-ootb}

Нам пишет Ник из сендгрида:

> Hi there,
>
> I have good news, your account has been reactivated. Our Fraud OPS team provided the following information of the malicious link found within your email stream: _ссылка на фишинговый домен, похожий на маркетплейс фейсбука._
>
> You can locate the source of this link in order to prevent a suspension by the same policy. Please let me know if you need anything else. I apologize for the delays.
>
> Best -

Ииии... наш аккаунт все еще забанен! АААааааАаааха-ха-хаа-хах-ааааааааааааахха-пхпхпппххххххх...

А что за фишинговая ссылка? Может быть, кто-то спамил этой ссылкой из Чатры? А вот хуй! С этой ссылкой было отправлено ровно одно (одно, блядь, ОДНО) письмо. И самая мякотка — откуда эта ссылка к нам попала.

У одного из наших клиентов к Чатре подключена бизнес-страница фейсбука. И вот на этой странице кто-то прислал ему в чат эту ссылку. Клиент не прочитал сообщение в Чатре, и мы послали его ему на почту. Та-дааа, фишинговая ссылка ушла по почте! Срочно забанить этих больных ублюдков, разберемся потом.

А мякотка вот в чем: фейсбук не отфильтровал эту ссылку и позволил отправить ее человеку в мессенджер. Фейсбук, который много месяцев назад внезапно забанил наш домен без объяснения причин (да, попробуйте написать в фейсбуке пост со ссылкой на chatra.com, у вас ничего не выйдет!), который тщательно выпилил любые доступные средства связи, чтобы нельзя было не то что пожаловаться на несправедливый бан домена, а даже усомниться в принятом фейсбуком решении, эта компания с капитализацией в пиздиллиард долларов спокойно пропускает явную фишинговую ссылку к нам, за что нас банит другая компания с капитализацией на порядок меньше, но все еще в дохуллиард долларов.

Если сендгрид — это мразь, которая срет на своих клиентов, фейсбук — это вселенская протомразь, срущая вообще на всех: на пользователей, рекламодателей, бизнесы, сми, своих собственных работников, чувство прекрасного и здравый смысл.

## 14 дней с начала инцидента {.arrow-header}

Открыли новый тикет на рефанд. Его смержили со старым тикетом, на который 10 дней никто не отвечает.

![](https://media.giphy.com/media/gtakVlnStZUbe/giphy.gif =320x240)

## 22 дня с начала инцидента {.arrow-header}

Сендгрид таки вернул деньги!

## 31 день с начала инцидента {.arrow-header}

И конечно же, сендгрид опять пытается нас зачарджить!

![](https://media.giphy.com/media/8cdZit2ZcjTri/giphy.gif =300x225)

## 32 дня с начала инцидента {.arrow-header}

Приходит письмо, что сендгрид не смог списать деньги с нашей несуществующей виртуальной карты, и наш аккаунт is set up for deletion.

![](https://media.giphy.com/media/OSWRJKmwUEOD6/giphy.gif =499x281)

А аккаунт-то разбанили? Да хуй его знает, никого это уже не ебет.


## P.S. Сендгрид давно летит по наклонной

Когда начался этот пиздец, я пошел искать других пострадавших от обезумевшего сендгрида. Не можем же мы быть одни такими счастливчиками? Так и есть, я нашел многочисленные подтверждения того, что сендгрид банит аккаунты без предупреждения и не отвечает на запросы месяцами.

Вот пара примеров из твиттера:

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Apparently completely suspending an account and cancelling all emails for a 5m+ ARR SAAS business is a P3 ticket according to their logic.</p>&mdash; Matthew Schone (@matthewschone) <a href="https://twitter.com/matthewschone/status/1303591569354760192?ref_src=twsrc%5Etfw">September 9, 2020</a></blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true"><p lang="en" dir="ltr">your customer service is terrible! we are locked out of our account, it&#39;s been over a week with production down for us and the case is at the lowest priority p3. to check the status we have to log in to the account, which we can&#39;t - it&#39;s why we put the case, to begin with</p>&mdash; trainermade (@TrainerMade) <a href="https://twitter.com/TrainerMade/status/1316085781191155712?ref_src=twsrc%5Etfw">October 13, 2020</a></blockquote>

Таких твитов сотни, можно поискать в твиттере [«sendgrid account»](https://twitter.com/search?q=sendgrid%20account&src=typed_query&f=live) и наслаждаться пиздецом в прямом эфире.

А вот [жалобы на доставляемость почты](https://twitter.com/search?q=sendgrid%20blocked&src=typed_query&f=live):

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Decided to use a email provider to ensure email deliverability to client&#39;s inbox. Now I find out they don&#39;t guarantee it; emails are now blocked by iCloud because of SENDGRID&#39;s bad IP address! Now they want me to contact Apple? What am I paying them for? <a href="https://twitter.com/hashtag/sendgrid?src=hash&amp;ref_src=twsrc%5Etfw">#sendgrid</a></p>&mdash; Gerald Bailey (@gbailey) <a href="https://twitter.com/gbailey/status/1314597580131663873?ref_src=twsrc%5Etfw">October 9, 2020</a></blockquote>

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">We started off using <a href="https://twitter.com/SendGrid?ref_src=twsrc%5Etfw">@SendGrid</a> as our email provider, a decision we are now regretting<br><br>They have no vetting process for new accounts, and so rogue users ruin the reputation of their IPs, which end up on Spamhaus blocklists<br><br>Consequently, emails to Hotmail/Outlook are all blocked</p>&mdash; Adam Alton (@altonpowers) <a href="https://twitter.com/altonpowers/status/1316097837449580544?ref_src=twsrc%5Etfw">October 13, 2020</a></blockquote>

Про доставляемость сендгрида [есть интересная статья](https://krebsonsecurity.com/2020/08/sendgrid-under-siege-from-hacked-accounts/): оказывается, сендгрид годами забивал на проблему огромного количества угнанных аккаунтов, через которые херачили спам. Это заебало всех, включая крупные мейл-сервисы: они стали пессимизировать письма от сендгрида, хотя им и пользуется много легитимных отправителей.

В комментариях к статье прекрасная переписка админов, дружно обсирающих сендгрид. Некоторые просто жалуются на невозможность отличить спам, пришедший от сендгрида, от легитимных сообщений, другие пишут, что в какой-то момент их терпение лопнуло, и они просто заблочили любые письма от сендгрида.

Видимо, эффективные менеджеры в сендгриде почувствовали приближающийся пиздец, засуетились, и в лучших традициях эффективного менеджмента придумали невероятно уебанский план выхода из ситуации: ковровые бомбардировки своих же клиентов. Проскочила спамерская ссылочка? Хуяк, блядь, аккаунт в бан, нахуй. Потом разберемся.

Штош.

**Дисклеймер.** Дорогие юристы! Пост отражает только мое личное отношение к описанным событиям, которое может не совпадать (но не совпадает ли? мы никогда не узнаем) с позицией компании Roger Wilco LLC.
{.notice .block .is-mt}

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
