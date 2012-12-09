<?php
	require_once('../models/loginModel.php');
	
	$loginModel = new loginModel();
	
	
	if($_POST){
		if($_POST['email']!='' && isset($_POST['password'])){
			$_POST['password'] = sha1($_POST['password']);
			$loginResult = $loginModel->checkUser($_POST);
			echo json_encode(array('message'=>'connected', 'result'=>$loginResult));
		}elseif($_POST['email']!=''){
			$checkEmailResult = $loginModel->checkEmail($_POST);
			echo json_encode(array('message'=>'email only', 'result'=>$checkEmailResult));
		}else{
			echo json_encode(array('message'=>'needs to at least pass var email'));
		}
	}else{
		echo json_encode(array('message'=>'use post'));
	}
	
?>