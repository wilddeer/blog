---
description: 'Read the post to find out who is the ultimate scumbag of the universe'
image: cover.png
langLink: 'sendgrid_катится_к_хуям'
tags:
    - draft
---

# SendGrid is Going to Hell

## What's SendGrid?

SendGrid is a <abbr title="Business to Business" tabindex="-1">B2B</abbr> email delivery service. All those “confirm your email address” and “news from our crappy startup” emails usually get sent through such services. Other well-known services include Mailgun, Mailchimp, Postmark, and Amazon SES — you’ve probably heard of some of these.

SendGrid was acquired a year ago by Twilio, a company with a multibillion-dollar market cap. Serious business, you can rely on these guys.

## So, what happened?

At [Chatra](https://chatra.com), apart from “reset your password,” there are several functions heavily dependent on sending emails: in the chat, it involves sending unread support replies to the visitor’s email, and vice versa; in email, it means sending email messages from support. All this was running through SendGrid until recently.

Then, one fine evening around 11 PM, our production email sending tests failed. Let’s consider this the start of the incident.

## The Start of the Incident {.arrow-header}

It's worth mentioning that emails through SendGrid could often take a couple of minutes, sometimes even more. In our tests, we had a three-minute pause before checking the email, but even that didn't always save us from false test failures, although the emails would eventually arrive.

If you think about it, that's a terrible delivery speed, especially when email verification is required upon registration. But we don't demand immediate email verification, so it wasn't a bottleneck in our registration process.

So, I checked my phone to make sure it was a false alarm. But no, the email still hadn't arrived. I registered a new account on Chatra — no email came. I refreshed my email for about 5 minutes. Damn.

I got up, scratched my ass, and went to the computer. I checked SendGrid and saw this:

![](fuck_you_too,_sendgrid.png =1788x390)
{.is-ootb}

What the fuck? These assholes just blocked our mail? We send millions of messages a month, pay these fuckers a lot of money, we have a 98% "everything is awesome, you're definitely not spammers" rating in their own system, and they just block our production email sending without any warning?

I immediately sent a "what the fuck" message to the support chat (with more polite English epithets, as I wasn't the one writing), to which the support hesitates and replies that my ticket priority has been elevated. The ticket priority remains somewhere around "not fucking urgent," the support is blatantly lying. Any further questions are met with bullshit excuses from support.

## 2 Hours into the Incident {.arrow-header}

It becomes clear that the guys at SendGrid are enjoying our pain, and nothing will be resolved anytime soon. We need to do something ourselves.

![](https://media.giphy.com/media/gaZ51cn7sUY4U/giphy-downsized-large.gif =480x267)

We remember that, by a stroke of luck, we have another SendGrid account for side projects. It's enough to change the API key to redirect all our email traffic there, but this is risky for two reasons:

1. We still don't know why we were banned. We don't want to trigger a ban on the second account and lose any chance of quickly restoring email sending.
2. Sudden email traffic from new IP addresses might significantly lower deliverability, because mail services are accustomed to receiving our mail from our dedicated IPs, which are still in the main account.

If you don't understand what I'm talking about, welcome to the fucked-up world of superlegacy technology smothered in incredible hacks — email.

Right now, some deliverability is better than none. But getting a second ban from a service that we're, fucking hell, a paying <del>customer</del> hostage to, is risky.

Overnight, I gradually switch our email sending to the backup account. By morning, all functionality is restored, and the account is not banned. Hooray, fuck. I can sleep now.

## 16 Hours into the Incident {.arrow-header}

The account is still banned, and the ticket remains silent. It's astonishing how little they care about paying customers. What the fuck is going on there?

Obviously, we need to switch to another service immediately. While I was exploring alternatives, someone suggested [Postmark](https://postmarkapp.com/) to [Tim](https://twitter.com/artpolikarpov). After the SendGrid fuckup, I learned everything about Postmark: what kind of company it is, who the founders are, how many customers they have, how much they earn, reviews, I scoured their entire site.

These guys left a very good impression, they

 care about what they do:

- they're proud of their email delivery speed and show real-time data about delivery speed right on their landing page,
- they also show their support rating on the landing page and promise to respond within a couple of hours,
- they're very concerned about their reputation as a sender, and therefore strictly separate transactional emails and email campaigns (so strictly that until recently they didn't deal with email campaigns at all, but now they send campaigns from a separate IP pool and highly recommend using a separate subdomain for them),
- they don't try to sell you dedicated IPs and outright say that in most cases, shared IPs with a good reputation will work much better for deliverability.

And another thing that really struck me: they write right on the landing page that they are privately owned and profitable. And that's why.

### Fucking Black Holes for Investments

<%- include('/svg/couch-solid.svg') %>**Caution:** armchair analysis
{.notice .is-with-icon .is-warning}

Most Silicon Valley companies nowadays are developed not for users, but for investors.

It seems that if you develop a product for users, users will throw money at you, there will be profit, investors will be happy and will also throw money at you for further development.

In practice, it doesn't work that way now. The company's task is to show investors not profit, but the potential for profit. Investors happily eat this up and continue to throw money at the company, which remains unprofitable for decades.

The company receives another round of investment, the CEO buys a new Ferrari, and with the remaining money, the user base is inflated as much as possible to show growing potential to investors, so they bring even more money. The cycle closes.

To inflate the user base, the company buys ads like carpet bombing, and it doesn't care that the cost of attracting a user to the product can far exceed the average lifetime value of the attracted user.

Companies that live on profit (oh, it happens?) suffer from this because they can't compete in the cost per click for ads with carpet bombers. But that's another story.

As you may have guessed, SendGrid is exactly such a scumbag company, existing not for the client, but for the investor. They don't give a fuck about you, the fucked customer. Your enterprise tariff is peanuts compared to the next round of investment.

In short, we're switching to Postmark.

## 2 Days into the Incident {.arrow-header}

All mail has been transferred to Postmark.

Postmark's support really responds very quickly, and it's not just another agent&nbsp;248. It's someone who understands the product and the mail in general, has all the necessary access to all internal tools to help you, and he just takes and helps. He doesn't create a ticket, doesn't escalate it, but responds to you immediately.

It all looks, of course, not serious enough, not bureaucratic enough, and not enterprise enough. But at Chatra, we have the same kind of support for people, so we'll _somehow survive_.

Also, Postmark has a nice, pleasant interface. It's convenient and cool to use. It's not perfect, but it's made with love and attention to detail. For comparison, the SendGrid interface is a typical soulless enterprise mess. It hasn't been combed through for a long time, and they slap new stuff on top haphazardly.

<hr>

That concludes the incident for Chatra as a product, but SendGrid doesn't let go that easily: the account is still banned, the ticket is still silent.

We're trying to downgrade our tariff at SendGrid, but this scumbag won't let us downgrade and sends us to support. Haha. We write another ticket to support to get downgraded and get a refund.

## 3 Days into the Incident {.arrow-header}

SendGrid charges us for another month of service. On the banned account.

![](https://media.giphy.com/media/Lopx9eUi34rbq/giphy.gif =346x236)

## 5 Days into the Incident {.arrow-header}

It turns out, you can change the linked bank card in a banned account! Well, just in case your card is about to expire, but you want to continue paying for the banned account.

We create a virtual card, feed it to SendGrid, and then delete it. Glory to Russian banking!

## 6 Days into the Incident {.arrow-header}

SendGrid sends a copy-paste response to a month-old ticket!!1

![](valued_motherfucking_customer.png =691x303)

And in that ticket, our last message is, "thanks, we've figured it out, close the ticket." In the ticket about the account ban, still silence.

## 7 Days into the Incident {.arrow-header}

A response comes to the ticket and falls into spam! Aaah, how can you screw up so often and so ep

ically?

![](spamgrid.png =1021x191)
{.is-ootb}

Nick from SendGrid writes to us:

> Hi there,
>
> I have good news, your account has been reactivated. Our Fraud OPS team provided the following information of the malicious link found within your email stream: _a link to a phishing domain similar to a Facebook marketplace._
>
> You can locate the source of this link to prevent a suspension by the same policy. Please let me know if you need anything else. I apologize for the delays.
>
> Best -

And... our account is still banned! AAAAAaaaahhh-ha-ha-haa-hah-aaaaaaaahhhhh...

And what about the phishing link? Maybe someone spammed that link from Chatra? Nope! That link was sent in exactly one (one, fucking, ONE) email. And here's the juicy part — how that link came to us.

One of our clients had a Facebook business page linked to Chatra. And someone sent him this link in a chat. The client didn't read the message in Chatra, and we sent it to his email. Ta-daa, the phishing link went by mail! We urgently ban these sick fucks, we'll figure it out later.

And the juicy part is this: Facebook didn't filter out this link and allowed it to be sent to a person in Messenger. Facebook, which mysteriously banned our domain months ago without explaining the reasons (yes, try to write a post on Facebook with a link to chatra.com, nothing will come of it!), which meticulously removed any available means of communication so that you can't even complain about an unjust domain ban, let alone question the decision made by Facebook, this company with a capitalization in gazillions of dollars calmly allows an obvious phishing link to us, for which another company with a capitalization an order of magnitude smaller, but still in gazillions of dollars, bans us.

If SendGrid is a scumbag that shits on its clients, Facebook is the ultimate scumbag of the universe, shitting on everyone: users, advertisers, businesses, media, its own employees, the sense of beauty, and common sense.

## 14 Days into the Incident {.arrow-header}

We open a new ticket for a refund. It gets merged with the old ticket, which no one has responded to for 10 days.

![](https://media.giphy.com/media/gtakVlnStZUbe/giphy.gif =320x240)

## 22 Days into the Incident {.arrow-header}

SendGrid finally returns the money!

## 31 Days into the Incident {.arrow-header}

And of course, SendGrid tries to charge us again!

![](https://media.giphy.com/media/8cdZit2ZcjTri/giphy.gif =300x225)

## 32 Days into the Incident {.arrow-header}

We receive a letter that SendGrid couldn't debit money from our non-existent virtual card, and our account is set up for deletion.

![](https://media.giphy.com/media/OSWRJKmwUEOD6/giphy.gif =499x281)

Is the account unbanned? Who the hell knows, no one gives a shit anymore.

## P.S. SendGrid has been going downhill for a long time

When this shitshow started, I went looking for others who had suffered from the crazed SendGrid. We can't be the only lucky ones, right? Indeed, I found numerous confirmations that SendGrid bans accounts without warning and doesn't respond to requests for months.

Here are a couple of examples from Twitter:

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Apparently completely suspending an account and cancelling all emails for a 5m+ ARR SAAS business is a P3 ticket according to their logic.</p>&mdash; Matthew Schone (@matthewschone) <a href="https://twitter.com/matthewschone/status/1303591569354760192?ref_src=twsrc%5Etfw">September 9, 2020</a></blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true"><p lang="en" dir="ltr">your customer service is terrible! we are locked out of our account, it's been over a week with production down for us and the case is at the lowest priority p3. to check the status we have to log in to the account, which we can't - it's why we put the case, to begin with</p>&mdash; trainermade (@TrainerMade) <a href="https://twitter.com/TrainerMade/status/1316085781191155712?ref_src=twsrc%5Etfw">October 13, 2020</a></blockquote>

There are hundreds of such tweets, you can search on Twitter ["sendgrid account

"](https://twitter.com/search?q=sendgrid%20account&src=typed_query&f=live) and enjoy the disaster live.

And here are [complaints about email deliverability](https://twitter.com/search?q=sendgrid%20blocked&src=typed_query&f=live):

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Decided to use an email provider to ensure email deliverability to client's inbox. Now I find out they don't guarantee it; emails are now blocked by iCloud because of SENDGRID's bad IP address! Now they want me to contact Apple? What am I paying them for? <a href="https://twitter.com/hashtag/sendgrid?src=hash&ref_src=twsrc%5Etfw">#sendgrid</a></p>&mdash; Gerald Bailey (@gbailey) <a href="https://twitter.com/gbailey/status/1314597580131663873?ref_src=twsrc%5Etfw">October 9, 2020</a></blockquote>

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">We started off using <a href="https://twitter.com/SendGrid?ref_src=twsrc%5Etfw">@SendGrid</a> as our email provider, a decision we are now regretting<br><br>They have no vetting process for new accounts, and so rogue users ruin the reputation of their IPs, which end up on Spamhaus blocklists<br><br>Consequently, emails to Hotmail/Outlook are all blocked</p>&mdash; Adam Alton (@altonpowers) <a href="https://twitter.com/altonpowers/status/1316097837449580544?ref_src=twsrc%5Etfw">October 13, 2020</a></blockquote>

About the deliverability of SendGrid [there is an interesting article](https://krebsonsecurity.com/2020/08/sendgrid-under-siege-from-hacked-accounts/): it turns out, SendGrid has been ignoring the problem of a huge number of hijacked accounts for years, through which spam was sent. This pissed everyone off, including major mail services: they started to downgrade emails from SendGrid, although it is used by many legitimate senders.

In the comments to the article, there's a wonderful conversation of admins, unanimously shitting on SendGrid. Some simply complain about being unable to distinguish spam from SendGrid from legitimate messages, others write that at some point their patience ran out, and they just blocked any emails from SendGrid.

Apparently, the effective managers at SendGrid felt the impending doom, scrambled, and in the best traditions of effective management, came up with an incredibly fucked-up plan to get out of the situation: carpet bombing their own clients. A spammy link slipped through? Bang, fuck, account banned, fuck off. Then we'll sort it out.

That's it.

**Disclaimer.** Dear lawyers! This post reflects only my personal attitude towards the described events, which may not coincide (but does it not? we will never know) with the position of the company Roger Wilco LLC.
{.notice .block .is-mt}

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>