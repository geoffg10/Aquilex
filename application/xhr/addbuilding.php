<?php
	require_once('../models/locationsModel.php');
	
	$locationsModel = new locationsModel();
	
	if($_POST){
		if($_POST['name']!='' && $_POST['longitude']!='' && $_POST['latitude']!='' && $_POST['added_by_id']!='' && $_POST['campus_id']!=''){
			$result = $locationsModel->addBuilding($_POST);
			echo json_encode(array('message'=>'building added', 'result'=>$result));
		}else{
			echo json_encode(array('message'=>'something is wrong with your stuff'));
		}
		
	}else{
		echo json_encode(array('message'=>'use post'));
	}

?>