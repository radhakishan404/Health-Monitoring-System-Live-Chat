<?php 

include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['userToken']) && !empty($data['userToken'])) {
	$userToken = json_decode($data['userToken']);
	$userDetails = $appFunction->getUniqueUserByToken($userToken);

	$patientList = array();
	$patientChat = array();
	$patientDetails = array();

	$alreadyAddedId = '';

	if(isset($data['id']) && !empty($data['id'])) {
		$id = $appFunction->escape_string($appFunction->strip_all($data['id']));
		$idCond = " and id != '".$id."'";
		$selectPatient = $appFunction->fetch($appFunction->query("SELECT id, name, email FROM users where id = '".$id."'"));
		$patientList[] = $selectPatient;
		$alreadyAddedId = $selectPatient['id'];
		$chatQuery = $appFunction->query("SELECT * FROM chat where (from_id = '".$userDetails['id']."' and to_id = '".$id."') or (from_id = '".$id."' and to_id = '".$userDetails['id']."')");

		while($chtRow = $appFunction->fetch($chatQuery)) {
			$chtRow['created'] = date('d M h:m A', strtotime($chtRow['created']));
			$patientChat[] = $chtRow;
		}

		$patientDetails = $selectPatient;
	} else {
		$idCond = '';
	}

	$getPatients = $appFunction->query("SELECT * FROM chat where from_id = '".$userDetails['id']."' or to_id = '".$userDetails['id']."' group by to_id");
	$previousId = '';
	if($appFunction->num_rows($getPatients) > 0) {
		while ($patRow = $appFunction->fetch($getPatients)) {
			if(empty($previousId)) {
				$idCondPrev = '';
			} else {
				$idCondPrev = " and id != '".$previousId."'";
			}
			$selectPatient = $appFunction->fetch($appFunction->query("SELECT id, name, email FROM users where (id = '".$patRow['from_id']."' or id = '".$patRow['to_id']."') and type = 'Patient' $idCond $idCondPrev"));
			if(!empty($selectPatient)) {
				$previousId = $selectPatient['id'];
				$patientList[] = $selectPatient;
			}
		}
	}


	$response['patientList'] = $patientList;
	$response['patientChat'] = $patientChat;
	$response['patientDetails'] = $patientDetails;

} else {
	$response['status'] = false;
	$response['error'] = "Server Error";
	$response['message'] = "No token found";
}

echo json_encode($response);