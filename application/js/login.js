$(document).ready(function(){
	
	
	
	
	$('#login').submit(function(e) { 
		console.log('stuff');
		$.ajax({
			type:'POST', 
			url: 'xhr/login.php', 
			data:$(this).serialize(), 
			dataType: 'json',
			success: function(response) {
				console.log(response);
		    }});
		
		    return false;
		console.log(e);
		return false;
	 });
});