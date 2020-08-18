<?php 

include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['userToken']) && isset($data['userToken']) && isset($data['id']) && isset($data['id']) ) {
	$userToken = json_decode($data['userToken']);
	$userDetails = $appFunction->getUniqueUserByToken($userToken);

	if(!empty($userDetails)) {
		$id = $appFunction->escape_string($appFunction->strip_all($data['id']));
		$deleteQuery = $appFunction->deleteData('patient_readings', 'id', $id);
		if($deleteQuery) {
			$response['status'] = true;
		} else {
			$response['status'] = false;
			$response['message'] = "Unable to delete readings try again after sometime";
		}
	} else {
		$response['status'] = false;
		$response['error'] = "invalid token";
		$response['message'] = "Invalid Token";
	}
}
echo json_encode($response);