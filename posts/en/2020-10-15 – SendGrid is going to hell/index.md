---
description: 'Read the post to find out who is the ultimate universal protoscumbag'
image: cover.png
langLink: 'sendgrid_катится_к_хуям'
---

# SendGrid is going to hell

## What the hell is SendGrid?

SendGrid is a <abbr title="Business to business" tabindex="-1">B2B</abbr> email delivery service. All those “confirm your email address” and “news from our shitty startup” are usually sent through these guys. You’ve probably heard of others like Mailgun, Mailchimp, Postmark, Amazon SES.

A year ago, SendGrid was acquired by Twilio, a company with a multibillion-dollar market cap. Serious business, you can rely on these guys.

## And you are?

In [Chatra](https://chatra.com), besides “reset your password,” there are several features tightly linked to sending emails: in chat conversations, it’s sending unread support replies to the visitor’s email, and a symmetrical feature—sending unread visitor messages to support’s email; in email threads, it’s actually sending email messages from support. All this was recently handled through SendGrid.

And then one beautiful evening, around 11 PM, our prod tests for sending emails failed. Let’s take this moment as the start of the incident.

## The beginning of the incident {.arrow-header}

It’s worth noting that emails sent through SendGrid could often take several minutes to be delivered, and sometimes even longer. And in our tests, we had a three-minute pause before checking the mail, but even that didn’t always save us, there were false test failures, but the mail eventually got through.

If you think about it, this is a terrible delivery speed, especially when email confirmation is required at registration. But we don’t require immediate email confirmation, so it wasn’t a bottleneck in our registration process.

So, I check my phone to make sure it’s a false alarm. But no, the mail still hasn’t arrived. I register a new account in Chatra—no mail. I refresh my mail for about 5 minutes. Fuck.

I get up, scratch my ass, and go to the computer. I log into SendGrid and see this:

![](fuck_you_too,_sendgrid.png =1788x390)
{.is-ootb}

What the fuck? These assholes just blocked our mail? We send millions of messages a month, pay these fuckers a shitload of money, we have a 98% “everything is awesome, you are totally not spammers” rating in their own system, and they just block our mail delivery in production without any warning?

A question “what the fuck” flies into support chat (with more cultured English epithets, as it’s not me writing), to which support waffles and responds that our issue is very important, “I have elevated your ticket priority.” Meanwhile, the ticket priority remains somewhere around “not fucking urgent,” support is blatantly lying. Any further questions are met with support feeding us shit-stuffed cabbage rolls.

## 2 hours from the start of the incident {.arrow-header}

It becomes clear that the guys at SendGrid are tweaking their nipples from our butthurt, and nothing will be resolved soon, we need to do something ourselves.

![](https://media.giphy.com/media/gaZ51cn7sUY4U/giphy-downsized-large.gif =480x267)

We remember that, by a happy coincidence, we have another SendGrid account for side projects. Just changing the API key would be enough to redirect all our emails there, but this is risky for two reasons:

1.  We still don’t know why the fuck we were banned. Don’t want to trigger a ban on the second account and lose any chance to quickly restore mail delivery.
2.  Sending mail from new IP addresses might significantly drop deliverability, because mail services are used to receiving our mail from our dedicated IPs, which remain on the main account.

    If you don’t understand what I’m talking about, welcome to the fucked-up world of superlegacy technology encrusted with a bewildering array of makeshift fixes—email.

For the second point, we don’t give a shit right now because some deliverability is better than none. But getting a second ban from a service, where we are paying <del>clients</del> hostages, is risky.

Overnight, I smoothly transition our mail delivery to the backup account. By morning, all functionality is restored, the account is not banned. Fucking hurray. I can sleep now.

## 16 hours from the start of the incident {.arrow-header}

The main account is still banned, silence in the ticket. Astonishing how they just don’t give a fuck about paying customers. What the fuck is going on there?

Obviously, we need to urgently switch to another service. While I was researching alternatives, someone suggested [Postmark](https://postmarkapp.com/) to [Tyoma](https://twitter.com/artpolikarpov). After such a fuck-up with SendGrid, I studied everything about Postmark: what kind of company they are, who are the founders, how many clients they have, how much they earn, reviews, the entire website inside out.

The guys made a very good impression, they give a fuck about what they’re doing:

- they’re proud of their mail delivery speed and show real-time data about delivery speed right on their landing page,
- there, they also show the support rating and promise to respond within a couple of hours,
- they’re very concerned about their reputation as a sender, and therefore strictly separate transactional emails and mail campaigns (so strictly that until recently they didn’t deal with mail campaigns at all, and now they send campaigns from a separate IP pool and highly recommend using a separate subdomain for them),
- they don’t try to sell you dedicated IPs and directly say that in most cases dedicated IPs are unnecessary, and shared IPs with a good rating will work on mail deliverability much better.

And one thing that really got to me: they write right on the landing that they are privately owned and profitable. And here’s why.

### Fucking black holes for investments

<%- include('/svg/couch-solid.svg') %>**Caution:** couch analytics
{.notice .is-with-icon .is-warning}

Most Silicon Valley companies are now developing not for users, but for investors.

It seems that if you develop a product for users, users will throw money at you, there will be profit, investors will be happy and they too will throw money at you for further development.

In practice, now it all works differently. The company’s task is to show investors not profit, but the potential for profit. Investors happily gobble this up and continue to throw money at the company, which remains unprofitable for decades.

The company gets another round of investment, the CEO buys a new Ferrari, and with the remaining money, they maximally inflate the user base to show growing potential to investors so that they bring in even more money. The cycle closes.

To inflate the user base, the company buys ads with carpet bombing, and they don’t care that the cost of acquiring a user in the product may be several times higher than the average lifetime value of the attracted user.

This hurts companies that live on profit (wow, is that even possible?), because they can’t compete on the price per click for advertising with carpet bombers. But that’s another story.

As you’ve already guessed, SendGrid is exactly such a scumbag company, existing not for the client, but for the investor. They absolutely don’t give a fuck about you, the fucked client. Your enterprise tariff is peanuts compared to the next round of investment.

Anyway, we’re switching to Postmark.

## 2 days from the start of the incident {.arrow-header}

All mail has been transferred to Postmark.

Postmark’s support really responds very quickly, and it’s not just any agent №248. They understand the product and email in general, having access to all the necessary internal tools to assist you. They don’t just create a ticket or escalate it; they actually help right away, providing a direct and immediate response.

This all looks, of course, not very serious, not bureaucratic enough and enterprise enough. But at Chatra, we have exactly the same support for people, so _we’ll manage just fine_.

And also, Postmark has a nice pleasant interface. It’s convenient and cool to use. It’s not perfect, but you can see it’s made with love and attention to detail. For comparison, SendGrid’s interface is a typical soulless enterprise hack-job. It hasn’t been combed out in a long time, and they slap on anything new however they please.

<hr>

At this point, the incident for Chatra, as a product, is over, but SendGrid doesn’t let go so easily: the account is still banned, and the ticket is still silent.

We try to downgrade our plan at SendGrid, but this scumbag doesn’t let us downgrade and sends us to support. Hahaha. We write another ticket to support to get downgraded and get a refund.

## 3 days from the start of the incident {.arrow-header}

SendGrid charges us for a new month of service. On the banned account.

![](https://media.giphy.com/media/Lopx9eUi34rbq/giphy.gif =346x236)

## 5 days from the start of the incident {.arrow-header}

Turns out, you can change the linked bank card in a banned account! Well, in case your card is about to expire, and you want to keep paying for the banned account.

We create a virtual card, feed it to SendGrid, and then immediately delete it. Glory to Russian banking!

## 6 days from the start of the incident {.arrow-header}

SendGrid sends a copypaste response to a month-old ticket!!1

![](valued_motherfucking_customer.png =691x303)

And in this ticket, our last message was “thanks, we figured it out ourselves, close the ticket.” In the ticket about the account ban, still silence.

## 7 days from the start of the incident {.arrow-header}

A response comes to the ticket and goes straight to spam! Aaaaa, how can you fuck up so often and so epically?

![](spamgrid.png =1021x191)
{.is-ootb}

Nick from SendGrid writes to us:

> Hi there,
>
> I have good news, your account has been reactivated. Our Fraud OPS team provided the following information of the malicious link found within your email stream: _link to a phishing domain resembling a Facebook marketplace._
>
> You can locate the source of this link in order to prevent a suspension by the same policy. Please let me know if you need anything else. I apologize for the delays.
>
> Best -

And... our account is still banned! AAAAAaaaahaaa-ha-ha-haa-hah-aaaaaahaaahhaa-pffffhhhhhh...

And what about the phishing link? Could someone have spammed this link from Chatra? Nope! Exactly one (one, fucking ONE) email was sent with this link. And the juicy part—where this link came from.

One of our clients has a Facebook business page connected to Chatra. And someone sent him this link in a chat on that page. The client didn’t read the message in Chatra, and we sent it to his email. Ta-daa, the phishing link went by mail! Quickly ban these sick fucks, we’ll figure it out later.

And the juicy part is this: Facebook didn’t filter this link and allowed it to be sent to a person in Messenger. Facebook, which suddenly banned our domain months ago without explaining why (yeah, try writing a post on Facebook with a link to chatra.com, nothing will happen!), which meticulously removed any available means of communication so that you can’t even complain about an unfair domain ban, let alone question the decision made by Facebook, this company with a colossal fuck-ton of dollars in capitalization calmly lets an obvious phishing link through to us, for which another company with a capitalization an order of magnitude smaller, but still in fucking trillions, bans us.

If SendGrid is a scumbag that shits on its customers, Facebook is the ultimate universal protoscumbag, shitting on everyone: on users, advertisers, businesses, media, its own employees, the sense of beauty, and common sense.

## 14 days from the start of the incident {.arrow-header}

Opened a new ticket for a refund. It was merged with the old ticket, which no one has responded to for 10 days.

![](https://media.giphy.com/media/gtakVlnStZUbe/giphy.gif =320x240)

## 22 days from the start of the incident {.arrow-header}

SendGrid finally returned the money!

## 31 days from the start of the incident {.arrow-header}

And of course, SendGrid tries to charge us again!

![](https://media.giphy.com/media/8cdZit2ZcjTri/giphy.gif =300x225)

## 32 days from the start of the incident {.arrow-header}

A letter comes in that SendGrid couldn’t charge our non-existent virtual card, and our account is set up for deletion.

![](https://media.giphy.com/media/OSWRJKmwUEOD6/giphy.gif =499x281)

Is the account unbanned? Who the fuck knows, no one cares anymore.

## P.S. SendGrid has been going downhill for a long time

When this shitshow started, I went looking for others who had suffered from crazed SendGrid. Surely we can’t be the only lucky ones? And indeed, I found numerous confirmations that SendGrid bans accounts without warning and doesn’t respond to inquiries for months.

Here are a couple of examples from Twitter:

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Apparently completely suspending an account and cancelling all emails for a 5m+ ARR SAAS business is a P3 ticket according to their logic.</p>&mdash; Matthew Schone (@matthewschone) <a href="https://twitter.com/matthewschone/status/1303591569354760192?ref_src=twsrc%5Etfw">September 9, 2020</a></blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true"><p lang="en" dir="ltr">your customer service is terrible! we are locked out of our account, it&#39;s been over a week with production down for us and the case is at the lowest priority p3. to check the status we have to log in to the account

, which we can&#39;t - it&#39;s why we put the case, to begin with</p>&mdash; trainermade (@TrainerMade) <a href="https://twitter.com/TrainerMade/status/1316085781191155712?ref_src=twsrc%5Etfw">October 13, 2020</a></blockquote>

Hundreds of such tweets can be found by searching on Twitter [“sendgrid account”](https://twitter.com/search?q=sendgrid%20account&src=typed_query&f=live) and enjoying the disaster live.

And here are [complaints about mail delivery](https://twitter.com/search?q=sendgrid%20blocked&src=typed_query&f=live):

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Decided to use an email provider to ensure email deliverability to client&#39;s inbox. Now I find out they don&#39;t guarantee it; emails are now blocked by iCloud because of SENDGRID&#39;s bad IP address! Now they want me to contact Apple? What am I paying them for? <a href="https://twitter.com/hashtag/sendgrid?src=hash&ref_src=twsrc%5Etfw">#sendgrid</a></p>&mdash; Gerald Bailey (@gbailey) <a href="https://twitter.com/gbailey/status/1314597580131663873?ref_src=twsrc%5Etfw">October 9, 2020</a></blockquote>

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">We started off using <a href="https://twitter.com/SendGrid?ref_src=twsrc%5Etfw">@SendGrid</a> as our email provider, a decision we are now regretting<br><br>They have no vetting process for new accounts, and so rogue users ruin the reputation of their IPs, which end up on Spamhaus blocklists<br><br>Consequently, emails to Hotmail/Outlook are all blocked</p>&mdash; Adam Alton (@altonpowers) <a href="https://twitter.com/altonpowers/status/1316097837449580544?ref_src=twsrc%5Etfw">October 13, 2020</a></blockquote>

[An interesting article](https://krebsonsecurity.com/2020/08/sendgrid-under-siege-from-hacked-accounts/) about SendGrid’s deliverability reveals that SendGrid has been ignoring the problem of a huge number of hijacked accounts, through which spam was sent. This pissed everyone off, including major mail services: they started to pessimize mails from SendGrid, even though it’s used by many legitimate senders.

In the comments to the article, there’s a wonderful exchange of admins collectively shitting on SendGrid. Some simply complain about being unable to distinguish spam coming from SendGrid from legitimate messages, others write that at some point their patience ran out, and they just blocked any mails from SendGrid.

Looks like effective managers at SendGrid felt the approaching shitstorm, hustled, and in the best traditions of effective management came up with an incredibly fucked-up plan to get out of the situation: carpet bombing their own clients. A spammy link slipped through? Wham, account fucking banned. We’ll sort it out later.

Oh well.

**Disclaimer.** Dear lawyers! The post reflects only my personal attitude towards the described events, which may not coincide (but does it not coincide? we will never know) with the position of the company Roger Wilco LLC.
{.notice .block .is-mt}

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
