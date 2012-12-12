/* 
	Author: Renee Blunt
	Date: December 2, 2012
	Project: MDD - Aquilex
	Project co-auth: Geoffrey Ganga, Jarvis Jardin

	The below code is accessing the Google Maps APIv3 and the Google Places API
	Also using maxmind for ip location

*/
$(document).ready(function () {
    var userLat = '',
        userLong = '';

    var map;
    var infowindow;
    var pos; //this is the users location that is displayed on google maps
    var map;
    var userMarker; //this is the visual location/marker of the user
    var selectedLocation = {};
    var campus = {};
    var campusId = {};
    var schoolArray = [];
    var buildingArray = [];
    var userJSONObj = {};


    if (localStorage) {
        if (localStorage.userObj) {
            userJSONObj = JSON.parse(localStorage.userObj);
        }
    }


    /*	The below variables are just for an initial map location 
	we're doing this so that the user isn't prompted to share IP on inital page load
	until they've decided they want to use the application
	*lat and long based off of user's ip using the maxmind geoip js 
	*methods are listed here http://dev.maxmind.com/geoip/javascript
*/
    var geoIPLat = geoip_latitude(),
        geoIPLong = geoip_longitude();

   
        /*===================================================================================================== ##1.1 -runs initialize on load
     */
    
    // initialize() is the first function fired, it is called on a domlistener for window load. it loads the map first based off of the users IP */

    function initialize() {

	    //create map position	
        pos = new google.maps.LatLng(geoIPLat, geoIPLong); 
        
        var mapOptions = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 15,
            center: pos
        };

        //create a map and place it in its container with initial options
        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);  
              
        //create current location marker on the map
        userMarker = new google.maps.Marker({ 
            position: pos,
            map: map,
            title: 'You are here',
            draggable: true
        });
        
        //create infowindow, this is called later to display the location details when clicked
        infowindow = new google.maps.InfoWindow(); 
        
        //event listener for if the zoom is changed. 1st param is the map that the listener is attached too
        google.maps.event.addListener(map, 'zoom_changed', function () {

            if (map.getZoom() == 16) {
                clearMarkers('building');
                getCampuses()
            }
        });

        //event listener for when the pin is moved. 1st param is the pin that the listener is attached too
        google.maps.event.addListener(userMarker, 'dragend', function () {
            
            console.log('UserPin dragged to:', userMarker.getPosition());

        });

        /*===================================================================================================== ##2 getUniversities runs after initialize on load
         */
       
        //function call that gets data from the DB. Response is the the different schools
        getCampuses();
        //fucntion call thats gets universities from google
        getUniversities(); 

    }; //close initialize


    //this is fired when geolocation is accessed by user and there is a fail, it accepts a boolean
    function handleNoGeolocation(errorFlag) { 
        if (errorFlag) {
            var content = 'Error: The Geolocation service failed.';
        } else {
            var content = 'Error: Your browser doesn\'t support geolocation.';
        }
    }; // close handleNoGeolocation




    //initialize();
    /*===================================================================================================== ##1 runs initialize on load
     */
   
   //loads map on the initalize function
    google.maps.event.addDomListener(window, 'load', initialize);


 /*
	//////////////////////////////////////////////////////////////////////////////////////  user generated calls
*/



    /*===================================================================================================== ##2.1 getUniversities runs after initialize on load
     */
     
    //gets universities from google near the user's location 
    function getUniversities() {

        var request = {
            location: pos,
            radius: 9000, //this is in meters, its about 5 miles
            types: ['university']
        };

        var service = new google.maps.places.PlacesService(map); //create a google places service
        /*===================================================================================================== ##2.2 callback runs after getUniversities on load
         */
        service.nearbySearch(request, callback); //first parm is the request object, then runs the function with the results

    }; //close getUniversities

    /*===================================================================================================== ##2.2.1 callback runs after getUniversities on load
     */
     
    //first param is the results json object from the getUniversities query, the second param is the status 
    function callback(results, status) { 

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var google_ref_id = results[i].id;

                getLocations(results[i], google_ref_id);

            } //end of for loop
        }
    }; //close callback


    //creates markers on the map (name of the name location, LatLng[latitude,longitude,id of location,type of location, zoom amount for click]
    function createMarker(name, latlng, id, type, zoom) { 

		// If statement to give the different types of pins, different icons. Sets var to different paths depending on type.
	 	if(type=='school'){
		 	var icon = 'img/mapIcons/university-icon.png';
	 	}else if(type=='building'){
		 	var icon = 'img/mapIcons/building-icon.png';

	 	}
	 
	 	//setting up properties for custom pins
	    var image = new google.maps.MarkerImage(
	      icon,											//this var is a string for the path of a custom pin.
		  new google.maps.Size(32,37),
		  new google.maps.Point(0,0),
		  new google.maps.Point(16,37)
		);


	   //creates map marker
       	var marker = new google.maps.Marker({
            map: map, //global variable for the map
            position: latlng, // variable for latitude and longitude
            icon:image
        });
        
        //click event listener for marker
        google.maps.event.addListener(marker, 'click', function () { //add click function to open a dialog to display the marker's details
            //	console.log('school:',name);
            
            // If statement to give the different types of pins, different functionality
            if (type == 'school') {
                getBuildings(id);

            } else if (type == 'building') {
                getRooms(name, id);

            }
            
            infowindow.setContent(name);
            infowindow.open(map, this);
            map.setZoom(zoom); //zoom is a variable passed into createMarker() function



        });
        
        // If statement to give the different types of pins, different functionality
        if (type == 'school') {
            
            //calls clearMarkers() function. pass what type of marker
            clearMarkers('building');
            
            //pushes markers into an array for clearMarkers() function
            schoolArray.push(marker);

        } else if(type == 'building') {
           
            //calls clearMarkers() function. pass what type of marker
            clearMarkers('school');
           
            //pushes markers into an array for clearMarkers() function
            buildingArray.push(marker);

        }


    }; //close createMarker

    //Function that clears/deletes existing markers form the map. Param: (what type of marker to clear)
    function clearMarkers(type) {
        if (type == 'school') {
            if (schoolArray) {
                for (i in schoolArray) {
                    schoolArray[i].setMap(null);
                };

                schoolArray.length = 0;


            }
        } else if (type == 'building') {

            if (buildingArray) {
                for (i in buildingArray) {
                    buildingArray[i].setMap(null);
                }
                buildingArray.length = 0;

            }
        }
    }

