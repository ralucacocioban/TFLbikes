(function($){



var BikeStation = (function(){
 
    var coordinates = [];


  return {
    getBikeInformation: function(){
    $.ajax({
    url: "http://localhost/ha.php",
    dataType: 'json',
    headers: { 'Access-Control-Allow-Origin': '*' },
    type: "GET",
    crossDomain: true,
    success: function(results){
        BikeStation.filterCoordinates(results);
    }
}); 

    },

    filterCoordinates: function( jsonResult ){

       $.each(jsonResult.dockStation, function(index,smtg){
        console.log(smtg)
            coordinates.push([this.latitude, this.longitude, this.name]);
        
        });

       $.each(coordinates, function(index, val){
           var marker = Map.createMarker(val[0], val[1]);
           var info = Map.createInfoWindow(val[2]);

            marker.setTitle(val[2]);

            google.maps.event.addListener(marker, 'click', function() {
            
            if(Map.isInfoWindowOpen(info))
            {
                info.close();
            }
            else{
                info.open(marker.get('map'), marker);
 
            }


            });
       });
    }
  };
}());

var Map = (function(){
 
 var map;

var image;

  return {

    setMarkerImage: function(){

       image  = new google.maps.MarkerImage("images/bike.png", null, null, null, new google.maps.Size(30,30));

    },
    createMap: function(){

console.log('in crete map');
    map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(51.507399, -0.127755),
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    zoom: 14
  }); 
},

    createMarker: function(lat, longit){

    var marker=new google.maps.Marker({
    position: new google.maps.LatLng(lat, longit),
    map: map,
    icon: image
        });

    return marker;

    },

    createInfoWindow: function(bikeInformation){
        var infowindow = new google.maps.InfoWindow({
        content: 'Station: ' + bikeInformation
  });

        return infowindow;
    },
      isInfoWindowOpen: function(infoWindow){
    var map = infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");
}

  };
}());


    
    // Preloader     
    $(window).load(function() { 
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow'); 
        $('body').delay(350).css({'overflow':'visible'});
    }); 




    $(document).ready(function() {
        

    BikeStation.getBikeInformation();
    Map.setMarkerImage();
    Map.createMap();


        // Image background
        $.vegas({
            src:'../images/test.jpg'
        });

        $.vegas('overlay', {
            src:'assets/images/06.png'
        });

        var countdown =  $('.countdown-time');

        $(window).on('resize', windowSize);

        function windowSize(){
            countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
                countdown.removeClass('animated bounceIn');
            });
        }

        // Open modal window on click
        $('#info').on('click', function(e) {
            var mainInner = $('.overlay'),
                modal = $('#' + $(this).attr('data-modal'));
                    
            mainInner.animate({opacity: 0}, 400, function(){
                $('html,body').scrollTop(0);
                modal.addClass('active').fadeIn(400);
                
            });
            e.preventDefault();

            $('.modal-close').on('click', function(e) {
                modal.removeClass('active').fadeOut(400, function(){
                    mainInner.animate({opacity: 1}, 400);
                    
                    countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
                        countdown.removeClass('animated bounceIn');
                    });
                });
                e.preventDefault();
            });
        });

        // Tooltips
        $('.more-links a, .social a').tooltip();
    
        $('.more-links a, .social a').on('click', function () {
            $(this).tooltip('hide')
        });


        $("#search ,#vanroute").click(function() {
            $('html, body').animate({
        scrollTop: $("#firstContainer").offset().top
    }, 1500);
});

         $("#search").click(function(){

            console.log('heyy')
            
    });

     });

})(jQuery);