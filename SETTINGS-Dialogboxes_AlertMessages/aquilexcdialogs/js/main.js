/*  
<<<<<<< HEAD
Aquilex - user settings
=======
The completer	
Author: Geoffrey Ganga
>>>>>>> html-branch-edits
*/

(function($){

		
	var init = function(){
	
	};
	
	
	init();
<<<<<<< HEAD

=======
	
		
	
	

	

		
		
	
>>>>>>> html-branch-edits
//-----------account settings	



//when the user clicks on the account settings option from the drop down menu
	// show the account settings options
	
	$('#accSet').live('click', function(){
		if($('#accnt-settings').hasClass("hide"))
		{
<<<<<<< HEAD
		$('#accnt-settings').slideDown('slow', function() {});
				
=======
		$('#accnt-settings').slideDown('slow', function() {
	
    // Animation complete.
  });
			/*
$( "#accnt-settings" ).animate({
			  opacity: "show"
			}, "slow" );
*/

			
>>>>>>> html-branch-edits
		}else{
			$('#accnt-settings').addClass("hide")
		}
		
		
	})// end of account settings options showing up
	
	
	//when the user clicks on the change password
		// show the change password form
	
<<<<<<< HEAD
	$('#cPass').live('click', function(){
		if($('#chngpw').hasClass("hide"))
	{
		  $("#accnt-settings").hide("slow",function(){
				$( "#chngpw" ).animate({
					opacity: "show"
					}, "slow" );
			});			
	}else{
		$('#chngpw').addClass("hide")
		$('#accnt-settings').removeClass("hide")
	}
	
	
})// end of change password option
=======
		$('#cPass').live('click', function(){
		if($('#chngpw').hasClass("hide"))
		{
/* 			$('#chngpw').removeClass("hide") */
			  $("#accnt-settings").hide("slow",function(){
					$( "#chngpw" ).animate({
						opacity: "show"
						}, "slow" );
				});
				
				
			//$('#accnt-settings').addClass("hide")
			
		}else{
			$('#chngpw').addClass("hide")
			$('#accnt-settings').removeClass("hide")

		}
		
		
	})// end of change password option
>>>>>>> html-branch-edits
	
	
	
	//when the user clicks on the cancel buton
		// hide the change password form
			//goes back to the account settings menu
<<<<<<< HEAD
			
			
	$('#cancelchangepw').live('click', function(){
		if($('#accnt-settings').hasClass("hide"))
		{
	
			$("#chngpw").hide("slow",function(){
				$( "#accnt-settings" ).animate({
					opacity: "show"
					}, "slow" );
			});
	
		}else{
			$('#chngpw').removeClass("hide")
			$('#accnt-settings').addClass("hide")
	
		}
	
	
=======
		$('#cancelchangepw').live('click', function(){
		if($('#accnt-settings').hasClass("hide"))
		{
		
		$("#chngpw").hide("slow",function(){
					$( "#accnt-settings" ).animate({
						opacity: "show"
						}, "slow" );
				});
			/*
$('#accnt-settings').removeClass("hide")
			$('#chngpw').addClass("hide")
*/

			


			
		}else{
			$('#chngpw').removeClass("hide")
						$('#accnt-settings').addClass("hide")

		}
		
		
>>>>>>> html-branch-edits
	})// end of canceling changing password
	
	
	
	//if user clicks delete account
		//alert comes up to delete
	
	$('#dPass').live('click', function(){
		if($('#deleteModel').hasClass("hide"))
		{
		
<<<<<<< HEAD
			$("#accnt-settings").hide("slow",function(){
				$( "#deleteModel" ).animate({
					opacity: "show"
					}, "slow" );
			});
	
		}else{
			$('#accnt-settings').removeClass("hide")
			$('#deleteModel').addClass("hide")
=======
		$("#accnt-settings").hide("slow",function(){
					$( "#deleteModel" ).animate({
						opacity: "show"
						}, "slow" );
				});
			/*
$('#accnt-settings').removeClass("hide")
			$('#chngpw').addClass("hide")
*/

			


			
		}else{
			$('#accnt-settings').removeClass("hide")
						$('#deleteModel').addClass("hide")
>>>>>>> html-branch-edits

		}
		
		
	})// end of delete model popup
	
	
	
	// when delete modal comes up and user clicks no
		//sends them back to account settings
	
	
	$('#no-delete').live('click', function(){
		if($('#accnt-settings').hasClass("hide"))
		{
		
<<<<<<< HEAD
			$("#deleteModel").hide("slow",function(){
				$( "#accnt-settings" ).animate({
					opacity: "show"
					}, "slow" );
=======
		$("#deleteModel").hide("slow",function(){
					$( "#accnt-settings" ).animate({
						opacity: "show"
						}, "slow" );
>>>>>>> html-branch-edits
				});
	
		}else{
			$('#deleteModel').removeClass("hide")
<<<<<<< HEAD
			$('#accnt-settings').addClass("hide")

		}


=======
						$('#accnt-settings').addClass("hide")

		}

		
		
>>>>>>> html-branch-edits
	})// end of  cancel delete model popup
	
	
	
	
	// when delete modal comes up and user clicks yes
		//sends them back to account settings
			//displays a message saying the account has been delted
	
	
	$('#yes-delete').live('click', function(){
		if($('#accountDelted').hasClass("hide"))
		{
		
		$("#deleteModel").hide("slow",function(){
<<<<<<< HEAD
			$( "#accnt-settings" ).animate({
				opacity: "show"
				}, "slow", function(args) { $("#accountDelted").fadeIn().delay(1000).fadeOut() } );
			});
	
		}else{
			$('#deleteModel').removeClass("hide")
			$('#accountDelted').addClass("hide")
=======
					$( "#accnt-settings" ).animate({
						opacity: "show"
						}, "slow", function(args) { $("#accountDelted").fadeIn().delay(1000).fadeOut() } );
				});
	
		}else{
			$('#deleteModel').removeClass("hide")
						$('#accountDelted').addClass("hide")
>>>>>>> html-branch-edits

		}

		
		
	})// end of  cancel delete model popup
<<<<<<< HEAD



=======
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
>>>>>>> html-branch-edits
	//when the user clicks close on the account settings menu
		//hide the account settings menu
	
	$('#settingsBack').live('click', function(){
<<<<<<< HEAD
		$('#accnt-settings').slideUp('slow', function() {});
		
=======
	$('#accnt-settings').slideUp('slow', function() {
	
    // Animation complete.
  });
		/*
$("#accnt-settings").hide("slow",function(){
					
				});
*/
			//$('#accnt-settings').addClass("hide")
>>>>>>> html-branch-edits

	})// end of closing account settings


<<<<<<< HEAD
	// when the user changes their password
		//modal pops up with a congrats 
			//then disapears back to the home app
	$('#pwBtn').live('click', function(){
		$("#chngpw").hide("slow",function(){
			$("#active-account").fadeIn().delay(2000).fadeOut();

		});

	})// end of changing password succes
=======
	$('#pwBtn').live('click', function(){
		$("#chngpw").hide("slow",function(){
					$("#active-account").fadeIn().delay(2000).fadeOut();


				});

/* $("#active-account").fadeIn().delay(2000).fadeOut(); */
})

/* login form display */


$('#log-me-in').live('click', function(){
		if($('#aquilex-login').hasClass("hide"))
		{
			$('#aquilex-login').removeClass("hide")
		}else{
			$('#aquilex-login').addClass("hide")
		}
		
		
	})// end of canceling changing password
	
	
// CANCEL THE LOGIN 	
$('#cancel-login').live('click', function(){
		if($('#aquilex-login').hasClass("hide"))
		{
			$('#aquilex-login').removeClass("hide")
		}else{
			$('#aquilex-login').addClass("hide")
		}
		
		
	})// end of canceling changing password





	var state = true;
		function switchNav(){ //switches the navigation to display login/settings
			if(state){ //if true display  settings and hide login
				$("#dropDown-settings").addClass("hide");
				$("#dropDown-login").removeClass("hide");
			}else{ //if false hide settings and display login
				$("#dropDown-settings").removeClass("hide");
				$("#dropDown-login").addClass("hide");
			}
			
		}
		switchNav();
		
		
		
>>>>>>> html-branch-edits
		
		

	
})(jQuery); // end private scope




