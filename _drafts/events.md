Если сжать страницу демки до мобильных размеров, можно заметить, что блок покупки и добавки в избранное исчезает из сайдбара и появляется новый, под галереей. Так как это два разных блока, выполняющих одну функцию, их состояние надо как-то синхронизировать. Для этого используется очень простой принцип событий.

Рассмотрим на примере. Сначала типичный для такого случая сценарий действий: юзер нажимает кнопку "Добавить в избранное", идет запрос на сервер, сервер возвращает `success`, мы меняем состояние блока. Как-то так:

{% highlight js cssclass=codewrap %}
addForm.steamAjaxForm({
  success: function() {
    _this.addClass(whishlistedClass);
  }
});

removeForm.steamAjaxForm({
  success: function() {
    _this.removeClass(whishlistedClass);
  }
});
{% endhighlight %}

Здесь нужно поменять две вещи: во-первых, вместо изменения класса блока мы будем генерировать специальные собития; во-вторых, надо подписаться на эти события и уже в обработчике события менять класс блока:

{% highlight js cssclass=codewrap %}
addForm.steamAjaxForm({
  success: function() {
    steamEvents.invoke('gameAddedToWishlist');
  }
});

removeForm.steamAjaxForm({
  success: function() {
    steamEvents.invoke('gameRemovedFromWishlist');
  }
});

steamEvents.subscribe('gameAddedToWishlist', function() {
  _this.addClass(whishlistedClass);
});

steamEvents.subscribe('gameRemovedFromWishlist', function() {
  _this.removeClass(whishlistedClass);
});
{% endhighlight %}

Все. Оба блока среагируют на событие и поменяют состояние. Код `steamEvents` до безобразия прост:

{% highlight js cssclass=codewrap %}
var steamEvents = {
  events: {

  },

  subscribe: function(eventName, handler) {
    if (!this.events[eventName]) this.events[eventName] = [];

    this.events[eventName].push(handler);
  },

  invoke: function(eventName) {
    if (!this.events[eventName]) return;

    for (var i = this.events[eventName].length - 1; i >= 0; i--) {
      this.events[eventName][i]();
    };
  }
}
{% endhighlight %}

Таким же образом можно реализовать взаимодействие многих элементов на странице. Это особенно удобно, если элементы никак не завязаны в коде.