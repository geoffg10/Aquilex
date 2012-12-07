$(document).ready(function(){
	
	
	
	
	
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