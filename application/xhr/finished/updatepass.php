<?php
	require_once('../models/loginModel.php');
	
	$loginModel = new loginModel();
	
	
	
	if($_POST){
		if($_POST['oldpass']!='' && $_POST['newpass']!='' && $_POST['id']){
			$_POST['newpass'] = sha1($_POST['newpass']);
			$_POST['oldpass'] = sha1($_POST['oldpass']);
			$checkpass = $loginModel->checkUserPass($_POST);
			echo json_encode(array('message'=>'update password', 'result'=>$checkpass));
		}else{
			echo json_encode(array('message'=>'needs to pass both var oldpass and var newpass'));
		}
	}else{
		echo json_encode(array('message'=>'use post'));
	}
	
?>