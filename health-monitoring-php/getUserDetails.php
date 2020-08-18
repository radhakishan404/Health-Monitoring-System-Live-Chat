<?php 


include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['userToken']) && !empty($data['userToken'])) {
	$userToken = json_decode($data['userToken']);
	$userDetails = $appFunction->getUniqueUserByToken($userToken);

	if($userDetails['type'] == 'Doctor') {
		$doctorDetails = $appFunction->fetch($appFunction->query("SELECT * FROM doctors where user_id = '".$userDetails['id']."'"));
		$userDetails['address'] = $doctorDetails['address'];
		$userDetails['city'] = $doctorDetails['city'];
		$userDetails['state'] = $doctorDetails['state'];
		$userDetails['description'] = $doctorDetails['description'];
	} else if($userDetails['type'] == 'Patient') {
		$patientDetails = $appFunction->fetch($appFunction->query("SELECT * FROM patients where user_id = '".$userDetails['id']."'"));
		$userDetails['address'] = $patientDetails['address'];
		$userDetails['city'] = $patientDetails['city'];
		$userDetails['state'] = $patientDetails['state'];
		$userDetails['description'] = $patientDetails['description'];
	}

	if(!empty($userDetails)) {
		$response['status'] = true;
		$response['data'] = $userDetails;
	} else {
		$response['status'] = false;
		$response['error'] = "invalid token";
		$response['message'] = "Invalid Token";
	}
}
echo json_encode($response);