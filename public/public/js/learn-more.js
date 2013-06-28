/////////////////////////////////////////////////////////
//
// Create video play trigger for iOS
//
/////////////////////////////////////////////////////////

 if(navigator.userAgent.match(/(iPad)/i)) {
    
    playButton = $("#video-play-trigger, #above-the-fold h1")
    video = $("#locket-video")
    wrapper = $("#video-viewport")

    video.get(0).pause();          // For iOS < 6.1, don't autoplay
    
    // Show the video
    function openVideo() {
          wrapper.css({               
            'visibility' :'visible',
            'z-index'    :'3'
          });

          $("h1.logo a").fadeOut();
          $("h1.logo")
            .append('<span id="logo-back-button">&#xe008;</span>')
            .on("click", function() {
                location.reload();  
            })
          ;

          setTimeout(function() {
            $("#logo-back-button").fadeIn();
          }, 500);

          playButton.fadeOut('fast');
          
          video.get(0).play().on("ended", function() {
              closeVideo();
          });
    }

    // Hide the video
    function closeVideo() {
          video.get(0).pause();

          wrapper.css({
            'visibility' :'hidden',
            'z-index'    :'1'
          });

          $("#logo-back-button").fadeOut();
          $("h1.logo a").fadeIn();
          
          playButton.fadeIn('fast');
    }

    playButton.on("click", function() {
          openVideo();
    });

    $(window).bind('scroll', function(){
          if($(document).scrollTop() >= 350) {
              closeVideo();
          }
    });
}

if(navigator.userAgent.match(/(iPhone|iPod)/i)) {
    
    playButton = $("#video-play-trigger")
    video = $("#locket-video")

    playButton.on("click", function() {
      video.get(0).play()   // Play the video
    });

}
/////////////////////////////////////////////////////////
//
// Background-size: cover behavior for background video
//
/////////////////////////////////////////////////////////

var min_w = 300; // minimum video width allowed
var vid_w_orig;  // original video dimensions
var vid_h_orig;

jQuery(function() { // runs after DOM has loaded

    vid_w_orig = parseInt(jQuery('video').attr('width'));
    vid_h_orig = parseInt(jQuery('video').attr('height'));
    $('#debug').append("<p>DOM loaded</p>");

    jQuery(window).resize(function () { resizeToCover(); });
    jQuery(window).trigger('resize');
});

function resizeToCover() {

    // set the video viewport to the window size
    jQuery('#video-viewport.playing').width(jQuery(window).width());
    jQuery('#video-viewport.playing').height(jQuery(window).height());

    // use largest scale factor of horizontal/vertical
    var scale_h = jQuery(window).width() / vid_w_orig;
    var scale_v = jQuery(window).height() / vid_h_orig;
    var scale = scale_h > scale_v ? scale_h : scale_v;

    // don't allow scaled width < minimum video width
    if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

    // now scale the video
    jQuery('video').width(scale * vid_w_orig);
    jQuery('video').height(scale * vid_h_orig);
    // and center it by scrolling the video viewport
    jQuery('#video-viewport.playing').scrollLeft((jQuery('video').width() - jQuery(window).width()) / 2);
    jQuery('#video-viewport.playing').scrollTop((jQuery('video').height() - jQuery(window).height()) / 2);

    
};


/////////////////////////////////////////////////////////
//
// Scale the learn more hero to viewport height
//
/////////////////////////////////////////////////////////

 $(document).ready(function(){
      resizeDiv();
  });

  if(navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    // This code is shitty, but it works. Fixes mobile safari resize bug. 
  }
  
  else {
    window.onresize = function(event) {
        resizeDiv();
    }
  }

  function resizeDiv() {
      vph = window.innerHeight ? window.innerHeight : $(window).height();
      $('#above-the-fold.playing').css({'height': vph});
      $('#what-is-locket').css({'margin-top': vph});

  }


/////////////////////////////////////////////////////////
//
// Change the page when the video finishes
//
/////////////////////////////////////////////////////////

$("#locket-video").bind("ended", function() {
   vph = $(window).height(); 
   $('#above-the-fold.playing, #video-viewport.playing').removeClass('playing')
   $('body').css({'overflow-y':'visible', 'overflow-x':'hidden'});
});


/////////////////////////////////////////////////////////
//
// Start section animations when section is on screen - uses jQuery OnSCreen
//
/////////////////////////////////////////////////////////

$(function() {
  setInterval(function() {
    $("section:onScreen")                             
      .addClass("play")      
  }, 1000)                           // repeat every second
})


/////////////////////////////////////////////////////////
//
// Fade out the video with scroll
//
/////////////////////////////////////////////////////////

   
if(navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    // This code is shitty, but it works. Fixes mobile safari resize bug. 
  }
  
else {
  $(window).bind('scroll', function(){
      var offset      = $(document).scrollTop()
      ,opacity        = 0
      ;
       var fadeStart  = 0 // 100px scroll or less will equiv to 1 opacity
      ,fadeUntil      = jQuery(window).height() / 1.25
      ,fading         = $('#video-viewport')
  ;
      if( offset<=fadeStart ){
          opacity=1;
      }else if( offset<=fadeUntil ){
          opacity=1-offset/fadeUntil;
      }
      fading.css('opacity',opacity);
  });
}


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
    ,startDarkBG    = $('#above-the-fold').outerHeight() + $('#what-is-locket').outerHeight() - threshold 
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


/////////////////////////////////////////////////////////
//
// Tweet to vote what Locket should unlock next
//
/////////////////////////////////////////////////////////


var API_URL = "http://cdn.api.twitter.com/1/urls/count.json",
    TWEET_URL = "https://twitter.com/intent/tweet";
     
$(".tweet").each(function() {
    var elem = $(this),
    // Use current page URL as default link
    url = encodeURIComponent(elem.attr("data-url") || document.location.href),
    // Use page title as default tweet message
    text = elem.attr("data-text") || document.title,
    via = elem.attr("data-via") || "",
    related = encodeURIComponent(elem.attr("data-related")) || "",
    hashtags = encodeURIComponent(elem.attr("data-hashtags")) || "";
     
    // Set href to tweet page
    elem.attr({
        href: TWEET_URL + "?hashtags=" + hashtags + "&original_referer=" +
                encodeURIComponent(document.location.href) + "&related=" + related +
                "&source=tweetbutton&text=" + text + "&url=" + url,
        target: "_blank"
    });
     
    // Get count and set it as the inner HTML of .count
    $.getJSON(API_URL + "?callback=?&url=" + url, function(data) {
        elem.find(".count").html(data.count);
    });
});


// }
