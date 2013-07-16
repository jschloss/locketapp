var appStoreURL     =   'http://itunes.apple.com/us/app/paper-by-fiftythree/id506003812'
,   downloadButton  =   $('nav a.download')    

/////////////////////////////////////////////////////////
//
// Basic email validation
//
/////////////////////////////////////////////////////////

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

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
        $('#collect-email-submit').on('click', function (e) {
         var CollectEmail = Parse.Object.extend("WindowsEmails");
         var collectEmail = new CollectEmail();
         var userEmail = $('input#mce-EMAIL').val();
         var form = $('#mc-embedded-subscribe-form');

              if (validateEmail(userEmail)) {
                collectEmail.set("email", userEmail);
                collectEmail.save();
                form.children('fieldset').fadeOut('slow');
                form.find('label').html('Awesome, thanks!<br>You\'ll be the first to know.')
              } else {
                form.children('fieldset').addClass('shake');
                form.find('label').html("Aw, shucks.<br>Please enter a valid email address.")
                setTimeout( function(){
                    form.children('fieldset').removeClass('shake');
                    form.find('input[type=email]').focus();
                }, 1000)
              }
              return false;
         
         });   
    });
    
   
}

/////////////////////////////////////////////////////////
//
// Change the page for Android
//
/////////////////////////////////////////////////////////

if (navigator.appVersion.indexOf("Android")!=-1) {
        $(function()  { 
        downloadButton.removeClass("available").addClass('outline'); 
        downloadButton.on('click', function(e) {
            $(this).toggleClass('active');
            e.preventDefault();
            $('nav form').fadeToggle(300);
            $('nav form label').html("Locket for Android isn\'t ready yet.<br>Be the first to know when it's here.");
            $('#mce-EMAIL').focus(); 
        });                       
        $('nav').addClass("os-not-supported android");   
        $('#collect-email-submit').on('click', function (e) {
         var CollectEmail = Parse.Object.extend("AndroidEmails");
         var collectEmail = new CollectEmail();
         var userEmail = $('input#mce-EMAIL').val();
         var form = $('#mc-embedded-subscribe-form');

              if (validateEmail(userEmail)) {
                collectEmail.set("email", userEmail);
                collectEmail.save();
                form.children('fieldset').fadeOut('slow');
                form.find('label').html("Awesome, thanks!<br>You\'ll be the first to know.")
              } else {
                form.children('fieldset').addClass('shake');
                form.find('label').html("Aw, shucks.<br>Please enter a valid email address.")
                setTimeout( function(){
                    form.children('fieldset').removeClass('shake');
                    form.find('input[type=email]').focus();
                }, 1000)
              }
              return false;
         });
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

