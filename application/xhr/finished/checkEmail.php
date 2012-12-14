<?php
	require_once('../models/loginModel.php');
	
	$loginModel = new loginModel();
	
	
	
	if($_POST){
		if($_POST['email']!='')){
			$checkEmailResult = $loginModel->checkEmail($_POST);
			echo json_encode(array('message'=>'email only', 'result'=>$checkEmailResult));
		}else{
			echo json_encode(array('message'=>'needs to at least pass var email'));
		}
	}else{
		echo json_encode(array('message'=>'use post'));
	}
	
?>