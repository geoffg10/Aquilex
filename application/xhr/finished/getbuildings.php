<?php
	require_once('../models/locationsModel.php');
	
	$locationsModel = new locationsModel();
	$message = array();
	
	if($_POST){
		if($_POST['campus_id']!=''){
			$locations = $locationsModel->getBuildings($_POST);
			echo json_encode(array('message'=>'buildings', 'result'=>$locations));
		}else{
			echo json_encode(array('message'=>'needs to have a campus_id'));
		}
		
	}else{
		echo json_encode(array('message'=>'use post'));
	}

?>