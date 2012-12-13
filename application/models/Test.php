<?php
require('../core/Database.php');

Class Test extends Database{
	
	public function add($data){
	
		$sqlst = "select * from users";
		$st = $this->db->prepare($sqlst);
		$st->execute();
		
		return $st->fetchAll();
	}
}
?>