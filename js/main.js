/*	Main JS	*/

var lePetiteController = {

	"init" : function() {
		lePetiteController.setSrollAnimation();
		lePetiteController.restartAnimation();
        lePetiteController.mapControl();

	},
    "setSrollAnimation" : function(){
		$("a").click(function(e) {
			e.preventDefault();
			var whereToGo = $(this).attr('href');
		   	$('html, body').animate({
		        scrollTop: $(whereToGo).offset().top
		    }, 800);
		});

		$('#about').bind('inview', function (event, visible) {
            if (visible == true) {
                // element is now visible in the viewport
                console.log('alalalalala');
                $('#about').addClass('lalala');
            } else {
                $('#about').removeClass('lalala');
            }
        });
	},
	"restartAnimation" : function() {
        $(".lafotito img").click(function() {	
	     	      
	        var el     = $(this),  
	            newone = el.clone(true);
	           
	        el.before(newone);
        
        	  $("." + el.attr("class") + ":last").remove();
			});
		
        },
        "mapControl" : function() {
            
            var map;

            function initialize() {
                
                var mapOptions = {
                    zoom: 6,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
  
                map = new google.maps.Map(document.getElementById('store-location'),
                mapOptions);

            // Try HTML5 geolocation
  
            if(navigator.geolocation) {
                
                navigator.geolocation.getCurrentPosition(function(position) {
                var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

                var infowindow = new google.maps.InfoWindow({
                    map: map,
                    position: pos,
                    content: 'Location found using HTML5.'
                });

                map.setCenter(pos);
                }, function() {
                
                handleNoGeolocation(true);
            });
            } else {
                
                // Browser doesn't support Geolocation
                handleNoGeolocation(false);
            }
            }

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);


        }
}

lePetiteController.init();


/* IN VIEW */
/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
(function ($) {
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks
        }

        return height;
    }

    $(window).scroll(function () {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];
        
        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });

        if (elems.length) {
            $(elems).each(function () {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data('inview') || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data('inview', false);
                        $el.trigger('inview', [ false ]);                        
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data('inview', true);
                        $el.trigger('inview', [ true ]);
                    }
                }
            });
        }
    });
    
    // kick the event to pick up any elements already in view.
    // note however, this only works if the plugin is included after the elements are bound to 'inview'
    $(function () {
        $(window).scroll();
        element = document.getElementById("anima");
    });
})(jQuery);