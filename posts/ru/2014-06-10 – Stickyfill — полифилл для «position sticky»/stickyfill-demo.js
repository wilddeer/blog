(function() {
  if (!window.getComputedStyle) return;

  $(window).on('resize orientationchange', function() {
    recalc();
  }).resize();

  function recalc() {
    Stickyfill.removeAll();

    $('.sticky-1').css({
      'margin-top': (window.innerHeight - $('.sticky-1').height() - $('.sticky-1-2').height())/3.5,
      'top': (window.innerHeight - $('.sticky-1').height() - $('.sticky-1-2').height())/2
    });

    $('.sticky-1-2').css({
      'top': parseFloat($('.sticky-1').css('margin-bottom')) + $('.sticky-1').height() + parseFloat($('.sticky-1').css('top'))
    });

    $('.sticky-3').css({
      'top': window.innerHeight/2 - ($('.sticky-3').height() + $('.sticky-4').height())/2,
      'margin-bottom': $('.sticky-4').height()
    });

    $('.sticky-4').css('top', window.innerHeight/2 - (-$('.sticky-3').height() + $('.sticky-4').height())/2);

    $('.sticky-5').css({
      'top': window.innerHeight/5 - ($('.sticky-5').height() + $('.sticky-6').height())/5,
      'margin-bottom': $('.sticky-6').height()
    });

    $('.sticky-6').css('top', window.innerHeight/5 - ($('.sticky-5').height() + $('.sticky-6').height())/5 + $('.sticky-5').height());

    $('.sticky-7').css({
      'top': window.innerHeight/5 - $('.sticky-7').height()/5,
    });

    $('.sticky-8').css({
      'top': window.innerHeight/5 - $('.sticky-8').height()/5,
    });

    $('.sticky-9').css({
      'top': window.innerHeight/2 - $('.sticky-9').height()/2,
      'margin-bottom': window.innerHeight/2 - $('.sticky-9').height()/2
    });

    Stickyfill.add($('.sticky'));
  }
}());
