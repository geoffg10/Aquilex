<?php
	include_once('models/controllerModel.php');
	$controllerModel = new controllerModel();	
	if(empty($_GET['controller'])){
		echo '<br/>'; //remember to remove this
		$controllerModel->getController('map');
	}else{
		$controller = $_GET["controller"];
		
		if($controller == "map"){
			$controllerModel->getController('map');
		}elseif($controller == "admin"){
			$controllerModel->getController('admin');
		}
	}	
?>