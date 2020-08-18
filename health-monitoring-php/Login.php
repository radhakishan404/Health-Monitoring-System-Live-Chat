<?php 


include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['email']) && isset($data['password']) && isset($data['type'])) {
	$email = $appFunction->escape_string($appFunction->strip_all($data['email']));
	$password = $appFunction->escape_string($appFunction->strip_all($data['password']));
	$type = $appFunction->escape_string($appFunction->strip_all($data['type']));

	$checkUserEmailExists = $appFunction->getUniqueUserByEmailType($email, $type);

	if(!empty($checkUserEmailExists)) {
		if(password_verify($password, $checkUserEmailExists['password'])) {

			$updateLoginToken = $appFunction->updateUserLoginToken($checkUserEmailExists['id']);

			$response['status'] = true;
			$response['user_token'] = $updateLoginToken;

		} else {
			$response['status'] = false;
			$response['error'] = "invalid password";
			$response['message'] = "Password is not correct. Try again";
		}
	} else {
		$response['status'] = false;
		$response['error'] = "not found";
		$response['message'] = "User Does not exist";
	}
}
echo json_encode($response);