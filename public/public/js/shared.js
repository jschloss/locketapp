
/////////////////////////////////////////////////////////
//
// Change the page for Windows
//
/////////////////////////////////////////////////////////

if (navigator.appVersion.indexOf("Win")!=-1) {
    $(function()  { 
        $('nav a.download').removeClass("available"); 
        $('nav a.download').bind('click', function(e) {
            $(this).toggleClass('active');
            e.preventDefault();
            $('nav form').fadeToggle(300);
            $('#mce-EMAIL').focus();
            $('nav a.download').toggleClass('outline'); 
        });                       
        $('nav').addClass("os-not-supported windows");      
        $('#subscribe-to-windows').prop('checked', true);   //Check the Windows checkbox in Mailchimp form
    });
}

/////////////////////////////////////////////////////////
//
// Change the page for Android
//
/////////////////////////////////////////////////////////

if (navigator.appVersion.indexOf("Android")!=-1) {
    $(function () {   
        $('nav a.download').removeClass("available"); 
        $('nav a.download').bind('click', function(e) {
            e.preventDefault();
            $('nav form').fadeToggle('fast');
            $('#mce-EMAIL').focus();
            $('nav a.download').toggleClass('outline'); 
        });              
        $('nav').addClass("os-not-supported android"); 
        $('#label-for-os-notify').text("Locket for Android isn't ready yet. Be the first to know when it's here.")
        $('#subscribe-to-android').prop('checked', true);   //Check the Android checkbox in Mailchimp form
    });
}

/////////////////////////////////////////////////////////
//
// Change the page for iOS
//
/////////////////////////////////////////////////////////

if(navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    $(function () {   
        $('header nav').html('<img src="public/img/app-store-badge.svg" width="160">'); 
        $('footer nav.download').remove();
    });
}

/////////////////////////////////////////////////////////
//
// Show share popover when a share button is clicked
//
/////////////////////////////////////////////////////////

$(function()  { 
    $('.share').bind('click', function(e) {
        $(this).toggleClass('active').find('.popover').fadeToggle(300); 
    }); 
});

/////////////////////////////////////////////////////////
//
// Show the thank you content when download button is clicked
//
/////////////////////////////////////////////////////////

$(function()  { 
    $('.download.available').bind('click', function(e) {
        $(this).addClass('outline active');
        $('#thanks-for-downloading').delay(2000).fadeIn(300);
        $('#thanks-animation-wrapper').addClass('play');
        setTimeout( function() {
             $('.button.share').removeClass('outline', 300);
        }, 1000 )
        setTimeout( function() {
            $('#thanks-for-downloading h3').fadeOut(300);           // Fade the title out so we can change its HTML
            $('#thanks-animation-wrapper').addClass('show-iphone'); // Slide the Mac over so we can slide the iPhone in
            setTimeout( function() {
                $('#thanks-for-downloading h3').html('Make sure to grab Locket for iPhone, too. <img id="thanks-appstore-badge" src="public/img/app-store-badge.svg" width="125">').delay(200).fadeIn(300);
            }, 300 )
        }, 6000 )
    }); 
});

/////////////////////////////////////////////////////////
//
// Hide popovers when user clicks outside them
//
/////////////////////////////////////////////////////////


$(document).mouseup(function (e)
{
    var container = $('.popover');

    if (container.has(e.target).length === 0)
    {
        container.fadeOut(300);
        container.parent().removeClass('active');
    }
});



/////////////////////////////////////////////////////////
//
// Set a cookie for returning visitors
//
/////////////////////////////////////////////////////////

$(document).ready(function(){
        // Check (onLoad) if the cookie is there and set the class if it is
        if ($.cookie('returning') == "yes") {
            $("body").addClass("returning");
        }
        else {
            $.cookie('returning','yes', {expires: 30, path: '/'});
        }
        


});

