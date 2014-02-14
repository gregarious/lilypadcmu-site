/* refreshes at top */
$(document).ready(function(){
    $(this).scrollTop(0);
});


/*scroll disabling and enabling*/
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}


/*Enter Screen*/
window.onload=function(){enter()};
function enter(){
    var thediv=document.getElementById('displaybox');
    if(thediv.style.display == "none"){
        thediv.style.display = "";
        // thediv.innerHTML = "<table width='100%' height='100%'><tr><td align='center' valign='middle' width='100%' height='100%'><object classid='clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B' codebase='http://www.apple.com/qtactivex/qtplugin.cab' width='640' height='500'><param name='src' value='http://cowcast.creativecow.net/after_effects/episodes/Shape_Tips_1_POD.mp4'><param name='bgcolor' value='#000000'><embed src='http://cowcast.creativecow.net/after_effects/episodes/Shape_Tips_1_POD.mp4' autoplay='true' pluginspage='http://www.apple.com/quicktime/download/' height='500' width='640' bgcolor='#000000'></embed></object><br><br><a href='#' onclick='return clicker();'>CLOSE WINDOW</a></td></tr></table>";
        thediv.innerHTML = "<a href='#' onclick='return enter();'><img src='images/Enter-button.png' z-index='2'></a>"
        disable_scroll();
    }else{
        thediv.style.display = "none";
        thediv.innerHTML = '';
        enable_scroll();
    }
    return false;
}




/*navbar sticky after scroll past top image*/
    $(function() {
                // Stick the navigation to the top of the window
                var nav = $('#menu');
                // var navHomeY = nav.offset().top;
                var navHomeY = document.getElementById("About").offsetTop - 60
                var isFixed = false;
                var $w = $(window);
                $w.scroll(function() {
                    var scrollTop = $w.scrollTop();
                    var shouldBeFixed = scrollTop > -20;
                    if (shouldBeFixed && !isFixed) {
                        nav.css({
                            position: 'fixed',
                            top: 0,
                            left: nav.offset().left,
                            width: nav.width()
                        });
                        isFixed = true;
                    }
                    else if (!shouldBeFixed && isFixed)
                    {
                        nav.css({
                            position: 'static'
                        });
                        isFixed = false;
                    }
                });
            });



/*navbar appears at top after scroll past top image*/
// function menu() {
//     var first = document.getElementById("About").offsetTop - 100;
//     if (document.body.scrollTop > 800) //Show the slider after scrolling down 100px
//         $('#menu').stop().animate({"margin-top": '0'});
//     else
//         $('#menu').stop().animate({"margin-top": '-100'}); //200 matches the width of the slider
// }

// $(window).scroll(function () {
//     menu();
// });

// $(document).ready(function () {
//     menu();
// });


    /*dynamic scrolling navbar change*/
    $(document).ready(function() {
        
        //Get Sections top position
        function getTargetTop(elem){
            
            //gets the id of the section header
            //from the navigation's href e.g. ("#html")
            var id = elem.attr("href");

            //Height of the navigation
            var offset = 50;

            //Gets the distance from the top and 
            //subtracts the height of the nav.
            return $(id).offset().top - offset;
        }

        //Smooth scroll when user click link that starts with #
        $('a[href^="#"]').click(function(event) {
            
            //gets the distance from the top of the 
            //section refenced in the href.
            var target = getTargetTop($(this));


            //scrolls to that section.
            $('html, body').animate({scrollTop:target}, 500);

            //prevent the browser from jumping down to section.
            event.preventDefault();

        });

        //Pulling sections from main nav.
        var sections = $('a[href^="#"]');

        // Go through each section to see if it's at the top.
        // if it is add an active class
        function checkSectionSelected(scrolledTo){
            
            //How close the top has to be to the section.
            var threshold = 50;

            var i;

            for (i = 0; i < sections.length; i++) {
                
                //get next nav item
                var section = $(sections[i]);

                //get the distance from top
                var target = getTargetTop(section);
                
                //Check if section is at the top of the page.
                if (scrolledTo > target - threshold && scrolledTo < target + threshold) {

                    //remove all selected elements
                    sections.removeClass("active");

                    //add current selected element.
                    section.addClass("active");
                }

            };
        }


        //Check if page is already scrolled to a section.
        checkSectionSelected($(window).scrollTop());

        $(window).scroll(function(e){
            checkSectionSelected($(window).scrollTop())
        });
    });