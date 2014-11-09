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



$( document ).ready(function() {
    console.log( "ready!" );
    BikeStation.getBikeInformation();
    Map.setMarkerImage();
    Map.createMap();
});