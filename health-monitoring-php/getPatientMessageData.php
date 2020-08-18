<?php 

include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['userToken']) && !empty($data['userToken'])) {
	$userToken = json_decode($data['userToken']);
	$userDetails = $appFunction->getUniqueUserByToken($userToken);

	$doctorList = array();
	$doctorChat = array();
	$doctorDetails = array();

	$alreadyAddedId = '';

	if(isset($data['id']) && !empty($data['id'])) {
		$id = $appFunction->escape_string($appFunction->strip_all($data['id']));
		$idCond = " and id != '".$id."'";
		$selectDoctor = $appFunction->fetch($appFunction->query("SELECT id, name, email FROM users where id = '".$id."'"));
		$doctorList[] = $selectDoctor;
		$alreadyAddedId = $selectDoctor['id'];

		$chatQuery = $appFunction->query("SELECT * FROM chat where from_id = '".$userDetails['id']."' or to_id = '".$userDetails['id']."'");

		while($chtRow = $appFunction->fetch($chatQuery)) {
			$chtRow['created'] = date('d M h:m A', strtotime($chtRow['created']));
			$doctorChat[] = $chtRow;
		}

		$doctorDetails = $selectDoctor;
	} else {
		$idCond = '';
	}

	$getDoctors = $appFunction->query("SELECT * FROM chat where from_id = '".$userDetails['id']."' or to_id = '".$userDetails['id']."' group by from_id");
	$previousId = '';
	if($appFunction->num_rows($getDoctors) > 0) {
		while ($docRow = $appFunction->fetch($getDoctors)) {
			if(empty($previousId)) {
				$idCondPrev = '';
			} else {
				$idCondPrev = " and id != '".$previousId."'";
			}
			$selectDoctor = $appFunction->fetch($appFunction->query("SELECT id, name, email FROM users where (id = '".$docRow['from_id']."' or id = '".$docRow['to_id']."') and type = 'Doctor' $idCond $idCondPrev"));
			if(!empty($selectDoctor)) {
				$previousId = $selectDoctor['id'];
				$doctorList[] = $selectDoctor;
			}
		}
	}

	$response['doctorList'] = $doctorList;
	$response['doctorChat'] = $doctorChat;
	$response['doctorDetails'] = $doctorDetails;

} else {
	$response['status'] = false;
	$response['error'] = "Server Error";
	$response['message'] = "No token found";
}

echo json_encode($response);