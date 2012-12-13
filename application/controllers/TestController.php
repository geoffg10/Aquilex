<?php
require("../models/Test.php");

Class TestController{
	
	private $loginModel;
	
	public function __construct(){
		$this->loginModel = new Test();
	}
	
	public function index(){
		include('../views/templates-reference/login.html');
	}
	
	public function hello(){
		
		$checkEmailResult = $this->loginModel->add(array("user_email"=>"a"));
		echo json_encode(array('message'=>'email only', 'result'=>$checkEmailResult));
		//echo "hello";
		
	}
}
?>