<?php
	require_once('../models/locationsModel.php');
	
	$locationsModel = new locationsModel();
	$message = array();
	
	if($_POST){
		$result = $locationsModel->addLocation($_POST, TRUE);
		echo json_encode(array('message'=>'location added', 'result'=>$result));
	}

?>