/*
	//////////////////////////////////////////////////////////////////////////////////////  AJAX
*/

	//function to get different schools from the DB
    function getCampuses() { 
            $.ajax({
            type: 'get',
            url: 'xhr/getCampuses.php',
            dataType: 'json',
            success: function (response) {
            	//response is an array of objects that are the different schools
                for (var i = 0; i < response.result.length; i++) {
	                
	                // sets var ltlg using google's LatLng() function. params: (latitude,longitude)
                    var ltlg = new google.maps.LatLng(response.result[i].latitude, response.result[i].longitude)
                    
                    //calls the createMarker() function. params:(name of marker, latlng of marker, id of marker, type of marker, Zoom distance for click) 	
                    createMarker(response.result[i].name, ltlg, response.result[i].id, 'school', 17);
                }
            },
            error: function (error) {
                console.log('error', error);
            }
        });
    };



    // add location to DB, takes the place object
    function addUserLocation(data) { 
        
        $.ajax({
            type: 'POST',
            data: {
                latitude: data.$a,
                longitude: data.ab
            },
            url: 'xhr/addlocation.php',
            dataType: 'json',
            success: function (data) {
                //console.log(data);
            }
        });
    };

    // performing ajax to check db with results then display results	
    //takes two params, one is the google place and the second is the id of the google place
    function getLocations(place, google_ref_id) { 
        $.ajax({
            type: 'POST',
            data: {
                google_ref_id: google_ref_id
            },
            url: 'xhr/getlocations.php',
            dataType: 'json',
            success: function (successLocDB) {
	            //successLocDB is the location from the DB

                if (successLocDB.result == 'no record') {

	               	//calls makeList() function. params:(place object);
                    makeList(place);
                } else {
	                
	                //call schoolsFromDB() function. params:(place object, location from the DB)
                    schoolsFromDB(place, successLocDB.result);
                }
            },
            error: function (error) {
                console.log("error ", error);
            }
        }); //end of ajax


    }; // end of function


    // add location to DB, takes the place object
    function addmyCampus(data) { 
        $.ajax({
            type: 'POST',
            data: {
                latitude: data.geometry.location.$a,
                longitude: data.geometry.location.ab,
                name: data.name,
                google_ref_id: data.id,
                added_by_id: 1
            },
            url: 'xhr/addcampus.php',
            dataType: 'json',
            success: function (successData) {

                if (successData.message == "location added") {
                    //should be calling this is your location
                }
                getLocations(data, data.id);
            }
        });
    };

    // add building to DB.params:(name of building,lat of building,long of building, campus id, which user added it)
    function addNewBuilding(newBuildingName, newBuildinglatitude, newBuildinglongitude, campus_identify, addedBy) { 
        $.ajax({
            type: 'POST',
            data: {
                campus_id: campus_identify,
                latitude: newBuildinglatitude,
                longitude: newBuildinglongitude,
                name: newBuildingName,
                added_by_id: addedBy

            },
            url: 'xhr/addbuilding.php',
            dataType: 'json',
            success: function (successData) {
                console.log(successData, "was added to database");
                //console.log(data.reference);
                if (successData.error) {
                    console.log("something didnt work bro")
                } else {
                    console.log("dude it worked, dont stress")
                    //$('#infoBoxBtn').addClass
                    infowindow.getContent(newBuildingName);

                }
            },
            error: function (errorData) {
                console.log(errorData);
            }
        });
    };


    function getBuildings(data) { // performing ajax to get buildings from the selected College 
        clearMarkers('building');


        $.ajax({
            type: 'POST',
            data: {
                campus_id: data
            },
            url: 'xhr/getbuildings.php',
            dataType: 'json',
            success: function (response) {
                if (response.result != "no record") {
                    for (var i = 0; i < response.result.length; i++) {

                        var ltlg = new google.maps.LatLng(response.result[i].latitude, response.result[i].longitude);
                        createMarker(response.result[i].name, ltlg, response.result[i].id, 'building', 20);
                    };
                }

            },
            error: function (error) {
                console.log("error ", error);
            }
        }); //end of ajax


    }; // end of function



    function getRooms(name, id) { // performing ajax to get Rooms from the selected Buildings 
        $.ajax({
            type: 'POST',
            data: {
                building_id: id
            },
            url: 'xhr/getrooms.php',
            dataType: 'json',
            success: function (response) {

                console.log("Rooms for", name + ':');

                if (response.message = "rooms") {
                    for (var i = 0; i < response.result.length; i++) {
                        console.log("	", response.result[i].name);

                    }

                } else {
                    console.log('NO ROOMS');
                }



            },
            error: function (error) {
                console.log("error ", error);
            }
        }); //end of ajax


    }; // end of function








    /*
	//////////////////////////////////////////////////////////////////////////////////////  Click Events
*/

    $('#useGPS').click(function (e) { //enables the use of GPS and moved the user's marker to there location 

        if (navigator.geolocation) { //if geolocation is possible for user
            navigator.geolocation.getCurrentPosition(function (position) { //on success

                userLat = position.coords.latitude;
                userLong = position.coords.longitude;

                pos = new google.maps.LatLng(userLat, userLong);
                userMarker.setPosition(pos);
                map.setCenter(pos);

            }, function () {
                //when geolocation didn't work
                handleNoGeolocation(true);
            });
        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }
        return false;
    });


    $('#addLocation').click(function (e) { //button to add location to DB
        addUserLocation(userMarker.position); //add to DB function
    });


    // Modal is populated with schools from google that are in your location and put at the bottom of the modal.	

    function makeList(place) {
        // this makes an List of all the schools and addes them to the ul called Test list
        
        var isHidden = true;

        $('#addBtnBlue').click(function (e) {
            if (isHidden) {
                $('#testList').removeClass('hide');
                $('#addBtnBlue').html('hide list')
                isHidden = false;
                $('<li id="placeNames"><p class="btn btn-success" id="addSchooltoList" >add</p>' + place.name + '</li>').appendTo('#testList')
                    .click(function (e) { // calling the ajax function when the button is clicked 
                    //the ajax function will send the school to the database
                   
                    getLocations(place, place.id);

                    addmyCampus(place);
                    // after the school you chose has been clicked and added to the database, it is then removed from the list of schools
                    $(this).remove();
                });
            } else {

                $('#testList').addClass('hide');
                $('#addBtnBlue').html('Add School')


            }


        })

    };

    // Top part of the "add your school" modal
    // this will show the school you have chosen then will cause the modal to disspear
    function schoolsFromDB(place, dataDB) {
        // this makes a list of the school you have chosen from google, and then has a message saying "your school has been added"
        // the message saying "school has been added" will slowly fade in
        $('<li>' + place.name + '</li>').appendTo('#ourAddedList').click(function (e) {
            map.setZoom(17);
            pos = new google.maps.LatLng(place.geometry.location.$a, place.geometry.location.ab);
            map.setCenter(pos);
            getBuildings(dataDB[0].id);
            $("#schoolModal").fadeOut('slow');
            addLocationLocalStorage(dataDB);
        });;

        $('<li><a href="#">' + dataDB[0].name + '</a></li>').prependTo('#favorites').click(function (e) {
            map.setZoom(17);
            pos = new google.maps.LatLng(place.geometry.location.$a, place.geometry.location.ab);
            map.setCenter(pos);


            getBuildings(dataDB[0].id);
        });

    };
    //
    function makeAddedSchool(place, dataDB) {
        // this makes a list of the school you have chosen from google, and then has a message saying "your school has been added"

        // the message saying "school has been added" will slowly fade in
        $('<li>' + place.name + '<span id="schoolAddedMSG" class="text-success aquilex-block">School has been added</span></li>').fadeIn(
            "slow", function () {
            // the "school has been added" will then fade out
            $("#schoolAddedMSG").fadeOut(
                'slow', function () {
                // the "add your school" modal will then fade out and be removed from the DOM
                $("#schoolModal").fadeOut('slow');
                console.log("inside 411 makeAddedSchoolList");

            }).remove();
            // the school that you chose will then be added to ul "our added list" which is the top part of the " add your school" modal.		
        }).appendTo('#ourAddedList');
        // calling the local storage function
        addLocationLocalStorage(dataDB);
        if ($("#chosenSchool").hasClass("hide")) {
            $("#chosenSchool").removeClass("hide");

        } else {
            $("#chosenSchool").addClass("hide");
        }

        //populates the fav dropdown and click to zoom

        console.log(dataDB[0].name);
        

    };

    //adding location to local storage
    function addLocationLocalStorage(dataDB) {
        if (localStorage) {

            //if local storage contains the chosen campus, then stringify
            localStorage.chosenCampus = JSON.stringify(dataDB);
            // then puts the name of the school inside the "your chosen school" that is the blue box on the top of the page
            $('<p>' + dataDB.name + '</p>').appendTo('#yourchosenSchool');
        }
        campus = dataDB;
    }


    // if there is a school in the local storage, then the modal shouldnt show up
    //if there no school is in the local storage then the modal should show up
    function createSelectedLocation() {

        if (localStorage) {
            if (localStorage.chosenCampus) {
                var data = JSON.parse(localStorage.chosenCampus);
                //console.log(localStorage.chosenCampus);
                $('<p>' + localStorage.chosenCampus.name + '</p>').empty().appendTo('#yourchosenSchool');
            } else {
                $("#schoolModal").removeClass("hide");
            }
        } else {
            //show modal
            $("#schoolModal").removeClass("hide");

            //console.log()
        }
    }; // end of adding location to local storage



    createSelectedLocation();




