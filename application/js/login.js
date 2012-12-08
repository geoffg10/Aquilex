var fbObj={};


    FB.init({
      oauth		 : true,
      appId      : '121346758027063', // App ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    // Additional init code here

function storeinfo() {  
	FB.api("/me?fields=hometown",function(data){
		console.log(data);
		if(localStorage){
			
			localStorage.fbObject = JSON.stringify(data);
		}
		
	});		
};
//localStorage.removeItem('fbID');
//fbObj = JSON.parse(localStorage.fbObject);
//fbObj.first_name = 'Geoff';

//delete variable fun
//delete fbObj.last_name;
localStorage.fbObject = JSON.stringify(fbObj);
console.log('this happened', JSON.parse(localStorage.fbObject));

$(document).ready(function(){

	$('input[name="email"]').focusout(function(e){
	
		console.log(e);
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
				}else if(response.message=="user added"){
					console.log('user added');
				}
		    },error: function(data) {  
			    console.log(data);
		    }});
		    
		    return false;
		console.log(e);
		return false;
	 });
});