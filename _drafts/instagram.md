---
layout: post
title:  "Все через жопу: Instagram"
h1: Instagram
categories: everything-done-wrong
---

Ребята из Инстаграма наконец-то сподобились сделать веб-версию своего творения (наконец-то --- это около года назад, судя по <a href="http://archive.org">archive.org</a>). К сожалению, у самых продвинутых и гиканутых ребят не нашлось адекватного верстальщика.

##Адаптивная верстка

В результате сайт Инстаграма вроде бы и респонсив, а вроде бы местами и нет. [Главная](http://instagram.com) (незалогиненная) просто сверстана кирпичом:

<div class="gallery">
	<figure>
		<img alt="Windows Phone 8" src="i/main-wp.png">
		<figcaption>Windows Phone 8</figcaption>
	</figure>

	<figure>
		<img alt="iPod Touch 5" src="i/main-ios.png">
		<figcaption>iPod Touch 5</figcaption>
	</figure>
</div>

[Страница профиля](http://instagram.com/instagram) уже немного адаптивная, но адаптивность останавливается на ширине 720px, при этом на мобильники и планшеты сервер отдает другую версию страницы (на айпаде остается десктопная версия):

<div class="gallery">
	<figure>
		<img alt="Opera 15" src="i/profile-opera.jpg">
		<figcaption>Opera 15</figcaption>
	</figure>

	<figure>
		<img alt="iPod Touch 5" src="i/profile-wp.png">
		<figcaption>Windows Phone 8</figcaption>
	</figure>

	<figure>
		<img alt="iPod Touch 5" src="i/profile-ios.png">
		<figcaption>iPod Touch 5</figcaption>
	</figure>

	<figure>
		<img alt="Chrome на Galaxy Tab 2" src="i/profile-android.png">
		<figcaption>Chrome на Galaxy Tab 2</figcaption>
	</figure>
</div>

Довольно спорное решение. Причиной могло послужить нагромождение из меняющихся фоток в шапке десктопной версии. Либо его не смогли сделать адаптивным, либо побоялись им перегрузить маломощные девайсы. В любом случае, [девайс-сниффинг](http://en.wikipedia.org/wiki/Browser_sniffing) на стороне сервера никак не оправдывает себя в этом случае. Громоздкую шапку можно легко убрать адаптивными стилями. Яваскрипт, меняющий фоточки, можно включать/отключать в зависимости от размера экрана (или даже в зависимости от девайса, если это важно по какой-то причине). Других трудностей с адаптированием этой страницы ниже ширины в 720px я не вижу.

На скриншоте с айпода можно увидеть типичный баг с локализацией. Так бывает с теми, кто не дружит с [экстремальной версткой](#TODO).

Казалось бы, остальная часть сайта отлично адаптируется под самые маленькие экраны, значит, больше не будет серверных сниффингов, да? Нет:

[caption id="attachment_73" align="alignnone" width="386"]<img class="size-full wp-image-73" alt="Просто хром" src="http://blog.dizaina.net/wp-content/uploads/2013/08/61.jpg" width="386" height="659" /> Просто хром[/caption]

[caption id="attachment_72" align="alignnone" width="386"]<img class="size-full wp-image-72" alt="User Agent - iPhone 5" src="http://blog.dizaina.net/wp-content/uploads/2013/08/71.jpg" width="386" height="659" /> User Agent -- iPhone 5[/caption]

Вот тут о причинах вообще сложно что-либо сказать. Десктопная версия отлично сжалась до размеров мобилки. Но, тем не менее, на мобильники упорно отдается совсем другая версия, в которой, кроме всего прочего, отличается шапка и подвал, нарушая единообразие всего сайта. Профиль переехал из шапки в подвал и поменял набор опций:

[caption id="attachment_82" align="alignnone" width="348"]<a href="http://blog.dizaina.net/wp-content/uploads/2013/08/9.jpg"><img class="size-full wp-image-82" alt="Chrome" src="http://blog.dizaina.net/wp-content/uploads/2013/08/9.jpg" width="348" height="227" /></a> Chrome[/caption]

[caption id="attachment_83" align="alignnone" width="348"]<a href="http://blog.dizaina.net/wp-content/uploads/2013/08/8.jpg"><img class="size-full wp-image-83" alt="iPhone" src="http://blog.dizaina.net/wp-content/uploads/2013/08/8.jpg" width="348" height="227" /></a> iPhone[/caption]

Страница с френдлентой и служебные страницы отдаются везде одинаково. И на том спасибо.

А мучения страницы с отдельной фоткой продолжаются в разборе косяков:
<h2>Разбор косяков</h2>
Даже на таком небольшом сайте (4 основных шаблона и штук 5 для всяких документов, форм редактирования профиля и прочего по мелочи) много дурацких и банальных косяков. Разберем парочку.

Вот, например, условия использования:

<figure class="gallery">

[caption id="attachment_50" align="aligncenter" width="281"]<a href="http://blog.dizaina.net/wp-content/uploads/2013/08/wp_ss_20130822_0001.png"><img class="size-medium wp-image-50" alt="Windows Phone 8" src="http://blog.dizaina.net/wp-content/uploads/2013/08/wp_ss_20130822_0001-281x500.png" width="281" height="500" /></a> Windows Phone 8[/caption]

[caption id="attachment_51" align="aligncenter" width="281"]<a href="http://blog.dizaina.net/wp-content/uploads/2013/08/IMG_0251.png"><img class="size-medium wp-image-51" alt="iPod Touch 5" src="http://blog.dizaina.net/wp-content/uploads/2013/08/IMG_0251-281x500.png" width="281" height="500" /></a> iPod Touch 5[/caption]

[caption id="attachment_52" align="aligncenter" width="292"]<a href="http://blog.dizaina.net/wp-content/uploads/2013/08/Screenshot_2013-08-22-00-25-41.png"><img class="size-medium wp-image-52" alt="Chrome for Android" src="http://blog.dizaina.net/wp-content/uploads/2013/08/Screenshot_2013-08-22-00-25-41-292x500.png" width="292" height="500" /></a> Chrome на Galaxy Tab 2[/caption]

</figure>На всех скриншотах виден горизонтальный скролл разной степени запущенности. А вот и причина:

<a href="http://blog.dizaina.net/wp-content/uploads/2013/08/4.jpg"><img class="aligncenter size-full wp-image-58" alt="4" src="http://blog.dizaina.net/wp-content/uploads/2013/08/4.jpg" width="493" height="808" /></a>

Не знаю о природе появления этого отрицательного маржина, но простое отключение свойства приводит страницу в порядок. Ну ладно, условия использования все равно никто не читает, а вот баг покруче:

<a href="http://blog.dizaina.net/wp-content/uploads/2013/08/IMG_0249.png"><img class="aligncenter size-medium wp-image-60" alt="IMG_0249" src="http://blog.dizaina.net/wp-content/uploads/2013/08/IMG_0249-281x500.png" width="281" height="500" /></a>