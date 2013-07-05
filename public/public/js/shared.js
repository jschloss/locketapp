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
        downloadButton.on('click', function(e) {
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
        downloadButton.on('click', function(e) {
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
        $('#above-the-fold h2').html('Automatic sign-in for Mac.').after('<a id="video-play-trigger" class="icon">&#xe007;</a>');
        $('#what-is-locket h1').html('A faster, safer way to sign in.');
    });
    
}

if(navigator.userAgent.match(/(iPhone|iPod)/i)) {
    $(function () {  
        $('#above-the-fold h2').append('<img src="public/img/app-store-badge.svg" id="ios-badge" width="160">');
        $('#above-the-fold h2 img').on('click', function(e) {
                    window.location = appStoreURL
                });
    });
}


/////////////////////////////////////////////////////////
//
// Show the thank you content when download button is clicked
//
/////////////////////////////////////////////////////////

$(function()  { 
    $('.download.available').on('click', function(e) {
        $('.download.available').addClass('active').removeClass('available');
        $('#thanks-for-downloading').delay(2000).fadeIn(300);
        $('#thanks-animation-wrapper').addClass('play');
        setTimeout( function() {
            $('#thanks-for-downloading h3').fadeOut(300);           // Fade the title out so we can change its HTML
            $('#thanks-animation-wrapper').addClass('show-iphone'); // Slide the Mac over so we can slide the iPhone in
            setTimeout( function() {
                $('#thanks-for-downloading h3').html('Make sure to grab Locket for iPhone, too. <img id="thanks-appstore-badge" src="public/img/app-store-badge.svg" width="125">').delay(200).fadeIn(300);
                $('#thanks-for-downloading').css('cursor','pointer').on('click', function(e) {
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

    if (container.has(e.target).length === 0 && !$(e.target).hasClass('share'))
    {
        container.fadeOut(300);
        container.parent().removeClass('active');
    }
});


/////////////////////////////////////////////////////////
//
// Show share popover when a share button is clicked
//
/////////////////////////////////////////////////////////

$(function()  { 
    $('.share').on('click', function(e) {
        $(this).toggleClass('active').find('.popover').fadeToggle(300); 
    }); 
});

