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
	
	//initialize() is the first function fired, it is called on a domlistener for window load
	//it loads the map first based off of the users IP
	function initialize() { 
	
        pos = new google.maps.LatLng(geoIPLat, geoIPLong); //create map position
		var mapOptions = {
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 15,
			center:pos
		};
		
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions); //create a map and place it in its container with initial options
		userMarker = new google.maps.Marker({ //create current location marker on the map
            position: pos,
            map: map,
            title: 'You are here',
            draggable: true
        });
        infowindow = new google.maps.InfoWindow();  //create infowindow, this is called later to display the location details when clicked
        
        google.maps.event.addListener(userMarker, 'dragend', function() { 
        	
		});
      }; //close initialize
	
	function handleNoGeolocation(errorFlag) { //this is fired when geolocation is accessed by user and there is a fail, it accepts a boolean
        if (errorFlag) {
          var content = 'Error: The Geolocation service failed.';
        } else {
          var content = 'Error: Your browser doesn\'t support geolocation.';
        }
      }; // close handleNoGeolocation
	
	
	
	
	
	google.maps.event.addDomListener(window, 'load', initialize);
	
	

/*
	//////////////////////////////////////////////////////////////////////////////////////  user generated calls
*/	



	
	function getUniversities() {  //gets universities in users location
		
        var request = {
		    location: pos,
		    radius: 9000, //this is in meters, its about 5 miles
		    types: ['university']  
	      };
	      
	    var service = new google.maps.places.PlacesService(map);  //create a google places service
	    service.nearbySearch(request, callback);  //first parm is the request object, then runs the function with the results

	}; //close getUniversities
	    
	function callback(results, status) {  //first param is the results json object from the getUniversities query, the second param is the status
		
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				createMarker(results[i]); //create the markers on the map
				createListItem(results[i]); //create the viewable list on the page
			}
		}
	}; //close callback

	function createMarker(place) { //creates markers on the map
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
		  	map: map,
		  	position: place.geometry.location
		});
		
		google.maps.event.addListener(marker, 'click', function() { //add click function to open a dialog to display the marker's details
			
		  	infowindow.setContent(place.name);
		  	infowindow.open(map, this);
		  	map.setZoom(17);
		});
	}; //close createMarker
	
	function createListItem(place) { //creates the list items for view by the user and also adds a click function so the user can choose it as their location
		 
		console.log(place); 
		$('<li>'+place.name+'</li>').appendTo('#schools').click(function(e) {  
				console.log(place.name);
				selectedLocation = place;
			
		});
	};	

	
	
/*
	//////////////////////////////////////////////////////////////////////////////////////  AJAX
*/	
	
	function addLocation(data){ // add location to DB, takes the place object
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
	
	function addUserLocation(data){ // add location to DB, takes the place object
		//console.log("addLocation ",data.geometry.location.$a);
		console.log(data);
		$.ajax({
			type:'POST',
			data:{
				latitude: data.$a,
				longitude: data.ab
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
		 
		if(navigator.geolocation) { //if geolocation is possible for user
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
	
	$('#showSchools').click(function(e) {  //display list of schools
		$('#schools').empty();
		getUniversities();
	});
	
	$('#addSchool').click(function(e) {  //button to add location to DB
		addLocation(selectedLocation); //add to DB function
	});
	$('#addLocation').click(function(e) {  //button to add location to DB
		addUserLocation(userMarker.position); //add to DB function
	});
});
