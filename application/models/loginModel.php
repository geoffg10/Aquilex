<?php
	class loginModel{
		
		
		public function checkEmail($data){ //check email only
			$wildEmail = $data['email'].'%';
			$db = new \PDO("mysql:hostname=127.0.0.1;port=8889;dbname=aquilex", "root", "root");
			$sqlst = "select user_email from users where user_email like :user_email";
			$st = $db->prepare($sqlst);
			$results = $st->execute(array(":user_email"=>$wildEmail));
			$resultData = $st->fetchAll(); //get all responses
			$emails = array();
			
			foreach($resultData as $value){
				array_push($emails, $value);
			}
			return array('success'=>'emails searched', 'emails'=>$resultData);//$message = array('user emails'=>$emails);
		}
		
		public function checkUser($data){  //first step is to check if the email exists in the table
			$db = new \PDO("mysql:hostname=127.0.0.1;port=8889;dbname=aquilex", "root", "root");
			$sqlst = "select * from users where user_email =:user_email";
			$st = $db->prepare($sqlst);
			$results = $st->execute(array(":user_email"=>$data['email']));
			$resultData = $st->fetchAll(); //get all responses
			
			if($st->rowCount() > 0){ //if the email exists than 
				//there is a record
				$validateUser = $this->validateUser($data);
				return $validateUser;
			}else{
				$insertResult = $this->insertUser($data); //there isn't a record
				return $insertResult;
			}
			
		} //close add location
		
		private function insertUser($data){  
			$db = new \PDO("mysql:hostname=127.0.0.1;port=8889;dbname=aquilex", "root", "root");
			$sqlst = "insert into users(user_email, user_pass)values(:user_email, :password)";
			$st = $db->prepare($sqlst);
			$results = $st->execute(array(":user_email"=>$data['email'], ":password"=>$data['password']));
			
			$validateUser = $this->validateUser($data); //there isn't a record
			$usermessage = array('success'=>'user added', 'userid'=>$validateUser);
			return $usermessage;
		} //close insert user
		
		private function validateUser($data){
			$db = new \PDO("mysql:hostname=127.0.0.1;port=8889;dbname=aquilex", "root", "root");
			$sqlst = "select * from users where user_email =:user_email and user_pass = :password";
			$st = $db->prepare($sqlst);
			$results = $st->execute(array(":user_email"=>$data['email'], ":password"=>$data['password']));
			$resultData = $st->fetchAll(); //get all responses
			
			
			if($st->rowCount() > 0){
				//there is a record
				return array('success'=>'logged in', 'userid'=>$resultData[0]['id']);
			}else{
				 //there isn't a record
				return array('success'=>"password doesn't match");
			}
		}//close validate user
		
	}
?>