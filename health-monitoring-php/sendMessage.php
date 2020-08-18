<?php 

include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['userToken']) && !empty($data['userToken']) && isset($data['message']) && !empty($data['message'])) {
	$userToken = json_decode($data['userToken']);
	$userDetails = $appFunction->getUniqueUserByToken($userToken);

	if(!empty($userDetails)) {

		$message = $appFunction->escape_string($appFunction->strip_all($data['message']));
		$to_id = $appFunction->escape_string($appFunction->strip_all($data['to_id']));

		$insertMessage = $appFunction->query("INSERT INTO chat (from_id, to_id, message, created) values ('".$userDetails['id']."', '".$to_id."', '".$message."', '".CURRENTDATETIME."')");

		$response['status'] = true;

	} else {
		$response['status'] = false;
		$response['error'] = "invalid token";
		$response['message'] = "Invalid Token";
	}
} else {
	$response['status'] = false;
	$response['error'] = "Server Error";
	$response['message'] = "No token found";
}
echo json_encode($response);