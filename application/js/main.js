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
	var pos; //this is the users location that is displayed on google maps
	var map;
	var userMarker;  //this is the visual location/marker of the user
	var selectedLocation = {};
	var campus = {};
	var campusId = {};
	var schoolArray = [];
	var buildingArray = [];
	var roomWindow;
	
	
	
	
/*	The below variables are just for an initial map location 
	we're doing this so that the user isn't prompted to share IP on inital page load
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
         
        google.maps.event.addListener(map,'zoom_changed',function(){
	       
	       	if(map.getZoom() == 16){
		       	clearMarkers('building');
		       	getCampuses()
	       	}
	       	console.log('zoom:', map.getZoom()); 
        }); 
        

        google.maps.event.addListener(userMarker, 'dragend', function() { 
        	console.log('draggy',userMarker.getPosition());
        	
		});
		
			/*===================================================================================================== ##2 getUniversities runs after initialize on load
	*/		
			getCampuses();
			getUniversities();// calls the function get university

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
				
				//createMarker({'name':results[i].name,'latlng':results[i].geometry.location});
				getLocations(results[i], google_ref_id);
			
			}//end of for loop
		}
	}; //close callback



	function createMarker(name,latlng,id,type) { //creates markers on the map
	
			
		 if(type == 'school'){
		 	
		 	clearMarkers('building');
		 	
		 	var schoolMarker = new google.maps.Marker({
		  		map: map,
		  		position: latlng
		  	});
		  		 
			google.maps.event.addListener(schoolMarker, 'click', function() { //add click function to open a dialog to display the 			marker's details
			//	console.log('school:',name);
			  	infowindow.setContent(name);
			  	infowindow.open(map, this);
			  	map.setZoom(17);
				
			  	getBuildings(id);
	
			});
			
			schoolArray.push(schoolMarker);
			
			
			
		}else if(type == 'building'){
		
			clearMarkers('school');
		
			var buildingMarker = new google.maps.Marker({
		  		map: map,
		  		position: latlng
		  	});
		
			
			
			google.maps.event.addListener(buildingMarker, 'click', function() { //add click function to open a dialog to display the 			marker's details
				
				console.log('building:',name);
			  	infowindow.setContent(name);
			  	infowindow.open(map, this);
			  	map.setZoom(20);
				getRooms(id);
	
			});
			
			buildingArray.push(buildingMarker);

		}
	
	}; //close createMarker
	
	
	function clearMarkers(whichOne) {
		  if(whichOne == 'school'){
		  	  if (schoolArray) {
			  		for (i in schoolArray) {
				 	 	schoolArray[i].setMap(null);
				  	};

			  }
		  }else if(whichOne == 'building'){
		  
			  if (buildingArray) {
			      for (i in buildingArray) {
			      	buildingArray[i].setMap(null);
			      }
		   
			   }
		  }
	 }
	
