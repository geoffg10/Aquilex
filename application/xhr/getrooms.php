<?php
	require_once('../models/locationsModel.php');
	
	$locationsModel = new locationsModel();
	$message = array();
	
	if($_POST){
		if($_POST['building_id']!=''){
			$locations = $locationsModel->getRooms($_POST);
			echo json_encode(array('message'=>'rooms', 'result'=>$locations));			
		}else{
			echo json_encode(array('message'=>'needs to have a building_id');
		}

	}else{
		echo json_encode(array('message'=>'use post');

	}

?>