<?php
	require_once('../models/locationsModel.php');
	
	$locationsModel = new locationsModel();
	$message = array();
	
	if($_POST){
		$locationsModel->addLocation($_POST);
		echo json_encode(array('message'=>'location added'));
	}

?>