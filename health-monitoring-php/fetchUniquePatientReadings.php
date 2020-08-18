<?php 


include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['userToken']) && !empty($data['userToken']) && isset($data['id']) && !empty($data['id']) ) {
	$userToken = json_decode($data['userToken']);
	$userDetails = $appFunction->getUniqueUserByToken($userToken);

	if(!empty($userDetails)) {
		$id = $appFunction->escape_string($appFunction->strip_all($data['id']));
		$patientData = $appFunction->fetch($appFunction->query("SELECT * FROM patient_readings where id = '".$id."'"));

		if(!empty($patientData)) {
			$response['status'] = true;
			$response['data'] = $patientData;	
		} else {
			$response['status'] = false;
			$response['message'] = "Invalid id for fetching result";
		}
	} else {
		$response['status'] = false;
		$response['error'] = "invalid token";
		$response['message'] = "Invalid Token";
	}
}
echo json_encode($response);