<?php
require("../models/MapModel.php");

Class MapController{
	
	private $mapModel;
	
	public function __construct(){
		$this->mapModel = new MapModel();
	}
	
	public function index(){
		include('../views/header.html');
		include('../views/map.html');
		include('../views/googleFooter.html');
	}
	
	public function hello(){
		
		$checkEmailResult = $this->loginModel->add(array("user_email"=>"a"));
		echo json_encode(array('message'=>'email only', 'result'=>$checkEmailResult));
		//echo "hello";
		
	}
}
?>