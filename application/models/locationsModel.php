<?php
	class locationsModel{
		
		public function addLocation($data){  
			$db = new \PDO("mysql:hostname=127.0.0.1;port=8889;dbname=aquilex", "root", "root");
			$sqlst = "insert into locations(longitude, latitude)values(:longitude, :latitude)";
			$st = $db->prepare($sqlst);
			$results = $st->execute(array(":longitude"=>$data['longitude'], ":latitude"=>$data['latitude']));
		} //close add location
	}
?>