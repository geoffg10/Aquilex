/* 
	Author: Renee Blunt
	Date: December 7, 2012
	Project: MDD - Aquilex
	Project co-auth: Geoffrey Ganga, Jarvis Jardin

	The below code is used for logout and login
	This inlcudes the fbapi for login

*/
$(document).ready(function(){
	
	var userObj = {};
	var fbObj={};
	
	//checkLocalStorage will change the state of the user's navigation for login/logout, this can be called wherever a change is needed
	function checkLocalStorage(){
		if(localStorage){
			if(localStorage.fbObject || localStorage.userObj){
				if(localStorage.fbObject){
					userObj = JSON.parse(localStorage.userObj);
					fbObj = JSON.parse(localStorage.fbObject);
				}else{
					userObj = JSON.parse(localStorage.userObj);
				}
				$('#dropDown-settings').removeAttr('style');
				$('#dropDown-login').hide();
			}else{
				$('#dropDown-login').removeAttr('style');
				$('#dropDown-settings').hide();
			}
		}
	}
	//runs check on load
	//checkLocalStorage();
	
	
	FB.init({ //initializes the FB api
		oauth		: true,
		appId      : '121346758027063', // App ID
		status     : true, // check login status
		cookie     : true, // enable cookies to allow the server to access the session
		xfbml      : true  // parse XFBML
	});
    
    //gets the user's fb profile picture
    //this runs after the storinfo() upon a successful login
    function getImage() {  
	    FB.api("/"+fbObj.username+"/picture", function(imgData){
			fbObj.picture = imgData.data.url; //update the fbObj with the picture url
			if(localStorage){
				localStorage.fbObject = JSON.stringify(fbObj); //update local storage with new data
			}
		});
    };
    
    //storeinfo is called on a fblogin click
    //this function will log the user in with FB 
    //it checks to see if the user exists in the DB and if they do it returns the user's id
    //if the user already exists it returns the user's id
    // users FB data is added to the fbObject for localStorage
    function storeinfo() {  //this happens when the user clicks the sign in with FB option
		FB.login(function(response){
			if(response.authResponse){
				FB.api("/me",function(data){
					console.log(data);
					fbObj = data; //set global fbObj to the data returned from FB
					//login to the DB, this will check if the user exists
					//if the user exists than the userid is returned, 
					//it will register the user if they do not exist and will return the created userid
					
					$.ajax({
						type:'POST', 
						url: '../application/user/fblogin',
						data:{
							fba_id:			data.id,
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
							console.log("response ",response);
							
							//set the userObj to hold the userid generated in the DB
							//userObj.id = response.result.userid;
							//if there is local storage store both the userObj and the fbObj with the data
							if(localStorage){
								$('#aquilex-login').addClass("hide");
								localStorage.userObj = JSON.stringify(userObj);
								localStorage.fbObject = JSON.stringify(data);
								checkLocalStorage();
							}
					    },error: function(errorResponse) {  
						    //console.log(errorResponse);
						    console.log("errorResponse ",errorResponse);
						    
				    }});
				    //this will get the user's fb profile image to use in the frontend if wanted
				    getImage();
					
				});//close fblogin ajax call
		}else{
				console.log('not authorized');
			}
		});
				
	}; //close storeinfo()
    
    //checks the email when the input field loses focus
    //can change the text when the email is found
	$('input[name="email"]').focusout(function(e){
	
		//console.log($(this).val());
		$.ajax({
			type:'POST', 
			url: '../application/user/searchEmail', 
			data:{
				email: $(this).val()
			}, 
			dataType: 'json',
			success: function(response) {
				// do something with 
				if(response.message == "email_search"){
					//do something with foreach result[i]user_email
				}
		    },error: function(data) {  
			    //console.log(data);
		    }});
	});
	
	//login with facebook
	$('#fbLogin').click(function(e) {  
		//login with FB
		storeinfo();
	});
	
	
	//logs user out
	$('#logout').click(function(e) {  
		if(localStorage){
			if(localStorage.fbObject){
				FB.logout(function(response){
					console.log("you've logged out ",response);
				});
			}
			localStorage.clear();
			checkLocalStorage();
		}
	});
	//normal login
	$('#login').submit(function(e) {
		
		$.ajax({
			type:'POST', 
			url: '../application/user/userlogin', 
			data:$(this).serialize(), 
			dataType: 'json',
			success: function(response) {
				console.log('the root response ',response);
				
				if(response.message=="user_added"){
					//user created
				}else if(response.message=="validated"){
					//user validated
				}else if(response.message=="fail_validation"){
					//failed password validation
				}else{
					//wrong or empty variables, didn't use post
				}
				
/*
				if(response.message=="connected"){
					if(response.result.success == "password doesn't match"){
						//do stuff when the password doesn't match
					}else if(response.result.success == "user added"){
						//user can been added
						userObj.id = response.result.userid;
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
				}else if(response.message=="email only"){
					console.log('just email');
				}
*/
		    },error: function(data) {  
			    console.log(data);
		    }});//end ajax
		    console.log(userObj);
		return false;
	 }); //close submit login
	 
	 $('#changepass').submit(function(e){
		 $.ajax({
			type:'POST', 
			url: '../application/user/updatepass',  
			data:{
				oldpass: $('input[name=oldpass]').val(),
				newpass: $('input[name=newpass]').val(),
				id: userObj.id
			}, 
			dataType: 'json',
			success: function(response) {
				console.log(response);
/*
				if(response.result == "wrong password"){
					$("#changepass .control-group").addClass('error alert alert-error').find('span').removeClass('hide');
				}
				if(response.result == "password updated"){
					
				}
*/
		    },error: function(data) {  
			    console.log(data);
		    }});
		    return false;
	 });
});