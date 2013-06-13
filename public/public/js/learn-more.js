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

  window.onresize = function(event) {
      resizeDiv();
  }

  function resizeDiv() {
      vph = $(window).height(); 
      $('#above-the-fold.playing').css({'height': vph});
      $('#what-is-locket').css({'margin-top': vph});

  }



/////////////////////////////////////////////////////////
//
// Video cuepoints to sync page content changes
//
/////////////////////////////////////////////////////////

(function() {
    /* Cuepoint Coffee. A simple library for HTML5 Video Subtitles and Cuepoints */
    
    /**
     * @class Utils 
    */
    
    var Cuepoint, Utils, utils;
    Utils = (function() {
        function Utils() {}
        Utils.prototype.log = function(args) {
            this.args = args;
            if (window.console) {
                return console.log(Array.prototype.slice.call(this, arguments));
            }
        };
        return Utils;
    })();
    
    /**
     * @class Cuepoint
     */
    
    Cuepoint = (function() {
        function Cuepoint() {
            this.nativeKeys = Object.keys;
        }
        Cuepoint.prototype.init = function(slides) {
            var key, value, _results;
            this.slides = slides;
            this.subtitles = document.getElementById("headline");
            this.video = document.getElementById("video");
            _results = [];
            for (key in slides) {
                value = slides[key];
                this.addSlide(key, value);
                _results.push(this.events.call);
            }
            return _results;
        };
        Cuepoint.prototype.events = function() {};
        Cuepoint.prototype.currentTime = function() {
            return this.video.currentTime;
        };
        Cuepoint.prototype.update = function(html) {
            this.html = html;
            return this.subtitles.innerHTML = this.html;
        };
        Cuepoint.prototype.setTime = function(time) {
            this.time = time;
            this.video.currentTime = time;
            return this.video.play();
        };
        Cuepoint.prototype.addSlide = function(time, html) {
            var self;
            this.time = time;
            this.html = html;
            self = this;
            return this.video.addEventListener("timeupdate", function() {
                if (this.currentTime >= time && this.currentTime <= time + 0.3) {
                    return self.update(html);
                }
            },
            false);
        };
        Cuepoint.prototype.play = function() {
            return this.video.play();
        };
        Cuepoint.prototype.pause = function() {
            if (!this.video.paused) {
                return this.video.pause();
            }
        };
        return Cuepoint;
    })();
    utils = new Utils;
    window.cuepoint = new Cuepoint;
}).call(this);


/////////////////////////////////////////////////////////
//
// Change the page when the video finishes
//
/////////////////////////////////////////////////////////

$("#video").bind("ended", function() {
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

   

$(window).bind('scroll', function(){
    var offset      = $(document).scrollTop()
    ,opacity        = 0
    ;
     var fadeStart  = 0 // 100px scroll or less will equiv to 1 opacity
    ,fadeUntil      = jQuery(window).height() / 2
    ,fading         = $('#video-viewport')
;
    if( offset<=fadeStart ){
        opacity=1;
    }else if( offset<=fadeUntil ){
        opacity=1-offset/fadeUntil;
    }
    fading.css('opacity',opacity);
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