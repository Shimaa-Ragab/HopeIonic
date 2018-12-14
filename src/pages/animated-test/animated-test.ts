import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-animated-test',
  templateUrl: 'animated-test.html',
  animations: [
    trigger('myvisibility', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('* => *', animate('.5s'))
    ]),
    trigger('folding', [
      state('fold-in', style ({
        
      })),
      state('fold-out', style({

      }))
    ])
  ]
})
export class AnimatedTestPage {

  visibleState = 'visible';
  animationSpeeds = {
    'tada': 1000,
    'tadaSmall': 1000,
    'flash': 500,
    'shake': 400,
    'pulseUp': 250,
    'pulseDown': 250,
    'popIn': 250,
    'popOut': 250,
    'fadeIn': 200,
    'fadeOut': 200
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    $('.card').on('click' , () => {
      $('.card').toggleClass('is-flipped');
  });
  /**************************************************** */
  $('button').click(function(){
    $('button').toggleClass('active');
    $('.title').toggleClass('active');
    $('nav').toggleClass('active');
  });
/**************************************************** */
  $(document).ready(function(){
    var zindex = 10;
    
    $("div.card").click(function(e){
      e.preventDefault();
  
      var isShowing = false;
  
      if ($(this).hasClass("show")) {
        isShowing = true
      }
  
      if ($("div.cards").hasClass("showing")) {
        // a card is already in view
        $("div.card.show")
          .removeClass("show");
  
        if (isShowing) {
          // this card was showing - reset the grid
          $("div.cards")
            .removeClass("showing");
        } else {
          // this card isn't showing - get in with it
          $(this)
            .css({zIndex: zindex})
            .addClass("show");
  
        }
  
        zindex++;
  
      } else {
        // no cards in view
        $("div.cards")
          .addClass("showing");
        $(this)
          .css({zIndex:zindex})
          .addClass("show");
        zindex++;
      }
    });
  });
/************************************************************************************* */
$.fn.commentCards = function(){
  return this.each(function(){
    var $this = $(this),
        $cards = $this.find('.com-card'),
        $current = $cards.filter('.card--current'),
        $next;

    $cards.on('click',function(){
      if ( !$current.is(this) ) {
        $cards.removeClass('card--current card--out card--next');
        $current.addClass('card--out');
        $current = $(this).addClass('card--current');
        $next = $current.next();
        $next = $next.length ? $next : $cards.first();
        $next.addClass('card--next');
      }
    });

    if ( !$current.length ) {
      $current = $cards.last();
      $cards.first().trigger('click');
    }
    $this.addClass('cards--active');
  });
};
$('.comments-cards').commentCards();
/********************************************************************************** */

}

animateEl(animation)
{ 
  // if (element.data('animating')) {
  //   element.removeClass(element.data('animating')).data('animating', null);
  //   element.data('animationTimeout') && clearTimeout(element.data('animationTimeout'));
  // }
  
  $('#target').addClass('animated-' + animation).data('animating', 'animated-' + animation);
  $('#target').data('animationTimeout', setTimeout((function() 
  { $('#target').removeClass( $('#target').data('animating')).data('animating', null); }), 
    this.animationSpeeds[animation]));
}

toggleVisible() {
  this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
}

}
