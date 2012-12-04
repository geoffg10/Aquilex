/* 
	Author: Renee Blunt
	Date: December 2, 2012
	Project: MDD - Aquilex
	Project co-auth: Geoffrey Ganga, Jarvis Jardin

	The below code is accessing the Google Maps APIv3 and the Google Places API
	Also using maxmind for ip location

*/


$(document).ready(function(){
	
	var = 	userLat = '',
	userLong = ''
	mapHTMLContainer = $('#map_canvas');
	
	var map;
	var infowindow;
	var pos;
	var map;
	var mapOptions = {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 15
	};
	
	
	
/*	The below variables are just for an initial map location 
	we're doing this so that the user isn;t prompted to share IP on inital page load
	until they've decided they want to use the application
	*lat and long based off of user's ip using the maxmind geoip js 
	*methods are listed here http://dev.maxmind.com/geoip/javascript
*/
	var geoIPLat = geoip_latitude(),
		geoIPLong = geoip_longitude()
		;
	
	function initialize() {
        map = new google.maps.Map(mapHTMLContainer, mapOptions);

        // Try HTML5 geolocation
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);

            infowindow = new google.maps.InfoWindow();
	        var request = {
			    location: pos,
			    radius: 1500,
			    types: ['university']  
		      };
		    
		    var service = new google.maps.places.PlacesService(map);
		    service.nearbySearch(request, callback);

            map.setCenter(pos);
          }, function() {
            handleNoGeolocation(true);
          });
        } else {
          // Browser doesn't support Geolocation
          handleNoGeolocation(false);
        }
      } //close try geolocation
      
      

      function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
          var content = 'Error: The Geolocation service failed.';
        } else {
          var content = 'Error: Your browser doesn\'t support geolocation.';
        }
      }
        
	    function callback(results, status) {
	        if (status == google.maps.places.PlacesServiceStatus.OK) {
	        	console.log(results);
	          for (var i = 0; i < results.length; i++) {
	          
	            createMarker(results[i]);
	          }
	        }
	    }
      

      function createMarker(place) {
	        var placeLoc = place.geometry.location;
	        var marker = new google.maps.Marker({
	          map: map,
	          position: place.geometry.location
	        });
	
	        google.maps.event.addListener(marker, 'click', function() {
	          infowindow.setContent(place.name);
	          infowindow.open(map, this);
	        });
	      }
        var options = {
          map: map,
          position: pos,
          zoom: 14
        };

        var infowindow = new google.maps.InfoWindow(options);
        //map.setCenter(options.position);
      

      google.maps.event.addDomListener(window, 'load', initialize);
	
	
	function addLocation(data){ 
	
		$.ajax({
			type:'POST',
			data:{
				latitude: data.latitude,
				longitude: data.longitude
			},
			url: 'xhr/addlocation.php',
			dataType: 'json',
			success:function(data) {  
				console.log(data);
			}
		});
	};
	
	
	$('button').click(function(e) {  
		navigator.geolocation.getCurrentPosition(success, error);

		function success(data) {  
			
			console.log("success ",data);
			userLat = data.coords.latitude;
			userLong = data.coords.longitude;
			addLocation(data.coords);
		};
		
		function error(data) {  
			
			console.log("error ",data);
		};
		
		return false;
	});
});