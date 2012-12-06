<?php
	require_once('../models/loginModel.php');
	
	$loginModel = new loginModel();
	$message = array();
	
	if($_POST['email']!='' && $_POST['password']!=''){
		$loginResult = $loginModel->checkUser($_POST);
		echo json_encode(array('message'=>'connected', 'result'=>$loginResult));
	}else{
		$checkEmailResult = $loginModel->checkEmail($_POST);
		echo json_encode(array('message'=>'email only', 'result'=>$checkEmailResult));
	}
?>