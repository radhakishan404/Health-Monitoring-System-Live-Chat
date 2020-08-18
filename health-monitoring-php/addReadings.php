<?php 

include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['userToken']) && isset($data['userToken'])) {
	$userToken = json_decode($data['userToken']);
	$userDetails = $appFunction->getUniqueUserByToken($userToken);

	if(!empty($userDetails)) {
		if(isset($data['id']) && !empty($data['id'])) {
			$id = $appFunction->escape_string($appFunction->strip_all($data['id']));
			$updateData = array(
				'patient_id' => $userDetails['id'],
				'blood_pressure' => $appFunction->escape_string($appFunction->strip_all($data['blood_pressure'])),
				'blood_sugar' => $appFunction->escape_string($appFunction->strip_all($data['blood_sugar'])),
				'temprature' => $appFunction->escape_string($appFunction->strip_all($data['temprature'])),
				'heart_rate' => $appFunction->escape_string($appFunction->strip_all($data['heart_rate'])),
				'updated' => CURRENTDATETIME
			);
			$updateQuery = $appFunction->updateData($updateData, 'patient_readings', 'id', $id);
			if($updateQuery) {
				$response['status'] = true;
			} else {
				$response['status'] = false;
				$response['message'] = "Unable to update readings try again after sometime";
			}

		} else {
			$insertData = array(
				'patient_id' => $userDetails['id'],
				'blood_pressure' => $appFunction->escape_string($appFunction->strip_all($data['blood_pressure'])),
				'blood_sugar' => $appFunction->escape_string($appFunction->strip_all($data['blood_sugar'])),
				'temprature' => $appFunction->escape_string($appFunction->strip_all($data['temprature'])),
				'heart_rate' => $appFunction->escape_string($appFunction->strip_all($data['heart_rate'])),
				'created' => CURRENTDATETIME
			);
			$insertQuery = $appFunction->insertData($insertData, 'patient_readings');
			if($insertQuery) {
				$response['status'] = true;
			} else {
				$response['status'] = false;
				$response['message'] = "Unable to add readings try again after sometime";
			}
		}

	} else {
		$response['status'] = false;
		$response['error'] = "invalid token";
		$response['message'] = "Invalid Token";
	}
}
echo json_encode($response);