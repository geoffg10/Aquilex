$(document).ready(function(){
	
	var userObj = {};
	var fbObj={};
	
	function checkLocalStorage(){
		if(localStorage){
			if(localStorage.fbObject || localStorage.userObj){
				$('#dropDown-settings').removeAttr('style');
				$('#dropDown-login').hide();
			}else{
				$('#dropDown-login').removeAttr('style');
				$('#dropDown-settings').hide();
			}
		}
	}
	checkLocalStorage();
	//$('#dropDown-settings').hide();
	
	
	
	FB.init({ //initializes the FB api
		oauth		: true,
		appId      : '121346758027063', // App ID
		status     : true, // check login status
		cookie     : true, // enable cookies to allow the server to access the session
		xfbml      : true  // parse XFBML
	});
    
    //gets the user's fb profile picture
    function getImage() {  
	    FB.api("/"+fbObj.username+"/picture", function(imgData){
			fbObj.picture = imgData.data.url; //update the fbObj with the picture url
			if(localStorage){
				localStorage.fbObject = JSON.stringify(fbObj); //update local storage with new data
			}
		});
    };
    
    function storeinfo() {  //this happens when the user clicks the sign in with FB option
		FB.api("/me",function(data){
			console.log(data);
			fbObj = data; //set global fbObj to the data returned from FB
			//login to the DB, this will check if the user exists
			//if the user exists than the userid is returned, 
			//it will register the user if they do not exist and will return the created userid
			$.ajax({
				type:'POST', 
				url: 'xhr/fblogin.php', 
				data:{
					fb_id:			data.id,
					fb_first_name:	data.first_name || '',
					fb_middle_name:	data.middle_name || '',
					fb_last_name:	data.last_name || '',
					fb_gender:		data.gender || '',
					fb_link:		data.link || '',
					fb_locale:		data.locale || '',
					fb_name:		data.name || '',
					fb_timezone:	data.timezone || '',
					fb_updated_time: data.updated_time || '',
					fb_username: 	data.username || ''
				}, 
				dataType: 'json',
				success: function(response) {
					//set the userObj to hold the userid generated in the DB
					userObj.id = response.result.userid;
					//if there is local storage store both the userObj and the fbObj with the data
					if(localStorage){
						$('#aquilex-login').addClass("hide");
						localStorage.userObj = JSON.stringify(userObj);
						localStorage.fbObject = JSON.stringify(data);
						checkLocalStorage();
					}
			    },error: function(errorResponse) {  
				    //console.log(errorResponse);
				    
		    }});
		    //this will get the user's fb profile image to use in the frontend if wanted
		    getImage();
			
		});//close fblogin ajax call
		
				
	}; //close storeinfo()
    
	$('input[name="email"]').focusout(function(e){
	
		console.log($(this).val());
		$.ajax({
			type:'POST', 
			url: 'xhr/login.php', 
			data:{
				email: $(this).val()
			}, 
			dataType: 'json',
			success: function(response) {
				console.log(response);
				if(response.message=="email only"){
					console.log('just email');
				}else if(response.message=="connected"){
					console.log('user added');
				}
		    },error: function(data) {  
			    console.log(data);
		    }});
	});
	
	$('#fbLogin').click(function(e) {  
		//login with FB
		storeinfo();
	});
	
	$('#login').submit(function(e) {
		$.ajax({
			type:'POST', 
			url: 'xhr/login.php', 
			data:$(this).serialize(), 
			dataType: 'json',
			success: function(response) {
				console.log(response);
				if(response.message=="email only"){
					console.log('just email');
				}else if(response.message=="connected"){
					if(response.result.success == "password doesn't match"){
						//do stuff when the password doesn't match
					}else if(response.result.success == "user added"){
						//user can been added
						userObj.id = response.result.userid.userid;
						$('#aquilex-login').addClass("hide");
						if(localStorage){
							localStorage.userObj = JSON.stringify(userObj);
							checkLocalStorage();
						}
					}else if(response.result.success == "logged in"){
						//user is logged in
						userObj.id = response.result.userid;
						$('#aquilex-login').addClass("hide");
						if(localStorage){
							localStorage.userObj = JSON.stringify(userObj);
							checkLocalStorage();
						}
					}
				}
		    },error: function(data) {  
			    console.log(data);
		    }});//end ajax
		    console.log(userObj);
		return false;
	 }); //close submit login
});