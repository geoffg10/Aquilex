<?php
	require_once('../models/locationsModel.php');
	
	$locationsModel = new locationsModel();
	
	if($_POST){
		if($_POST['name']!='' && $_POST['longitude']!='' && $_POST['latitude']!='' && $_POST['latitude']!='' && $_POST['added_by_id']!='' && $_POST['google_ref_id']!=''){
			$result = $locationsModel->addLocation($_POST, TRUE);
			echo json_encode(array('message'=>'location added', 'result'=>$result));
		}else{
			echo json_encode(array('message'=>'something is wrong with your stuff'));
		}
		
	}else{
		echo json_encode(array('message'=>'use post'));
	}

?>