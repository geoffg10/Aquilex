<?php
	require_once('../models/locationsModel.php');
	
	$locationsModel = new locationsModel();
	$message = array();
	
	if($_POST){
		$locations = $locationsModel->getLocation($_POST);
		echo json_encode(array('message'=>'locations', 'result'=>$locations));
	}

?>