/*
	//////////////////////////////////////////////////////////////////////////////////////  AJAX
*/	
	
	function getCampuses(){ // add location to DB, takes the place object
		$.ajax({
			type:'get',				
			url: 'xhr/getCampuses.php',
			dataType: 'json',
			success:function(response) {  
				for(var i=0;i<response.result.length;i++){
					
					var ltlg = new google.maps.LatLng(response.result[i].latitude,response.result[i].longitude)
					
					createMarker(response.result[i].name,ltlg,response.result[i].id,'school');
				}
			},
			error:function(error){
				console.log('error',error);
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
	
//	
	function getLocations(place, google_ref_id){ // performing ajax to check db with results then display results
	//takes two params, one is the google place and the second is the id of the google place
	//successLocDB is the location from the DB
		//console.log('in getlocations ',data);
		$.ajax({
			type:'POST',
			data:{
				google_ref_id: google_ref_id
			},
			url: 'xhr/getlocations.php',
			dataType: 'json',
			success:function(successLocDB) {
				//console.log(successLocData.result);
				
				if(successLocDB.result == 'no record')
				{
					//console.log("make the list");
					makeList(place);
				}else{
					//console.log("make added list");
					
					schoolsFromDB(place, successLocDB.result);
				}
			},
			error:function(error) {  
				console.log("error ",error);
			}
		});//end of ajax
		
		
	};// end of function



	function addmyCampus(data){ // add location to DB, takes the place object
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
				//console.log(successData, "was added to database");
				//console.log(data.reference);
				if(successData.message=="location added")
				{
					//should be calling this is your location
				}
				getLocations(data, data.id);
			}
		});
	};
	
	// hard coded data, need help renee!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	function addNewBuilding(newBuildingName, newBuildinglatitude, newBuildinglongitude, campus_identify, addedBy){ // add building to DB
		//console.log("this function is running");
		$.ajax({
			type:'POST',
			data:{
				campus_id: campus_identify,
				latitude: newBuildinglatitude,
				longitude: newBuildinglongitude,
				name: newBuildingName,
				added_by_id: addedBy
				
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
			success:function(response) {
				
				for (var i = 0; i < response.result.length; i++) {
										
					var ltlg = new google.maps.LatLng(response.result[i].latitude,response.result[i].longitude);
					createMarker(response.result[i].name,ltlg,response.result[i].id,'building');
				};	
			},
			error:function(error) {  
				//console.log("error ",error);
			}
		});//end of ajax
		
		
	};// end of function
	
	

	function getRooms(data){ // performing ajax to get Rooms from the selected Buildings 

		$.ajax({
			type:'POST',
			data:{
				building_id: data
			},
			url: 'xhr/getrooms.php',
			dataType: 'json',
			success:function(response) {
			
				for(var i=0;i<response.result.length;i++){
					
					console.log(response.result[i].name);
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
	

	$('#addLocation').click(function(e) {  //button to add location to DB
		addUserLocation(userMarker.position); //add to DB function
	}); 
	
	
// Modal is populated with schools from google that are in your location and put at the bottom of the modal.	
	function makeList(place){ 
		// this makes an List of all the schools and addes them to the ul called Test list
		$('<li><p class="btn btn-success" id="addSchooltoList">add</p>'+place.name+'</li>').appendTo('#testList').click(function(e) {
		
			// calling the ajax function when the button is clicked 
				//the ajax function will send the school to the database
			addmyCampus(place);
			// after the school you chose has been clicked and added to the database, it is then removed from the list of schools
			$(this).remove();
		});
	};	
	
// Top part of the "add your school" modal
	// this will show the school you have chosen then will cause the modal to disspear
	function schoolsFromDB(place, dataDB){ 
		// this makes a list of the school you have chosen from google, and then has a message saying "your school has been added"
			// the message saying "school has been added" will slowly fade in
		$('<li>'+place.name+'</li>').appendTo('#ourAddedList').click(function(e) { 
				map.setZoom(17);
				pos = new google.maps.LatLng(place.geometry.location.$a, place.geometry.location.ab);
				map.setCenter(pos);
				getBuildings(dataDB[0].id);
				$("#schoolModal").fadeOut('slow');
				addLocationLocalStorage(dataDB);
		});;
		
		$('<li><a href="#">'+dataDB[0].name+'</a></li>').appendTo('#favorites').click(function(e) { 
				map.setZoom(17);
				pos = new google.maps.LatLng(place.geometry.location.$a, place.geometry.location.ab);
				map.setCenter(pos);
				

				getBuildings(dataDB[0].id);
		});
		
	};	
//
	function makeAddedSchoolList(place, dataDB){ 
		// this makes a list of the school you have chosen from google, and then has a message saying "your school has been added"
			// the message saying "school has been added" will slowly fade in
		$('<li>'+place.name+'<span id="schoolAddedMSG" class="text-success aquilex-block">School has been added</span></li>').fadeIn(
			"slow", function() {  
				// the "school has been added" will then fade out
					$("#schoolAddedMSG").fadeOut(
						'slow', function(){
						// the "add your school" modal will then fade out and be removed from the DOM
							$("#schoolModal").fadeOut('slow');
											console.log("inside 411 makeAddedSchoolList");

						}).remove();
				// the school that you chose will then be added to ul "our added list" which is the top part of the " add your school" modal.		
			}).appendTo('#ourAddedList');
			// calling the local storage function
			addLocationLocalStorage(dataDB);
		if($("#chosenSchool").hasClass("hide")){
				$("#chosenSchool").removeClass("hide");
				
			}else{
				$("#chosenSchool").addClass("hide");
			}

//populates the fav dropdown and add click to zoom
		$('<li><a href="#">'+dataDB[0].name+'</a></li>').appendTo('#favorites').click(function(e) { 
				map.setZoom(17);
				pos = new google.maps.LatLng(place.geometry.location.$a, place.geometry.location.ab);
				map.setCenter(pos);
				

				getBuildings(dataDB[0].id);
		});
		
	};	
	
//adding location to local storage
	function addLocationLocalStorage(dataDB){
		if(localStorage){

			//if local storage contains the chosen campus, then stringify
				localStorage.chosenCampus = JSON.stringify(dataDB);
					// then puts the name of the school inside the "your chosen school" that is the blue box on the top of the page
						$('<p>'+dataDB.name+'</p>').appendTo('#yourchosenSchool');	
		}
		campus = dataDB;
	}
	
	
// if there is a school in the local storage, then the modal shouldnt show up
	//if there no school is in the local storage then the modal should show up
	function createSelectedLocation() { 
		 
		if(localStorage){
			if(localStorage.chosenCampus){
				var data = JSON.parse(localStorage.chosenCampus);
				//console.log(localStorage.chosenCampus);
				$('<p>'+localStorage.chosenCampus.name+'</p>').empty().appendTo('#yourchosenSchool');
			}else{
				$("#schoolModal").removeClass("hide");
				console.log("inside 456 createdSelectedLocation");
			}
		}else{
			//show modal
				$("#schoolModal").removeClass("hide");
								console.log("inside 460 createdSelectedLocation");

				//console.log()
		}
	};		// end of adding location to local storage
	
	
	
	createSelectedLocation();
		
		
		
		

// CLOSING SCHOOL MODAL -->
	
	$('#closeSchoolModal').live('click', function(){
		$('#schoolTestModal').addClass("hide");
		
	})

	
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
       	 //console.log(pos);
		});

	});
	
	
// ADDING NEW BUILDING CLICK FUNCTION -->	
	
	$("#infoBoxBtn").live('click', function(){
		var campusobject = JSON.parse(localStorage.chosenCampus);
		var user = JSON.parse(localStorage.userObj);
		var newBuildingName = $("#infoBoxInput").val(); // getting the values of the input field
		var newBuildinglatitude = campusobject[0].latitude; // getting the values of the input field
		var newBuildinglongitude = campusobject[0].longitude;
		var newBuildingCampus_identify = campusobject[0].id;
		var addedBy = JSON.parse(user.id);
		console.log(campusobject[0].latitude);
		
		addNewBuilding(newBuildingName, newBuildinglatitude, newBuildinglongitude, newBuildingCampus_identify,addedBy);
		
	})
		
	
	
});
