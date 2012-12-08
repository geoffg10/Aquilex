<?php
	class locationsModel{
		
		public function addLocation($data){  
			$db = new \PDO("mysql:hostname=127.0.0.1;port=8889;dbname=aquilex", "root", "root");
			$sqlst = "insert into locations(longitude, latitude)values(:longitude, :latitude)";
			$st = $db->prepare($sqlst);
			$results = $st->execute(array(":longitude"=>$data['longitude'], ":latitude"=>$data['latitude']));
		} //close add location
		
		public function addCampus($data){  
			$db = new \PDO("mysql:hostname=127.0.0.1;port=8889;dbname=aquilex", "root", "root");
			$sqlst = "insert into locations(name, longitude, latitude, campus_type_id, added_by_id, google_ref_id)values(:name, :longitude, :latitude, :campus_type_id, :added_by_id)";
			$st = $db->prepare($sqlst);
			$results = $st->execute(array(":name"=>$data['name'],":longitude"=>$data['longitude'], ":latitude"=>$data['latitude'], ":campus_type_id"=>'1', ":added_by_id"=>$data['added_by_id']));
		} //close add location
		
		// gets location by the google_ref_id
		//returns the object with it's id, name, lat, long, google_ref_id, type
		public function getLocation($data){ //expecting 
			$db = new \PDO("mysql:hostname=127.0.0.1;port=8889;dbname=aquilex", "root", "root");
			$sqlst = "SELECT c.id, c.name, c.latitude, c.longitude, c.google_ref_id, ct.type
						FROM campuses c
						LEFT JOIN campus_types ct on(c.campus_type_id = ct.id)
						where google_ref_id = :google_ref_id";
			$st = $db->prepare($sqlst);
			$results = $st->execute(array(":google_ref_id"=>$data['google_ref_id']));
			$resultData = $st->fetchAll(); //get all responses
			if($st->rowCount() > 0){ //if the record exists than 
				//there is a record
				return $resultData;
			}else{
				return 'no record found, double check to make sure you name the variable google_ref_id';
			}
		}
		// gets building by the campus_id
		//returns the object with it's id, name, lat, long, campus_id
		public function getBuildings($data){
			$db = new \PDO("mysql:hostname=127.0.0.1;port=8889;dbname=aquilex", "root", "root");
			$sqlst = "SELECT b.id, b.campus_id, b.latitude, b.longitude, b.name
						FROM buildings b
						where campus_id = :campus_id";
			$st = $db->prepare($sqlst);
			$results = $st->execute(array(":campus_id"=>$data['campus_id']));
			$resultData = $st->fetchAll(); //get all responses
			if($st->rowCount() > 0){ //if the record exists than 
				//there is a record
				return $resultData;
			}else{
				return 'no buildings found for this campus, be sure to name your variable campus_id';
			}
		}
		// gets location by the building_id
		//returns the object with it's id, name, lat, long, building_id, type
		public function getRooms($data){
			$db = new \PDO("mysql:hostname=127.0.0.1;port=8889;dbname=aquilex", "root", "root");
			$sqlst = "SELECT r.id, r.building_id, r.latitude, r.longitude, r.name, rt.type
						FROM rooms r
						LEFT JOIN room_types rt on (r.room_type_id = rt.id)
						WHERE building_id = :building_id";
			$st = $db->prepare($sqlst);
			$results = $st->execute(array(":building_id"=>$data['building_id']));
			$resultData = $st->fetchAll(); //get all responses
			if($st->rowCount() > 0){ //if the record exists than 
				//there is a record
				return $resultData;
			}else{
				return 'no rooms found for this building, be sure to name your variable building_id';
			}
		}
	}
?>