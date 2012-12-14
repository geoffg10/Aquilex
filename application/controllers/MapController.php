<?php
require("../models/MapModel.php");

Class MapController{
	
	private $mapModel;
	
	public function __construct(){
		$this->mapModel = new MapModel();
	}
	
	
	public function index(){ //instantiate views
		echo "<br/>";
		include('../views/header.html');
		include('../views/map.html');
		include('../views/googleFooter.html');
	}
	public function getallcampuses(){
		if(isset($_GET)){
			$campuses = $this->mapModel->getAllCampuses($_GET);
	
	echo json_encode(array('message'=>'all_campuses', 'result'=>$campuses));
		}else{
			echo json_encode(array('message'=>'use post'));
		}
	}
		
	public function getcampuses(){
		if(isset($_POST)){
			if(isset($_POST["google_id"]) && $_POST["google_id"] != ''){
				$campuses = $this->mapModel->getCampuses($_POST);
				echo json_encode(array('message'=>'campuses', 'result'=>$campuses));
			}else{
				echo json_encode(array('message'=>'$_POST["google_id"] must be set and not be empty'));
			}
		}else{
			echo json_encode(array('message'=>'use post'));
		}
	}
	public function getbuildings(){
		if(isset($_POST)){
			if(isset($_POST['campus_id']) && $_POST['campus_id']!=''){
				$buildings = $this->mapModel->getBuildings($_POST);
				echo json_encode(array('message'=>'buildings', 'result'=>$buildings));
			}else{
				echo json_encode(array('message'=>'$_POST["campus_id"] must be set and not be empty'));
			}
		}else{
			echo json_encode(array('message'=>'use post'));
		}

	}
	public function getrooms(){
		if(isset($_POST)){
			if(isset($_POST['building_id']) && $_POST['building_id']!=''){
				$rooms = $this->mapModel->getRooms($_POST);
				echo json_encode(array('message'=>'rooms', 'result'=>$rooms));			
			}else{
				echo json_encode(array('message'=>'$_POST["building_id"] must be set and not be empty'));
			}
	
		}else{
			echo json_encode(array('message'=>'use post'));
	
		}
		
	}
	
	public function addcampus(){
		if(isset($_POST)){
			if(isset($_POST['name']) && isset($_POST['longitude']) && isset($_POST['latitude'])  && isset($_POST['google_id']) && $_POST['name']!='' && $_POST['longitude']!='' && $_POST['latitude']!='' && $_POST['google_id']!=''){
				$_POST['added_by_id'] = 1; //this needs to be the session
				
				// first check to see if the capus exists in the campus table
				$capuses = $this->mapModel->getCampuses($_POST);
				if(count($capuses) == 1){ //campus exists, no insert
					echo json_encode(array('message'=>'campus_exists', 'result'=>'campus already exists'));
				}elseif(count($capuses) == 0){ //campus doesn't exist so insert
					$insertCampus = $this->mapModel->addCampus($_POST);
					echo json_encode(array('message'=>'campus_added', 'result'=>array('campus_id'=>$insertCampus)));
				}else{
					//if there are duplicate campuses than we have some bad data :(
					echo json_encode(array('message'=>'duplicate_campuses', 'result'=>'no bueno'));
				}
			}else{
				echo json_encode(array('message'=>'$_POST["name"], $_POST["longitude"], $_POST["latitude"], $_POST["google_id"] all need to be set and not empty'));
			}
			
		}else{
			echo json_encode(array('message'=>'use post'));
		}
		
	}
	public function addbuilding(){
		if(isset($_POST)){
			if(isset($_POST['name']) && isset($_POST['longitude']) && isset($_POST['latitude']) && isset($_POST['campus_id']) && $_POST['name']!='' && $_POST['longitude']!='' && $_POST['latitude']!='' && $_POST['campus_id']!=''){
				$_POST['added_by_id'] = 1; //this needs to be the session
				$insertBuilding = $this->mapModel->addBuilding($_POST);
				
				
				echo json_encode(array('message'=>'building_added', 'result'=>array('building_id'=>$insertBuilding)));
			}else{
				echo json_encode(array('message'=>'$_POST["name"], $_POST["longitude"], $_POST["latitude"],$_POST["campus_id"] all need to be set and not empty'));
			}
			
		}else{
			echo json_encode(array('message'=>'use post'));
		}
	}

}
?>