<?php
	require_once('../models/locationsModel.php');
	
	$locationsModel = new locationsModel();
	$message = array();
	
	

	if($_POST['table'] == 'campus'){
	
		$locations = $locationsModel->searchSchools($_POST);
		
		echo json_encode(array('message'=>'search School', 'result'=>$locations,'post'=>$_POST));

	}else if($_POST['table'] == 'building'){
	
		$locations = $locationsModel->searchBuildings($_POST);
		
		echo json_encode(array('message'=>'search Building', 'result'=>$locations,'post'=>$_POST));

		
	}else if($_POST['table'] == 'rooms'){
		$locations = $locationsModel->searchRooms($_POST);
		
		//echo json_encode(array('message'=>'search', 'result'=>$locations,'post'=>$_POST));
		echo json_encode(array('message'=>'search Room', 'result'=>'SORRY! This Functionally is still being worked on'));
		
		
	}			
?>