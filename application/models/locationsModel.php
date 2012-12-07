<?php
	class locationsModel{
		
		public function addLocation($data){  
			$db = new \PDO("mysql:hostname=127.0.0.1;port=8889;dbname=aquilex", "root", "root");
			$sqlst = "insert into locations(longitude, latitude)values(:longitude, :latitude)";
			$st = $db->prepare($sqlst);
			$results = $st->execute(array(":longitude"=>$data['longitude'], ":latitude"=>$data['latitude']));
		} //close add location
		
		public function getLocation($data){
			$db = new \PDO("mysql:hostname=127.0.0.1;port=8889;dbname=aquilex", "root", "root");
			$sqlst = "SELECT c.id, c.name, c.latitude, c.longitude, c.google_ref_id, ct.type
						FROM campuses c
						LEFT JOIN campus_types ct on(c.campus_type_id = ct.id)
						where google_ref_id = :google_ref_id";
			$st = $db->prepare($sqlst);
			$results = $st->execute(array(":google_ref_id"=>$data['google_ref_id']));
		}
	}
?>