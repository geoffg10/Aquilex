/* 
	Author: Renee Blunt
	Date: December 2, 2012
	Project: MDD - Aquilex
	Project co-auth: Geoffrey Ganga, Jarvis Jardin

	The below code is accessing the Google Maps APIv3 and the Google Places API
	Also using maxmind for ip location

*/


$(document).ready(function(){
	console.log('asdlkfjas');
	var userLat = '',
	userLong = '';
	
	var map;
	var infowindow;
	var pos; //this is the users location that is displayed on google maps
	var map;
	var userMarker;  //this is the visual location/marker of the user
	var selectedLocation = {};
	var campusId = {};
	
	
	
	
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
	/*===================================================================================================== ##1.1 runs initialize on load
	*/
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
			/*===================================================================================================== ##2 getUniversities runs after initialize on load
	*/
			getUniversities();

      }; //close initialize
	
	function handleNoGeolocation(errorFlag) { //this is fired when geolocation is accessed by user and there is a fail, it accepts a boolean
        if (errorFlag) {
          var content = 'Error: The Geolocation service failed.';
        } else {
          var content = 'Error: Your browser doesn\'t support geolocation.';
        }
      }; // close handleNoGeolocation
	
	
	
	
	//initialize();
	/*===================================================================================================== ##1 runs initialize on load
	*/
	google.maps.event.addDomListener(window, 'load', initialize);
	
	

/*
	//////////////////////////////////////////////////////////////////////////////////////  user generated calls
*/	



	/*===================================================================================================== ##2.1 getUniversities runs after initialize on load
	*/
	function getUniversities() {  //gets universities in users location
		
        var request = {
		    location: pos,
		    radius: 9000, //this is in meters, its about 5 miles
		    types: ['university']  
	      };
	      
	    var service = new google.maps.places.PlacesService(map);  //create a google places service
	    /*===================================================================================================== ##2.2 callback runs after getUniversities on load
	*/
	    service.nearbySearch(request, callback);  //first parm is the request object, then runs the function with the results

	}; //close getUniversities
	 
	   /*===================================================================================================== ##2.2.1 callback runs after getUniversities on load
	*/   
	function callback(results, status) {  //first param is the results json object from the getUniversities query, the second param is the status
		
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				var google_ref_id = results[i].id;
				
				createMarker(results[i]); //create the markers on the map
				createListItem(results[i]); //create the viewable list on the page
				getLocations(results[i], google_ref_id);
			
			}//end of for loop
		}
	}; //close callback

	function createMarker(place) { //creates markers on the map
		var placeLoc = place.geometry.location;
		console.log(placeLoc);
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
		 
		//console.log(place); 
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
				longitude: data.geometry.location.ab,
				name:data.name,
				google_ref_id: data.reference,
				added_by_id: JSON.parse(localStorage.userObj.id)
			},
			url: 'xhr/addlocation.php',
			dataType: 'json',
			success:function(data) {  
				//console.log(data);
			}
		});
	};
	
	
	
	
	function addUserLocation(data){ // add location to DB, takes the place object
		//console.log("addLocation ",data.geometry.location.$a);
		//console.log(data);
		$.ajax({
			type:'POST',
			data:{
				latitude: data.$a,
				longitude: data.ab
			},
			url: 'xhr/addlocation.php',
			dataType: 'json',
			success:function(data) {  
				//console.log(data);
			}
		});
	};
	
	function getLocations(data, google_ref_id){ // performing ajax to check db with results then display results
		//console.log('in getlocations ',data);
		$.ajax({
			type:'POST',
			data:{
				google_ref_id: google_ref_id
			},
			url: 'xhr/getlocations.php',
			dataType: 'json',
			success:function(successLocData) {
				//console.log(successLocData.result);
				
				if(successLocData.result == 'no record')
				{
					//console.log("make the list");
					makeList(data);
				}else{
					//console.log("make added list");
					makeAddedSchoolList(data, successLocData.result);
				}
			},
			error:function(error) {  
				console.log("error ",error);
			}
		});//end of ajax
		
		
	};// end of function



	function addmyCampus(data){ // add location to DB, takes the place object
		//console.log("addLocation ",data.geometry.location.$a);
		$.ajax({
			type:'POST',
			data:{
				latitude: data.geometry.location.$a,
				longitude: data.geometry.location.ab,
				name:data.name,
				google_ref_id: data.id,
				added_by_id: 1
			},
			url: 'xhr/addcampus.php',
			dataType: 'json',
			success:function(successData) {  
				console.log(successData, "was added to database");
				//console.log(data.reference);
				if(successData.message=="location added")
				{
					
				}
				getLocations(data, data.id);
			}
		});
	};
	
	// hard coded data, need help renee!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	function addNewBuilding(name, latitude, longitude, campus_identify,addedBy){ // add building to DB
		console.log("this function is running");
		$.ajax({
			type:'POST',
			data:{
				campus_id: 32,
				latitude: 123123123,
				longitude: 143241341234,
				name: name,
				added_by_id: 1
				
			},
			url: 'xhr/addbuilding.php',
			dataType: 'json',
			success:function(successData) {  
				console.log(successData, "was added to database");
				//console.log(data.reference);
				if(successData.error)
				{
					console.log("something didnt work bro")
				}else{
					console.log("dude it worked, dont stress")
				}
			},
			error:function(errorData){
				console.log(errorData);
			}
		});
	};
	
	
	function getBuildings(data){ // performing ajax to get buildings from the selected College 

		$.ajax({
			type:'POST',
			data:{
				campus_id: data
			},
			url: 'xhr/getbuildings.php',
			dataType: 'json',
			success:function(successLocData) {
				
				for (var i = 0; i < successLocData.result.length; i++) {
					
					var building = successLocData.result[i]
					var lalo = new google.maps.LatLng(building.latitude,building.longitude)
					//this creates markers of building of the campus selected. Data comes from DB
					var marker = new google.maps.Marker({
					  	map: map,
					  	position: lalo
					 });
					  	
					google.maps.event.addListener(marker, 'click', function() { //add click function to open a dialog to display the marker's details
			
				  	infowindow.setContent(building.name);
				  	infowindow.open(map, this);
				  	map.setZoom(20);
				  	map.setCenter(lalo);
				  	
		});


					
				}
			},
			error:function(error) {  
				console.log("error ",error);
			}
		});//end of ajax
		
		
	};// end of function
	
	

	
	
	
	
	
	
	
	

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
	
	function makeList(place){ //adding new school list which shows up on the bottom 
		$('<li><p class="btn btn-success" id="addSchooltoList">add</p>'+place.name+'</li>').appendTo('#testList').click(function(e) {
			addmyCampus(place);
			$(this).remove();
		});
	};	
	
	function makeAddedSchoolList(place, data){ //adding new school list which shows up on the top
		$('<li>'+place.name+'</li>').fadeIn().appendTo('#ourAddedList');
		$('<p>'+place.name+'</p>').appendTo('#yourchosenSchool');
		
		$("#schoolAddedModal").animate({opacity:"show"}, "fast", function(args){
			if($("#chosenSchool").hasClass("hide")){
				$("#chosenSchool").removeClass("hide");
				$("#schoolTestModal").delay(1000).fadeOut();
			}else{
				$("#chosenSchool").addClass("hide");
			}
		});
		
	
		
		$('<li><a href="#">'+data[0].name+'</a></li>')//populates the fav dropdown and add click to zoom
			.appendTo('#favorites')
			.click(function(e) { 
				map.setZoom(17);
				pos = new google.maps.LatLng(place.geometry.location.$a, place.geometry.location.ab);
				map.setCenter(pos);
				console.log(data[0].id);
				

				getBuildings(data[0].id);
		});
		
	};	
	
	//if schooltest Modal has a school in it
		// DO NOT SHOW UP
	// if it doesnt have a school in it
		//SHOW UP
		
	
		
		
		
	
