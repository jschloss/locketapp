var appStoreURL     =   'http://itunes.apple.com/us/app/paper-by-fiftythree/id506003812'
,   downloadButton  =   $('nav a.download')    

/////////////////////////////////////////////////////////
//
// Change the page for Windows
//
/////////////////////////////////////////////////////////

if (navigator.appVersion.indexOf("Win")!=-1) {
    $(function()  { 
        downloadButton.removeClass("available").addClass('outline'); 
        downloadButton.bind('click', function(e) {
            $(this).toggleClass('active');
            e.preventDefault();
            $('nav form').fadeToggle(300);
            $('#mce-EMAIL').focus(); 
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
        downloadButton.removeClass("available"); 
        downloadButton.bind('click', function(e) {
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
        $('header nav').html('<img src="public/img/app-store-badge.svg" id="ios-badge" width="160">'); 
        $('#above-the-fold h1').html('Locket for iPhone.');
        $('#above-the-fold h2').html('Automatic sign-in for Mac.');
    });
    
}

if(navigator.userAgent.match(/(iPhone|iPod)/i)) {
    $(function () {  
        $('#above-the-fold h2').append('<img src="public/img/app-store-badge.svg" id="ios-badge" width="160">');
        $('#above-the-fold h2 img').bind('click', function(e) {
                    window.location = appStoreURL
                });
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
        $('.download.available').addClass('active').removeClass('available');
        $('#thanks-for-downloading').delay(2000).fadeIn(300);
        $('#thanks-animation-wrapper').addClass('play');
        setTimeout( function() {
            $('#thanks-for-downloading h3').fadeOut(300);           // Fade the title out so we can change its HTML
            $('#thanks-animation-wrapper').addClass('show-iphone'); // Slide the Mac over so we can slide the iPhone in
            setTimeout( function() {
                $('#thanks-for-downloading h3').html('Make sure to grab Locket for iPhone, too. <img id="thanks-appstore-badge" src="public/img/app-store-badge.svg" width="125">').delay(200).fadeIn(300);
                $('#thanks-for-downloading').css('cursor','pointer').bind('click', function(e) {
                    window.location = appStoreURL
                });
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

/////////////////////////////////////////////////////////
//
// Move header up when page is scrolled
//
/////////////////////////////////////////////////////////

   

$(window).on('scroll', function(){
    var offset      = $(document).scrollTop()
    ,header         = $('header')
    ,threshold      = 40
    ,logo           = $('header h1.logo')
    ,startDarkBG    = $('#above-the-fold').outerHeight() + $('#what-is-locket').outerHeight() - 40 
    ,endDarkBG      = startDarkBG + $('section#security').outerHeight()
;
    if(navigator.userAgent.match(/(iPhone|iPod)/i)) {
        var threshold = 80 + $('#above-the-fold').height();
    }
    if( offset>=threshold && offset < startDarkBG || offset >= endDarkBG ){
        header.addClass('scrolled');
        logo.removeClass('light');
    }else if (!navigator.userAgent.match(/(iPhone|iPod|iPad)/i) && offset>=startDarkBG && offset < endDarkBG) {
        logo.addClass('light'); // Make the logo white when on top of the dark bg security section, but not on iOS
    }else if( offset<threshold ){
        header.removeClass('scrolled');
        logo.addClass('light');
    }

    
});
