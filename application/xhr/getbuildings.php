<?php
	require_once('../models/locationsModel.php');
	
	$locationsModel = new locationsModel();
	$message = array();
	
	if($_POST){
		$locations = $locationsModel->getBuildings($_POST);
		echo json_encode(array('message'=>'buildings', 'result'=>$locations))
	}

?>