//////----------------------------------------------------- CLOSING SCHOOL MODAL -------------------------------//////

    $('#closeSchoolModal').on('click', function () {
        $('#schoolModal').addClass("hide");

    })


    // ADDING A NEW BUILDING-->	

    $('#navAddBuilding').on('click', function () {
        ADDBUILDINGMarker = new google.maps.Marker({ //create current location marker on the map
            position: pos,
            map: map,
            title: 'drag me',
            draggable: true
        });
        console.log(pos)
        infowindow = new google.maps.InfoWindow(); //create infowindow, this is called later to display the location details when clicked


        google.maps.event.addListener(ADDBUILDINGMarker, 'click', function () { //add click function to open a dialog to display the marker's details

            infowindow.setContent("<form><label id='newBuildingsName'>" + 'Name of location' + "</label><input id=" + 'infoBoxInput' + " type=" + 'text' + " placeholder=" + 'name location' + "><button id=" + 'infoBoxBtn' + "  type=" + 'submit' + " class=" + 'btn' + ">" + 'Submit' + "</button></form>");
            infowindow.open(map, this);
            map.setZoom(17);
        });


        google.maps.event.addListener(ADDBUILDINGMarker, 'dragend', function () {
            // this is the drag function

        });

    });


    // ADDING NEW BUILDING CLICK FUNCTION -->	

    $("#infoBoxBtn").on('click', function () {
        google.maps.event.addListener(ADDBUILDINGMarker, 'dragend', function () {
            var dragLng = ADDBUILDINGMarker.getPosition().ab;
            var dragLat = ADDBUILDINGMarker.getPosition().$a;
        });
        var campusobject = JSON.parse(localStorage.chosenCampus);
        var user = JSON.parse(localStorage.userObj); // parsing the user object in order to call the .id
        var newBuildingName = $("#infoBoxInput").val(); // getting the values of the input field
        var newBuildinglatitude = ADDBUILDINGMarker.getPosition().$a; // getting the latitude value from the local storage
        var newBuildinglongitude = ADDBUILDINGMarker.getPosition().ab; // getting the longitude value from the local storage
        var newBuildingCampus_identify = campusobject[0].id; // getting the campus id from the local storage
        var addedBy = JSON.parse(user.id);
        console.log(newBuildinglatitude);

        addNewBuilding(newBuildingName, newBuildinglatitude, newBuildinglongitude, newBuildingCampus_identify, addedBy);
    })



    $('#showAllSchools').on('click', function () {
        $("#schoolModal").removeClass('hide');

    });


});