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
		if(isset($data['search']) && !empty($data['search'])) {
			$search = $appFunction->escape_string($appFunction->strip_all($data['search']));
			$whereCond = " and (name like '%".$search."%' or email like '%".$search."%' or mobile like '%".$search."%')";
		} else {
			$whereCond = '';
		}
		$patientListQuery = $appFunction->query("SELECT * FROM users where type = 'Patient' $whereCond");
		$patientData = array();
		while($row = $appFunction->fetch($patientListQuery)) {
			$patientData[] = $row;
		}
		$response['status'] = true;
		$response['data'] = $patientData;
	} else {
		$response['status'] = false;
		$response['error'] = "invalid token";
		$response['message'] = "Invalid Token";
	}
}
echo json_encode($response);