// CLOSING SCHOOL MODAL -->
	
	$('#closeSchoolModal').live('click', function(){
		$('#schoolTestModal').addClass("hide");
		
	})// end of change password option

	
// ADDING A NEW BUILDING-->	
	
	$('#navAddBuilding').live('click', function(){
		userMarker = new google.maps.Marker({ //create current location marker on the map
		
            position: pos,
            map: map,
            title: 'drag me',
            draggable: true,
        });
        console.log(pos)
         infowindow = new google.maps.InfoWindow();  //create infowindow, this is called later to display the location details when clicked
        
        
           	google.maps.event.addListener(userMarker, 'click', function() { //add click function to open a dialog to display the marker's details
			
		  	infowindow.setContent("<form><label>"+'Name of location'+"</label><input id="+'infoBoxInput'+" type="+'text'+" placeholder="+'name location'+"><button id="+'infoBoxBtn'+"  type="+'submit'+" class="+'btn'+">"+'Submit'+"</button></form>");
		  	infowindow.open(map, this);
		  	map.setZoom(17);
		});
		
		
        google.maps.event.addListener(userMarker, 'dragend', function() { 
       	 // this is the drag function
       	 console.log(pos);
		});

	});
	
	
// ADDING NEW BUILDING CLICK FUNCTION -->	
	
	$("#infoBoxBtn").live('click', function(){
		var name = $("#infoBoxInput").val(); // getting the values of the input field
		var latitude = pos.$ab; // getting the values of the input field
		var longitude = pos.$a;
		var campus_identify = 23;
		//console.log("your point is at ",campus_identify);
		
		addNewBuilding(name, latitude, longitude, campus_identify);
		
	})
		
	
	
});
