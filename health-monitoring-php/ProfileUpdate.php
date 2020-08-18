<?php 


include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['userToken']) && !empty($data['userToken'])) {
	$userToken = json_decode($data['userToken']);
	$userDetails = $appFunction->getUniqueUserByToken($userToken);

	if(!empty($userDetails)) {
		$updateUserData = array(
			'name' => $appFunction->escape_string($appFunction->strip_all($data['name'])),
			'email' => $appFunction->escape_string($appFunction->strip_all($data['username'])),
			'mobile' => $appFunction->escape_string($appFunction->strip_all($data['mobile'])),
		);
		$updateQuery = $appFunction->updateData($updateUserData, 'users', 'id', $userDetails['id']);

		if($userDetails['type'] == 'Doctor') {
			$getDocPatDetails = $appFunction->getUniqueTableData("doctors", 'user_id', $userDetails['id']);
			$updateDocPatientData = array(
				'user_id' => $userDetails['id'],
				'address' => $appFunction->escape_string($appFunction->strip_all($data['address'])),
				'city' => $appFunction->escape_string($appFunction->strip_all($data['city'])),
				'state' => $appFunction->escape_string($appFunction->strip_all($data['state'])),
				'description' => $appFunction->escape_string($appFunction->strip_all($data['description'])),
			);
			if(empty($getDocPatDetails)) {
				$updateDocPatientQuery = $appFunction->insertData($updateDocPatientData, 'doctors');
			} else {
				$updateDocPatientQuery = $appFunction->updateData($updateDocPatientData, 'doctors', 'user_id', $userDetails['id']);
			}
		} else if($userDetails['type'] == 'Patient') {
			$getDocPatDetails = $appFunction->getUniqueTableData("patients", 'user_id', $userDetails['id']);
			$updateDocPatientData = array(
				'user_id' => $userDetails['id'],
				'address' => $appFunction->escape_string($appFunction->strip_all($data['address'])),
				'city' => $appFunction->escape_string($appFunction->strip_all($data['city'])),
				'state' => $appFunction->escape_string($appFunction->strip_all($data['state'])),
				'description' => $appFunction->escape_string($appFunction->strip_all($data['description'])),
			);
			if(empty($getDocPatDetails)) {
				$updateDocPatientQuery = $appFunction->insertData($updateDocPatientData, 'patients');
			} else {
				$updateDocPatientQuery = $appFunction->updateData($updateDocPatientData, 'patients', 'user_id', $userDetails['id']);
			}
		}

		if(!empty($data['old_password']) && !empty($data['password']) && !empty($data['password2'])) {
			$old_password = $appFunction->escape_string($appFunction->strip_all($data['old_password']));
			$password = $appFunction->escape_string($appFunction->strip_all($data['password']));
			$password2 = $appFunction->escape_string($appFunction->strip_all($data['password2']));

			if(password_verify($old_password, $userDetails['password'])) {

				$updatePassword = $appFunction->updateData(array('password' => password_hash($password, PASSWORD_DEFAULT)), 'users', 'id', $userDetails['id']);

				$response['status'] = true;
				$response['message'] = "Profile and password updated successfully";

			} else {
				$response['status'] = false;
				$response['error'] = "invalid password";
				$response['message'] = "Password is not correct. Try again";
			}
		} else {
			$response['status'] = true;
			$response['message'] = "Profile updated successfully";
		}

	} else {
		$response['status'] = false;
		$response['error'] = "invalid token";
		$response['message'] = "Invalid Token";
	}
}

echo json_encode($response);