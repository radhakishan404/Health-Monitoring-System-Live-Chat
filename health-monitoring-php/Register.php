<?php 


include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['name']) && isset($data['email']) && isset($data['mobile']) && isset($data['password']) && isset($data['type'])) {
	$name = $appFunction->escape_string($appFunction->strip_all($data['name']));
	$mobile = $appFunction->escape_string($appFunction->strip_all($data['mobile']));
	$email = $appFunction->escape_string($appFunction->strip_all($data['email']));
	$password = $appFunction->escape_string($appFunction->strip_all($data['password']));
	$type = $appFunction->escape_string($appFunction->strip_all($data['type']));

	$checkUserEmailExists = $appFunction->getUniqueUserByEmailType($email, $type);

	if(empty($checkUserEmailExists)) {
		$password = password_hash($password, PASSWORD_DEFAULT);
		$query = $appFunction->query("INSERT INTO users (name, mobile, email, password, type, created) values ('".$name."', '".$mobile."', '".$email."', '".$password."', '".$type."', '".CURRENTDATETIME."')");
		$id = $appFunction->last_insert_id();
		$updateLoginToken = $appFunction->updateUserLoginToken($id);
		$response['status'] = true;
		$response['user_token'] = $updateLoginToken;

	} else {
		$response['status'] = false;
		$response['error'] = "not found";
		$response['message'] = "User already exists";
	}
}
echo json_encode($response);