<?php
require("../models/UserModel.php");

Class UserController{
	
	private $userModel;
	
	public function __construct(){
		$this->userModel = new UserModel();
	}
	/**
      * fblogin method will check to see if the user already exists in the users table 
      * if the user exists than it will return the user_id
      * if the user doesn't exist than their row will be inserted and return the user_id
      *
      *
      * @return the following successful messages: user_added w/user_id, user_found w/user_id; fail messages: multiple_users, expecting $_POST[fb_id], use post
      */

	public function fblogin(){
		if(isset($_POST)){
			// check to make sure that the variable being used is fb_id and that it is not empty
			if(isset($_POST['fb_id']) && $_POST['fb_id'] != ""){
				//check to see if the FB user exists in the user's table
				$checkFBUserResult = $this->userModel->checkFBUser($_POST);
				
				if(count($checkFBUserResult) == 0){
					//if the user doesn't exist it will run an insert and return the user_id	
					$insertFBUser = $this->userModel->insertFBUser($_POST);
					echo json_encode(array('message'=>'user_added', 'result'=>array('user_id'=>$insertFBUser)));
				}elseif(count($checkFBUserResult) == 1){
					//if there is one user it will return the user_id
					echo json_encode(array('message'=>'user_found', 'result'=>array('user_id'=>$checkFBUserResult[0]['user_id'])));
				}else{
					//if there are multiple users than we have some bad data :(
					echo json_encode(array('message'=>'multiple_users', 'result'=>'no bueno'));
				}
			}else{
				// didn't get the expected datatype
				echo json_encode(array('message'=>'expecting $_POST[fb_id]'));
			}
		}else{
			// send message that we should be receiving a $_POST
			echo json_encode(array('message'=>'use post'));
		}
	}
	/**
      * searchEmail method is a wildcard search for email adresses that start with the user input 
      * 
      * uses $_POST
      * expecting ['email']
      *
      * @return array of emails in the users table
      */
	public function searchEmail(){
		if(isset($_POST)){
			if(isset($_POST['email']) && $_POST['email'] !=''){
				//the email var is set and not empty
				$searchEmailArray = $this->userModel->searchEmail($_POST);
				echo json_encode(array('message'=>'email_search', 'result'=>$searchEmailArray));
			}else{
				echo json_encode(array('message'=>'["email"] must be set and not be empty'));
			}
		}else{
			// send message that we should be receiving a $_POST
			echo json_encode(array('message'=>'use post'));
		}
	}

}
?>