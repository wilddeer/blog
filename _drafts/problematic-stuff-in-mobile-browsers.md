###Проблемные места в мобильных браузерах

Если вы фигачите респонсив-сайты, то наверняка знаете, что такое [Модернайзер](//modernizr.com) и как он работает. Тест на фичи это гут, но некоторые фичи либо не детектятся совсем, либо работают с багами, либо дают фолс позитивы в тестах. Для вторых и третьих я завел [табличку](https://docs.google.com/spreadsheet/ccc?key=0AjA1cIs8C8MGdFdyQ0lMQnhMbHJEeVZpMW9XejhzU2c&usp=sharing). Табличка периодически пополняется.

Основной принцип: есть фолс-позитив, который ну никак не обойти --- фигач браузер-сниффинг. При этом сниффинг должен быть максимально future-proof, то есть учитывать появление в будущем новых устройств и браузеров.

С фичами, которые не детектятся принципиально, или состоят из фолс-позитивов чуть менее, чем полностью, отдельная история:

####Position: fixed
ПОТЕСТИТЬ Про position: fixed уже написана куча статей (например, [статья](http://www.quirksmode.org/blog/archives/2010/12/the_fifth_posit.html), где подробно рассказывается, почему эта проблема вообще существует). Проблема усложняется тем, что протестировать адекватность поддержки этого свойства невозможно. Мой подход --- не использовать совсем, или, если очень хочется,  

####Блоки со скроллом

Адекватность работы `overflow: scroll` и `overflow: auto` не детектится, совсем. Все мои попытки написать тест окончились тщетно. Блоки не скроллятся в андроиде ниже 4 версии и айОси ниже 5 (вроде). Еще их не поскроллить в Опере Мини, Ovi и, наверное, в других редких случаях. На Киндле, кстати, блоки скролятся, но весьма неудобным образом.

Выход здесь --- сниффинг о двух концах:

- Можно искать устройства, где скролл заведомо не работает, и делать фоллбек. В таком случае мы упускаем потенциальные редкие случаи, где скролл также не работает, но нам об этом не известно.
- Если, наоборот, включать скролл там, где он заведомо работает, получится совсем не future-proof и скролл не заработает на каком-нибудь хитром новом устройстве.

В первом случае мы теряем юзеров редких девайсов, во втором оставляем пользователей мобилок на какой-нибудь свежевыпущенной FirefoxOS с урезанным функционалом. Здесь каждый сам выбирает, каким путем пойти.