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
		$patientReadingsQuery = $appFunction->query("SELECT * FROM patient_readings where patient_id = '".$userDetails['id']."' order by created desc");
		$patientData = array();
		$count = 1;
		while($row = $appFunction->fetch($patientReadingsQuery)) {
			$row['count'] = $count++;
			$row['updated'] = date('d-m-Y h:i:s A', strtotime($row['updated']));
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