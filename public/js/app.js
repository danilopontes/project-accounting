//FADE IN SECTION ITEMS
$(document).ready(function() {
    $('.hideme').each(function(i, el){
        var bottom_of_object = $(this).position().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        console.log(bottom_of_object +":" + bottom_of_window)
        /* If the object is completely visible in the window, fade it it */
        if( bottom_of_window > bottom_of_object ){
            $(this).removeClass("hideme");
        }
        
    });
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
        /* Check the location of each desired element */
        $('.hideme').each(function(i, el){
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            console.log(bottom_of_object +":" + bottom_of_window)
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                $(this).removeClass("hideme");
            }
            
        }); 
    });
});


// TEST SVG SUPPORT
function supportsSvg() {
  var div = document.createElement('div');
  div.innerHTML = '<svg/>';
  return (div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
};
if (!supportsSvg()) {
  $( "p" ).addClass("no-svg");
  // or even .className += " no-svg"; for deeper support
}

// THIRDSECTION SCRIPT
$(function() {
  
    $("#thirdSection .changeContent").on('click', function(){

    	$id = this.id;
        $bar = $('.menuItem#'+ $id);
        $menu = $('#thirdSection .menu');
        $(this).parent().parent().parent().parent().stop();
        $bar.stop();
        $foo = $(this).parent().parent().parent().parent();
        
        $foo.animate({height: ($foo.outerHeight())+'px'}, 'slow', function() {

        });

        if($id == 'back') {
          
          if ($(window).width() < 768) {
                $('html,body').animate({scrollTop: $('#secondToThird').offset().top})
          }
          
          $(".menuItem #back").prop("disabled", true);
          setTimeout(function(){
            $(".menuItem #back").prop("disabled", false);
          }, 1000);
          
          $(this).parent().parent().fadeToggle( "slow", function() {
              $foo.animate({height: ($menu.outerHeight())+'px'}, 'slow', function() {
                  $menu.fadeToggle();
              });
          });
          
        } else {
          
          if ($(window).width() < 768) {
                $('html,body').animate({scrollTop: $('#secondToThird').offset().top})
          }
          
          $('#thirdSection .menu .changeContent').prop("disabled", true);
          setTimeout(function(){
            $('#thirdSection .menu .changeContent').prop("disabled", false);
          }, 1000);          

          $menu.fadeToggle( "slow", function() {
              $foo.animate({height: ($bar.outerHeight()+5)+'px'}, 'slow', function() {
                  $bar.fadeToggle();
              });
          });

        }
    });
});

// SHOW AND HIDE MOBILE NAV BAR
$(function showMobileNav(){
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#bottomNav').outerHeight();
    var hasScrolled = function(){
        var st = $(this).scrollTop();
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            $('#bottomNav').fadeOut();
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('#bottomNav').fadeIn();
            }
        }
        
        lastScrollTop = st;
}
    $(window).scroll(function(event){
        didScroll = true;
        setInterval(function() {
        
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
    });    
});

//DATE FORMAT
function dat(d){
    var data = new Date(d);
    console.log(data);
    var dia = data.getUTCDate();
    console.log(dia);
    if (dia.toString().length == 1)
      dia = "0"+dia;
    var mes = data.getUTCMonth()+1;
    if (mes.toString().length == 1)
      mes = "0"+mes;
    var ano = data.getUTCFullYear(); 
    return dia+"/"+mes+"/"+ano;

}
function dataMes(d){
    var data = new Date(d);
    var mes = data.getUTCMonth()+1;
    if (mes.toString().length == 1)
      mes = "0"+mes;
    return mes;
}