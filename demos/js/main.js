/* 
	Author: Renee Blunt
	Date: December 2, 2012
	Project: MDD - Aquilex
	Project co-auth: Geoffrey Ganga, Jarvis Jardin

	The below code is accessing the Google Maps APIv3 and the Google Places API
	Also using maxmind for ip location

*/


$(document).ready(function(){
	
	var userLat = '',
	userLong = '';
	
	var map;
	var infowindow;
	var pos;
	var map;
	var userMarker;
	var selectedLocation = {};
	
	
	
	
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
	
        pos = new google.maps.LatLng(geoIPLat, geoIPLong);
		var mapOptions = {
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 15,
			center:pos
		};
		console.log(mapOptions.center);
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions); //create a map and place it in its container with initial options
		userMarker = new google.maps.Marker({
            position: pos,
            map: map,
            title: 'You are here'
        });
        infowindow = new google.maps.InfoWindow();
      };
	
	function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
          var content = 'Error: The Geolocation service failed.';
        } else {
          var content = 'Error: Your browser doesn\'t support geolocation.';
        }
      };
	
	
	
	
	
	google.maps.event.addDomListener(window, 'load', initialize);
	
	

/*
	//////////////////////////////////////////////////////////////////////////////////////  user generated calls
*/	



	
	function getUniversities() {  
		
        var request = {
		    location: pos,
		    radius: 9000,
		    types: ['university']  
	      };
	      
	    var service = new google.maps.places.PlacesService(map);
	    service.nearbySearch(request, callback);

	}; //close getUniversities
	    
	function callback(results, status) {
		
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				createMarker(results[i]);
				createListItem(results[i]);
			}
		}
	}; //close callback

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
	}; //close createMarker
	
	function createListItem(place) {
		 
		console.log(place); 
		$('<li>'+place.name+'</li>').appendTo('#schools').click(function(e) {  
				console.log(place.name);
				selectedLocation = place;
			
		});
	};	

	
	
/*
	//////////////////////////////////////////////////////////////////////////////////////  AJAX
*/	
	
	function addLocation(data){ 
		console.log("addLocation ",data.geometry.location.$a);
		$.ajax({
			type:'POST',
			data:{
				latitude: data.geometry.location.$a,
				longitude: data.geometry.location.ab
			},
			url: 'xhr/addlocation.php',
			dataType: 'json',
			success:function(data) {  
				console.log(data);
			}
		});
	};

/*
	//////////////////////////////////////////////////////////////////////////////////////  Click Events
*/	

	$('#useGPS').click(function(e) { //enables the use of GPS and moved the user's marker to there location 
		 
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) { //on success
		
				userLat = position.coords.latitude;
				userLong = position.coords.longitude;
								
				pos = new google.maps.LatLng(userLat, userLong);
				userMarker.setPosition(pos);
				map.setCenter(pos);
		
			}, function() {
				//when geolocation didn't work
				handleNoGeolocation(true);
			});
		} else {
		// Browser doesn't support Geolocation
			handleNoGeolocation(false);
		}
		return false;
	});
	
	$('#showSchools').click(function(e) {  
		$('#schools').empty();
		getUniversities();
	});
	
	$('#addSchool').click(function(e) {  
		addLocation(selectedLocation);
	});
});
