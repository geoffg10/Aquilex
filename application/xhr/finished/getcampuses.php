<?php
	require_once('../models/locationsModel.php');
	
	$locationsModel = new locationsModel();
	$message = array();
	
	$locations = $locationsModel->getCampuses($_POST);
	
	echo json_encode(array('message'=>'campuses', 'result'=>$locations));
		
?>