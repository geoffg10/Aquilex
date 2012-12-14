<?php
	require_once('../models/loginModel.php');
	
	$loginModel = new loginModel();
	
	if($_POST){
		if($_POST['fb_id']){
			$loginResult = $loginModel->checkFBUser($_POST);
			echo json_encode(array('message'=>'connected', 'result'=>$loginResult));
		}
	}else{
		echo json_encode(array('message'=>'use post'));
	}
	
?>