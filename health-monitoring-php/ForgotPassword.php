<?php 


include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['email']) && isset($data['type'])) {
	$email = $appFunction->escape_string($appFunction->strip_all($data['email']));
	$type = $appFunction->escape_string($appFunction->strip_all($data['type']));

	$checkUserEmailExists = $appFunction->getUniqueUserByEmailType($email, $type);

	if(!empty($checkUserEmailExists)) {

		$newPassword = substr(str_shuffle("1234567890abcdefghijklmnopqrst"), 0, 8);
		$newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);

		$query = $appFunction->query("UPDATE users set password = '".$newPasswordHash."' where id = '".$checkUserEmailExists['id']."'");

		$response['status'] = true;
		$response['new_password'] = $newPassword;

	} else {
		$response['status'] = false;
		$response['error'] = "not found";
		$response['message'] = "User Does not exist";
	}
}
echo json_encode($response);