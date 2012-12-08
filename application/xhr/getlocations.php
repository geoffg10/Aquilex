<?php
	require_once('../models/locationsModel.php');
	
	$locationsModel = new locationsModel();
	$message = array();
	
	if($_POST){
		if($_POST['google_ref_id']!=''){
			$locations = $locationsModel->getLocation($_POST);
			echo json_encode(array('message'=>'locations', 'result'=>$locations));		
		}else{
			echo json_encode(array('message'=>'needs to have a google_ref_id');
		}

	}else{
		echo json_encode(array('message'=>'use post');
	}

?>