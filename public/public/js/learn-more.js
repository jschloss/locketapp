/////////////////////////////////////////////////////////
//
// Fade in content when backgound video is loaded
// and set cookie for returning users
//
/////////////////////////////////////////////////////////

var video = document.getElementById("locket-background-video");
video.addEventListener("canplaythrough", function () {
      $("#loaded-content")
          .css({visibility:'visible'})
          .animate({opacity:1},1000); 
      setTimeout( function(){
        $("#loading-spinner").remove();
      }, 1100);
      if ($.cookie('returning') == "yes") {
        $('body').css('overflow-y','visible');
      }else {
        $.cookie('returning','yes', {expires: 30, path: '/'});
      }
}, false);



/////////////////////////////////////////////////////////
//
// Change the hero content for returning users
//
/////////////////////////////////////////////////////////

function returningUser() {
      $("#above-the-fold .hero").addClass('watch-again')
      $("#above-the-fold h1 strong").text('See it');
      $("#above-the-fold h1 em").text('again');
      $("#above-the-fold h2").text('Or scroll to learn more');
}

/////////////////////////////////////////////////////////
//
// Create video play trigger for iOS
//
/////////////////////////////////////////////////////////
    playButton        = $("#video-play-trigger, #above-the-fold h1, #above-the-fold h2")
    heroContent       = $("#above-the-fold div.hero")
    backgroundVideo   = $("#locket-background-video")
    playedVideo       = $("#locket-played-video")
    wrapper           = $("#video-viewport")


 if(!navigator.userAgent.match(/(iPod|iPhone)/i)) {

    playedVideo.get(0).pause();          // For iOS < 6.1, don't autoplay
    
    // Show the video
    function openVideo() {
          
          // iPad-specific behavior
              if(navigator.userAgent.match(/(iPad)/i)) {
                  wrapper.css({
                'visibility':'visible'
              , 'z-index'   :'3'
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
          }

          heroContent.addClass('hidden');
      
          playedVideo.fadeIn(350);
          playedVideo.get(0).play();
          playedVideo.on("ended", function() {
              closeVideo();
              if(!navigator.userAgent.match(/(iPad)/i)) {
                returningUser();
              }
          });
         
          backgroundVideo.get(0).pause();
          backgroundVideo.delay(350).fadeOut('fast');
    }

    // Hide the video
    function closeVideo() {
          heroContent.removeClass('hidden');
          $('header').removeClass('faded');
          
          $('body').css({
            'overflow-y':'visible'
          , 'overflow-x':'hidden'
          });

          backgroundVideo.show();
          backgroundVideo.get(0).play();

          playedVideo.get(0).pause();
          playedVideo.fadeOut();

          if(navigator.userAgent.match(/(iPad)/i)) {
            $("#logo-back-button").fadeOut();
            $("h1.logo a").fadeIn();
            wrapper.css({
            'visibility':'hidden'
          , 'z-index'   :'1'
          });
          }
    }

    $('#above-the-fold .hero').on("click", playButton, function() {
          openVideo();
    });

    $(window).on('scroll', function(){
          if($(document).scrollTop() >= playedVideo.height() ) {
              closeVideo();
          }
    });

    

} else {

    // iPhone-specific behavior

    $('#above-the-fold .hero').on("click", playButton, function() {
      playedVideo.show().get(0).play()   // Play the video
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

  if(!navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
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

   
if(!navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
  $(window).bind('scroll', function(){
      var offset      = $(document).scrollTop()
      ,opacity        = 0
      ;
       var fadeStart  = 0 // 100px scroll or less will equiv to 1 opacity
      ,fadeUntil      = jQuery(window).height() / 1.75
      ,fading         = $('#video-viewport, #above-the-fold')
  ;
      if( offset<=fadeStart ){
          opacity=1;
      }else if( offset<=fadeUntil ){
          opacity=1-offset/fadeUntil;
      }
      fading.css('opacity',opacity);
      if ( opacity == 0 ) {
        fading.css('display','none')
      } else {
        fading.css('display','block')
      }
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
    ,threshold      = $('#above-the-fold').outerHeight()/2
    ,logo           = $('header h1.logo')
    ,startDarkBG1    = $('#above-the-fold').outerHeight() + $('#what-is-locket').outerHeight() - 40 
    ,endDarkBG1      = startDarkBG1 + $('#in-your-pants').outerHeight()
    ,startDarkBG2    = endDarkBG1 + $('#bluetooth-le').outerHeight()
    ,endDarkBG2      = startDarkBG2 + $('#wifi-not-required').outerHeight()
;
    if(navigator.userAgent.match(/(iPhone|iPod)/i)) {
        var threshold = 80 + $('#above-the-fold').height();
    }
    if( offset>=threshold && offset < startDarkBG1 || offset >= endDarkBG1 && offset <= startDarkBG2 || offset >= endDarkBG2 ){
        header.addClass('scrolled').removeClass('faded');
        logo.removeClass('light');
    }else if (!navigator.userAgent.match(/(iPhone|iPod|iPad)/i) && offset>=startDarkBG1 && offset < endDarkBG1 || !navigator.userAgent.match(/(iPhone|iPod|iPad)/i) && offset>=startDarkBG2 && offset < endDarkBG2) {
        logo.addClass('light'); // Make the logo white when on top of the dark bg security section, but not on iOS
    }else if( offset<40 ){
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
     
});

Parse.initialize("aGV3jgoaAKQHf7mtBA4dSzMgQVPLBLItyN3dm7up", "QvCI9dOzz9zszyWSm1nzlqGdARN7tWhxejabFn0C");

// Simple syntax to create a new subclass of Parse.Object.
var LocketVote = Parse.Object.extend("Vote");

// Create a new instance of that class.
var locketVote = new LocketVote();

// Update the candidates counts on page load
$(document).ready(function() {

    var candidates = $('ul#vote li').map(function(x,y) {return $(y).attr('id')});
     
    //create a Parse query object
    var query = new Parse.Query(LocketVote);
     
    //The query.get() method requires the objectId as its first argument. It returns the object with that id.
    query.startsWith("candidate","vote");
    query.find({
      // Find the right database item for each respective candidate
      success: function(results) {
           var sum = 0;
           for (var i = 0; i < results.length; i++) { 
              var locketVote = results[i];
              var voteCount = locketVote.get("votes");
              sum += voteCount;
              
              var candidate = locketVote.get("candidate");
              var candidateli = $('#'+candidate);
              if (candidateli) {
                var count = candidateli.children('span.count');
                count.html(voteCount);        
              }
            }
           
            // Show the number of total votes
            $('#votes-so-far strong').text(sum);
           
            //Adjust the progress bar
            var voteCompletion = Math.round((sum/500*100) / 10) * 10;
            $('#progress-bar span').css('width',voteCompletion+'%');

            // Show the number of days left to vote
            var end = new Date('2013 august 12');
            var now = new Date();
            var daysLeft = Math.round((end - now) / 86400000);

            if ( daysLeft < 0 ) {
              var daysLeft = 0;
            }

            $('#days-left strong').text(daysLeft);

      },

      error: function(error) {
        // error is an instance of Parse.Error.
        
      }
    });

        
});



        

// Update a candidate's count when it is clicked

$('ul#vote li').on('click', function (e) {
 
    //keep a reference to this
    var candidate = $(this).attr('id');
    var count = $(this).children('span.count');

    //create a Parse query object
    var query = new Parse.Query(LocketVote);
 
    //The query.get() method requires the objectId as its first argument. It returns the object with that id.
    query.equalTo("candidate", candidate);
    query.find({
      success: function(results) {
           for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              query.get(object.id, {
              success: function(locketVote) {
                locketVote.increment("votes");
                locketVote.save();
                var voteCount = locketVote.get("votes");
                count.html(voteCount);
                var sum = $('#just-the-beginning h4 strong');
                sum.text(Number(sum.text()) + 1);
              }
});
            }
      }
    });
});




      



// }
